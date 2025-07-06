import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Components
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import Navbar from './components/layout/Navbar'
import Loading from './components/common/Loading'

// Context
import { AuthProvider, useAuth } from './context/AuthContext'

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <Loading />
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}

// Main App Component
const AppContent = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <Loading />
  }

  return (
    <Router>
      <div className="app">
        {user && <Navbar />}
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" replace />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <div>Admin Dashboard (Coming Soon)</div>
              </ProtectedRoute>
            } />
            
            {/* Ambassador Routes */}
            <Route path="/ambassador" element={
              <ProtectedRoute allowedRoles={['ambassador']}>
                <div>Ambassador Dashboard (Coming Soon)</div>
              </ProtectedRoute>
            } />
            
            {/* Client Routes */}
            <Route path="/client" element={
              <ProtectedRoute allowedRoles={['client']}>
                <div>Client Dashboard (Coming Soon)</div>
              </ProtectedRoute>
            } />
            
            {/* Default Route */}
            <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
            <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

// Root App Component with Auth Provider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
