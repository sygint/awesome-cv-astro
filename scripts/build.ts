import { readdir, readFile } from "node:fs/promises";

import { parse } from "yaml";

import convertToPdf from "./convertToPdf";
import convertToPng from "./convertToPng";

(async () => {
  try {
    const port = 4321;
    const buildPath = "./build";
    const coverLetterPath = `${buildPath}/cover-letter`;

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
    await convertToPdf(port, "/resume/", `./build/${formattedName}.pdf`);
    await convertToPng(port, "/resume/", `./build/${formattedName}.resume`);

    console.log('\n📝 Converting cover letters to PDF and PNG...');
    for (const letter of letters) {
      console.log(`\n📋 Processing ${letter} cover letter...`);
      await convertToPdf(
        port,
        `/cover-letter/${letter}`,
        `./build/cover-letter.${letter}.pdf`
      );
      await convertToPng(
        port,
        `/cover-letter/${letter}`,
        `./build/cover-letter.${letter}`
      );
    }

    console.log('\n✅ All conversions completed successfully!');
  } catch (e) {
    console.log(e);
  }
})();
