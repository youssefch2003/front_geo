import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthStatus } from './redux/authSlice'
import ProtectedRoute from './guard/ProtectedRoute'

import LoginForm from './components/auth/LoginForm'
import Dashboard from './components/admin/Dashboard'
import Layout from './components/admin/Layout'
import Services from './components/admin/Services'
import Employees from './components/admin/Employees'

import DashboardEmployee from './components/employe/Dashboard'
import LayoutEmployee from './components/employe/Layout'
import Demande from './components/employe/Demande'

import LayoutRes from './components/responsable/LayoutRes'
import DashboardRes from './components/responsable/DashboardRes'
import EmployeesREs from './components/responsable/Employees'
import DemandeRes from './components/responsable/DemandeRes'
import LoadingSpinner from './utils/LoadingSpinner'
import DemandeAdmin from './components/admin/DemandeAdmin'

function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkAuthStatus()).finally(() => setLoading(false));
    }, [dispatch]);

    if (loading) return <div className="h-screen flex items-center justify-center"><LoadingSpinner/></div>; // Prevent blank screen while checking auth

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm />} />

                {/* ✅ Protect Admin Routes */}
                <Route
                    path="/admin/dashboard"
                    element={<ProtectedRoute role={"admin"}><Layout><Dashboard /></Layout></ProtectedRoute>}
                />
                <Route
                    path="/admin/services"
                    element={<ProtectedRoute role={"admin"}><Layout><Services /></Layout></ProtectedRoute>}
                />
                <Route
                    path="/admin/employees"
                    element={<ProtectedRoute role="admin"><Layout><Employees /></Layout></ProtectedRoute>}
                />
                  <Route
                    path="/admin/demande"
                    element={<ProtectedRoute role={"admin"}><Layout><DemandeAdmin /></Layout></ProtectedRoute>}
                />

                {/* ✅ Protect Employee Routes */}
                {/* <Route
                    path="/employe/dashboard"
                    element={<ProtectedRoute role={"employe"}><LayoutEmployee><DashboardEmployee /></LayoutEmployee></ProtectedRoute>}
                /> */}
                <Route
                    path="/employe/demande"
                    element={<ProtectedRoute role={"employe"}><LayoutEmployee><Demande /></LayoutEmployee></ProtectedRoute>}
                />

                {/* ✅ Protect Responsable Routes */}
                <Route
                    path="/responsable/dashboard"
                    element={<ProtectedRoute role={"responsable"}><LayoutRes><DashboardRes /></LayoutRes></ProtectedRoute>}
                />
                <Route
                    path="/responsable/employes"
                    element={<ProtectedRoute role={"responsable"}><LayoutRes><EmployeesREs /></LayoutRes></ProtectedRoute>}
                />
                <Route
                    path="/responsable/demande"
                    element={<ProtectedRoute role={"responsable"}><LayoutRes><DemandeRes /></LayoutRes></ProtectedRoute>}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
