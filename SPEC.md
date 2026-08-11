# SPEC: Cloudflare Pages Deployment & Portfolio Enhancements

## Goal
Optimize Aryan Shukla's Systems & Software Engineer portfolio for deployment on Cloudflare Pages with maximum performance, edge caching, SEO indexing, and visual polish.

## Requirements
1. **Cloudflare SPA Routing & Headers**:
   - `public/_redirects`: `/* /index.html 200`
   - `public/_headers`: Security headers and max-age caching for static assets.
2. **Favicon & Visual Identity**:
   - Cyber/systems SVG icon as SVG favicon in `public/favicon.svg`.
3. **Bundle Chunking & Build Optimization**:
   - Split vendor chunks in `vite.config.ts` (`three`, `motion`, `lucide-react`, `animejs`).
   - Fix chunk size warning during production build.
4. **SEO & Structured Data**:
   - OpenGraph metadata (`og:title`, `og:description`, `og:image`, `og:type`, `og:url`).
   - Twitter Card metadata (`twitter:card`, `twitter:title`, `twitter:description`).
   - Structured JSON-LD `Person` schema with skills, role, and social profiles.
5. **UI & Quick Actions**:
   - Add Smooth Scroll-to-Top button alongside Resume floating quick action button in `src/App.tsx`.
