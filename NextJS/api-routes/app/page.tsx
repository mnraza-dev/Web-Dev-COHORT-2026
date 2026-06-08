import { TodoApp } from "@/app/components/todo-app";
import { getTodos } from "@/lib/todos";

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="flex flex-1 flex-col px-4 py-12 sm:px-6">
      <TodoApp initialTodos={todos} />
    </main>
  );
}
