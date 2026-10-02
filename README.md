# Platform Engineer Portfolio — Interactive Resume

An interactive, persona-driven portfolio site for a Senior Engineering Manager / Lead Infrastructure Architect. Built with the Next.js App Router, TypeScript, and Tailwind CSS v4, it presents a career timeline, architecture case studies with rendered diagrams, a dynamic skill matrix, and a keyboard-driven command palette.

## ✨ Features

- **Persona Switcher** — Toggle between `Manager`, `Architect`, and `Master` perspectives. The hero value proposition, career timeline filtering, and emphasis adapt to the selected persona.
- **Command Palette** — A `cmdk`-powered palette (opened with `⌘K` / `Ctrl+K`) for quick navigation between pages and triggering actions like opening the resume modal.
- **Career Timeline** — Animated, expandable timeline of roles with achievements, tech stacks, and persona-aware filtering.
- **Architecture Case Studies** — Card grid of case studies that open into a dialog with problem/solution context, outcome metrics, and a **Mermaid**-rendered architecture diagram.
- **Skill Matrix** — Categorised competencies across Cloud & K8s, GitOps & CI/CD, Data/ML/Search, DevSecOps & Observability, and Hardware & Networking.
- **Tailored Resume Generator** — A modal that generates a downloadable, persona-specific PDF resume using `@react-pdf/renderer`. It can also be opened via the `open-resume-modal` window event (dispatched by the command palette).
- **System Topology Viewer** — A data-driven view of domains and subsystems (see `types/topology.ts` and `lib/topology.ts`).
- **Dark, high-contrast UI** — Tailwind v4 with a Geist font pairing and a dark-first theme.

## 🛠 Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Diagrams | [Mermaid](https://mermaid.js.org) |
| PDF generation | [@react-pdf/renderer](https://react-pdf.org) |
| Command palette | [cmdk](https://cmdk.paco.me) |
| Icons | [react-icons](https://react-icons.github.io/react-icons/) (`si` set) |
| Content | [js-yaml](https://github.com/nodeca/js-yaml) (YAML data files) |
| Fonts | [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with Geist & Geist Mono |
| Utilities | [clsx](https://www.npmjs.com/package/clsx) + [tailwind-merge](https://www.npmjs.com/package/tailwind-merge) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

```bash
git clone https://github.com/your-username/your-portfolio.git
cd your-portfolio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads as you edit files.

### Production build

```bash
npm run build
npm run start
```

### Static export (for GitHub Pages)

This project is configured for static export (`output: 'export'` in `next.config.ts`). Running `npm run build` produces an `out/` directory that can be deployed to any static host.

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
.
├── app/
│   ├── globals.css          # Tailwind v4 import + theme tokens
│   ├── layout.tsx           # Root layout, fonts, metadata
│   ├── page.tsx             # Home page (loads career data)
│   └── topology/
│       └── page.tsx         # System topology viewer page
├── components/
│   ├── CareerTimeline.tsx   # Animated, filterable career timeline
│   ├── CaseStudies.tsx      # Case study cards + Mermaid dialog
│   ├── CommandPalette.tsx   # cmdk-based command palette
│   ├── Hero.tsx             # Persona switcher + value proposition
│   ├── HomeClient.tsx       # Client shell for the home page
│   ├── InspectorDrawer.tsx  # Subsystem detail drawer
│   ├── LogoIcon.tsx         # Brand icon mapping (react-icons/si)
│   ├── ResumeGenerator.tsx  # Persona-specific PDF resume modal
│   ├── SkillMatrix.tsx      # Categorised skill grid
│   ├── SubsystemCard.tsx    # Topology subsystem card
│   ├── TopologyViewer.tsx   # Topology visualisation
│   └── ui/                  # shadcn/ui primitives (badge, button, dialog, …)
├── data/
│   ├── career.yml           # Career, skills, and case study content
│   └── system-topology.yaml # Domains & subsystems topology
├── .github/
│   └── workflows/
│       └── deploy.yaml      # GitHub Actions deploy to GitHub Pages
├── lib/
│   ├── data.ts              # Loads & types career.yml
│   ├── topology.ts          # Loads system-topology.yaml
│   └── utils.ts             # `cn` class-merge helper
├── types/
│   └── topology.ts          # Topology type definitions
└── README.md
```

## ✏️ Customisation

### Content

Most content is data-driven and lives in YAML:

- **`data/career.yml`** — name, label, status, persona value propositions, skills, case studies, and experience. The shape is typed by `CareerData` in `lib/data.ts`.
- **`data/system-topology.yaml`** — domains and subsystems rendered by the topology viewer. The shape is typed by `TopologyData` in `types/topology.ts`.

Edit these files to update the site without touching component code.

### Personas

The three personas (`manager`, `architect`, `master`) are defined in:

- `components/Hero.tsx` — labels and titles per persona.
- `data/career.yml` — the `basics.value_props` copy per persona.
- `components/CareerTimeline.tsx` — persona-aware role filtering.
- `components/ResumeGenerator.tsx` — the persona passed to the generated PDF.

### Styling

- Global theme tokens live in `app/globals.css` using Tailwind v4's `@theme inline` directive.
- Component-level styling uses Tailwind utility classes directly.

### Fonts

Geist and Geist Mono are configured in `app/layout.tsx` via `next/font/google`. Swap them for any other font there.

## 📦 Deployment

This project is automatically deployed to **GitHub Pages** using **GitHub Actions**.

### How it works

- The workflow is defined in `.github/workflows/deploy.yaml`.
- On every push to the `main` branch, GitHub Actions:
  1. Checks out the repository.
  2. Sets up Node.js 20 with npm caching.
  3. Installs dependencies with `npm ci`.
  4. Builds the static site with `npm run build` – the project is configured for static export, so this generates an `out/` directory.
  5. Uploads the `./out` directory as a Pages artifact.
  6. Deploys the artifact to GitHub Pages.

### Enabling GitHub Pages

1. Push this repository to GitHub.
2. Go to the repository **Settings** → **Pages**.
3. Under **Source**, select **GitHub Actions** (not “Deploy from a branch”).
4. The next time you push to `main`, the workflow will run and deploy the site.

The URL will be `https://<username>.github.io/<repository-name>/` (or a custom domain if configured).

### Manual deploy (optional)

If you want to build locally and deploy elsewhere, you can run:

```bash
npm run build
npm run start
```

or, for a static export:

```bash
npm run build
# copy the `out/` directory to any static hosting service
```

## 📝 License

This project is for personal use. If you find parts of it useful for your own portfolio, feel free to adapt them with attribution.

---

*Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), [Framer Motion](https://www.framer.com/motion/), and [Mermaid](https://mermaid.js.org).*
