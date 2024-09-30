import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QueryComponent from './components/custom/QueryComponent'
import Conversation from './components/custom/Conversation'

function App() {
  const [loading,setLoading] = useState(false)

  return (
    <>
    <QueryComponent loading={loading} setLoading={setLoading}  />
    <Conversation loading={loading} />
    </>
  )
}

export default App
