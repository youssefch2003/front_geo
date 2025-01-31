
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginForm from './components/auth/LoginForm'
import Dashboard from './components/admin/Dashboard'
import Layout from './components/admin/Layout'
import Services from './components/admin/Services'
import Employees from './components/admin/Employees'
import DashboardEmployee from './components/employe/Dashboard'; // Renaming the employee Dashboard import
import LayoutEmployee from './components/employe/Layout'; // Renaming the employee Dashboard import
import Demande from './components/employe/Demande'
import LayoutRes from './components/responsable/LayoutRes'
import DashboardRes from './components/responsable/DashboardRes'
import EmployeesREs from './components/responsable/Employees'

function App() {

  return (
   <BrowserRouter>
    <Routes>
    <Route path="/login" element={<LoginForm/>} />
    {/* admin */}
    <Route path="/admin/dashboard" element={<Layout><Dashboard /></Layout>} />
    <Route path="/admin/services" element={<Layout><Services /></Layout>} />
    <Route path="/admin/employees" element={<Layout><Employees /></Layout>} />
    {/* employee */}
    <Route path="/employe/dashboard" element={<LayoutEmployee><DashboardEmployee /></LayoutEmployee>} />
    <Route path="/employe/demande" element={<LayoutEmployee><Demande /></LayoutEmployee>} />
    {/* res */}
    <Route path="/responsable/dashboard" element={<LayoutRes><DashboardRes /></LayoutRes>} />
    <Route path="/responsable/employes" element={<LayoutRes><EmployeesREs /></LayoutRes>} />
    {/* <Route path="/employe/demande" element={<LayoutEmployee><Demande /></LayoutEmployee>} /> */}
    </Routes>
   </BrowserRouter>
  )
}

export default App
