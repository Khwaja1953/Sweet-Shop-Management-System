import { useState } from 'react'
import { Routes , Route } from 'react-router-dom'
import Login from './components/user/Login'
import Signup from './components/user/Signup'
import Dashboard from './components/Admin/Dashboard'
import SweetsList from './components/sweets/SweetsList'
import AdminSweets from './components/sweets/AdminSweets'
import Navbar from './components/Other/Navbar'



function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/' element={<SweetsList/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/admin' element={<AdminSweets/>} />
    </Routes>
      
    </>
  )
}

export default App
