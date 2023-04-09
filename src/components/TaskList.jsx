import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { URL } from "../App";
import Task from "./Task";
import TaskForm from "./TaskForm";
import React from 'react';
import { loader } from "../assets";
import { coffee } from "../assets";
import { NavLink } from "react-router-dom";

// http://localhost:5000/api/tasks

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");
  const [totalNum, setTotalNum] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });
//   keep updating the variable and we can also use it
  const { name } = formData;
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // add event listener to the screen size
    const mediaQuery = window.matchMedia('(max-width: 680px)');
    // set the initial state
    setIsMobile(mediaQuery.matches);
    // define the event handler
    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    }
    // add the event listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    // remove the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/task`);
      setTotalNum(data.length);
      const unCompletedTasks = data.filter((task) => {
        return task.completed === false;
      });

      const completedTasks = data.filter((task) => {
        return task.completed === true;
      });
      setCompletedTasks(completedTasks);
      setTasks(unCompletedTasks);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
    //   await axios.post(`${URL}/api/tasks`, formData);
      await axios.post(`${URL}/api/task`, formData);
      toast.success("Task added successfully");
      setFormData({ ...formData, name: "" });
      getTasks();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/task/${id}`);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false });
    setTaskID(task._id);
    setIsEditing(true);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty.");
    }
    try {
      await axios.put(`${URL}/api/task/${taskID}`, formData);
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true,
    };
    try {
      await axios.put(`${URL}/api/task/${task._id}`, newFormData);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <div className="flex flex-col sm:flex-row h-full">
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
        tasks={tasks}
        completedTasks={completedTasks}
        totalNum={totalNum}
      />
      <div className='flex flex-col w-full sm:w-2/3 overflow-y-auto items-center mt-24 sm:mb-10 mb-20'>
        {isLoading && (
            <div className="flex flex-col justify-center h-full">
            <img src={loader} alt="Loading" />
            
            </div>
        )}
        {!isLoading && tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-10 mt-24 sm:mt-0">
                <p className="flex justify-center font-mono text-paragraph text-sm sm:text-2xl">No task added. Please add a task</p>
                <img src={coffee} className="flex w-[200px]" />
            </div>
        ) : (
            <>
                {tasks.map((task, index) => {
                    return (
                    <Task
                        key={task._id}
                        task={task}
                        index={index}
                        deleteTask={deleteTask}
                        getSingleTask={getSingleTask}
                        setToComplete={setToComplete}
                        isEditing={isEditing}
                        isMobile={isMobile}
                    />
                    );
                })} 
            </> 
       )} 

      </div>
      <NavLink to='/add'
      className=' flex sm:hidden
       bg-button text-white font-bold py-2 px-4 rounded-md w-4/5 right-1/2 translate-x-1/2 bottom-4 fixed items-center justify-center
      hover:bg-tertiary '
      >
      add
      </NavLink>
      

    </div>
  );
};

export default TaskList;