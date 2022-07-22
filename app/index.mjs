import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { loggerMiddleware } from "./middleware/logger.middleware.mjs";
import quizRouter from "./routes/quiz.router.mjs";
import { catchErrorMiddleware } from "./middleware/catchError.middleware.mjs";
dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 5050;

app.use(loggerMiddleware);
app.use(cors());
app.use(express.json());
app.use("/api", quizRouter);
app.use("*", (req, res) => {
  res.status(404).json({ data: "Not found" });
});
app.use(catchErrorMiddleware);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
