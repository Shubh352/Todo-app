import React from 'react'

const Empty = () => {
    return (
        <div className='flex flex-col items-center bg-gray-900 rounded-xl p-5 shadow-lg shadow-blue-500/40 mt-5'>
            <img className='w-40 h-40 object-cover rounded-full border-4 border-blue-400 shadow-md shadow-blue-300 transition duration-300 hover:scale-105' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVVdBijVlfwk_snyuoxzfm9zofCe1h32mDYg&s" alt="" />
            <h2 className='text-center text-blue-500 font-semibold text-2xl mt-3'>No To-do's to display</h2>
        </div>
    )
}

export default Empty