
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginForm from './components/auth/LoginForm'
import Home from './components/employe/Home'
import Dashboard from './components/admin/Dashboard'
import Layout from './components/admin/Layout'
import Services from './components/admin/Services'

function App() {

  return (
   <BrowserRouter>
    <Routes>
    <Route path="/login" element={<LoginForm/>} />
    <Route path="/employe/home" element={<Home/>} />
    <Route path="/admin/dashboard" element={<Layout><Dashboard /></Layout>} />
    <Route path="/admin/services" element={<Layout><Services /></Layout>} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
