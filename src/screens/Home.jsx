import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {



  return (
    <div className='bg-slate-300 flex flex-col justify-center items-center h-screen w-screen'>
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to the Quiz App</h1> 
      <p className="text-lg mb-8 font-normal text-gray-600">Test your knowledge and have fun!</p> 
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        <Link to="/question" >Start Quiz</Link>
      </button>
    </div>
  )
}

export default Home
