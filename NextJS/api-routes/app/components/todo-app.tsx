"use client";

import { useState } from "react";
import { createTodo, deleteTodo, updateTodo } from "@/lib/api";
import type { Todo } from "@/lib/types";
import { TodoForm } from "./todo-form";
import { TodoList } from "./todo-list";

type TodoAppProps = {
  initialTodos: Todo[];
};

export function TodoApp({ initialTodos }: TodoAppProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  async function handleAdd(title: string) {
    const todo = await createTodo(title);
    if (!todo) return false;
    setTodos((prev) => [todo, ...prev]);
    return true;
  }

  async function handleUpdate(id: string, title: string) {
    const updated = await updateTodo(id, { title });
    if (!updated) return false;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? updated : t))
    );
    return true;
  }

  async function handleToggleComplete(id: string, completed: boolean) {
    const updated = await updateTodo(id, { completed });
    if (!updated) return false;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? updated : t))
    );
    return true;
  }

  async function handleDelete(id: string) {
    const ok = await deleteTodo(id);
    if (!ok) return false;
    setTodos((prev) => prev.filter((t) => t.id !== id));
    return true;
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
          Todos
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {todos.length} {todos.length === 1 ? "item" : "items"}
        </p>
      </header>

      <div className="mb-6">
        <TodoForm onAdd={handleAdd} />
      </div>

      <TodoList
        todos={todos}
        onUpdate={handleUpdate}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
      />
    </div>
  );
}
