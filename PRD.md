# Product Requirements Document: Awesome CV Astro Enhancement

## Executive Summary

Transform Awesome CV Astro from a basic resume generator into the premier web-first resume building platform that outcompetes LaTeX-based solutions like awesome-cv through superior developer experience, live editing capabilities, and modern web technologies.

## Vision

Create a resume builder that combines the visual quality of LaTeX templates with the accessibility and ease of modern web development, making professional resume creation available to both technical and non-technical users.

## Problem Statement

Current resume building solutions face key challenges:

- **awesome-cv (LaTeX)**: Requires LaTeX installation, has steep learning curve, slow compilation, difficult to customize
- **Online builders**: Often proprietary, limited customization, privacy concerns, export restrictions
- **Awesome CV Astro (current)**: Missing key features, lacks validation, no live preview, limited documentation

## Goals

### Primary Goals
1. Feature parity with awesome-cv LaTeX template
2. Superior developer experience through modern tooling
3. Live preview and editing capabilities
4. ATS-optimization and validation tools

### Secondary Goals
1. Multi-language support
2. Template marketplace
3. JSON Resume standard compatibility
4. Accessibility compliance (WCAG 2.1 AA)

## Success Metrics

- Time to create first resume: < 15 minutes (vs 1+ hour with LaTeX)
- Build/preview cycle time: < 3 seconds
- ATS compatibility score: > 90%
- Documentation completeness: 100% feature coverage
- Community adoption: 100+ GitHub stars in 6 months

## Target Audience

### Primary Users
- Software engineers creating technical resumes
- Job seekers needing quick customization for applications
- Developers wanting version-controlled resumes

### Secondary Users
- Non-technical users seeking professional templates
- Recruiters needing standardized formats
- Students building first resumes

## Features & Requirements

### Phase 1: Feature Completion (MVP)

#### 1.1 Missing Resume Sections
**Priority: P0 - Critical**
**Status: ✅ COMPLETE**

- [x] Education section with degree, institution, dates, GPA (optional), coursework
- [x] Honors & Awards with title, issuer, date, description
- [x] Certifications with name, issuer, date, expiry, credential ID
- [x] Publications section for academic resumes
- [x] Volunteer experience section

**Acceptance Criteria:**
- All sections render correctly in PDF and HTML
- Sections are optional and configurable via YAML
- Visual consistency with existing sections

#### 1.2 YAML Schema Validation
**Priority: P0 - Critical**
**Status: ✅ COMPLETE**

- [x] JSON Schema definition for resume-details.yml
- [x] Pre-build validation with clear error messages
- [x] VSCode/IDE autocomplete support via schema
- [ ] ~~TypeScript types generated from schema~~ (nice-to-have, schema validation is sufficient)

**Acceptance Criteria:**
- Invalid YAML fails with helpful error message
- Schema includes all optional/required fields
- Documentation of all available fields

#### 1.3 Cover Letter Enhancement
**Priority: P1 - High**

- [ ] Multiple cover letter templates
- [ ] Variable substitution (company name, position, etc.)
- [ ] Reusable content blocks
- [ ] Per-company customization

**Acceptance Criteria:**
- Generate customized cover letters from templates
- Support multiple cover letters from single config
- PDF output matches resume styling

### Phase 2: Developer Experience

#### 2.1 Watch Mode & Live Reload
**Priority: P0 - Critical**

- [ ] `pnpm watch` command for continuous PDF generation
- [ ] Debounced rebuilds on YAML/source changes
- [ ] Browser auto-refresh for HTML preview
- [ ] Build performance optimization (< 3s rebuild)

**Acceptance Criteria:**
- Changes to YAML trigger automatic rebuild
- PDF regenerates without manual command
- No browser refresh needed for preview updates

#### 2.2 CLI Tool
**Priority: P1 - High**

- [ ] `npx create-awesome-cv` scaffolding tool
- [ ] Interactive resume creation wizard
- [ ] Template selection during init
- [ ] Validation and linting commands

**Acceptance Criteria:**
- New users can scaffold project in < 2 minutes
- Wizard guides through required fields
- Multiple starter templates available

#### 2.3 Enhanced Documentation
**Priority: P0 - Critical**
**Status: ✅ COMPLETE**

- [x] Comprehensive customization guide (colors, fonts, layout)
- [x] Troubleshooting section with common issues
- [x] Comparison table: awesome-cv-astro vs awesome-cv vs online builders
- [ ] Video walkthrough (< 5 minutes) (deferred - not critical for MVP)
- [x] Contributing guidelines
- [x] Architecture documentation

**Acceptance Criteria:**
- All features documented with examples
- Users can customize without reading code
- Clear migration path from awesome-cv

