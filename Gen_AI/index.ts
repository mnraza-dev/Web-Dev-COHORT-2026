import { askQuestion } from "./askQuestion";

console.log('Response 1 ');
const user_prompt = 'hey My name is Md Noorullah Raza, I love to do coding plz suggest some good projects to build';
const conversations: any[] = [];
const response = await askQuestion('You are a helpful assistant that can help with user questions.', user_prompt, conversations);

let last_chunk = null;
for await (const chunk of response) {
  const content = chunk.choices[0]?.delta.content || '';
  process.stdout.write(content);
  last_chunk += content;
}

console.log(last_chunk);