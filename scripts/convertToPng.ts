import { chromium } from 'playwright';
import { existsSync } from 'fs';
import { dirname } from 'path';

// Skip host validation on NixOS - we use nixpkgs browsers
process.env.PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = 'true';

export default async (inputHtmlPath: string, outputPngPath: string) => {
  // Validate that the HTML file exists
  if (!existsSync(inputHtmlPath)) {
    console.error(`❌ Error: ${inputHtmlPath} not found.`);
    console.error('   Run "astro build" first.');
    throw new Error(`HTML file not found: ${inputHtmlPath}`);
  }

  try {
    console.log('🚀 Launching browser for PNG screenshot...');
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Set viewport to A4 proportions (width: 827px, height: 1169px at 100 DPI)
    await page.setViewportSize({ width: 827, height: 1169 });

    // Emulate print media for correct CSS application
    await page.emulateMedia({ media: 'print' });

    const fileUrl = `file://${inputHtmlPath}`;
    console.log(`📄 Loading ${inputHtmlPath}...`);
    
    // Get build directory for fixing absolute paths
    const buildDir = dirname(inputHtmlPath).replace(/\/resume$/, '').replace(/\/cover-letter\/[^/]+$/, '');
    
    // Intercept CSS files to fix absolute font paths
    await page.route('**/*.css', async (route) => {
      const url = route.request().url();
      // Convert file:// URL to local path
      if (url.startsWith('file://')) {
        const { readFileSync } = await import('fs');
        const localPath = url.replace('file://', '');
        try {
          let css = readFileSync(localPath, 'utf8');
          // Fix absolute font paths in CSS
          css = css.replace(/url\((["']?)\/([^)"']+)(["']?)\)/g, `url($1file://${buildDir}/$2$3)`);
          await route.fulfill({ body: css, contentType: 'text/css' });
        } catch (error) {
          await route.continue();
        }
      } else {
        await route.continue();
      }
    });
    
    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    
    // Fix absolute asset paths by rewriting CSS links
    await page.evaluate((buildPath) => {
      document.querySelectorAll('link[rel="stylesheet"]').forEach(linkEl => {
        const link = linkEl as HTMLLinkElement;
        const href = link.getAttribute('href');
        if (href && href.startsWith('/')) {
          link.href = `file://${buildPath}${href}`;
        }
      });
    }, buildDir);
    
    // Wait for stylesheets to reload
    await page.waitForTimeout(100);
    
    // Skip font loading check that causes issues with Astro's build output
    // Just give time for rendering
    await page.waitForTimeout(1000);

    console.log('📸 Taking screenshot...');
    await page.screenshot({
      path: `${outputPngPath}.png`,
      type: 'png'
    });

    await browser.close();
    console.log(`✅ PNG saved to ${outputPngPath}.png`);
  } catch (error) {
    console.error('❌ Failed to generate PNG:', error);
    throw error;
  }
};
