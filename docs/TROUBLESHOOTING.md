# Troubleshooting Guide

Common issues and solutions for Awesome CV Astro.

## Build Issues

### `npm run build` fails with validation errors

**Problem**: YAML structure doesn't match schema.

**Solution**:
```bash
npm run validate
```

This will show specific errors. Common issues:
- Missing required fields (e.g., `name`, `title`)
- Incorrect section `type` value
- Misspelled property names

**Fix**: Check `resume-schema.json` for valid structure.

---

### Playwright browser not found

**Problem**: PDF generation fails with "Browser not found" error.

**Solution**:
```bash
npx playwright install chromium
```

On NixOS with devenv, this is handled automatically.

---

### Build hangs or times out

**Problem**: PDF generation takes too long.

**Possible causes**:
1. Large images or external resources
2. Font loading issues
3. Complex CSS

**Solutions**:
- Reduce image sizes
- Ensure fonts are local (in `src/fonts/`)
- Simplify CSS animations
- Check for external URLs that may timeout

---

## PDF Output Issues

### Fonts look different in PDF vs browser

**Problem**: Fonts not embedding correctly.

**Solution**:
1. Verify font files are in `src/fonts/`
2. Check `@font-face` declarations in `src/style/fonts.css`
3. Ensure font paths are correct
4. Fonts must be loaded before PDF generation

**Test**:
```bash
npm run dev
```
Open `localhost:4321/resume` - if fonts look correct here, they should work in PDF.

---

### Content cut off at page boundaries

**Problem**: Text or sections split awkwardly across pages.

**Solutions**:

1. **Add page break control** in component CSS:
```css
.sub-section {
  page-break-inside: avoid;
}
```

2. **Enable compact mode**:
```yaml
compact: true
```

3. **Reduce margins** in `variables.css`:
```css
--pageMargins: 0.5cm 1.2cm 1.5cm;
```

---

### PDF colors don't match screen

**Problem**: Colors look different in PDF vs HTML.

**Cause**: Color space conversion during PDF generation.

**Solution**: Use hex colors instead of RGB/HSL for more consistent results:
```css
--colorHighlight: #dc3522;  /* Good */
--colorHighlight: rgb(220, 53, 34);  /* May vary */
```

---

### PDF file size too large

**Problem**: Generated PDF is multiple MB.

**Solutions**:
1. Optimize embedded images
2. Subset fonts (only include used characters)
3. Avoid embedding large resources

---

## YAML Configuration Issues

### "Unexpected token" error

**Problem**: YAML syntax error.

**Common mistakes**:
```yaml
# ❌ Bad: Missing space after colon
items:
  -title: Wrong

# ✅ Good: Space after colon
items:
  - title: Correct

# ❌ Bad: Inconsistent indentation
items:
  - title: One
    text: Two
     bad: Three

# ✅ Good: Consistent indentation (2 spaces)
items:
  - title: One
    text: Two
    good: Three
```

**Solution**: Use a YAML validator or editor with YAML support (VS Code with YAML extension).

---

### Section not showing up

**Problem**: Section defined but doesn't appear in resume.

**Checklist**:
1. ✅ Is section in `sections` array?
2. ✅ Does it have required `title` field?
3. ✅ Does it have `items` array?
4. ✅ Are items properly formatted for the section `type`?

**Example of valid section**:
```yaml
sections:
  - title: Experience
    items:
      - organization: Company
        position: Role
        items:
          - Achievement
```

---

### Technologies not displaying correctly

**Problem**: Tech list shows weird formatting.

**Cause**: Wrong section type or structure.

**Solution**: Use `type: 2-col`:
```yaml
- title: Technologies
  type: 2-col
  items:
    - title: Languages
      items:
        - JavaScript
        - Python
```

---

## Development Issues

### Changes not reflected after rebuild

**Problem**: Modified YAML but output unchanged.

**Solutions**:
1. Clear build cache:
```bash
rm -rf build/
npm run build
```

2. Hard refresh browser (Ctrl+Shift+R)

3. Check you're editing correct file:
```bash
cat resume-details.yml | head -10
```

---

### `npm run dev` shows 404

**Problem**: Page not found at `localhost:4321`.

**Solution**: Navigate to `localhost:4321/resume` (not root).

Or add redirect in `astro.config.mjs`:
```js
export default defineConfig({
  // ... existing config
  redirects: {
    '/': '/resume'
  }
});
```

---

### Hot reload not working

**Problem**: Changes require manual refresh.

**Cause**: Astro doesn't auto-reload for external YAML changes.

**Workaround**: 
1. Save a `.astro` file to trigger reload, or
2. Restart dev server after YAML changes

**Future**: Watch mode planned (see PRD.md Phase 2.1)

---

## Installation Issues

### `npm install` fails

**Problem**: Dependency installation errors.

**Solutions**:

1. **Clear cache and retry**:
```bash
rm -rf node_modules package-lock.json
```

2. **Check Node version**:
```bash
node --version  # Should be 20+
3. **Use npm instead of pnpm** if mixing package managers:
```bash
rm pnpm-lock.yaml
npm install
```

---

### Permission errors during install

**Problem**: EACCES or permission denied errors.

**Solution**: Don't use sudo. Fix npm permissions:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

Add to `.bashrc` or `.zshrc` to persist.

---

## NixOS / devenv Issues

### `direnv allow` not working

**Problem**: devenv shell not activating.

**Solutions**:

1. **Install direnv**:
```bash
# NixOS
environment.systemPackages = [ pkgs.direnv ];

# Others
nix-env -iA nixpkgs.direnv
```

2. **Add to shell config** (`.bashrc` or `.zshrc`):
```bash
eval "$(direnv hook bash)"  # or zsh
```

3. **Allow explicitly**:
```bash
direnv allow .
```

---

### Playwright browsers not working on NixOS

**Problem**: Browser binary issues.

**Solution**: devenv config handles this automatically. Ensure you're in devenv shell:
```bash
devenv shell
```

Or use direnv:
```bash
direnv allow
```

The `devenv.nix` configuration patches Playwright browsers from nixpkgs.

---

## Validation Issues

### Schema validation too strict

**Problem**: Valid YAML fails validation.

**Solution**: 
1. Check exact error with `npm run validate`
2. Review `resume-schema.json` for requirements
3. If schema is wrong, please file an issue!

---

### How to disable validation

Not recommended, but if needed:

**Temporary** (one build):
```bash
astro build && tsx ./scripts/build.ts
```

**Permanent**: Edit `package.json`:
```json
"build": "astro build && tsx ./scripts/build.ts"
```

---

## Still Having Issues?

1. **Check existing issues**: [GitHub Issues](https://github.com/sygint/awesome-cv-astro/issues)
2. **Enable verbose logging**: Set `DEBUG=*` environment variable
3. **Provide details**:
   - Error message (full output)
   - Operating System & Node version
   - Steps to reproduce
4. **Create minimal example**: Simplify `resume-details.yml` to isolate issue

### Getting Help

- GitHub Issues: Bug reports and feature requests
- Discussions: Questions and community support
- PRD.md: Check if issue is known/planned
