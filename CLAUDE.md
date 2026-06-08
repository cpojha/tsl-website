# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Lint code**: `npm run lint`

## Project Architecture

This is a focused Next.js 15 marketing website for Invook, built with the App Router, React, TypeScript, and Tailwind CSS.

### Key Structure

- `/app/` - Thin route files, metadata, root layout, robots, and sitemap.
- `/features/marketing/` - Homepage hero and prompt-led marketing experience.
- `/features/pricing/` - Pricing page UI and pricing/FAQ content.
- `/features/legal/` - Privacy policy content.
- `/features/placeholder/` - Empty Blog and Changelog placeholder pages.
- `/components/layout/` - Shared navigation, footer, and site shell.
- `/lib/app-url.ts` - Environment-aware handoff URLs for the hosted app.

## Development Guidelines

- Keep route files thin and delegate UI/content to feature folders.
- Keep marketing pages visually consistent with the current minimal Invook system.
- Use app handoff helpers from `lib/app-url.ts` for auth or app redirects.
- Do not add non-marketing app surfaces to this repo.
- Prefer small, typed React components with explicit props and straightforward data structures.
