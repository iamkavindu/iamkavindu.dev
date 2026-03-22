
# iamkavindu.dev

[![Netlify Status](https://api.netlify.com/api/v1/badges/f739986f-03be-4747-adfd-5a25c40b60c1/deploy-status)](https://app.netlify.com/projects/iamkavindu/deploys)

A statically generated portfolio and blog site built with **Next.js 16** (App Router), **TypeScript**, and **Tailwind CSS v4**. Deployed on Netlify.

This README documents the technical architecture of the project. It is intended as a reference for anyone looking to build a similar portfolio site.

## Architecture Overview

Every page is **statically generated at build time** (SSG) via the Next.js App Router. There is no server-side runtime — the output is a set of static HTML files served directly from Netlify's CDN.

```
Routes (all static)
├── /                   → Home page (landing, about, blog listing, contact)
└── /blog/[slug]/       → One page per blog post (generated via generateStaticParams)
```

Trailing slashes are enforced (`trailingSlash: true` in `next.config.ts`).

### Home Page Sections

The home page (`app/page.tsx`) assembles four sections from separate content sources:

| Section | Source | Component |
|---|---|---|
| Landing | Inline JSX + `getSocialLinks()` | Social icon links, profile picture |
| About | `content/about-me.md` | `<MarkdownSection />` |
| Blogs | `getAllBlogPosts()` listing | `<BlogCard />` per post |
| Contact | `content/get-in-touch.md` | `<MarkdownSection />` |

## Project Structure

```
app/
  layout.tsx            # Root layout: metadata, fonts, CSP meta tags, analytics script
  page.tsx              # Home page (assembles landing, about, blogs, contact sections)
  providers.tsx         # Client-side providers: HeroUI + next-themes
  globals.css           # Tailwind v4 imports, custom colour tokens, dark mode variant
  blog/[slug]/
    page.tsx            # Dynamic blog post route (SSG via generateStaticParams)

components/
  Header.tsx            # Sticky nav bar with responsive menu and theme toggle
  MarkdownRenderer.tsx  # react-markdown pipeline: GFM, syntax highlighting, Mermaid
  MarkdownSection.tsx   # Thin "use client" wrapper around MarkdownRenderer
  MermaidBlock.tsx      # Client-side Mermaid diagram renderer (re-renders on theme change)
  BlogCard.tsx          # Blog post summary card (title, date, description)
  ProfilePicture.tsx    # Next.js Image with custom WebP loader, blur placeholder, fallback SVG
  ScrollToTop.tsx       # Floating button (appears after 300px scroll)
  ThemeToggle.tsx       # Dark / light mode switch (HeroUI Switch + next-themes)
  icons/                # Inline SVG components: GitHubIcon, LinkedInIcon, MediumIcon

lib/
  content.ts            # File-system markdown loader (gray-matter) with draft filtering
  getSocialLinks.ts     # Parses social URLs from markdown; validates against a domain allowlist
  imageLoader.ts        # Custom Next.js image loader — maps src + width to pre-generated WebP path
  utils.ts              # cn() — className merge helper (clsx + tailwind-merge)

content/
  about-me.md           # About section (markdown)
  get-in-touch.md       # Contact section (markdown)
  blogs/                # Blog posts — one .md file per post

public/
  data/social-links.md  # Social link URLs (read at build time by getSocialLinks.ts)
  manifest.json         # PWA web app manifest
  robots.txt            # Crawler directives pointing to sitemap
  sitemap.xml           # Static sitemap (homepage only — does not yet include blog posts)

scripts/
  convert-images.mjs    # Generates WebP variants of profile picture via sharp

hero.js                 # HeroUI Tailwind plugin — defines light/dark primary colour overrides
```

## Content Pipeline

All site content is stored as markdown files and loaded from the file system at build time. There is no CMS or external API dependency.

### Blog Posts

Each file in `content/blogs/` uses YAML frontmatter:

```yaml
---
title: string
date: string         # ISO 8601 — used for sorting (newest first)
description: string
slug: string         # URL path segment → /blog/{slug}/
draft: boolean       # true = excluded from listings and static generation
---
```

Build-time flow:

1. `getAllBlogPosts()` in `lib/content.ts` scans `content/blogs/*.md`, parses frontmatter with `gray-matter`, filters out drafts, and sorts by date descending.
2. `generateStaticParams()` in `app/blog/[slug]/page.tsx` maps each published post to a static route.
3. `generateMetadata()` in the same file produces per-post OpenGraph and Twitter card metadata.
4. An invalid slug triggers `notFound()` → 404.

### Adding a New Blog Post

Create a `.md` file in `content/blogs/` with the frontmatter fields above. Set `draft: false` (or omit it) when ready to publish. The post will appear on the next build.

### Static Content Sections

`content/about-me.md` and `content/get-in-touch.md` are loaded by `getAboutMe()` and `getGetInTouch()` respectively, then rendered via `<MarkdownSection />` on the home page.

### Social Links

`public/data/social-links.md` contains social URLs in markdown list format. `lib/getSocialLinks.ts` parses this file at build time and validates each URL against a domain allowlist (`linkedin.com`, `github.com`, `medium.com`). Invalid or disallowed URLs are replaced with `#`.

## Markdown Rendering

All markdown content (blog posts and static sections) is rendered through a single pipeline in `components/MarkdownRenderer.tsx`:

```
Markdown source
  → react-markdown (parsing)
  → remark-gfm (tables, strikethrough, task lists)
  → rehype-highlight (code block syntax colouring via highlight.js)
  → custom component overrides (styled headings, links, blockquotes, tables)
  → Mermaid detection (```mermaid blocks → <MermaidBlock />)
```

`MermaidBlock` is a `"use client"` component that:
- Dynamically imports the `mermaid` library.
- Renders the chart definition to SVG.
- Listens to theme changes via `useTheme()` and re-renders with the matching Mermaid theme (`dark` or `default`).
- Shows a loading spinner while rendering and a styled error fallback on failure.

The syntax highlighting theme is `github-dark`, imported in `app/layout.tsx`.

## Image Optimisation

Instead of relying on Next.js remote image optimisation (which requires a server runtime), the project uses **pre-generated WebP variants** served as static files from the CDN.

**`scripts/convert-images.mjs`** generates variants from `public/profilepicture.png`:

```
profilepicture-{256,384,512,640,768,1024,1280}w-q85.webp
```

**`lib/imageLoader.ts`** is a custom Next.js image loader that maps `<Image>` requests to these pre-generated files:

```
Input:  src="/profilepicture.png", width=512, quality=85
Output: /profilepicture-512w-q85.webp
```

External URLs pass through unchanged.

## Theming

The app supports dark and light modes with **dark as the default**.

| Layer | Mechanism |
|---|---|
| Theme state | `next-themes` — stores preference in `localStorage`, sets a `class` attribute on `<html>` |
| Provider | `app/providers.tsx` wraps the app in `<HeroUIProvider>` + `<NextThemesProvider attribute="class" defaultTheme="dark">` |
| Component library | HeroUI components respond to the `.dark` class automatically |
| Colour tokens | `globals.css` defines a neon-green accent palette using CSS `oklch()` colour space |
| Plugin | `hero.js` (a HeroUI Tailwind plugin) overrides the primary colour for both light and dark themes |
| Diagrams | `<MermaidBlock />` re-renders on theme change to keep diagram colours in sync |
| Toggle | `<ThemeToggle />` uses `useTheme()` from `next-themes` bound to a HeroUI Switch |

### Custom Colour Tokens (globals.css)

```css
--color-primary: var(--color-neon-green-500);  /* oklch(0.65 0.18 150) */
--font-sans: var(--font-geist-sans);
--font-mono: var(--font-geist-mono);
```

Dark mode variant is defined with `@custom-variant dark (&:is(.dark *));` (Tailwind v4 syntax).

## Security

Security headers are set as `<meta httpEquiv>` tags in `app/layout.tsx` `<head>`:

| Header | Value |
|---|---|
| Content-Security-Policy | `default-src 'self'`; allows `img-src data: https:`, scripts from `cloud.umami.is`, styles from `fonts.googleapis.com`, fonts from `fonts.gstatic.com` |
| X-Content-Type-Options | `nosniff` |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` |
| Referrer-Policy | `strict-origin-when-cross-origin` |

Additionally, `poweredByHeader: false` in `next.config.ts` removes the `X-Powered-By` response header.

Social link URLs are validated and sanitised against a domain allowlist in `lib/getSocialLinks.ts`.

## SEO & Analytics

**Metadata** is declared using the Next.js Metadata API in `app/layout.tsx`:

- `metadataBase` set to `https://iamkavindu.dev`
- OpenGraph tags (type, title, description, image)
- Twitter card tags (`summary_large_image`)
- `robots: { index: true, follow: true }` with `googleBot` directives
- Canonical URL via `alternates.canonical`
- Per-blog-post metadata generated dynamically in `app/blog/[slug]/page.tsx` via `generateMetadata()`

**Analytics:** Umami (privacy-respecting, cookie-free) loaded via `next/script` with `strategy="afterInteractive"`. The website ID is supplied through the `NEXT_PUBLIC_UMAMI_WEBSITE_ID` environment variable.

**PWA:** A basic `manifest.json` is provided with app name, icons, and standalone display mode.

## Key Dependencies

| Package | Version | Purpose |
|---|---|---|
| next | ^16.1.6 | Framework (App Router, SSG) |
| react / react-dom | ^19.2.4 | UI runtime |
| @heroui/react | ^2.8.8 | Component library (navbar, switch, divider, etc.) |
| next-themes | ^0.4.6 | Dark / light mode management |
| framer-motion | ^12.34.0 | Animation library (HeroUI peer dependency) |
| gray-matter | ^4.0.3 | YAML frontmatter parsing |
| react-markdown | ^10.1.0 | Markdown → React rendering |
| remark-gfm | ^4.0.1 | GitHub Flavored Markdown support |
| rehype-highlight | ^7.0.2 | Syntax highlighting plugin |
| highlight.js | ^11.11.1 | Syntax highlighting engine |
| mermaid | ^10.9.5 | Diagram rendering |
| sharp | ^0.34.5 | Image conversion to WebP (build-time script) |
| lucide-react | ^0.563.0 | Icon set (ArrowLeft, Sun, Moon, etc.) |
| clsx | ^2.1.1 | Conditional className composition |
| tailwind-merge | ^3.4.0 | Intelligent Tailwind class deduplication |

**Dev dependencies:** tailwindcss ^4, @tailwindcss/postcss ^4, typescript ^5, eslint ^9, eslint-config-next ^16.1.6, @eslint/eslintrc ^3, @types/node, @types/react, @types/react-dom.

## Local Development

```bash
npm install            # Install dependencies
npm run dev            # Start dev server at http://localhost:3000
npm run build          # Production build (runs typecheck automatically as prebuild)
npm run start          # Serve the production build locally
npm run typecheck      # TypeScript validation only (tsc --noEmit)
npm run lint           # ESLint check
```

Both `dev` and `build` scripts pass `--webpack` to use the Webpack bundler explicitly (as opposed to Turbopack).

ESLint uses flat config (`eslint.config.mjs`) with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript` rulesets. Build outputs (`.next/`, `out/`, `build/`) are ignored.

## License

All rights reserved. This source code is the property of Kavindu Perera.
