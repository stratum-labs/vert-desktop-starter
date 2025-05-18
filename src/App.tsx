import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import electronLogo from './assets/electron.svg'
import './App.css'
import { ModeToggle } from './components/mode-toggle'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-6 pt-20 pb-20 flex-grow">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <a href="https://electron.js.org/" target="_blank">
            <img src={electronLogo} className="logo electron" alt="Electron logo" />
          </a>
      </div>
      <h1 className="text-center text-2xl font-bold bg-gradient-to-r from-purple-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
        Vite + React + TS + Electron
      </h1>
      <div className="flex flex-col items-center justify-center gap-4 space-y-4 mt-4 cursor-pointer">
        <div className="flex flex-row items-center justify-center gap-4">
          <Button className="cursor-pointer" variant="outline"  onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
          <ModeToggle />
        </div>
        <p className="text-center text-lg">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 space-y-2">
      <p className="text-center text-md text-gray-500 mt-2">
        Click on the Vite, React, and Electron logos to learn more
      </p>
      <p className="text-center text-sm text-gray-500">
        Initiated with <a className="text-sky-400 hover:underline" href="https://ui.shadcn.com/" target="_blank">Shadcn/UI</a> and <a className="text-sky-400 hover:underline" href="https://zustand.docs.pmnd.rs/getting-started/introduction" target="_blank">Zustand</a>
      </p>
      </div>
    </>
  )
}

export default App
