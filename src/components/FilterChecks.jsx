import React from 'react'

const FilterChecks = ({
    showCompletedTask,
    showActiveTask,
    showAllTasks,
    handleCompletedTasks,
    handleActiveTasks,
    handleAllTasks,
}) => {
    return (
        <div className='flex justify-center gap-3 mt-4'>
            <input onChange={handleAllTasks} type="checkbox" checked={showAllTasks} />All Tasks
            <input onChange={handleActiveTasks} type="checkbox" checked={showActiveTask} />Active Tasks
            <input onChange={handleCompletedTasks} type="checkbox" checked={showCompletedTask} />Completed Tasks</div>
    )
}

export default FilterChecks