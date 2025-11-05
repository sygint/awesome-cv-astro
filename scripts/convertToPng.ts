import { chromium } from 'playwright';

// Skip host validation on NixOS - we use nixpkgs browsers
process.env.PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = 'true';

export default async (port: number, input: string, output: string) => {
  try {
    console.log('🚀 Launching browser for PNG screenshot...');
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Set viewport to A4 proportions (width: 827px, height: 1169px at 100 DPI)
    await page.setViewportSize({ width: 827, height: 1169 });

    // Emulate print media for correct CSS application
    await page.emulateMedia({ media: 'print' });

    const url = `http://localhost:${port}${input}`;
    console.log(`📄 Loading ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for any web fonts to load
    await page.evaluate(() => document.fonts.ready);
    
    // Give a small buffer for final rendering
    await page.waitForTimeout(500);

    console.log('📸 Taking screenshot...');
    await page.screenshot({
      path: `${output}.png`,
      fullPage: true,
      type: 'png'
    });

    await browser.close();
    console.log(`✅ PNG saved to ${output}.png`);
  } catch (error) {
    console.error('❌ Failed to generate PNG:', error);
    throw error;
  }
};
