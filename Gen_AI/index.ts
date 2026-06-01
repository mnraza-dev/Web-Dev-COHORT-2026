import { askQuestion } from "./askQuestion";

console.log('Response 1 ');
const user_prompt = 'where I should go this summer vacation?';
const system_prompt = 'You are a helpful assistant that can help with travel planning.';
const conversations: any[] = [];
const response = await askQuestion(system_prompt, user_prompt, conversations);
console.log(response);