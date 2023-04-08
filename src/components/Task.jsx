import React from 'react';
import { deleteIcon, edit, trueIcon } from '../assets';

const Task = ({ task, index, deleteTask, getSingleTask, setToComplete, isEditing }) => {
  return (
    <div className='flex flex-col bg-white w-2/3 mt-5 rounded-xl p-5
    hover:drop-shadow-lg task-card'>
      <p className=' text-paragraph flex font-mono font-semibold min-h-[120px] '>
        <b>{index + 1}. </b>
        {task.name}
      </p>
      
      <div className="flex flex-row h-full space-x-4 justify-end opacity-0 btn-group">
        <div 
        className='hover:drop-shadow-lg tooltip-btn' data-tooltip="finished!"
        onClick={() => {setToComplete(task)}}>
            <img src={trueIcon} alt='finished' className='w-[24px]'/>
        </div>
        <div className='hover:drop-shadow-lg tooltip-btn2' data-tooltip="edit"
        onClick={() => {isEditing ? null : getSingleTask(task)}} >
            {!isEditing && <img src={edit} alt='edit' className='w-[24px]'/>}
        </div>
        <div className='hover:drop-shadow-lg tooltip-btn3'  data-tooltip="delete"
        onClick={() => {isEditing ? null : deleteTask(task._id)}}>
            {!isEditing && <img src={deleteIcon} alt='delete' className='w-[24px]'/>}
        </div>
      </div>
    </div>
  );
};

export default Task;