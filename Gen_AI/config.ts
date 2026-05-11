import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

export const getGeminiClient = () => {
  if (!API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  return new OpenAI({
    apiKey: API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
  });
};