import { useState } from 'react'
import './App.css'
import MainBtn from './Components/MainButton/MainBtn'
import Navbar from './Components/Navbar/Navbar'

function App() {

  return (
    <div id='app'>
      <Navbar></Navbar>
      <MainBtn></MainBtn>
    </div>
  )
}

export default App
