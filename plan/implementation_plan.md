## Goal Description
Build a production-grade, highly optimized, interactive portfolio website tailored for a Senior Engineering Manager & Lead Infrastructure Architect. The portfolio will be built with Next.js (App Router), styled with Tailwind CSS v4 and Shadcn UI components, and feature a high-contrast dark mode default. It will leverage Static Site Generation (SSG) for seamless deployment to GitHub Pages. Key features include role-based dynamic layouts (Senior Manager vs. Cloud Architect), interactive system architecture case studies, an expandable career timeline, grouped skill matrices, a command palette (`Cmd + K`), and a tailored resume generator/exporter. All content will be derived from the provided `career.master.record.txt`.

## User Review Required
> [!WARNING]
> **GitHub Pages Constraints:** Using Next.js App Router with `output: 'export'` means we cannot use dynamic server-side functions (like API routes or server-side rendering). All dynamic role-switching logic will be handled purely client-side or through static route parameters.
> 
> **Image Optimization:** Since GitHub Pages does not support Next.js's default image optimization, we will set `images: { unoptimized: true }` in `next.config.js`. 
>
> **Tailwind CSS v4:** We are targeting Tailwind v4. The setup will rely on standard v4 conventions, which might slightly differ from v3 configs.

## Open Questions
> [!IMPORTANT]
> 1. **Custom Domain vs. Repository Path:** Will this be deployed to a custom domain (e.g., `user.com`) or a GitHub repository path (e.g., `user.github.io/portfolio`)? If the latter, we need to set the `basePath` in `next.config.js`.
> 2. **Resume Export Format:** For the tailored resume generator, should it generate a clean printable HTML view that the user can print to PDF via the browser, or should it use a client-side library (like `html2pdf.js` or `@react-pdf/renderer`) to generate a PDF file directly?
> 3. **Architecture Diagrams:** Are Mermaid.js diagrams sufficient for the interactive case studies, or do you have custom SVGs you plan to provide? (I will plan to use Mermaid.js via a react-mermaid library by default).

## Proposed Changes

### Configuration & Setup
Updates to project configuration for GitHub Pages SSG and Tailwind v4 styling.

#### [MODIFY] next.config.ts
Update to enforce Static Site Generation.
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // basePath: '/portfolio', // Uncomment if deploying to a repo subpath
};

export default nextConfig;
```

#### [NEW] .github/workflows/deploy.yml
GitHub Actions workflow for building and deploying the static export to GitHub Pages.

### Data Layer
Static content extracted from the provided master record.

#### [NEW] data/career.yml
YAML data file containing structured content extracted from `career.master.record.txt`. This exports structured data for Experience (Roles, Companies, Tenures, Accomplishments), Skills (Grouped by domain), and flagship Case Studies.

### UI Components & Shadcn Integrations
Reusable presentation components.

#### [NEW] components/ui/*
Initialize Shadcn UI primitives including: `Button`, `Card`, `Badge`, `Dialog` (for Case Studies/Resume), `Tabs` (for Role Switcher), and `Command` (for Command Palette).

#### [NEW] components/CommandPalette.tsx
A global command menu triggered via `Cmd + K` for quick navigation to case studies, resume downloads, and specific sections.

### Feature Components
Core interactive sections of the portfolio.

#### [NEW] components/Hero.tsx
Hero section featuring the Value Proposition, dynamic CTA buttons, and the interactive Role Switcher (`Manager` | `Architect` | `Master`).

#### [NEW] components/CaseStudies.tsx
Interactive grid of flagship architecture accomplishments. Clicking a card will open a Modal/Dialog containing the Problem Statement, Solution, Metrics Badges, and a Mermaid.js flowchart.

#### [NEW] components/CareerTimeline.tsx
Expandable, scannable timeline detailing the work history from adMarketplace down to Canon USA, with filter tags for domain areas.

#### [NEW] components/SkillMatrix.tsx
Contextual skill cards organized by groups (Cloud & K8s, GitOps & CI/CD, Data/ML/Search, etc.).

#### [NEW] components/ResumeGenerator.tsx
A drawer/modal interface to preview and download customized resumes based on the selected persona.

### Application Routing & Layouts
Page structure utilizing App Router.

#### [MODIFY] app/layout.tsx
Global layout wrapping the application in a high-contrast dark theme. Incorporates the Command Palette provider and global navigation headers/footers.

#### [MODIFY] app/page.tsx
Main entry point assembling the `Hero`, `CaseStudies`, `CareerTimeline`, and `SkillMatrix` components. We will use client-side state (React Context or Zustand) to manage the currently selected "Role Persona" which will dynamically filter and highlight content in the child components.

## Verification Plan

### Automated Tests
1. **Build Verification:** Run `npm run build` to ensure the project successfully compiles to a static export without any server-side runtime errors.
2. **Linting & Type Checking:** Run `npm run lint` and `npx tsc --noEmit` to verify code quality and TypeScript strictness.

### Manual Verification
1. **Local SSG Testing:** Serve the generated static files locally using `npx serve out` to simulate the GitHub Pages environment.
2. **Role Switching:** Toggle between `Manager`, `Architect`, and `Master` roles in the Hero section and verify that the visible content (Value Props, highlighted skills, case studies) updates accordingly.
3. **Command Palette:** Press `Cmd + K` and ensure the quick navigation dialog opens and correctly filters results.
4. **Responsive Design & Dark Mode:** Verify UI components across mobile and desktop viewports, ensuring the high-contrast dark mode meets accessibility standards.
5. **Interactive Elements:** Test the expansion of the Career Timeline, Case Study modals (including Mermaid diagrams), and the Resume Generator preview functionality.
