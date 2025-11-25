# Architecture

## Overview

awesome-cv-astro is a simple static resume builder: YAML → HTML → PDF/PNG. It uses Astro to generate clean HTML and Playwright to convert it to printable formats.

## How It Works

```
resume-details.yml  →  Validate  →  Astro Build  →  Playwright  →  PDF + PNG
     (YAML)            (Schema)      (HTML/CSS)     (Conversion)    (Output)
```

## Key Components

### 1. Data (YAML + Schema)
- **resume-details.yml**: Your resume content
- **resume-schema.json**: Validates structure, enables IDE autocomplete

### 2. Validation (scripts/validate.ts)
- Checks YAML against schema before building
- Runs automatically during `npm run build`
- Catches typos and missing fields

### 3. Build (Astro)
- Generates static HTML from YAML data
- Component-based: Header, Section, various SubSections
- CSS handles print styling (no JavaScript in output)

### 4. Conversion (Playwright)
- Opens HTML in headless browser
- Generates PDF (8.5" × 11", print-optimized)
- Takes PNG screenshot for previews

## Component Structure

```
Base.astro (layout wrapper)
└── resume.astro (main page)
    ├── Header.astro (name, contact info)
    └── Section.astro (routes to appropriate subsection)
        ├── SubSection.astro (experience, projects)
        ├── EducationSubSection.astro
        ├── HonorsSubSection.astro
        ├── CertificationsSubSection.astro
        ├── PublicationsSubSection.astro
        └── VolunteerSubSection.astro
```

## Build Commands

- `npm run dev` - Start Astro dev server at http://localhost:4321
  - Live reload on file changes
  - Preview HTML in browser (no PDF generation in dev mode)
- `npm run validate` - Check YAML structure against schema
- `npm run build` - Full build: validate → HTML → PDF/PNG


## Technology Choices

- **Astro**: Fast static site generator, zero JS in output
- **Playwright**: Reliable PDF generation with print CSS support
- **YAML**: More readable than JSON, supports comments
- **JSON Schema**: IDE autocomplete + validation without TypeScript

## Adding New Section Types

1. Create component: `src/components/NewSubSection.astro`
2. Add routing in `Section.astro`
3. Update schema in `resume-schema.json`
4. Add example in `examples/`

## Development Workflow

1. Edit `resume-details.yml`
2. Run `npm run dev` to preview changes in browser
3. Astro automatically reloads when you save
4. Run `npm run build` to generate final PDF/PNG

## Design Principles

- **Simple**: It's just a resume builder, keep it straightforward
- **Static-first**: No server needed for output, just files
- **Print-optimized**: PDF is the primary output, designed for printing
- **Git-friendly**: YAML format diffs cleanly in version control
- **Type-safe**: Schema validation catches errors before build
- **Fast iteration**: Live reload in dev mode for quick edits
