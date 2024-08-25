import multer from "multer";
import path from "node:path";

const tempDirPath = path.resolve("temp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDirPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

export const upload = multer({
  storage: storage,
});
