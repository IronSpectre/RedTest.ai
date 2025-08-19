#!/bin/bash

# AWS Infrastructure Setup Script for RedTest.ai
# This script automates the creation of AWS resources

set -e

echo "🏗️  Setting up AWS infrastructure for RedTest.ai..."

# Configuration
DOMAIN_NAME="redtest.ai"
BUCKET_NAME="redtest-ai-website"
REGION="us-east-1"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo_info() {
    echo -e "${GREEN}ℹ️  $1${NC}"
}

echo_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    echo_info "Checking prerequisites..."
    
    if ! command -v aws &> /dev/null; then
        echo_error "AWS CLI is not installed. Please install it first."
        exit 1
    fi
    
    if ! aws sts get-caller-identity &> /dev/null; then
        echo_error "AWS CLI is not configured. Please run 'aws configure' first."
        exit 1
    fi
    
    echo_info "Prerequisites check passed!"
}

# Create S3 bucket
create_s3_bucket() {
    echo_info "Creating S3 bucket: $BUCKET_NAME"
    
    if aws s3api head-bucket --bucket "$BUCKET_NAME" 2>/dev/null; then
        echo_warning "Bucket $BUCKET_NAME already exists!"
    else
        if [ "$REGION" = "us-east-1" ]; then
            aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION"
        else
            aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION" \
                --create-bucket-configuration LocationConstraint="$REGION"
        fi
        echo_info "S3 bucket created successfully!"
    fi
    
    # Configure website hosting
    echo_info "Configuring static website hosting..."
    aws s3 website "s3://$BUCKET_NAME" --index-document index.html --error-document index.html
    
    # Set bucket policy for public read access
    echo_info "Setting bucket policy..."
    cat > /tmp/bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF
    
    aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy file:///tmp/bucket-policy.json
    rm /tmp/bucket-policy.json
}

# Request SSL certificate
request_certificate() {
    echo_info "Requesting SSL certificate for $DOMAIN_NAME and www.$DOMAIN_NAME"
    
    CERT_ARN=$(aws acm request-certificate \
        --domain-name "$DOMAIN_NAME" \
        --subject-alternative-names "www.$DOMAIN_NAME" \
        --validation-method DNS \
        --region us-east-1 \
        --query 'CertificateArn' \
        --output text)
    
    echo_info "Certificate requested with ARN: $CERT_ARN"
    echo_warning "You need to validate the certificate via DNS. Check ACM console for validation records."
    
    echo "$CERT_ARN" > /tmp/cert-arn.txt
}

# Create CloudFront distribution
create_cloudfront_distribution() {
    echo_info "Creating CloudFront distribution..."
    
    # First, create OAC (Origin Access Control)
    OAC_ID=$(aws cloudfront create-origin-access-control \
        --origin-access-control-config '{
            "Name": "redtest-ai-oac",
            "Description": "OAC for RedTest.ai S3 bucket",
            "OriginAccessControlOriginType": "s3",
            "SigningBehavior": "always",
            "SigningProtocol": "sigv4"
        }' \
        --query 'OriginAccessControl.Id' \
        --output text)
    
    echo_info "Created OAC with ID: $OAC_ID"
    
    # Get certificate ARN
    if [ -f /tmp/cert-arn.txt ]; then
        CERT_ARN=$(cat /tmp/cert-arn.txt)
    else
        echo_warning "Certificate ARN not found. You'll need to update the CloudFront distribution manually."
        CERT_ARN=""
    fi
    
    # Create distribution config
    cat > /tmp/distribution-config.json << EOF
{
    "CallerReference": "redtest-ai-$(date +%s)",
    "Aliases": {
        "Quantity": 2,
        "Items": ["$DOMAIN_NAME", "www.$DOMAIN_NAME"]
    },
    "DefaultRootObject": "index.html",
    "Comment": "RedTest.ai website distribution",
    "Enabled": true,
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-$BUCKET_NAME",
                "DomainName": "$BUCKET_NAME.s3.$REGION.amazonaws.com",
                "OriginPath": "",
                "S3OriginConfig": {
                    "OriginAccessIdentity": ""
                },
                "OriginAccessControlId": "$OAC_ID"
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-$BUCKET_NAME",
        "ViewerProtocolPolicy": "redirect-to-https",
        "MinTTL": 0,
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            }
        },
        "TrustedSigners": {
            "Enabled": false,
            "Quantity": 0
        }
    },
    "CustomErrorPages": {
        "Quantity": 2,
        "Items": [
            {
                "ErrorCode": 403,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            },
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            }
        ]
    },
    "PriceClass": "PriceClass_All"
}
EOF

    # Add SSL certificate if available
    if [ ! -z "$CERT_ARN" ]; then
        jq --arg cert "$CERT_ARN" '.ViewerCertificate = {
            "ACMCertificateArn": $cert,
            "SSLSupportMethod": "sni-only",
            "MinimumProtocolVersion": "TLSv1.2_2021"
        }' /tmp/distribution-config.json > /tmp/distribution-config-ssl.json
        mv /tmp/distribution-config-ssl.json /tmp/distribution-config.json
    fi
    
    DISTRIBUTION_ID=$(aws cloudfront create-distribution \
        --distribution-config file:///tmp/distribution-config.json \
        --query 'Distribution.Id' \
        --output text)
    
    echo_info "CloudFront distribution created with ID: $DISTRIBUTION_ID"
    echo "$DISTRIBUTION_ID" > /tmp/distribution-id.txt
    
    rm /tmp/distribution-config.json
}

