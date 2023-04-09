import React from 'react';
import { deleteIcon, edit, trueIcon } from '../assets';
import { useNavigate } from 'react-router-dom';

const Task = ({ task, index, deleteTask, getSingleTask, setToComplete, isEditing, isMobile }) => {

  const navigateTo = useNavigate();

  const handleClick = () => {
    if (isMobile) {
      const taskID = task._id.toString();
      navigateTo('/edit/' + taskID);
    } else if (!isEditing) {
      getSingleTask(task);
    }
  };

  return (
    <div className='flex flex-col bg-white w-2/3 mt-5 rounded-xl p-5
    hover:drop-shadow-lg task-card'>
      <p className=' text-paragraph flex font-mono font-semibold min-h-[120px] '>
        <b>{index + 1}. </b>
        {task.name}
      </p>
      
      <div className="flex flex-row h-full space-x-4 justify-end sm:opacity-0 btn-group opacity-100">
        <div 
        className='hover:drop-shadow-lg tooltip-btn' data-tooltip="finished!"
        onClick={() => {setToComplete(task)}}>
            <img src={trueIcon} alt='finished' className='w-[24px]'/>
        </div>
        <div className='hover:drop-shadow-lg tooltip-btn2' data-tooltip="edit"
        onClick={handleClick} >
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