import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import { convert } from "./sharp.js";

const app = express();
dotenv.config();
app.use(cors({origin:"http://localhost:5173"}));
const storage = multer.memoryStorage();
const upload = multer();

app.post("/img", upload.single("img"), async (req, res) => {
  const arr = req.file.buffer
  await convert(arr)
  res.send("successfull")
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
