import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro-exp-03-25" });
    const chat = model.startChat();
    const result = await chat.sendMessage(message);
    res.json({ response: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: `Something went wrong! ${error}` });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));