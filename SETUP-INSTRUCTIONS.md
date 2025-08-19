# 🚀 Complete Setup Instructions for RedTest.ai

## Step 1: Test Locally First 

Before deploying to AWS, let's make sure everything works locally:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Visit `http://localhost:5173` to see your website. You should see:
- ✅ Full landing page with red theme
- ✅ Registration form (click "Register Your Interest")
- ✅ Interactive AI agent cards
- ✅ Smooth navigation

## Step 2: Configure Your Domain

Before running the AWS setup, you need to update the domain configuration:

1. **Edit the AWS setup script**:
   ```bash
   # Open the script file
   nano scripts/aws-setup.sh
   # OR use any text editor
   ```

2. **Change line 11** from:
   ```bash
   DOMAIN_NAME="redtest.ai"
   ```
   To your actual domain:
   ```bash
   DOMAIN_NAME="yourdomain.com"
   ```

3. **Change line 12** from:
   ```bash
   BUCKET_NAME="redtest-ai-website"
   ```
   To a unique bucket name:
   ```bash
   BUCKET_NAME="yourdomain-website"
   ```

## Step 3: Prerequisites for AWS

1. **Install AWS CLI** (if not already installed):
   - **Windows**: Download from [AWS CLI installer](https://awscli.amazonaws.com/AWSCLIV2.msi)
   - **macOS**: `brew install awscli` or download installer
   - **Linux**: `sudo apt install awscli` or `sudo yum install awscli`

2. **Configure AWS CLI**:
   ```bash
   aws configure
   ```
   You'll need:
   - AWS Access Key ID
   - AWS Secret Access Key  
   - Default region: `us-east-1` (recommended)
   - Default output format: `json`

3. **Test AWS connection**:
   ```bash
   aws sts get-caller-identity
   ```
   This should show your AWS account details.

## Step 4: Run AWS Setup

Now you can run the automated setup:

```bash
npm run setup-aws
```

**What this script does:**
1. ✅ Creates S3 bucket for hosting
2. ✅ Configures static website hosting
3. ✅ Requests SSL certificate
4. ⏸️ **PAUSES** for you to validate the certificate
5. ✅ Creates CloudFront distribution
6. ✅ Sets up Route 53 DNS
7. ✅ Configures all security policies

## Step 5: Certificate Validation

When the script pauses, you need to validate your SSL certificate:

1. **Go to AWS Console** → **Certificate Manager** (ACM)
2. **Find your certificate** (should be "Pending validation")
3. **Click on the certificate**
4. **For each domain**, click "Create record in Route 53" 
   - If you're using Route 53 (recommended)
   - OR manually add the CNAME records to your DNS provider
5. **Wait for validation** (5-30 minutes)
6. **Press Enter** in the terminal to continue

## Step 6: Update Domain Registrar

After the script completes, you'll see Route 53 name servers. Update your domain registrar:

1. **Copy the 4 name servers** from the script output
2. **Go to your domain registrar** (GoDaddy, Namecheap, etc.)
3. **Update DNS settings** to use the Route 53 name servers
4. **Wait for propagation** (up to 48 hours, usually 2-4 hours)

## Step 7: Deploy Your Website

```bash
npm run deploy
```

This will:
- Build your React app
- Upload to S3
- Invalidate CloudFront cache
- Make your site live!

## Step 8: Verify Everything Works

```bash
npm run check-deployment
```

This checks:
- HTTPS certificate
- Domain accessibility  
- Performance metrics

## Alternative: Manual Step-by-Step

If you prefer manual setup or the script fails, see `deploy-aws.md` for detailed manual instructions.

## Common Issues & Solutions

### Issue: "aws: command not found"
**Solution**: Install AWS CLI from [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

### Issue: "Unable to locate credentials"
**Solution**: Run `aws configure` with your AWS credentials

### Issue: "Bucket name already exists"
**Solution**: Change BUCKET_NAME in the script to something unique

### Issue: "Certificate validation failed"
**Solution**: Make sure you have access to your domain's DNS settings

### Issue: "jq: command not found"
**Solution**: Install jq:
- **macOS**: `brew install jq`
- **Linux**: `sudo apt install jq`
- **Windows**: Download from [jq website](https://stedolan.github.io/jq/)

## What You Get

After successful setup:
- ✅ **Professional hosting** on AWS
- ✅ **HTTPS encryption** with free SSL
- ✅ **Global CDN** (fast loading worldwide)
- ✅ **Custom domain** (yourdomain.com)
- ✅ **99.9% uptime** SLA
- ✅ **Automatic scaling**
- ✅ **$1.50-5/month** hosting costs

## Next Steps After Deployment

1. **Test your live site**: Visit `https://yourdomain.com`
2. **Test the registration form**
3. **Share with friends/colleagues**
4. **Make updates**: Just run `npm run deploy` after changes

## Need Help?

1. **Local development issues**: Check browser console for errors
2. **AWS issues**: See the detailed troubleshooting in `deploy-aws.md`
3. **Domain issues**: Contact your domain registrar support

**Your RedTest.ai website will be production-ready and looking amazing!** 🚀