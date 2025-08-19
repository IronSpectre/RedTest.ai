# Complete AWS Hosting Guide for RedTest.ai

This guide will walk you through hosting your RedTest.ai website on AWS with full functionality, including SSL, CDN, and custom domain support.

## Prerequisites

- AWS Account
- Your domain name
- AWS CLI installed (optional but recommended)
- Node.js and npm installed locally

## Step 1: Prepare Your Application for Deployment

### 1.1 Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This creates a `dist` folder with all your static files.

### 1.2 Test the Build Locally

```bash
# Preview the production build
npm run preview
```

Visit `http://localhost:4173` to ensure everything works correctly.

## Step 2: Set Up AWS S3 for Static Website Hosting

### 2.1 Create an S3 Bucket

1. **Log into AWS Console** → Navigate to S3
2. **Click "Create bucket"**
3. **Configure bucket settings:**
   - **Bucket name**: `redtest-ai-website` (must be globally unique)
   - **Region**: Choose closest to your target audience (e.g., `us-east-1`)
   - **Uncheck "Block all public access"** ⚠️ Important
   - **Acknowledge the warning** about public access
4. **Click "Create bucket"**

### 2.2 Enable Static Website Hosting

1. **Select your bucket** → Go to **Properties** tab
2. **Scroll to "Static website hosting"** → Click **Edit**
3. **Configure settings:**
   - **Enable** static website hosting
   - **Index document**: `index.html`
   - **Error document**: `index.html` (for SPA routing)
