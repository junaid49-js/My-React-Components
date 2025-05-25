import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-black h-screen'>
      <nav className='bg-sky-300 flex justify-around h-16 items-center'>
        <h1 className='text-white cursor-pointer text-3xl font-bold font-arial hover:scale-105 duration-400'>Heading</h1>
        <ul className='gap-4 md:flex hidden'>
          <li className='text-white cursor-pointer hover:text-indigo-700'>Home</li>
          <li className='text-white cursor-pointer hover:text-indigo-700'>DOCs</li>
          <li className='text-white cursor-pointer hover:text-indigo-700'>About Us</li>
          <li className='text-white cursor-pointer hover:text-indigo-700'>Contact Us</li>
        </ul>
        <div className="icons md:flex gap-4 hidden">
          <button className='text-white cursor-pointer bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 active:bg-indigo-500'>Moon</button>
          <button className='text-white cursor-pointer bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 active:bg-indigo-500'>Log In</button>
        </div>
        <button className='md:hidden block text-white cursor-pointer bg-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-700 active:bg-indigo-500'>Options</button>
      </nav>
    </div>
  )
}

export default App
