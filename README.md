# yoonho.dev

A unified technical workspace for a Frontend Portfolio and Proof-of-Concepts.

## Problem
In many developer portfolios, projects are scattered or lack technical context. This repository serves as a centralized hub to consolidate diverse projects, ranging from large-scale enterprise patterns to small-scale demos, providing a single point of entry for technical evaluation.

## Role
**Frontend Architect & Lead Developer**
- Designed the repository structure to manage multiple projects (monorepo pattern).
- Implemented the primary portfolio application using cutting-edge technologies.
- Curated and maintained legacy and demo projects for technical breadth.

## Tech
- **Core Frameworks**: Next.js 16.2.1 (App Router), Vue 2.6.14.
- **Languages**: TypeScript, JavaScript.
- **Testing**: Playwright (E2E), Vitest (Unit), Lighthouse (Performance).
- **Styling**: Tailwind CSS v4 (@tailwindcss/postcss).
- **Package Management**: pnpm (next-app), yarn (vue2-demo).

## Run
Each project is self-contained. For the primary portfolio:
```bash
cd next-app
pnpm install
pnpm dev
```
For the legacy Vue 2 demo:
```bash
cd vue2-demo
yarn install
yarn serve
```

## Result
A cohesive portfolio that demonstrates technical proficiency in modern frameworks (Next.js 16), legacy support (Vue 2), and operational rigor (automated testing, performance monitoring).
