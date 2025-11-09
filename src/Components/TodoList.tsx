import { useState } from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm';
import type { TodoItem } from './interface';

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (todo: TodoItem) => {
    if (!todo.text || /^\s*$/.test(todo.text)) return;

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const updateTodo = (todoId: number, newValue: TodoItem) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) return;

    setTodos((prev) => 
      prev.map(item => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  

  const completeTodo = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
    );
    setTodos(updatedTodos);
  };
  
  return <>
    <h1>What's the Plan for Today?</h1>
    <TodoForm onSubmit={addTodo} />
    <Todo 
      todos={todos} 
      completeTodo={completeTodo} 
      removeTodo={removeTodo}
      updateTodo={updateTodo}
    />
  </>
}

export default TodoList