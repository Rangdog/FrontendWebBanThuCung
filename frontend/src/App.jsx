import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import { Routes,Route, useLocation  } from 'react-router-dom'
import { SnackbarProvider } from 'notistack';

function App() {
  const [count, setCount] = useState(0)

  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                  <Navbar/>
                  <div style={{ paddingTop: '64px' }}> {/* Chỗ này là đặt padding-top để tránh bị che bởi Navbar */}
                    <Routes>
                      <Route path="/" element={<Home />} />
                      {/* <Route path="/" element={<Order />} /> */}
                      <Route path="/login" element={<Login />} />
                      {/* <Route path="/register" element={<Register />} /> */}
                      {/* <Route path="/cart" element={<Cart />} /> */}
                    </Routes>
                  </div>
        </SnackbarProvider>
  )
}

export default App
