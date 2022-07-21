import express from "express";
import dotenv from "dotenv";
dotenv.config();
//TODO CORS
const app = express();
const PORT = process.env.SERVER_PORT || 5050;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