4. **Save changes**
5. **Note the endpoint URL** (you'll need this later)

### 2.3 Configure Bucket Policy

1. **Go to Permissions tab** → **Bucket Policy** → **Edit**
2. **Add this policy** (replace `redtest-ai-website` with your bucket name):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::redtest-ai-website/*"
        }
    ]
}
```

3. **Save changes**

### 2.4 Upload Your Website Files

**Option A: Using AWS Console**
1. **Go to Objects tab** → **Upload**
2. **Drag and drop all files from your `dist` folder**
3. **Click Upload**

**Option B: Using AWS CLI (Recommended)**
```bash
# Install AWS CLI if not already installed
# Configure with your credentials: aws configure

# Sync your dist folder to S3
aws s3 sync dist/ s3://redtest-ai-website --delete
```

## Step 3: Set Up AWS Certificate Manager (SSL)

### 3.1 Request SSL Certificate

1. **Navigate to Certificate Manager** in AWS Console
2. **Ensure you're in `us-east-1` region** (required for CloudFront)
3. **Click "Request a certificate"**
4. **Choose "Request a public certificate"**
5. **Add domain names:**
   - `redtest.ai`
   - `www.redtest.ai`
6. **Choose DNS validation**
7. **Click "Request"**

### 3.2 Validate Domain Ownership

1. **Click on your certificate**
2. **For each domain, click "Create record in Route 53"** (if using Route 53)
3. **Or manually add CNAME records to your DNS provider**
4. **Wait for validation** (can take 5-30 minutes)

## Step 4: Set Up Amazon CloudFront (CDN)

### 4.1 Create CloudFront Distribution

1. **Navigate to CloudFront** → **Create Distribution**
2. **Configure Origin settings:**
   - **Origin domain**: Select your S3 bucket from dropdown
   - **Name**: Auto-filled
   - **Origin access**: Use OAC (Origin Access Control)
   - **Create new OAC** → Create

3. **Configure Default Cache Behavior:**
   - **Viewer protocol policy**: Redirect HTTP to HTTPS
   - **Cache policy**: CachingOptimized
   - **Origin request policy**: None
   - **Response headers policy**: None

4. **Configure Settings:**
   - **Price class**: Use all edge locations (or choose based on budget)
   - **Alternate domain names (CNAMEs)**: 
     - `redtest.ai`
     - `www.redtest.ai`
   - **Custom SSL certificate**: Select your ACM certificate
   - **Default root object**: `index.html`

5. **Configure Custom Error Pages:**
   - **Click "Create custom error response"**
   - **HTTP error code**: 403
   - **Error caching minimum TTL**: 300
   - **Customize error response**: Yes
   - **Response page path**: `/index.html`
   - **HTTP response code**: 200

   Repeat for error code 404.

6. **Create Distribution**

### 4.2 Update S3 Bucket Policy for OAC

1. **Copy the OAC policy** from CloudFront distribution settings
2. **Go back to S3** → Your bucket → **Permissions** → **Bucket policy**
3. **Replace the previous policy** with the OAC policy
4. **Save changes**

## Step 5: Configure DNS with Route 53

### 5.1 Create Hosted Zone (if not already done)

1. **Navigate to Route 53** → **Hosted zones**
2. **Create hosted zone** for your domain (`redtest.ai`)
3. **Note the Name Servers** → Update these with your domain registrar

### 5.2 Create DNS Records

1. **Create A record for root domain:**
   - **Record name**: Leave blank (for redtest.ai)
   - **Record type**: A
   - **Alias**: Yes
   - **Route traffic to**: CloudFront distribution
   - **Select your distribution**

2. **Create A record for www subdomain:**
   - **Record name**: www
   - **Record type**: A
   - **Alias**: Yes
   - **Route traffic to**: CloudFront distribution
   - **Select your distribution**

## Step 6: Configure Contact Form (Optional - for "Get in Touch" functionality)

### 6.1 Set Up AWS SES for Email

1. **Navigate to Amazon SES**
2. **Verify email addresses** you want to send from/to
3. **Request production access** if needed
4. **Note your SES region and credentials**

### 6.2 Create Lambda Function for Contact Form

```javascript
// This would be a separate Lambda function to handle form submissions
// You'll need to create an API Gateway endpoint and update your contact form
```

## Step 7: Testing and Verification

### 7.1 Test Your Website

1. **Visit your domain** (`https://redtest.ai`)
2. **Test SSL certificate** (should show secure/locked icon)
3. **Test www redirect** (`https://www.redtest.ai`)
4. **Test form submissions**
5. **Test on mobile devices**

### 7.2 Performance Testing

- Use Google PageSpeed Insights
- Test loading times from different locations
- Verify CloudFront is serving cached content

## Step 8: Monitoring and Maintenance

### 8.1 Set Up CloudWatch Monitoring

1. **Monitor CloudFront metrics**
2. **Set up alarms for errors**
3. **Monitor S3 access logs**

### 8.2 Regular Updates

```bash
# Update your website (run this whenever you make changes)
npm run build
aws s3 sync dist/ s3://redtest-ai-website --delete

# Invalidate CloudFront cache for immediate updates
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## Cost Estimation

**Monthly costs (approximate):**
- **S3 Storage**: $0.01-0.50 (depending on traffic)
- **CloudFront**: $0.85 minimum + data transfer costs
- **Route 53**: $0.50 per hosted zone
- **Certificate Manager**: Free
- **Total**: ~$1.50-5.00/month for small to medium traffic

## Security Best Practices

1. **Enable AWS CloudTrail** for audit logging
2. **Use IAM roles** with minimal permissions
3. **Enable MFA** on your AWS account
4. **Regular security reviews**
5. **Monitor access logs**

## Troubleshooting

### Common Issues:

1. **Certificate not appearing in CloudFront:**
   - Ensure certificate is in `us-east-1` region
   - Verify domain validation is complete

2. **404 errors on page refresh:**
   - Check CloudFront custom error pages configuration
   - Ensure error pages redirect to `index.html` with 200 status

3. **Changes not appearing:**
   - Clear CloudFront cache via invalidation
   - Check browser cache (hard refresh)

4. **SSL not working:**
   - Verify certificate is validated
   - Check CloudFront alternate domain names

## Support and Next Steps

Your RedTest.ai website is now hosted on AWS with:
- ✅ HTTPS encryption
- ✅ Global CDN (fast loading worldwide)
- ✅ Custom domain
- ✅ Automatic scaling
- ✅ 99.9% uptime SLA

For additional features like:
- Contact form backend
- Analytics integration
- A/B testing
- Advanced monitoring

Consider implementing additional AWS services or third-party integrations.