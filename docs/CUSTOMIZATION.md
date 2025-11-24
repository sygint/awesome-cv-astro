# Customization Guide

This guide covers how to customize your resume's appearance, layout, and content.

## Table of Contents

- [Colors](#colors)
- [Fonts](#fonts)
- [Layout & Spacing](#layout--spacing)
- [Sections](#sections)
- [Header Configuration](#header-configuration)
- [Advanced Customization](#advanced-customization)

## Colors

### Changing the Highlight Color

The highlight color is used for section titles, links, and accents. Edit `src/style/variables.css`:

```css
--colorHighlight: var(--awesomeRed);
```

Available preset colors:
- `--awesomeRed` (default)
- `--awesomeSkyBlue`
- `--awesomeEmerald`
- `--awesomeOrange`
- `--awesomePink`
- `--awesomeNephritis`
- `--awesomeConcrete`
- `--awesomeDarkNight`

Or define your own:
```css
--colorHighlight: #FF5733;
```

### Text Colors

```css
--colorText: var(--grayDark);        /* Main text */
--colorLightText: var(--gray);       /* Secondary text */
```

## Fonts

### Changing Font Families

The resume uses three font families defined in `src/style/variables.css`:

```css
/* Header name (large title) */
--headerNameFontFamily: var(--Roboto);

/* Header details and sections */
--headerSecondaryFontFamily: var(--AtkinsonHyperlegible);

/* Page body */
--pageFontFamily: var(--AtkinsonHyperlegible);
```

Available fonts:
- `--Roboto`
- `--SourceSansPro` 
- `--AtkinsonHyperlegible`

To add new fonts:

1. Add font files to `src/fonts/`
2. Define font-face in `src/style/fonts.css`
3. Create CSS variable in `src/style/variables.css`

### Font Sizes

```css
--pageFontSize: 10pt;                    /* Base font size */
--headerNameFontSize: 32pt;              /* Your name */
--sectionHeaderFontSize: 16pt;           /* Section titles */
--positionFontSize: 8pt;                 /* Job titles */
--datesFontSize: 8pt;                    /* Date ranges */
```

## Layout & Spacing

### Page Margins

```css
--pageMargins: 0.8cm 1.4cm 1.8cm;  /* top, left/right, bottom */
```

### Compact Mode

Enable compact mode in `resume-details.yml`:

```yaml
compact: true
```

This reduces spacing between sections and items. You can customize compact spacing in `variables.css`:

```css
.compact {
  --sectionMarginBottom: 0.2cm;
  --subSectionMarginBottom: 0.4cm;
  /* ... */
}
```

### Section Spacing

```css
--sectionMarginBottom: 0.3cm;        /* Space between sections */
--sectionHeaderMargin: 13pt 0;       /* Space around section titles */
--subSectionMarginBottom: 0.4cm;     /* Space between subsections */
```

## Sections

### Available Section Types

#### 1. Two-Column Layout (`type: 2-col`)

Best for Technologies, Skills, etc.

```yaml
- title: Technologies
  type: 2-col
  items:
    - title: Languages
      items:
        - JavaScript
        - Python
        - Go
    - title: Frameworks
      items:
        - React
        - Node.js
```

#### 2. Detailed Layout (default)

Best for Experience, Projects.

```yaml
- title: Experience
  items:
    - organization: Company Name
      position: Software Engineer
      location: San Francisco, CA
      dates: Jan 2020 - Present
      href: https://company.com
      technologies:
        - React
        - Node.js
      items:
        - Built scalable microservices
        - Led team of 5 engineers
```

#### 3. Education Layout (`type: education`)

Specialized for education history.

```yaml
- title: Education
  type: education
  items:
    - institution: University Name
      degree: Bachelor of Science
      major: Computer Science
      minor: Mathematics
      location: Boston, MA
      dates: Sep 2015 - May 2019
      gpa: "3.9/4.0"
      honors: Summa Cum Laude
      coursework:
        - Data Structures
        - Algorithms
      items:
        - Dean's List all semesters
```

### Section Order

Recommended order for software engineers:

1. Technologies/Skills
2. Experience
3. Projects
4. Education
5. Certifications (if applicable)

Simply reorder sections in the `sections` array in `resume-details.yml`.

## Header Configuration

### Basic Info

```yaml
header:
  name: Your Name
  positions:
    - Software Engineer
    - Full Stack Developer
```

### Contact Information

```yaml
extras:
  location:
    text: San Francisco, CA
  phone:
    text: (123) 456-7890
    href: tel:1234567890
  email:
    text: your@email.com
    href: mailto:your@email.com
  website:
    text: yoursite.com
    href: https://yoursite.com
  github:
    text: yourusername
    href: https://github.com/yourusername
  linkedin:
    text: yourusername
    href: https://linkedin.com/in/yourusername
```

Supported extras: `location`, `phone`, `email`, `website`, `github`, `gitlab`, `linkedin`, `twitter`, `stackoverflow`, `code`

## Advanced Customization

### Custom Section Styling

To modify section appearance, edit `src/components/Section.astro`:

```css
section h1 {
  /* Customize section title */
  font-size: var(--sectionHeaderFontSize);
  color: var(--colorText);
}

section h1:after {
  /* Customize underline */
  border-bottom: 2px solid black;
}
```

### Custom Subsection Layout

Edit `src/components/SubSection.astro` or `src/components/EducationSubSection.astro` to change item layouts.

### Page Breaks (Multi-page Resumes)

For longer resumes, control page breaks with CSS:

```css
.section {
  page-break-inside: avoid; /* Keep section on one page */
}

.sub-section {
  page-break-inside: avoid; /* Keep experience on one page */
}
```

### Print-Specific Styling

Add print-specific styles in any component:

```css
@media print {
  /* Styles applied only in PDF */
}
```

## Tips for ATS Optimization

1. **Use standard section titles**: "Experience", "Education", "Skills"
2. **Avoid complex formatting**: Tables, columns, and graphics can confuse ATS
3. **Use bullet points**: Better parsed than paragraphs
4. **Include keywords**: Match job description terminology
5. **Standard fonts**: Stick with web-safe fonts
6. **Test with validator**: Run `npm run validate` before submitting

## Troubleshooting

### Fonts Not Loading in PDF

Ensure fonts are properly embedded:
1. Font files must be in `src/fonts/`
2. Font-face definitions in `src/style/fonts.css`
3. Check browser console during build for errors

### Content Overflowing Page

Options:
1. Enable `compact: true`
2. Reduce font sizes in `variables.css`
3. Reduce margins: `--pageMargins`
4. Shorten content

### Colors Not Showing

1. Check CSS variable syntax (includes `--`)
2. Ensure color is defined in `variables.css`
3. Rebuild with `npm run build`

### Validation Errors

Run validation to see specific errors:
```bash
npm run validate
```

Check `resume-schema.json` for required fields and valid structure.

## Examples

See the `examples/` directory for complete resume examples:
- `examples/software-engineer.yml` - Standard tech resume
- `examples/academic.yml` - Academic/research focus
- `examples/student.yml` - Entry-level/student resume

## Getting Help

- Check [GitHub Issues](https://github.com/sygint/awesome-cv-astro/issues)
- Review [README.md](../README.md) for setup instructions
- See [PRD.md](../PRD.md) for planned features
