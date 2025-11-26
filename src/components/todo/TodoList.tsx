import { useEffect, useState, useMemo } from 'react'
import Todo from './Todo';
import { FILTER_TYPES, type TodoItem } from '../../types/interface';
import TodoFilter from './TodoFilter';
import TodoForm from './TodoForm';
import Drawer from '../ui/Drawer';

const STORAGE_KEY = 'react-todo-app-v1';

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load todos from localStorage', error);
      return [];
    }
  });

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>(FILTER_TYPES.ALL);
  const [searchText, setSearchText] = useState<string>("");

  // Lưu vào localStorage mỗi khi `todos` thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to localStorage', error);
    }
  }, [todos]);

  // useMemo sẽ chỉ chạy lại khi một trong các phụ thuộc thay đổi
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case FILTER_TYPES.COMPLETED:
        if (searchText.trim() !== "") {
          return todos.filter(todo => todo.isComplete === true
            && todo.text.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
        }
        return todos.filter(todo => todo.isComplete === true);
      case FILTER_TYPES.ACTIVE:
        if (searchText.trim() !== "") {
          return todos.filter(todo => todo.isComplete === false
            && todo.text.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
        }
        return todos.filter(todo => todo.isComplete === false);
      case FILTER_TYPES.ALL:
        if (searchText.trim() == "") return todos;
        return todos.filter(todo => todo.text.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
      default:
        return todos;
    }
  }, [todos, filter, searchText])

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

  const handleAddAndClose = (todo: TodoItem) => {
    addTodo(todo);
    setShowDrawer(false);
  };

  return <>
    <div className='info'>
      <h1>What's the Plan for Today?</h1>
    </div>

    <div className='action'>
      <button
        className='todo-button'
        onClick={() => setShowDrawer(true)}
      >
        Add Todo
      </button>
    </div>

    <Drawer open={showDrawer} onClose={() => setShowDrawer(false)}>
      <TodoForm action='add' onSubmit={handleAddAndClose} />
    </Drawer>

    <TodoFilter
      filter={filter}
      setFilter={setFilter}
      searchText={searchText}
      setSearchText={setSearchText}
    />

    <Todo
      todos={filteredTodos}
      completeTodo={completeTodo}
      removeTodo={removeTodo}
      updateTodo={updateTodo}
    />
  </>
}

export default TodoList