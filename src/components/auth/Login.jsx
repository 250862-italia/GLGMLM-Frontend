import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../common/Button'
import './Auth.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/dashboard'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await login(formData.email, formData.password, formData.rememberMe)
      
      if (result.success) {
        navigate(redirectTo)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Si è verificato un errore durante l\'accesso')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Accedi</h1>
          <p>Benvenuto nel tuo account GLGMLM</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Inserisci la tua email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Inserisci la tua password"
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              Ricordami
            </label>
          </div>

          <Button 
            type="submit" 
            variant="primary"
            size="large"
            loading={loading}
            disabled={loading}
            className="auth-button"
          >
            {loading ? 'Accesso in corso...' : 'Accedi'}
          </Button>
        </form>

        <div className="auth-links">
          <Link to="/forgot-password" className="forgot-password">
            Hai dimenticato la password?
          </Link>
          
          <div className="register-link">
            <p>Non hai un account?</p>
            <Link to="/register" className="link-button">
              Registrati come ambassador
            </Link>
            <Link to="/register?role=client" className="link-button secondary">
              Registrati come cliente
            </Link>
          </div>
        </div>

        <div className="auth-footer">
          <p>Powered by GLGMLM</p>
        </div>
      </div>
    </div>
  )
}

export default Login 