import dotenv from "dotenv";

dotenv.config();
const API_KEY = process.env.GEMINI_API_KEY;

export const apiKeyChecker = () => {
  if (!API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }
};

export const checkOpenAI = async ()=>{
  const openai= (await import("openai")).default;
  const client = new openai.OpenAI({
    apiKey:API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
  })
  if(!client){
    console.error("Error; Failed to initialize the OpenAI Client");
    process.exit(1);
  }
  console.log("OpenAI Client initialized successfully");
  return client;
}

