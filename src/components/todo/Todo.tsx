import { useState } from 'react'
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill, RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import TodoForm from './TodoForm';
import type { TodoItem, TodoProps } from '../../types/interface';
import Drawer from '../ui/Drawer';
import { TfiEye } from 'react-icons/tfi';

const Todo: React.FC<TodoProps> = ({ todos, completeTodo, removeTodo, updateTodo }) => {

  const [action, setAction] = useState<'add' | 'edit' | 'view'>();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [data, setData] = useState<TodoItem>();

  const openDrawer = (item: TodoItem, actionType: any) => {
    setAction(actionType);
    setShowDrawer(true);
    setData(item);
  }

  const submitUpdate = (newValue: TodoItem) => {
    if (data?.id === null) return;

    updateTodo(data!.id, newValue);
    
    setShowDrawer(false);
  };

  return (
    <>
      <Drawer open={showDrawer} onClose={() => setShowDrawer(false)}>
        <TodoForm action={action} data={data} onSubmit={submitUpdate} />
      </Drawer>
      {
        todos.map((todo: TodoItem, index: number) => (
          <div
            className={
              todo.isComplete ? "todo-row completed" : "todo-row" +
              todo.priority ? `todo-row priority-${todo.priority}` : "todo-row"
            }
            key={index}
          >
            <div key={todo.id}>
              <span className={todo.priority ? `priority-${todo.priority}` : "todo-text-row"}>{todo.text}</span>
            </div>

            <div className='icons'>
              {
                todo.isComplete ? (
                  <RiCheckboxCircleFill
                    onClick={() => { completeTodo(todo.id) }}
                    className='icon'
                    title="Mark as incomplete"
                  ></RiCheckboxCircleFill>
                ) : (
                  <RiCheckboxBlankCircleLine
                    onClick={() => { completeTodo(todo.id) }}
                    className='icon'
                    title="Mark as complete"
                  ></RiCheckboxBlankCircleLine>
                )
              }

              <TiEdit
                onClick={() => openDrawer(todo, 'edit')}
                className='icon'
                title="Edit task"
              >
              </TiEdit>

              <TfiEye
                onClick={() => openDrawer(todo, 'view')}
                className='icon'
                title="View task"
              >
              </TfiEye>

              <RiCloseCircleLine
                onClick={() => removeTodo(todo.id)}
                className='icon-no-margin'
                title="Delete task"
              >
              </RiCloseCircleLine>
            </div>
          </div>
        ))
      }
    </>
  );
};

export default Todo