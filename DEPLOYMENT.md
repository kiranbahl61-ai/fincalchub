# FinCalcHub - Deployment Guide

This guide provides step-by-step instructions to deploy FinCalcHub to various hosting platforms.

## Project Overview

**FinCalcHub** is a React + TypeScript + Vite application with:
- Frontend: React with Tailwind CSS
- Build Tool: Vite (optimized for production)
- Routing: React Router v6
- Icons: React Icons
- Charts: Recharts

## Prerequisites

- Node.js 16+ (with npm)
- Git (for version control)
- GitHub account (optional but recommended)

## Pre-Deployment Checklist

- [x] Project builds successfully: `npm run build`
- [x] All pages are functional and responsive
- [x] Meta tags and SEO are configured
- [x] Dark mode and theme switching works
- [x] All calculators and tools are functional
- [x] No console errors during development

## Build & Output

```bash
# Production build
npm run build

# Output location: ./dist/
# Main files:
# - dist/index.html (entry point)
# - dist/assets/index-*.css (styles)
# - dist/assets/index-*.js (main application)
```

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Pros:** Free tier, automatic deployments, fast performance, great for SPA

1. Create account at https://vercel.com
2. Import your GitHub repository (or skip if no GitHub)
3. Configure project:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click "Deploy"

**After Deployment:**
- Your site will be live at: `https://your-project.vercel.app`
- Custom domain: Add in Vercel dashboard → Settings → Domains

**Environment Variables:** (if needed)
- No environment variables required for frontend-only deployment

### Option 2: Netlify

**Pros:** Free tier, great UI, good performance

1. Go to https://netlify.com
2. Click "New site from Git" or connect a Git repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy

**After Deployment:**
- Site URL: `https://your-site.netlify.app`
- Custom domain: Netlify → Settings → Domain management

### Option 3: GitHub Pages

**Pros:** Free, integrated with GitHub, simple

1. Set `base` in `vite.config.ts` if deploying to subdirectory:
   ```typescript
   export default defineConfig({
     base: '/FinCalcHub/', // if repo name is 'FinCalcHub'
   })
   ```

2. Create workflow file `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [main]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

3. In GitHub → Settings → Pages:
   - Source: gh-pages
   - Branch: gh-pages
   - Folder: / (root)

**Site URL:** `https://yourusername.github.io/FinCalcHub`

### Option 4: AWS S3 + CloudFront

**Pros:** Scalable, professional, global CDN

1. Create S3 bucket for static hosting
2. Upload `dist/` contents to S3
3. Configure CloudFront for CDN and HTTPS
4. Point domain to CloudFront distribution

[Detailed AWS guide available on request]

### Option 5: Google Firebase Hosting

**Pros:** Free tier, fast, integrated with Google ecosystem

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize Firebase
firebase login
firebase init hosting

# Deploy
npm run build
firebase deploy
```

## Domain Configuration

### For Custom Domain (All Platforms):

1. **Register domain** at GoDaddy, Namecheap, or Google Domains
2. **Add custom domain** in your hosting platform's dashboard
3. **Update DNS records** (platform-specific):
   - Usually: Add CNAME record pointing to your deployment
   - Vercel: Automatically configures DNS
   - Netlify: Provides specific DNS records to add

Example DNS record:
```
Type: CNAME
Name: www
Value: your-deployment.vercel.app
```

## Environment Variables

**Current State:** No environment variables needed for frontend-only deployment.

If adding backend/API in future:
1. Create `.env.example` with template variables
2. Create `.env.local` (git-ignored) with actual values
3. Build process will inject at compile time

## Performance Optimization

Current optimizations in place:
- ✅ Code splitting (React vendor, Icons, Charts separated)
- ✅ CSS minification
- ✅ JavaScript minification & compression
- ✅ Assets optimized (SVGs, images compressed)
- ✅ Responsive design for all devices

## SEO Checklist

- ✅ Meta tags configured in HTML head
- ✅ Open Graph tags for social sharing
- ✅ Seo.tsx component integrated
- ✅ Keywords and descriptions set per page
- ✅ Mobile-responsive design
- ✅ Fast loading times

### Additional SEO Tasks:

1. **Google Search Console:**
   - Add your site at https://search.google.com/search-console
   - Submit sitemap: `https://your-domain.com/sitemap.xml`
   - Monitor indexing status

2. **Robots.txt:** (Create if needed)
   ```txt
   User-agent: *
   Allow: /
   Sitemap: https://your-domain.com/sitemap.xml
   ```

3. **Sitemap:** (Already present at `/public/sitemap.xml`)

## Monitoring & Maintenance

### Post-Deployment:

1. **Test all pages:** Visit every route and test calculators
2. **Test mobile:** Use browser DevTools responsive design
3. **Performance:** Check Google PageSpeed Insights
4. **Monitor errors:** Enable error tracking (optional: Sentry, LogRocket)

### Regular Maintenance:

- Update npm packages monthly: `npm update`
- Monitor for security vulnerabilities: `npm audit`
- Update content as tax rules change
- Track analytics: Add Google Analytics if desired

## Troubleshooting

### Blank page after deploy
- Check browser console for errors (F12)
- Verify all assets loaded (Network tab)
- Ensure `base` path is correct in vite.config.ts

### Routes not working (404 errors)
- Add redirect rule to serve `index.html` for all routes
- **Vercel:** Automatic
- **Netlify:** Add `netlify.toml`:
  ```toml
  [[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  ```
- **GitHub Pages:** Not supported (avoid subpaths)

### CSS/Images not loading
- Check Network tab in DevTools
- Verify file paths are relative (not absolute)
- Ensure `base` path matches deployment URL

## Next Steps

1. **Choose a platform** from the options above
2. **Follow deployment steps** for that platform
3. **Test thoroughly** after deployment
4. **Set up monitoring** for errors and analytics
5. **Plan CI/CD pipeline** for future updates

## Support

For deployment issues:
- Check platform-specific documentation
- Review browser console for errors
- Test locally with `npm run build && npm run preview`
- Verify all files in `dist/` folder are present

---

**Last Updated:** June 2026
**Status:** Ready for Production Deployment
