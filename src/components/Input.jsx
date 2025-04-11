import React from 'react'
const Input = ({ todo, handleInput }) => {
    return (
        <input
            onChange={handleInput}
            value={todo}
            type="text"
            placeholder="Enter your task..."
            className="w-full sm:w-3/4 p-2 px-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner transition duration-200"
        />
    )
}

export default Input