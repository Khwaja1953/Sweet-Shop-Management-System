import { useState } from 'react'
import { Routes , Route, Link } from 'react-router-dom'
import './App.css'
import Login from './components/user/Login'
import Signup from './components/user/Signup'
import Dashboard from './components/Admin/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <header className="app-header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign up</Link>
      </nav>
    </header>

    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/' element={<div style={{padding:20}}>Welcome to Sweet Shop</div>} />
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
      
    </>
  )
}

export default App
