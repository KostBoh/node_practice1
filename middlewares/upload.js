import multer from "multer";
import path from "node:path";
import generator from "generate-password";

const tempDirPath = path.resolve("temp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDirPath);
  },
  filename: (req, file, cb) => {
    // const hash = Date.now();

    const hash = generator.generate({
      length: 4,
      numbers: true,
    });
    const newFilename = req.params.id + "_" + hash + "_" + file.originalname;
    cb(null, newFilename);
  },
  limits: {
    fileSize: 1048576,
  },
});

export const upload = multer({
  storage: storage,
});
