import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { URL } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';



const EditTask = () => {
  const { taskId } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });
//   keep updating the variable and we can also use it
  const { name } = formData;
  const navigateTo = useNavigate();

  const getSingleTask = async (task) => {
        try {
            const {data} = await axios.get(`${URL}/api/task/${taskId}`);
            setFormData({ name: data.name, completed: false });
            setIsEditing(true);
        } catch (error) {
            toast.error(error.message);
      }
  };

    useEffect(() => {
        getSingleTask();
    }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const updateTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty.");
    }
    try {
        await axios.put(`${URL}/api/task/${taskId}`, formData);
        setIsEditing(false);
        navigateTo('/');
    } catch (error) {
        toast.error(error.message);
    }
  };


  return (
    <div className='w-screen h-screen bg-slate-50'>
        <form onSubmit={updateTask}>
            <textarea
            className='w-full h-full bg-slate-50 p-10 font-mono text-2xl font-bold text-paragraph'
            type="text"
            placeholder="Add a Task"
            name="name"
            style={{ resize: "none" }}
            value={name}
            onChange={handleInputChange}

            />
            <button type="submit" className=' flex sm:hidden
                    bg-button text-white font-bold py-2 px-4 rounded-md w-4/5 right-1/2 translate-x-1/2 bottom-4 fixed items-center justify-center
                    hover:bg-tertiary '>
                    {isEditing ? "Confirm" : "Add"}
            </button>
        </form>
    </div>
  )
}

export default EditTask