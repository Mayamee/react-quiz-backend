import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { exec } from "./lib/exec.js";
import { loggerMiddleware } from "./middleware/logger.middleware.js";
import quizRouter from "./routes/quiz.router.js";
import authRouter from "./routes/auth.router.js";
import { catchErrorMiddleware } from "./middleware/catchError.middleware.js";
import { writeToServiceLog } from "./lib/fileWrite.js";
dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 5050;
const ORIGINS = process.env.ORIGINS ? process.env.ORIGINS.split(" ") : "*";

app.use(loggerMiddleware);
app.use(
  cors({
    origin: ORIGINS,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
//Quizes
app.use("/api/quiz", quizRouter);
//Authorization
app.use("/api/auth", authRouter);
app.use("*", (_req, res) => {
  res.status(404).json({ data: "Not found" });
});
app.use(catchErrorMiddleware);
//start app
exec(100, 15000)(main);
//start app

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(PORT, () => {
    writeToServiceLog(
      `${new Date().toUTCString()}\tserver started on port ${PORT}\n`
    );
    console.log(`Server listening on port ${PORT}`);
  });
}
