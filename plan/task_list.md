# Portfolio Implementation Task List

This document tracks the tasks required to implement the portfolio website based on the approved implementation plan.

## 1. Project Configuration & Setup
- [x] Update `next.config.ts` to include `basePath: '/portfolio'` and `output: 'export'`.
- [x] Install required dependencies: `@react-pdf/renderer`, `framer-motion`, `mermaid`, `cmdk`, and necessary Radix UI primitives.
- [x] Create `.github/workflows/deploy.yml` for automated GitHub Pages deployment.
- [x] Move the existing System Topology page from `app/page.tsx` to `app/topology/page.tsx` so it can be integrated as a separate route.

## 2. Data Layer
- [x] Create `data/career.yml` and parse the content from `career.master.record.txt` into structured YAML objects (Roles, Experience, Skills, Case Studies).

## 3. Core UI Components (Shadcn)
- [x] Scaffold base UI components (Button, Card, Badge, Dialog, Tabs) in `components/ui/`.
- [x] Configure `components/CommandPalette.tsx` using `cmdk` to allow global navigation (`Cmd + K`).

## 4. Feature Components
- [x] Implement `Hero.tsx` with role switching logic (Manager | Architect | Master).
- [x] Implement `CaseStudies.tsx` with interactive modals and Mermaid.js architecture diagrams.
- [x] Implement `CareerTimeline.tsx` with expandable sections and domain tags.
- [x] Implement `SkillMatrix.tsx` grouped by technical domains.
- [x] Implement `ResumeGenerator.tsx` using `@react-pdf/renderer` to generate custom PDFs on the client-side based on the selected role.

## 5. Layout & Page Assembly
- [x] Update `app/layout.tsx` to include global providers, Command Palette, and a navigation header (linking to the Portfolio and the System Topology viewer).
- [x] Build the new `app/page.tsx` landing page combining all feature components and wiring up the role-switching context.

## 6. Verification
- [x] Run `npm run build` to verify SSG output.
- [x] Serve the static export locally (`npx serve out`) and verify all interactions (modals, role switching, PDF generation).
- [x] Document the successful verification in a Walkthrough Artifact.
