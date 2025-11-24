# Resume Examples

This directory contains example resume configurations showcasing different use cases for awesome-cv-astro.

## Available Examples

### 1. Software Engineer (`software-engineer.yml`)
Full-stack software engineer with comprehensive experience, projects, and education sections.

**Highlights:**
- Multiple work experiences with detailed accomplishments
- Personal and open source projects
- Technical skills organized by category
- Education with honors

### 2. Student (`student.yml`)
Recent graduate or student resume focusing on education, coursework, and early career.

**Highlights:**
- Prominent education section with coursework
- Internship experience
- Academic projects
- Relevant skills for entry-level positions

### 3. UX/UI Designer (`designer.yml`)
Creative professional with design-focused experience and portfolio projects.

**Highlights:**
- Design tool proficiencies
- Agency and product design experience
- Awards and recognition
- Portfolio projects with technologies

### 4. Academic/Researcher (`academic.yml`)
PhD-level researcher with publications, teaching experience, and grants.

**Highlights:**
- Publications section with DOIs
- Research interests and methodologies
- Teaching and mentorship experience
- Academic honors and awards
- Conference service

### 5. Engineering Manager (`manager.yml`)
Technical leadership role with emphasis on team management and strategic impact.

**Highlights:**
- Team growth and retention metrics
- Technical and people leadership
- Speaking engagements and community involvement
- Management certifications
- Open source contributions

## How to Use These Examples

1. **Preview an example:**
   ```bash
   cp examples/designer.yml resume-details.yml
   npm run build
   ```
   
2. **Start from an example:**
   - Copy the example that best matches your background
   - Replace the fictional data with your own information
   - Customize sections as needed

3. **Mix and match sections:**
   - Look at different examples to see section configurations
   - Combine sections from multiple examples
   - Reference the schema in `resume-schema.json` for all available options

## Customization Tips

- All examples use `compact: false` for maximum detail. Set to `true` for a more condensed format.
- The `type: 2-col` sections are great for skills and technologies.
- Use the `honors`, `certifications`, `publications`, and `volunteer` section types as needed.
- Every example includes the `$schema` reference for IDE autocomplete support.

## Validation

All examples follow the schema defined in `resume-schema.json` and will pass validation:

```bash
npm run validate
```
