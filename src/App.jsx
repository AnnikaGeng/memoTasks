import React, {useEffect} from 'react'
import './App.css'
import Home from './screens/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddTask from './screens/AddTask'
import EditTask from './screens/EditTask'

export const URL = import.meta.env.VITE_REACT_APP_SERVER_URL

function App() {

  return (
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/add' element={<AddTask />}/>
      <Route path='/edit/:taskId' element={<EditTask />} />
      </Routes>
      </BrowserRouter>
  )
}

export default App
