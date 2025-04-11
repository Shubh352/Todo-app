import React from 'react'
import { FaDeleteLeft } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
const DelEdit = ({ handleDelete, handleEdit, toggleFinished ,item}) => {
    return (
        <div className="flex items-center gap-2 flex-wrap justify-end sm:flex-nowrap flex-shrink-0 max-w-full">
            <input type="checkbox" checked={item.isCompleted} onChange={() => toggleFinished(item.id)} />
            <button onClick={() => handleDelete(item.id)} className='text-red-400 hover:text-red-600'><FaDeleteLeft /></button>
            <button onClick={() => handleEdit(item.id)} className='text-blue-400 hover:text-blue-600'><FaRegEdit /></button>
        </div>
    )
}

export default DelEdit