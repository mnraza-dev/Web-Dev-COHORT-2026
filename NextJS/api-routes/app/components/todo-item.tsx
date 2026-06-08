"use client";

import { useState } from "react";
import type { Todo } from "@/lib/types";

type TodoItemProps = {
  todo: Todo;
  onUpdate: (id: string, title: string) => Promise<boolean>;
  onToggleComplete: (id: string, completed: boolean) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
};

export function TodoItem({
  todo,
  onUpdate,
  onToggleComplete,
  onDelete,
}: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    const trimmed = title.trim();
    if (!trimmed || trimmed === todo.title) {
      setEditing(false);
      setTitle(todo.title);
      return;
    }

    setLoading(true);
    const ok = await onUpdate(todo.id, trimmed);
    if (ok) setEditing(false);
    else setTitle(todo.title);
    setLoading(false);
  }

  async function handleDelete() {
    setLoading(true);
    await onDelete(todo.id);
    setLoading(false);
  }

  async function handleToggle() {
    setLoading(true);
    await onToggleComplete(todo.id, !todo.completed);
    setLoading(false);
  }

  return (
    <li className="group flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 transition hover:border-zinc-700">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={loading || editing}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        className="h-4 w-4 shrink-0 cursor-pointer rounded border-zinc-600 bg-zinc-800 text-orange-500 accent-orange-500 focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
      />

      {editing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") {
              setEditing(false);
              setTitle(todo.title);
            }
          }}
          disabled={loading}
          autoFocus
          className="flex-1 rounded border border-zinc-600 bg-zinc-800 px-2 py-1 text-zinc-100 outline-none focus:border-orange-500"
        />
      ) : (
        <span
          className={`flex-1 text-sm ${
            todo.completed
              ? "text-zinc-500 line-through"
              : "text-zinc-200"
          }`}
        >
          {todo.title}
        </span>
      )}

      <div className="flex shrink-0 gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100">
        {editing ? (
          <>
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="rounded px-2.5 py-1 text-xs font-medium text-orange-400 transition hover:bg-orange-500/10"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setTitle(todo.title);
              }}
              disabled={loading}
              className="rounded px-2.5 py-1 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setEditing(true)}
              disabled={loading}
              className="rounded px-2.5 py-1 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-orange-400"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="rounded px-2.5 py-1 text-xs font-medium text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
