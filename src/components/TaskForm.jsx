import React from 'react';

const TaskForm = ({
    createTask,
    name,
    handleInputChange,
    isEditing,
    updateTask,
    tasks,
    completedTasks,
    totalNum,
  }) => {
    return (
      <form className='sm:flex flex-col w-1/3 items-center hidden' onSubmit={isEditing ? updateTask : createTask}>
        <textarea
          className='
          sm:flex h-[400px] w-4/5 bg-slate-50 rounded-md mt-28 border-stroke border-solid border-4 p-3
          text-black font-mono text-2xl font-bold hidden'
          type="text"
          placeholder="Add a Task"
          name="name"
          value={name}
          onChange={handleInputChange}
          style={{ resize: "none" }}
        />
        <button type="submit"
        className=' bg-button text-white font-bold mt-10 py-2 px-4 rounded-md w-4/5  hover:bg-tertiary '>
        {isEditing ? "Confirm" : "Add"}
        </button>
        
        <div className="sm:flex flex-row text-paragraph space-x-4 font-mono mt-16 hidden">
          <p>
            <b>Total Tasks:</b> {totalNum}
          </p>
          <p>
            <b>Completed Tasks:</b> {completedTasks.length}
          </p>
        </div>

      
      </form>
    );
  };
  
  export default TaskForm;