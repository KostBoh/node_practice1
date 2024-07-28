import express from "express";
import cors from "cors";
import morgan from "morgan";
import productsRouter from "./routes/productsRouter.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use("/api/products", productsRouter);
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
