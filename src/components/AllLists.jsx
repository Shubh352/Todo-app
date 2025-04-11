import React from 'react'

const AllLists = ({item}) => {
    return (
        <div className="flex-1 min-w-0 break-words">
            <span className={`text-xl font-semibold break-words break-all whitespace-pre-wrap ${item.isCompleted ? 'line-through text-gray-400' : ''}`}>
                {item.text}
            </span>
            <div className="text-sm text-gray-400 mt-1">Time: {item.createdAt}</div>
        </div>
    )
}

export default AllLists