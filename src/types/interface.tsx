export interface TodoItem {
  id: number;
  text: string;
  isComplete: boolean;
  priority?: 'low' | 'medium' | 'high';
}

export interface TodoProps {
  todos: TodoItem[];
  completeTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, value: TodoItem) => void;
}

export interface TodoFormProps {
  action?: 'add' | 'edit' | 'view';
  data?: TodoItem;
  onSubmit: (todo: TodoItem) => void;
}

export interface TodoFilterProps {
  filter: string;
  setFilter: (filter: string) => void; // cần thiết để thay đổi trạng thái filter khi người dùng click.
  searchText: string;
  setSearchText: (text: string) => void;
}

export const FILTER_TYPES = {
  ALL: "All",
  COMPLETED: "Completed",
  ACTIVE: "Active",
};