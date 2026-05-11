import { getGeminiClient } from "./config";

const client = getGeminiClient();

const response = await client.chat.completions.create({
  model: "gemini-2.5-flash",
  messages: [
    {
      role: "user",
      content: "Hello Gemini",
    },
  ],
});

console.log(response.choices[0]?.message.content);