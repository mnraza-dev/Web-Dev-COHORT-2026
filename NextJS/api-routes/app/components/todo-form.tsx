"use client";

import { FormEvent, useState } from "react";

type TodoFormProps = {
  onAdd: (title: string) => Promise<boolean>;
};

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    const ok = await onAdd(trimmed);
    if (ok) setTitle("");
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        disabled={loading}
        className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={loading || !title.trim()}
        className="rounded-lg bg-orange-500 px-5 py-2.5 font-medium text-zinc-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? "Adding…" : "Add"}
      </button>
    </form>
  );
}
