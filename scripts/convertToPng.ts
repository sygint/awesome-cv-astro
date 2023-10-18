import { parse } from "node:path";

import { fromPath } from "pdf2pic";

export default async (input: string, output: string) => {
  const { dir, base } = parse(output);

  console.log({ dir, base });
  const convert = fromPath(input, {
    quality: 100,
    density: 100,
    saveFilename: base,
    savePath: dir,
    format: "png",
    width: 827,
    height: 1169,
  });
  const pageToConvertAsImage = 1;

  await convert(pageToConvertAsImage, { responseType: "image" });

  console.log(`${input} -> ${output}.png`);
};
