import { useState } from 'react'
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import type { TodoItem, TodoProps } from './interface';

const Todo: React.FC<TodoProps> = ({todos, completeTodo, removeTodo, updateTodo}) => {

  const [edit, setEdit] = useState<{ id: number | null; value: string }>({
    id: null,
    value: ''
  });

  const submitUpdate = (newValue: TodoItem) => {
    if (edit.id === null) return;

    updateTodo(edit.id, newValue);
    setEdit({ id: null, value: '' });
  };

  if (edit.id !== null) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }
  
  return todos.map((todo: TodoItem, index: number) => (
    <div 
      className={todo.isComplete ? "todo-row completed" : "todo-row"}
      key={index}
    >
      <div key={todo.id} onClick={() => {completeTodo(todo.id)}}>
        {todo.text}
      </div>

      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        >
        </RiCloseCircleLine>
        
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='edit-icon'
        >
        </TiEdit>
      </div>
    </div>
  )) 
};

export default Todo