#### 2.4 Example Gallery
**Priority: P1 - High**
**Status: ✅ COMPLETE**

- [x] 5+ example resumes (software engineer, designer, academic, manager, student)
- [x] Industry-specific templates
- [x] One-command template switching (via cp command)
- [x] Template previews in README

**Acceptance Criteria:**
- Examples showcase all features
- Templates are production-ready
- Easy to select and customize

### Phase 3: Modern Features

#### 3.1 Theme System
**Priority: P1 - High**

- [ ] Multiple color schemes (blue, red, green, purple, orange, monochrome)
- [ ] Font family options (Roboto, Source Sans Pro, Lato, etc.)
- [ ] Layout variants (compact, spacious, two-column)
- [ ] Theme configuration in YAML

**Acceptance Criteria:**
- 6+ built-in color themes
- 4+ font combinations
- 3+ layout variants
- Themes documented with previews

#### 3.2 ATS Optimization
**Priority: P0 - Critical**

- [ ] ATS compatibility validator
- [ ] Warning for complex formatting
- [ ] Keyword density analyzer
- [ ] Section order recommendations
- [ ] Plain text export for ATS testing

**Acceptance Criteria:**
- Validation reports specific issues
- Suggestions are actionable
- Plain text export is readable

#### 3.3 JSON Resume Support
**Priority: P1 - High**

- [ ] Import from JSON Resume format
- [ ] Export to JSON Resume format
- [ ] Conversion utilities
- [ ] Schema mapping documentation

**Acceptance Criteria:**
- Round-trip conversion without data loss
- Support for JSON Resume 1.0.0 spec
- CLI commands for import/export

#### 3.4 Multi-page Support
**Priority: P1 - High**

- [ ] Automatic page break handling
- [ ] Page overflow detection
- [ ] Manual page break controls
- [ ] Page count warnings

**Acceptance Criteria:**
- Content flows naturally across pages
- No orphaned headings
- Optional strict 1-page mode

#### 3.5 Enhanced Contact Options
**Priority: P2 - Medium**

- [ ] QR code generation for contact info
- [ ] Social media icons (Twitter, Medium, Portfolio, etc.)
- [ ] Configurable icon display
- [ ] vCard export

**Acceptance Criteria:**
- QR codes are scannable and styled
- 10+ social platform icons available
- Icons match document theme

### Phase 4: Web Platform Features

#### 4.1 Live Web Editor
**Priority: P2 - Medium**

- [ ] In-browser YAML editor with syntax highlighting
- [ ] Real-time HTML preview
- [ ] Side-by-side edit/preview mode
- [ ] Save/load to local storage
- [ ] Export to PDF from browser

**Acceptance Criteria:**
- Editor works offline (PWA)
- Preview updates in < 500ms
- Browser PDF matches CLI output

#### 4.2 Hosted Demo Site
**Priority: P1 - High**

- [ ] GitHub Pages deployment
- [ ] Interactive demo with live editing
- [ ] Example gallery browser
- [ ] Download generated PDFs
- [ ] Share resume links

**Acceptance Criteria:**
- Site loads in < 2s
- Works on mobile browsers
- Accessible (WCAG 2.1 AA)

#### 4.3 Multi-language Support
**Priority: P2 - Medium**

- [ ] Internationalized section headings
- [ ] RTL language support
- [ ] Language-specific font loading
- [ ] Multiple language versions in single config

**Acceptance Criteria:**
- Support for 5+ languages
- RTL rendering works correctly
- Font fallbacks configured

### Phase 5: Quality & DevOps

#### 5.1 Testing Infrastructure
**Priority: P1 - High**

- [ ] Visual regression tests for PDF output
- [ ] Component unit tests
- [ ] YAML validation tests
- [ ] Cross-platform build tests

**Acceptance Criteria:**
- 80%+ code coverage
- PDF output tests for all examples
- CI runs on every PR

#### 5.2 CI/CD Pipeline
**Priority: P1 - High**

- [ ] GitHub Actions workflow
- [ ] Automated example PDF generation
- [ ] Automated demo site deployment
- [ ] Release automation
- [ ] Version bumping

**Acceptance Criteria:**
- PRs auto-build and test
- Main branch auto-deploys demo
- Releases auto-publish examples

#### 5.3 Performance Optimization
**Priority: P1 - High**

- [ ] Build time < 5s for typical resume
- [ ] Watch mode rebuild < 3s
- [ ] Font subsetting
- [ ] Parallel PDF generation
- [ ] Caching strategy

**Acceptance Criteria:**
- 50% faster than current build time
- Memory usage < 500MB
- Incremental builds work correctly

