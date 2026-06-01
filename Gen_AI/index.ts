import { askQuestion } from "./askQuestion";

console.log('Response 1 ');
const user_prompt = 'hey My name is Md Noorullah Raza, I love to do coding plz suggest some good projects to build';
const conversations: any[] = [];
const response = await askQuestion('You are a helpful assistant that can help with user questions.', user_prompt, conversations);
console.log(response);

const user1_prompt = 'what is my name?';
const response1 = await askQuestion('answer in a line', user1_prompt, conversations);
console.log(response1);