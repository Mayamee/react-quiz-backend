import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { loggerMiddleware } from "./middleware/logger.middleware.js";
import quizRouter from "./routes/router.js";
import { catchErrorMiddleware } from "./middleware/catchError.middleware.js";
dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 5050;
const ORIGINS = process.env.ORIGINS ? process.env.ORIGINS.split(" ") : "*";

// app.use(loggerMiddleware);
app.use(
  cors({
    origin: ORIGINS,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", quizRouter);
app.use("*", (_req, res) => {
  res.status(404).json({ data: "Not found" });
});
app.use(catchErrorMiddleware);

main().catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
