import { useState } from 'react'
import './App.css'
import MainBtn from './Components/MainButton/MainBtn'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MainBtn></MainBtn>
  )
}

export default App
