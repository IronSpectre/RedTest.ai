# 🚀 RedTest.ai Quick Start Guide

Your website is ready! Here's everything you need to get it running locally and deploy it to AWS.

## 🔧 Prerequisites

Make sure you have these installed:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **AWS CLI** (for deployment) - [Install guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

## 🏃‍♂️ Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:** Go to `http://localhost:5173`

Your website should now be running! You'll see:
- ✅ Landing page with all sections
- ✅ Registration form
- ✅ Interactive AI agent cards
- ✅ Smooth scrolling navigation

## 🌐 Deploy to AWS (Production)

### Option 1: Automated Setup (Recommended)

Run our automated setup script:
```bash
npm run setup-aws
```

This script will:
- Create S3 bucket for hosting
- Set up CloudFront CDN
- Request SSL certificate
- Configure Route 53 DNS
- Set up all security policies

**Important:** You'll need to:
1. Update your domain registrar with the provided name servers
2. Wait for SSL certificate validation (5-30 minutes)

### Option 2: Manual Setup

Follow the detailed guide in `deploy-aws.md` for step-by-step manual setup.

## 📤 Deploying Updates

After initial setup, deploy new changes with:
```bash
npm run deploy
```

This will:
- Build your website
- Upload to S3
- Invalidate CloudFront cache
- Make changes live in 1-5 minutes

## 🔍 Testing Your Deployment

Check if everything is working:
```bash
npm run check-deployment
```

This script tests:
- HTTPS certificate
- Domain accessibility
- Performance metrics

## 📁 Your Current File Structure

```
📦 redtest-ai-website/
├── 🔧 src/
│   ├── App.tsx          # Main website component
│   ├── main.tsx         # Application entry point
│   └── lib/utils.ts     # Utility functions
├── 🎨 components/       # UI components
│   ├── RegisterPage.tsx # Registration form
│   └── ui/             # Reusable UI components
├── 🎯 styles/
│   └── globals.css     # Global styles
├── 🚀 scripts/         # Deployment scripts
│   ├── aws-setup.sh    # Automated AWS setup
│   ├── deploy.sh       # Quick deployment
│   └── check-deployment.js
├── 📋 Configuration files
│   ├── package.json    # Dependencies & scripts
│   ├── vite.config.ts  # Build configuration
│   ├── tailwind.config.js
│   └── tsconfig.json
└── 📖 Documentation
    ├── README.md       # Detailed project info
    ├── deploy-aws.md   # Complete AWS guide
    └── QUICKSTART.md   # This file!
```

## 🎯 Available Commands

```bash
# Development
npm run dev              # Start local development server
npm run build           # Build for production
npm run preview         # Preview production build locally

# Deployment
npm run setup-aws       # Initial AWS infrastructure setup
npm run deploy          # Deploy changes to AWS
npm run check-deployment # Verify deployment is working

# Code Quality
npm run lint            # Check code quality
```

## 🔧 Customization

### Update Content
- Edit `src/App.tsx` for main content
- Edit `components/RegisterPage.tsx` for registration form
- Update contact email in the "Get in Touch" button

### Change Colors
- Update red color scheme in `tailwind.config.js`
- Modify CSS variables in `styles/globals.css`

### Add Features
- Add new components in `components/` folder
- Update navigation in `src/App.tsx`
- Add new sections following existing patterns

## ⚡ Performance Tips

- Images are automatically optimized
- Code is split for faster loading
- CDN caches content globally
- Gzip compression enabled

## 🎉 You're All Set!

Your RedTest.ai website is production-ready with:
- ✅ Modern React + TypeScript + Tailwind CSS
- ✅ Production-grade AWS hosting
- ✅ HTTPS encryption
- ✅ Global CDN
- ✅ Automated deployments
- ✅ Mobile responsive design

## 🆘 Need Help?

1. **Local development issues:** Check the terminal for error messages
2. **AWS deployment issues:** See `deploy-aws.md` for troubleshooting
3. **Build errors:** Run `npm run lint` to check for code issues

**Cost:** Hosting costs approximately $1.50-5.00/month for small to medium traffic.

---

🎯 **Next Steps:**
1. Run `npm run dev` to see your site locally
2. Customize content as needed
3. Run `npm run setup-aws` when ready to go live
4. Share your awesome new website! 🚀