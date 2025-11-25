# Contributing to awesome-cv-astro

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other contributors

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**Good bug reports include:**
- Clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Node version, etc.)
- Sample `resume-details.yml` if relevant (anonymized)

**Example:**
```markdown
## Bug: PDF generation fails with empty dates

**Steps to reproduce:**
1. Set dates field to empty string in resume-details.yml
2. Run `npm run build`

**Expected:** Build completes with warning
**Actual:** Build fails with error

**Environment:**
- OS: Ubuntu 22.04
- Node: 20.10.0
- npm: 10.2.3
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear, descriptive title
- Provide detailed description of the proposed feature
- Explain why this enhancement would be useful
- Include mockups or examples if applicable

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test thoroughly** - ensure your changes don't break existing functionality
4. **Update documentation** if you're changing functionality
5. **Write clear commit messages** following our commit conventions
6. **Submit a pull request** with a clear description

## Development Setup

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Git

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/awesome-cv-astro.git
cd awesome-cv-astro

# Install dependencies
npm install

# Validate the default resume
npm run validate

# Build the project
npm run build

# Start development server with hot reload
npm run dev
```

### Project Structure

```
awesome-cv-astro/
├── src/
│   ├── components/     # Astro components for resume sections
│   ├── fonts/          # Font files
│   ├── icons/          # SVG icon components
│   ├── pages/          # Page templates (resume, cover letters)
│   └── style/          # Global styles and variables
├── scripts/
│   ├── validate.ts     # JSON Schema validation
│   ├── build.ts        # PDF/PNG generation orchestrator
│   ├── convertToPdf.ts # PDF conversion via Playwright
│   └── convertToPng.ts # PNG screenshot via Playwright
├── docs/               # Documentation
├── examples/           # Example resume configurations
├── resume-schema.json  # JSON Schema for validation
└── resume-details.yml  # User's resume data
```

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for scripts
- Use meaningful variable names
- Add comments for complex logic
- Follow existing code style
- Use async/await over promises

**Example:**
```typescript
// Good
async function generatePdf(htmlPath: string, outputPath: string): Promise<void> {
  const browser = await chromium.launch();
  // ... implementation
}

// Avoid
function genPDF(h, o) {
  chromium.launch().then(browser => {
    // ... implementation
  });
}
```

### Astro Components

- Keep components focused and single-purpose
- Use TypeScript for component props
- Follow Astro's component conventions
- Add prop validation

**Example:**
```astro
---
interface Props {
  title: string;
  items: string[];
}

const { title, items } = Astro.props;
---

<section>
  <h2>{title}</h2>
  <ul>
    {items.map(item => <li>{item}</li>)}
  </ul>
</section>
```

### CSS

- Use CSS custom properties (variables) for theming
- Keep selectors specific but not overly nested
- Group related properties
- Add comments for non-obvious styling

**Example:**
```css
/* Good: Using custom properties */
.resume-section {
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

/* Avoid: Magic numbers and hardcoded colors */
.resume-section {
  color: #333333;
  margin-bottom: 24px;
}
```

### YAML

- Use consistent indentation (2 spaces)
- Follow the schema structure
- Add comments for complex configurations
- Keep fictional data clearly fictional

## Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, verify:

- [ ] `npm run validate` passes
- [ ] `npm run build` completes successfully
- [ ] PDF output looks correct
- [ ] PNG output looks correct
- [ ] Changes work with all example resumes
- [ ] No console errors or warnings
- [ ] Hot reload works in dev mode (`npm run dev`)

### Test with Multiple Configurations

```bash
# Test with different examples
cp examples/designer.yml resume-details.yml
npm run build

cp examples/academic.yml resume-details.yml
npm run build

cp examples/manager.yml resume-details.yml
npm run build
```

### Edge Cases to Test

- Empty fields
- Very long text content
- Special characters in names/titles
- Multiple positions/degrees
- Missing optional fields

## Documentation

### When to Update Documentation

- Adding new features → Update relevant docs in `docs/`
- Changing configuration → Update `README.md` and `CUSTOMIZATION.md`
- Adding schema fields → Update `resume-schema.json` and examples
- Bug fixes → Update `TROUBLESHOOTING.md` if user-facing

### Documentation Style

- Use clear, concise language
- Provide code examples
- Include screenshots for visual features
- Keep examples up-to-date with code changes

## Commit Message Guidelines

Use conventional commit format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(schema): add certifications section type

Add support for professional certifications with fields for:
- Certification name
- Issuer
- Date obtained
- Expiration date
- Credential ID

Closes #42
```

```
fix(pdf): handle empty dates gracefully

Previously, empty date fields would cause build to fail.
Now treats empty dates as "Present" for end dates and
skips date display entirely if both start and end are empty.

Fixes #38
```

```
docs(examples): add academic researcher example

New example showcasing:
- Publications section
- Research interests
- Teaching experience
```

## Adding New Features

### Schema Changes

1. Update `resume-schema.json` with new fields
2. Add TypeScript types if applicable
3. Update validation logic in `scripts/validate.ts`
4. Document in `CUSTOMIZATION.md`
5. Add example usage in `examples/`

### New Component Types

1. Create component in `src/components/`
2. Update routing in `Section.astro` or parent component
3. Add schema definition
4. Create example usage
5. Document in `CUSTOMIZATION.md`

### Style Changes

1. Use CSS custom properties in `src/style/variables.css`
2. Document new variables
3. Test with all examples
4. Ensure PDF rendering works correctly

## Areas for Contribution

### High Priority

- [ ] Additional section types (Skills matrix, Languages, etc.)
- [ ] More sophisticated layout options
- [ ] Theme variations (color schemes)
- [ ] Better error messages in validation
- [ ] Performance optimizations

### Good First Issues

- Adding new example resumes
- Improving documentation clarity
- Fixing typos or formatting
- Adding more validation rules
- Enhancing existing components with better styling

### Advanced Contributions

- Multi-page resume optimization
- Custom font support
- Interactive preview mode
- Resume template variations
- Export to other formats (HTML, Markdown)

## Getting Help

- **Questions?** Open a discussion on GitHub
- **Found a bug?** Create an issue
- **Want to contribute?** Look for issues labeled `good first issue` or `help wanted`

## Recognition

Contributors will be:
- Listed in the project README
- Credited in release notes
- Thanked in the community

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to awesome-cv-astro! 🚀
