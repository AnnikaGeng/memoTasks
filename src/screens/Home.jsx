import React from 'react'
import Hearder from '../components/Hearder'
import TaskList from '../components/TaskList'
import { dog } from '../assets'

const Home = () => {
  return (
    <div className="flex flex-col w-full h-full]">
        <Hearder />
        <TaskList />
        <img src={dog} className='w-[200px] absolute right-[-40px] bottom-0 z-0'/>
    </div>
  )
}

export default Home