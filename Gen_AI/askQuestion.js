import { checkOpenAI } from "./config";

const model="gemini-2.5-flash"

const client = await checkOpenAI();

export const askQuestion = async (system_prompt, user_prompt, history) => {
  const response = await client.chat.completions.create({
    model,
    stream: true,
    messages: [
      { role: "system", content: system_prompt },
      ...history,
      { role: "user", content: user_prompt },
    ],
  });
  history.push({
    role:"user",
    content: user_prompt
  });
  history.push({
    role:"assistant",
    content: response.choices[0]?.message.content
  });
  return response.choices[0]?.message.content;
};