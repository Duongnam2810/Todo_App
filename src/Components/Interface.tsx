export interface TodoItem {
  id: number;
  text: string;
  isComplete: boolean;
}

export interface TodoProps {
  todos: TodoItem[];
  completeTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, value: TodoItem) => void;
}