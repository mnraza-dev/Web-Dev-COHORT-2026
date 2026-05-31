import { getGeminiClient } from "./config";

const client = getGeminiClient();

const response = await client.chat.completions.create({
  model: "gemini-2.5-flash",
  messages: [
    {
      role: "system",
      content: "You are a helpful assistant that can help with travel planning.",
    },
    {
      role: "user",
      content: "I want to travel to Tokyo, Japan. What are the best places to visit?",
    },
  ],
});

console.log(response.choices[0]?.message.content);