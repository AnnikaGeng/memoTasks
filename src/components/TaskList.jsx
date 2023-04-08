import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { URL } from "../App";
import Task from "./Task";
import TaskForm from "./TaskForm";
import React from 'react';
import { loader } from "../assets";
import { coffee } from "../assets";

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
    <div className="flex flex-row h-full">
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
      <div className='flex flex-col w-2/3 overflow-y-auto items-center mt-24 mb-10'>
        {isLoading && (
            <div className="flex flex-col justify-center h-full">
            <img src={loader} alt="Loading" />
            
            </div>
        )}
        {!isLoading && tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-10">
                <p className="flex justify-center font-mono text-paragraph text-2xl">No task added. Please add a task</p>
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
                    />
                    );
                })} 
            </> 
       )} 

      </div>
      

    </div>
  );
};

export default TaskList;