import { useState } from 'react'
import iptLogo from './assets/ipt.svg'
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
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
