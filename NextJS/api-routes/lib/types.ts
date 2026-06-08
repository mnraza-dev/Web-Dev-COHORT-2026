export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TodosApiResponse = {
  success: boolean;
  data?: Todo[];
  error?: string;
};

export type TodoApiResponse = {
  success: boolean;
  data?: Todo;
  error?: string;
  message?: string;
};
