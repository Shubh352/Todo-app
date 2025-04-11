import React from 'react'
import AllLists from './AllLists';
import DelEdit from './DelEdit';
import { motion, AnimatePresence } from 'framer-motion';
const TodoList = ({
    todos,
    showActiveTask,
    showAllTasks,
    showCompletedTask,
    toggleFinished,
    handleDelete,
    handleEdit,
    editingId,
}) => {
    return (
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
                        <AllLists item={item} />
                        <DelEdit handleDelete={handleDelete} handleEdit={handleEdit} toggleFinished={toggleFinished} item={item} />
                    </motion.li>

                ))}
            </AnimatePresence>
        </ul>
    )
}

export default TodoList