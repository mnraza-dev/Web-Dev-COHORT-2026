import { checkOpenAI } from "./config";
const client = await checkOpenAI();
const model="gemini-2.5-flash"

const response = await client.chat.completions.create({
  model,
  messages: [ 
    {
      role: "system",
      content: "You are a helpful assistant that can help with travel planning.",
    },
    {
      role: "user",
      content: "where I should go this summer vacation?",
    },
  ],
});

console.log(response.choices[0]?.message.content);

const usage_stats={
  prompt_tokens: response.usage?.prompt_tokens,
  completion_tokens: response.usage?.completion_tokens,
  total_tokens: response.usage?.total_tokens,
};

console.table(usage_stats);
