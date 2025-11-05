import { chromium } from 'playwright';
import { existsSync } from 'fs';

// Skip host validation on NixOS - we use nixpkgs browsers
process.env.PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = 'true';

export default async (inputHtmlPath: string, outputPdfPath: string) => {
  // Validate that the HTML file exists
  if (!existsSync(inputHtmlPath)) {
    console.error(`❌ Error: ${inputHtmlPath} not found.`);
    console.error('   Run "astro build" first.');
    throw new Error(`HTML file not found: ${inputHtmlPath}`);
  }

  try {
    console.log('🚀 Launching browser...');
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Emulate print media BEFORE loading the page for correct CSS application
    await page.emulateMedia({ media: 'print' });

    const fileUrl = `file://${inputHtmlPath}`;
    console.log(`📄 Loading ${inputHtmlPath}...`);
    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    
    // Wait for any web fonts to load
    await page.evaluate(() => document.fonts.ready);
    
    // Give a small buffer for final rendering
    await page.waitForTimeout(500);

    console.log('📝 Generating PDF...');
    await page.pdf({
      path: outputPdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });

    await browser.close();
    console.log(`✅ PDF saved to ${outputPdfPath}`);
  } catch (error) {
    console.error('❌ Failed to generate PDF:', error);
    throw error;
  }
};
