import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './components/todo/TodoList'

function App() {
  return (
    <div className='todo_app'>
      <div className='info'>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h2>Vite + React + Dnam2810</h2>
      </div>
      <TodoList />
    </div>
  )
}

export default App
