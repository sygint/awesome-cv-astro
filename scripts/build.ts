import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { parse } from "yaml";

import convertToPdf from "./convertToPdf";
import convertToPng from "./convertToPng";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  try {
    const buildPath = join(__dirname, "../build");
    const resumeHtmlPath = join(buildPath, "resume/index.html");
    const coverLetterPath = join(buildPath, "cover-letter");

    const yaml = await readFile("./resume-details.yml", "utf8");
    const {
      header: { name },
    } = parse(yaml);
    const formattedName = name
      .split(" ")
      .map((n: string) => n.replace(".", ""))
      .join("-");

    const letters = await readdir(coverLetterPath);

    console.log('\n📄 Converting resume to PDF and PNG...');
    await convertToPdf(
      resumeHtmlPath,
      `./build/${formattedName}.pdf`
    );
    await convertToPng(
      resumeHtmlPath,
      `./build/${formattedName}.resume`
    );

    console.log('\n📝 Converting cover letters to PDF and PNG...');
    for (const letter of letters) {
      console.log(`\n📋 Processing ${letter} cover letter...`);
      const coverLetterHtmlPath = join(coverLetterPath, letter, "index.html");
      
      await convertToPdf(
        coverLetterHtmlPath,
        `./build/cover-letter.${letter}.pdf`
      );
      await convertToPng(
        coverLetterHtmlPath,
        `./build/cover-letter.${letter}`
      );
    }

    console.log('\n✅ All conversions completed successfully!');
  } catch (e) {
    console.error('❌ Build failed:', e);
    process.exit(1);
  }
})();
