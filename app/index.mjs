import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { loggerMiddleware } from "./middleware/logger.middleware.mjs";
import quizRouter from "./routes/quiz.router.mjs";
import { catchErrorMiddleware } from "./middleware/catchError.middleware.mjs";
const PORT = process.env.SERVER_PORT || 5050;
dotenv.config();

const app = express();

app.use(cors());
app.use(loggerMiddleware);
app.use(express.json());
app.use("/api", quizRouter);
app.use("*", (_req, res) => {
  res.status(404).json({ data: "Not found" });
});
app.use(catchErrorMiddleware);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
