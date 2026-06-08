import { headers } from "next/headers";
import type { Todo, TodosApiResponse } from "./types";

export async function getTodos(): Promise<Todo[]> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/todos`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const json: TodosApiResponse = await res.json();
  return json.data ?? [];
}
