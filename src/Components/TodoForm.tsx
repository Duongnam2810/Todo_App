import { useState } from 'react'
import type { TodoItem } from './interface';

interface TodoFormProps {
  edit?: { id: number | null; value: string };
  onSubmit: (todo: TodoItem) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ edit, onSubmit }) => {
  const [input, setInput] = useState(edit ? edit.value : '');
  
  console.log(edit);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      isComplete: false,
    });
    setInput('');
  };

  return <form onSubmit={handleSubmit} className='todo-form'>
    {edit ? (
      <>
        <input
          placeholder='Update your item'
          type='text'
          value={ input }
          onChange={(e) => setInput(e.target.value)}
          className='todo-input edit'
        />
        <button className='todo-button edit'>Update</button>
      </>
    ) : (
      <>
        <input
          placeholder='Add a todo'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='todo-input'
        />
        <button className='todo-button'>Add todo</button>
      </>
    )}
  </form>
}

export default TodoForm