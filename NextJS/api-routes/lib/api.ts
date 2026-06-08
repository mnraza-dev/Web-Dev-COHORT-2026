import type { Todo, TodoApiResponse } from "./types";

export async function createTodo(title: string): Promise<Todo | null> {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  const json: TodoApiResponse = await res.json();
  return json.success && json.data ? json.data : null;
}

export type TodoUpdate = {
  title?: string;
  completed?: boolean;
};

export async function updateTodo(
  id: string,
  updates: TodoUpdate
): Promise<Todo | null> {
  const res = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  const json: TodoApiResponse = await res.json();
  return json.success && json.data ? json.data : null;
}

export async function deleteTodo(id: string): Promise<boolean> {
  const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
  const json: TodoApiResponse = await res.json();
  return json.success;
}
