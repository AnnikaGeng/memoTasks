import React, {useEffect} from 'react'
import './App.css'
import Home from './screens/Home'

export const URL = import.meta.env.VITE_REACT_APP_SERVER_URL

function App() {

  return (
    <div className='flex bg-background w-screen h-screen'>
      <Home />
    </div>
  )
}

export default App
