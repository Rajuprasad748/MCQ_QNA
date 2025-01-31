import { useState } from 'react'
import './App.css'
import Home from './screens/Home'
import { Routes, Route } from 'react-router-dom';
import Questions from './screens/Questions';
import Result from './screens/Result';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes >
      <Route path="/" element={<Home />} />
      <Route path="/question" element={<Questions />} />
      <Route path="/result" element={<Result />} />
    </Routes>
    </>
  )
}

export default App
