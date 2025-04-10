import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaDeleteLeft } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
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
          <h1 className="text-4xl font-bold text-center text-white drop-shadow-lg hover:drop-shadow-2xl transition duration-500">
            Todo-App ✨
          </h1>
          <div className="flex flex-col items-center gap-4 bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-md mt-6 mx-4">
            <h2 className="text-center text-2xl font-semibold text-blue-300 drop-shadow-sm">
              ✍️ Add a Todo
            </h2>
            <input
              onChange={handleInput}
              value={todo}
              type="text"
              placeholder="Enter your task..."
              className="w-full sm:w-3/4 p-2 px-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner transition duration-200"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
            >
              ➕ Add Task
            </button>
          </div>

          <h2 className='text-center text-xl font-bold mt-4'>Your To-do's</h2>
          <div className="todos">
            {todos.length === 0 ? (<div className='flex flex-col items-center bg-gray-900 rounded-xl p-5 shadow-lg shadow-blue-500/40 mt-5'>
              <img className='w-40 h-40 object-cover rounded-full border-4 border-blue-400 shadow-md shadow-blue-300 transition duration-300 hover:scale-105' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVVdBijVlfwk_snyuoxzfm9zofCe1h32mDYg&s" alt="" />
              <h2 className='text-center text-blue-500 font-semibold text-2xl mt-3'>No To-do's to display</h2>
            </div>) : (<div className='flex justify-center gap-3 mt-4'>
              <input onChange={handleAllTasks} type="checkbox" checked={showAllTasks} />All Tasks
              <input onChange={handleActiveTasks} type="checkbox" checked={showActiveTask} />Active Tasks
              <input onChange={handleCompletedTasks} type="checkbox" checked={showCompletedTask} />Completed Tasks</div>)}
            {(showAllTasks || showActiveTask || showCompletedTask) && (
              <ul className="mt-7 max-h-[400px] overflow-y-auto pr-2 scroll-smooth scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-gray-700">
                <AnimatePresence>
                  {todos.filter(item => {
                    if (showAllTasks) return true;
                    if (showActiveTask) return !item.isCompleted;
                    if (showCompletedTask) return item.isCompleted;
                    return false;
                  }).map(item => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                      className={`bg-gray-800 p-4 my-3 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${item.id === editingId ? 'border-2 border-blue-400' : ''} w-full overflow-hidden`}
                    >
                      <div className="flex-1 min-w-0 break-words">
                        <span className={`text-xl font-semibold break-words break-all whitespace-pre-wrap ${item.isCompleted ? 'line-through text-gray-400' : ''}`}>
                          {item.text}
                        </span>
                        <div className="text-sm text-gray-400 mt-1">Time: {item.createdAt}</div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap justify-end sm:flex-nowrap flex-shrink-0 max-w-full">
                        <input type="checkbox" checked={item.isCompleted} onChange={() => toggleFinished(item.id)} />
                        <button onClick={() => handleDelete(item.id)} className='text-red-400 hover:text-red-600'><FaDeleteLeft /></button>
                        <button onClick={() => handleEdit(item.id)} className='text-blue-400 hover:text-blue-600'><FaRegEdit /></button>
                      </div>
                    </motion.li>

                  ))}
                </AnimatePresence>
              </ul>
            )}
          </div>
        </div >
      </div>
    </>
  )
}

export default App
