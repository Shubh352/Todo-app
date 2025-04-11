import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Heading from './components/Heading';
import Input from './components/Input';
import AddButton from './components/AddButton';
import TodoList from './components/TodoList';
import FilterChecks from './components/FilterChecks';
import Empty from './components/Empty';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [showAllTasks, setShowAllTasks] = useState(true)
  const [showActiveTask, setshowActiveTask] = useState(false)
  const [showCompletedTask, setshowCompletedTask] = useState(false)
  const [deletingId, setdeletingId] = useState(null)
  const [editingId, seteditingId] = useState(null)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleInput = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    if (todo.trim() === '') return;

    const newTodo = {
      id: uuidv4(),
      text: todo,
      isCompleted: false,
      createdAt: new Date().toLocaleString()
    };

    setTodos([...todos, newTodo]);
    setTodo('');
  }

  const handleAllTasks = () => {

    setShowAllTasks(prev => !prev);
    setshowActiveTask(false);
    setshowCompletedTask(false);
  }

  const handleCompletedTasks = () => {
    setshowCompletedTask(prev => !prev);
    setShowAllTasks(false);
    setshowActiveTask(false);
  }


  const handleActiveTasks = () => {
    setshowActiveTask(prev => !prev)
    setShowAllTasks(false)
    setshowCompletedTask(false);
  }



  const toggleFinished = (id) => {
    let updateTodo = todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    )
    setTodos(updateTodo)
  }

  const handleDelete = (id) => {
    setdeletingId(id);
    setTimeout(() => {
      const updateTodos = todos.filter(todo => todo.id !== id)
      setTodos(updateTodos);
      setdeletingId(null)
    }, 300);
  }

  const handleEdit = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id)
    if (!todoToEdit) return;
    setTodo(todoToEdit.text)
    setTodos(todos.filter(todo => todo.id !== id))
    seteditingId(id);
    setTimeout(() => seteditingId(null), 1000);
  }




  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black animate-gradient-x overflow-x-hidden">
        <Navbar />
        <div className=" text-white w-full max-w-3xl px-4 mx-auto mt-5">
          <Heading />
          <div className="flex flex-col items-center gap-4 bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-md mt-6 mx-4">
            <h2 className="text-center text-2xl font-semibold text-blue-300 drop-shadow-sm">
              ✍️ Add a Todo
            </h2>
            <Input todo={todo} handleInput={handleInput} />
            <AddButton handleAdd={handleAdd} />
          </div>
          <h2 className='text-center text-xl font-bold mt-4'>Your To-do's</h2>
          <div className="todos">
            {todos.length === 0 ? (
              <Empty />
            ) : (
              <FilterChecks showCompletedTask={showCompletedTask} showActiveTask={showActiveTask} showAllTasks={showAllTasks} handleCompletedTasks={handleCompletedTasks} handleActiveTasks={handleActiveTasks} handleAllTasks={handleAllTasks} />
            )}
            {(showAllTasks || showActiveTask || showCompletedTask) && (
              <TodoList todos={todos} handleDelete={handleDelete} handleEdit={handleEdit} toggleFinished={toggleFinished} editingId={editingId} showActiveTask={showActiveTask} showAllTasks={showAllTasks} showCompletedTask={showCompletedTask} />
            )}
          </div>
        </div >
      </div>
    </>
  )
}

export default App
