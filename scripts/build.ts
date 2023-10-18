import { readdir } from "node:fs/promises";

import convertToPdf from "./convertToPdf";
import convertToPng from "./convertToPng";

(async () => {
  try {
    const port = 4321;
    const buildPath = "./build";
    const coverLetterPath = `${buildPath}/cover-letter`;

    const letters = await readdir(coverLetterPath);

    await convertToPdf(port, "/resume/", "./build/resume.pdf");
    console.log(`Converting resume to PDF...`);

    await convertToPng("./build/resume.pdf", "./build/preview.resume");
    console.log(`Converting resume to PNG...`);

    for (const letter of letters) {
      await convertToPdf(port, `/cover-letter/${letter}`, `./build/cover-letter.${letter}.pdf`);
      console.log(`Converting ${letter} cover letter to PDF...`);

      await convertToPng(`./build/cover-letter.${letter}.pdf`, `./build/preview.cover-letter.${letter}`);
      console.log(`Converting ${letter} cover letter to PNG...`);
    }
  } catch (e) {
    console.log(e);
  }
})();
