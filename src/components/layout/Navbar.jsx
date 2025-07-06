import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../common/Button'
import './Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return 'Amministratore'
      case 'ambassador':
        return 'Ambassador'
      case 'client':
        return 'Cliente'
      default:
        return 'Utente'
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/dashboard" className="brand-link">
            <span className="brand-text">GLGMLM</span>
          </Link>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="navbar-start">
            <Link to="/dashboard" className="navbar-item">
              Dashboard
            </Link>
            
            {user?.role === 'ambassador' && (
              <Link to="/ambassador" className="navbar-item">
                Ambassador
              </Link>
            )}
            
            {user?.role === 'client' && (
              <Link to="/client" className="navbar-item">
                Cliente
              </Link>
            )}
            
            {user?.role === 'admin' && (
              <Link to="/admin" className="navbar-item">
                Admin
              </Link>
            )}
          </div>

          <div className="navbar-end">
            <div className="navbar-user">
              <div className="user-info">
                <span className="user-name">{user?.firstName} {user?.lastName}</span>
                <span className="user-role">{getRoleLabel(user?.role)}</span>
              </div>
              
              <div className="user-actions">
                            <Button 
              variant="danger" 
              size="small" 
              onClick={handleLogout}
              className="logout-button"
            >
              Logout
            </Button>
              </div>
            </div>
          </div>
        </div>

        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar 