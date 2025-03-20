import { useState } from 'react'
import iptLogo from './assets/ipt.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://ipt.ch" target="_blank">
          <img src={iptLogo} className="logo ipt" alt="ipt logo" />
        </a>
      </div>
      <h1>ipt</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the ipt logo to learn more
      </p>
    </>
  )
}

export default App
