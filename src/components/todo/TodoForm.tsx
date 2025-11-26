import { useEffect, useState } from 'react'
import type { TodoFormProps, TodoItem } from '../../types/interface';

const TodoForm: React.FC<TodoFormProps> = ({ action, data, onSubmit }) => {
  const [text, setText] = useState<string>('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);

  useEffect(() => {
    if (action != 'add' && data != null) {
      setText(data.text ?? '');
      setPriority(data.priority ?? 'medium');
      setIsComplete(!!data.isComplete);
      if (action == 'view') setIsDisable(true);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text || /^\s*$/.test(text)) return;

    const todo = {
      id: data && data.id ? data.id : Math.floor(Math.random() * 10000),
      text: text.trim(),
      isComplete: isComplete,
      priority: priority,
    };

    onSubmit(todo as TodoItem);

    // clear only when creating new
    if (!data) {
      setText('');
      setPriority('medium');
      setIsComplete(false);
    }
  };

  return (
    <div className='todo-form-container'>
      <form onSubmit={handleSubmit} className='todo-form-vertical' aria-label='todo-form'>
        <div className='todo-form-field'>
          <label className='todo-label'>Todo text</label>
          <input
            placeholder='Add a todo'
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='todo-input-full'
            aria-label='todo-text'
            disabled={isDisable}
          />
        </div>

        <div className='todo-form-field'>
          <label className='todo-label'>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className='todo-select'
            aria-label='todo-priority'
            disabled={isDisable}
          >
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>

        <div className='todo-form-field todo-complete-field'>
          <label style={{ color: '#fff', fontSize: 14, marginRight: 8 }}>Completed</label>
          <label className="checkbox-modern">
            <input
              type="checkbox"
              checked={isComplete}
              onChange={(e) => setIsComplete(e.target.checked)}
              disabled={isDisable}
            />
            <span className="checkmark"></span>
          </label>
        </div>

        {
          isDisable ? (
            <div className='todo-form-field'>
            </div>
          ) : (
            <div className='todo-form-field'>
              <button type='submit' className='todo-form-button'>
                {action == 'edit' ? 'Update Todo' : 'Add Todo'}
              </button>
            </div>
          )
        }
      </form>
    </div>
  );
}

export default TodoForm