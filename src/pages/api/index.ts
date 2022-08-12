import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "node:fs/promises";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const myFiles = await new Promise<any>((resolve, reject) => {
      const form = new formidable.IncomingForm();
      const files: any = [];
      form.on("file", function (field, file) {
        files.push(file);
      });
      form.on("end", () => resolve(files));
      form.on("error", (err) => reject(err));
      form.parse(req, () => {});
    }).catch((e) => {
      console.log(e);
      res.status(500);
    });

    // WE only ever expect one file in the array:
    const workingFile = myFiles[0].filepath;
    const readJson = await fs.readFile(workingFile, "utf-8");
    res.status(200).json({ json: readJson });
  }
}