## Technical Architecture

### Key Technologies
- **Frontend**: Astro 3.x, TypeScript, Vanilla CSS
- **PDF Generation**: Playwright (Chromium)
- **Validation**: JSON Schema, Zod
- **CLI**: Commander.js or similar
- **Testing**: Vitest, Playwright Test
- **CI/CD**: GitHub Actions

### Project Structure
```
awesome-cv-astro/
├── packages/
│   ├── core/                 # Core resume components
│   ├── cli/                  # CLI tool
│   ├── schema/               # JSON Schema & types
│   └── themes/               # Theme definitions
├── examples/                 # Example resumes
├── docs/                     # Documentation site
├── src/
│   ├── components/
│   ├── layouts/
│   ├── themes/
│   └── utils/
├── tests/
└── scripts/
```

### Data Flow
1. User edits `resume-details.yml`
2. Schema validation runs
3. Astro builds HTML with applied theme
4. Playwright converts to PDF with print CSS
5. PNG screenshots generated for previews

## Design Considerations

### Principles
- **Simplicity First**: No feature should require reading documentation for basic use
- **Zero Config**: Sensible defaults for everything
- **Progressive Enhancement**: Advanced features don't complicate basic usage
- **Version Control Friendly**: Plain text YAML, deterministic output

### UI/UX Guidelines
- Clean, professional aesthetic
- Print-optimized typography
- Consistent spacing and alignment
- High contrast for readability
- ATS-friendly structure

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Browser PDF rendering inconsistencies | High | Medium | Comprehensive cross-browser tests, locked Playwright version |
| YAML too complex for non-technical users | Medium | High | CLI wizard, web editor, validation with hints |
| Breaking changes in Astro updates | Medium | Medium | Pin major versions, automated update testing |
| ATS compatibility false positives | High | Low | Real-world ATS testing, community validation |
| Performance degradation with complex resumes | Low | Medium | Performance benchmarks in CI, optimization guidelines |

## Open Questions

1. Should we support PDF editing/import or stay YAML-only?
2. Freemium model for hosted service vs fully open source?
3. Plugin architecture for community themes/sections?
4. AI-powered content suggestions? (out of scope for now)
5. Mobile app for quick edits?

## Success Criteria

### Phase 1 Success ✅ ACHIEVED
- ✅ All awesome-cv sections implemented
- ✅ YAML validation prevents errors
- ✅ Documentation covers 100% of features
- ✅ 5 example resumes available

### Phase 2 Success  
- Watch mode reduces iteration time by 80%
- CLI tool enables 15-minute first resume
- 10+ community contributors

### Phase 3 Success
- 5+ themes available
- ATS validator catches common issues
- JSON Resume compatibility enables ecosystem integration

### Long-term Success
- 1000+ GitHub stars
- Referenced in "best resume tools" articles
- Active community creating themes/templates
- De facto standard for developer resumes

## Timeline

### Phase 1: Foundation (Weeks 1-4)
- Week 1-2: Missing sections, YAML validation
- Week 3-4: Documentation, examples

### Phase 2: DX Improvements (Weeks 5-8)  
- Week 5-6: Watch mode, CLI tool
- Week 7-8: Testing infrastructure, CI/CD

### Phase 3: Features (Weeks 9-14)
- Week 9-10: Theme system, ATS optimization
- Week 11-12: JSON Resume support, multi-page
- Week 13-14: Enhanced contact options

### Phase 4: Platform (Weeks 15-18)
- Week 15-16: Demo site, live editor
- Week 17-18: Multi-language support, polish

## Appendix

### Competitive Analysis

| Feature | awesome-cv (LaTeX) | Awesome CV Astro (Current) | Awesome CV Astro (Target) |
|---------|-------------------|---------------------------|--------------------------|
| Setup Time | 30+ min | 5 min | 2 min |
| Build Time | 10-30s | 5-10s | < 3s |
| Live Preview | No | No | Yes |
| Web Editor | No | No | Yes |
| Validation | No | No | Yes |
| ATS Tools | No | No | Yes |
| Customization | Hard | Medium | Easy |
| Learning Curve | Steep | Gentle | Minimal |
| Version Control | Yes | Yes | Yes |

### Resources
- [awesome-cv GitHub](https://github.com/posquit0/Awesome-CV)
- [JSON Resume Spec](https://jsonresume.org/schema/)
- [ATS Best Practices](https://www.jobscan.co/blog/ats-resume/)
- [Astro Documentation](https://docs.astro.build/)

---

**Document Version**: 1.0  
**Last Updated**: 2025-11-23  
**Owner**: Project Maintainers  
**Status**: Draft → Ready for Implementation
