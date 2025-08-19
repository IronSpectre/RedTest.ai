# RedTest.ai - AI Health Platform

## Deployment Note

If you see `sh: 1: tsc: Permission denied` during Docker builds, ensure your image does not copy local `node_modules` into `/app`. Add a `.dockerignore` at repository root to exclude them:

```
node_modules
.git
dist
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
.DS_Store
**/*.log
```

Then rebuild/deploy.

A modern landing page and registration system for RedTest.ai, built with React, TypeScript, and Tailwind CSS.

## Features

- **Modern Landing Page**: Clean, professional design with full-screen sections
- **Registration System**: Streamlined waitlist registration with custom profession input
- **AI Agent Showcase**: Interactive cards showcasing different AI agents
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Fast Performance**: Built with Vite for optimal loading speeds

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

To build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Deployment Options

### 1. Static Hosting (Recommended)

Since this is a static React application, you can deploy it to any static hosting service:

- **Vercel**: Connect your repository and deploy automatically
- **Netlify**: Drag and drop the `dist` folder or connect your repository
- **GitHub Pages**: Enable GitHub Pages in your repository settings
- **AWS S3 + CloudFront**: Upload to S3 and configure CloudFront for CDN

### 2. Traditional Web Hosting

1. Build the project: `npm run build`
2. Upload the contents of the `dist` folder to your web server
3. Configure your web server to serve the `index.html` file for all routes

### 3. Custom Domain Setup

1. Point your domain's DNS to your hosting provider
2. Configure SSL/TLS certificates (most hosting providers offer this automatically)
3. Set up any necessary redirects (www to non-www, etc.)

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (buttons, cards, etc.)
│   ├── RegisterPage.tsx # Registration form component
│   └── figma/           # Figma-specific components
├── lib/
│   └── utils.ts         # Utility functions
├── styles/
│   └── globals.css      # Global styles and CSS variables
├── App.tsx              # Main application component
└── main.tsx            # Application entry point
```

## Customization

### Colors

The site uses a red color scheme that can be customized in:
- `tailwind.config.js` for Tailwind utilities
- `src/styles/globals.css` for CSS custom properties

### Content

Update the content in `src/App.tsx`:
- AI agent descriptions
- Section text
- Contact information

### Styling

The site uses Tailwind CSS for styling. You can:
- Modify existing styles in components
- Add new utility classes
- Customize the design system in `tailwind.config.js`

## Performance Optimization

The build is optimized with:
- Code splitting for vendor libraries
- Minification and compression
- Source maps for debugging
- Optimized asset loading

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary to RedTest.ai.

## Support

For technical support or questions, contact the development team."# RedTest.ai" 
"# RedTest.ai" 
"# RedTest.ai" 
