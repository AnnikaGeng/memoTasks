import React from 'react'
import { logo } from '../assets'

const Hearder = () => {
  return (
    <div className='flex flex-row h-20 bg-slate-200 justify-left items-center p-10 fixed w-full'>
      <img src={logo} alt='logo' className='flex h-[45px]' />
      <h1 className='flex text-headline font-mono text-4xl font-bold ml-5'>MemoTasks</h1>
    </div>
  )
}

export default Hearder