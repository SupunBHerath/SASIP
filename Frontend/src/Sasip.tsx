import { useState } from 'react'
import sasiplogo from './assets/sasip-logo.jpeg'
import viteLogo from '/vite.svg'
import './App.css'

function Sasip() {
  const [count, setCount] = useState(10)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={sasiplogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>SASIP website coming soon </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          like is {count}k
        </button>
        <p>
          Development by NALANDA IUHS TEAM 
        </p>
      </div>
      
    </>
  )
}

export default Sasip
