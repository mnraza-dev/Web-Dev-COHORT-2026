"use client";

import type { Todo } from "@/lib/types";
import { TodoItem } from "./todo-item";

type TodoListProps = {
  todos: Todo[];
  onUpdate: (id: string, title: string) => Promise<boolean>;
  onToggleComplete: (id: string, completed: boolean) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
};

export function TodoList({
  todos,
  onUpdate,
  onToggleComplete,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-800 py-12 text-center">
        <p className="text-sm text-zinc-500">No todos yet. Add one above.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
