import convertToPdf from "./convertToPdf";
import convertToPng from "./convertToPng";

(async () => {
  try {
    const port = 4321;
    await convertToPdf(port, "./build/resume.pdf");
    await convertToPng("./build/resume.pdf");
  } catch (e) {
    console.log(e);
  }
})();
