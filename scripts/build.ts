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

      // Try to load the corresponding YAML file for this letter
      // Assume the YAML file is in ../cover-letters/ and matches the letter directory name
      const yamlPath = join(__dirname, "../cover-letters", `${letter}.yml`);
      let org = "organization", pos = "position";
      try {
        const yamlContent = await readFile(yamlPath, "utf8");
        const letterData = parse(yamlContent);
        org = letterData.company || letterData.organization || org;
        pos = letterData.position || pos;
      } catch (e) {
        console.warn(`⚠️ Could not read YAML for ${letter}:`, e.message);
      }
      // Sanitize for filesystem
      const safe = (s: string) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const outName = `cover-letter.${safe(org)}-${safe(pos)}`;

      await convertToPdf(
        coverLetterHtmlPath,
        `./build/${outName}.pdf`
      );
      await convertToPng(
        coverLetterHtmlPath,
        `./build/${outName}`
      );
    }

    console.log('\n✅ All conversions completed successfully!');
  } catch (e) {
    console.error('❌ Build failed:', e);
    process.exit(1);
  }
})();
