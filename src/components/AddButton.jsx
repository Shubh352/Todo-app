import React from 'react'
const AddButton = ({handleAdd}) => {
    return (
        <button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
        >
            ➕ Add Task
        </button>
    )
}

export default AddButton