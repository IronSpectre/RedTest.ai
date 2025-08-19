#!/bin/bash

# RedTest.ai Deployment Script
# This script builds and deploys your website to AWS

set -e  # Exit on any error

echo "🚀 Starting RedTest.ai deployment..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    echo "Visit: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if AWS is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

# Configuration (update these values)
BUCKET_NAME="redtest-ai-website"
DISTRIBUTION_ID=""  # Add your CloudFront distribution ID here

echo "📦 Installing dependencies..."
npm ci

echo "🔨 Building application..."
npm run build

echo "📤 Uploading to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete --exact-timestamps

if [ ! -z "$DISTRIBUTION_ID" ]; then
    echo "🔄 Creating CloudFront invalidation..."
    aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
    echo "⏳ CloudFront cache invalidation initiated. Changes will be live in 1-5 minutes."
else
    echo "⚠️  No CloudFront distribution ID provided. Update DISTRIBUTION_ID in this script for cache invalidation."
fi

echo "✅ Deployment complete!"
echo "🌐 Your website should be live at: https://redtest.ai"