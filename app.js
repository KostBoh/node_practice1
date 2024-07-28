import express from "express";

import cors from "cors";

import morgan from "morgan";

const app = express();

const port = 3000;

app.use(express.json());

app.use(morgan("tiny"));

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
