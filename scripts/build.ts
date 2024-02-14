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

    await convertToPdf(port, "/resume/", `./build/${formattedName}.pdf`);
    console.log(`Converting resume to PDF...`);

    await convertToPng(
      `./build/${formattedName}.pdf`,
      `./build/${formattedName}.resume`
    );
    console.log(`Converting resume to PNG...`);

    for (const letter of letters) {
      await convertToPdf(
        port,
        `/cover-letter/${letter}`,
        `./build/cover-letter.${letter}.pdf`
      );
      console.log(`Converting ${letter} cover letter to PDF...`);

      await convertToPng(
        `./build/cover-letter.${letter}.pdf`,
        `./build/cover-letter.${letter}`
      );
      console.log(`Converting ${letter} cover letter to PNG...`);
    }
  } catch (e) {
    console.log(e);
  }
})();
