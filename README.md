# Invook Marketing Website

The official marketing website for **Invook**, an AI workflow platform for recurring work across business apps.

- **Primary Domain**: [invook.ai](https://invook.ai)
- **Secondary Domain**: [thinkingsoundlab.com](https://thinkingsoundlab.com)

Built with Next.js 15 and TypeScript.

## Tech Stack

- **Framework**: Next.js 15.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Analytics**: Vercel Analytics and PostHog
- **Linting**: ESLint

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx tsc --noEmit` - Run type check

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── blog/              # Empty placeholder for future content
│   ├── changelog/         # Empty placeholder for future product notes
│   ├── pricing/           # Pricing page
│   ├── privacy-policy/    # Legal documentation
│   └── layout.tsx         # Root layout
├── components/            # Shared layout components
├── features/              # Feature-oriented marketing sections
├── lib/                   # App URL handoff helpers
└── public/                # Static assets
```

## Key Features

- **Marketing Homepage**: Premium hero composer with practical workflow prompt examples.
- **Pricing**: Free, Starter, and Pro plan details with FAQ content.
- **Content Placeholders**: Blog and Changelog pages ready for future publishing.
- **App Handoff**: Header, pricing, and composer CTAs route to the hosted app auth URL.
- **SEO Ready**: Sitemap, robots, and metadata for the marketing surface.

## Analytics

This project uses [Vercel Analytics](https://vercel.com/docs/analytics) to track page views and user interactions.

## Contact

For support or inquiries, email: [support@thinkingsoundlab.com](mailto:support@thinkingsoundlab.com)

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).
