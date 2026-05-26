# Technical Documentation

This document serves as a technical overview of the AI Data Engineer Portfolio codebase. It explains the architectural decisions, folder structure, and how to customize the data for your own needs.

---

## 🏗 Architecture Overview

The portfolio is built using **Next.js 14 App Router**. It embraces Server Components for fast page loads and SEO optimization, while selectively using Client Components (`'use client'`) for interactive UI elements like the particle backgrounds, coding dashboard, and scroll-reveal animations.

The application uses a **Data-Driven Architecture** for content. All personal information (experience, projects, skills) is decoupled from the UI components and stored in strict TypeScript files inside the `src/data/` directory.

---

## 📂 Folder Structure

```text
src/
├── app/                  # Next.js App Router endpoints
│   ├── api/              # Serverless API routes (GitHub, Resume Studio, Contact)
│   ├── projects/         # Dynamic project routes (/projects/[slug])
│   ├── recruiter/        # Hidden recruiter view page
│   ├── resume-studio/    # Resume studio interactive page
│   ├── layout.tsx        # Root HTML shell and global providers
│   └── page.tsx          # Main landing page
├── components/           # Reusable React components
│   ├── about/            # Journey timeline and personal intro
│   ├── coding/           # GitHub & LeetCode API integration dashboard
│   ├── contact/          # Contact form and social links
│   ├── hero/             # Top section with orbiting skills
│   ├── projects/         # Project grid and cards
│   ├── resume-studio/    # All ATS/Resume related components
│   ├── skills/           # The Skills Galaxy visualization
│   └── ui/               # Core atomic UI (Buttons, Cards, Badges, Modals)
├── data/                 # Centralized content repository
│   ├── experience.ts     # Work history
│   ├── journey.ts        # Timeline milestones
│   ├── projects.ts       # Project details, architectures, and slugs
│   └── skills.ts         # Technical skills categorized by domain
├── lib/                  # Utility functions
│   ├── github.ts         # GitHub API helpers
│   ├── seo.ts            # SEO metadata generation
│   └── utils.ts          # Tailwind class merging (cn)
├── types/                # Global TypeScript interfaces
└── templates/            # LaTeX resume templates for export
```

---

## ⚙️ How to Customize Your Content

Because the app is data-driven, you almost never need to touch the `.tsx` component files to update your resume information. Simply edit the files in the `src/data/` folder:

### 1. Updating Projects (`src/data/projects.ts`)
Each project object dictates what shows up on the home page and automatically generates a dedicated `/projects/[slug]` page.
*   **`featured: true`**: Determines if the project appears on the home page grid.
*   **`slug`**: The URL path for the project (e.g., `slug: 'medihita'` creates `/projects/medihita`).
*   **`flowDiagram`**: A string that will be rendered in a monospace code block to illustrate system architecture.

### 2. Updating Skills (`src/data/skills.ts`)
Skills are grouped into categories like *Data Engineering*, *AI & Machine Learning*, and *Cloud*. 
Adding a new skill here automatically injects it into the **Skills Galaxy** visualization and makes it available for the Resume Studio keyword matcher.

### 3. Modifying the Hero Orbit (`src/components/hero/HeroSection.tsx`)
The Hero section features 5 core skills orbiting your title. If you wish to change these 5 specific skills:
1. Open `src/components/hero/HeroSection.tsx`.
2. Locate `const orbitSkills = [...]`.
3. Change the 5 strings to whichever skills you want to highlight.

---

## 🔌 API Routes

*   **`GET /api/github`**: Fetches real-time public repository count and star metrics for the configured GitHub username (`SaiGopal81`).
*   **`POST /api/contact`**: Receives payload from the contact form. Designed to integrate with Resend to send emails.
*   **`POST /api/resume-studio/parse`**: Uses the Groq API (`llama-3.1-8b-instant`) to parse raw text and intelligently extract skills, education, and projects from a resume.
*   **`POST /api/resume-studio/analyze`**: Performs the hybrid analysis between the uploaded resume and the provided Job Description to generate skill gap items and coverage metrics.

---

## 🎨 Theming & Styling

The UI is built exclusively with **Tailwind CSS**. 
*   **Colors**: The primary palette relies on Tailwind's `slate`, `blue`, `cyan`, and `purple`. 
*   **Gradients**: Widespread use of `bg-gradient-to-r` and text clipping (`bg-clip-text text-transparent`) is used to create the neon/cyberpunk vibe.
*   **Glow Effects**: Built using relative positioning and absolute blur divs (`blur-3xl`) underneath standard cards.

To change the core theme globally, you can adjust the root background color in `src/app/layout.tsx` or `tailwind.config.ts`.