# Update S3 bucket policy for OAC
update_s3_policy_for_oac() {
    echo_info "Updating S3 bucket policy for CloudFront OAC..."
    
    if [ -f /tmp/distribution-id.txt ]; then
        DISTRIBUTION_ID=$(cat /tmp/distribution-id.txt)
        
        # Get the distribution ARN
        DISTRIBUTION_ARN="arn:aws:cloudfront::$(aws sts get-caller-identity --query Account --output text):distribution/$DISTRIBUTION_ID"
        
        cat > /tmp/oac-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "$DISTRIBUTION_ARN"
                }
            }
        }
    ]
}
EOF
        
        aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy file:///tmp/oac-policy.json
        rm /tmp/oac-policy.json
        
        echo_info "S3 bucket policy updated for OAC!"
    else
        echo_warning "Distribution ID not found. Please update S3 bucket policy manually."
    fi
}

# Create Route 53 hosted zone
create_route53_zone() {
    echo_info "Creating Route 53 hosted zone for $DOMAIN_NAME..."
    
    # Check if hosted zone already exists
    ZONE_ID=$(aws route53 list-hosted-zones-by-name --dns-name "$DOMAIN_NAME" \
        --query "HostedZones[?Name=='$DOMAIN_NAME.'].Id" --output text)
    
    if [ ! -z "$ZONE_ID" ] && [ "$ZONE_ID" != "None" ]; then
        echo_warning "Hosted zone for $DOMAIN_NAME already exists!"
        ZONE_ID=$(echo $ZONE_ID | cut -d'/' -f3)
    else
        ZONE_ID=$(aws route53 create-hosted-zone \
            --name "$DOMAIN_NAME" \
            --caller-reference "redtest-ai-$(date +%s)" \
            --query 'HostedZone.Id' \
            --output text | cut -d'/' -f3)
        
        echo_info "Hosted zone created with ID: $ZONE_ID"
    fi
    
    # Get name servers
    echo_info "Getting name servers for the hosted zone..."
    aws route53 get-hosted-zone --id "$ZONE_ID" \
        --query 'DelegationSet.NameServers' \
        --output table
    
    echo_warning "Please update your domain registrar with these name servers!"
    
    echo "$ZONE_ID" > /tmp/zone-id.txt
}

# Create DNS records
create_dns_records() {
    echo_info "Creating DNS records..."
    
    if [ ! -f /tmp/zone-id.txt ] || [ ! -f /tmp/distribution-id.txt ]; then
        echo_warning "Missing zone ID or distribution ID. Skipping DNS record creation."
        return
    fi
    
    ZONE_ID=$(cat /tmp/zone-id.txt)
    DISTRIBUTION_ID=$(cat /tmp/distribution-id.txt)
    
    # Get CloudFront domain name
    CF_DOMAIN=$(aws cloudfront get-distribution --id "$DISTRIBUTION_ID" \
        --query 'Distribution.DomainName' --output text)
    
    # Create A record for root domain
    cat > /tmp/change-batch.json << EOF
{
    "Changes": [
        {
            "Action": "UPSERT",
            "ResourceRecordSet": {
                "Name": "$DOMAIN_NAME",
                "Type": "A",
                "AliasTarget": {
                    "DNSName": "$CF_DOMAIN",
                    "EvaluateTargetHealth": false,
                    "HostedZoneId": "Z2FDTNDATAQYW2"
                }
            }
        },
        {
            "Action": "UPSERT",
            "ResourceRecordSet": {
                "Name": "www.$DOMAIN_NAME",
                "Type": "A",
                "AliasTarget": {
                    "DNSName": "$CF_DOMAIN",
                    "EvaluateTargetHealth": false,
                    "HostedZoneId": "Z2FDTNDATAQYW2"
                }
            }
        }
    ]
}
EOF
    
    aws route53 change-resource-record-sets \
        --hosted-zone-id "$ZONE_ID" \
        --change-batch file:///tmp/change-batch.json
    
    rm /tmp/change-batch.json
    echo_info "DNS records created!"
}

# Main execution
main() {
    echo_info "Starting AWS infrastructure setup for RedTest.ai..."
    
    check_prerequisites
    create_s3_bucket
    request_certificate
    
    echo_warning "Please validate your SSL certificate in the ACM console before continuing."
    echo_warning "Press Enter when certificate validation is complete..."
    read
    
    create_cloudfront_distribution
    update_s3_policy_for_oac
    create_route53_zone
    create_dns_records
    
    echo_info "🎉 AWS infrastructure setup complete!"
    echo_info ""
    echo_info "Next steps:"
    echo_info "1. Update your domain registrar with the Route 53 name servers"
    echo_info "2. Wait for DNS propagation (up to 48 hours)"
    echo_info "3. Deploy your website using: ./scripts/deploy.sh"
    echo_info ""
    echo_info "Your website will be available at: https://$DOMAIN_NAME"
    
    # Save important values
    if [ -f /tmp/distribution-id.txt ]; then
        echo_info "CloudFront Distribution ID: $(cat /tmp/distribution-id.txt)"
        echo "DISTRIBUTION_ID=$(cat /tmp/distribution-id.txt)" >> .env.aws
    fi
    
    if [ -f /tmp/zone-id.txt ]; then
        echo_info "Route 53 Hosted Zone ID: $(cat /tmp/zone-id.txt)"
        echo "ZONE_ID=$(cat /tmp/zone-id.txt)" >> .env.aws
    fi
    
    echo "BUCKET_NAME=$BUCKET_NAME" >> .env.aws
    echo "DOMAIN_NAME=$DOMAIN_NAME" >> .env.aws
    
    # Cleanup
    rm -f /tmp/cert-arn.txt /tmp/distribution-id.txt /tmp/zone-id.txt
}

# Run main function
main "$@"