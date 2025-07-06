import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../common/Button'
import './Auth.css'

const Register = () => {
  const [searchParams] = useSearchParams()
  const defaultRole = searchParams.get('role') || 'ambassador'
  const sponsorCode = searchParams.get('sponsor') || ''

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: defaultRole,
    sponsorCode: sponsorCode,
    acceptTerms: false
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Le password non coincidono')
      return false
    }
    
    if (formData.password.length < 6) {
      setError('La password deve essere di almeno 6 caratteri')
      return false
    }
    
    if (!formData.acceptTerms) {
      setError('Devi accettare i termini e condizioni')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!validateForm()) {
      setLoading(false)
      return
    }

    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
        sponsorCode: formData.sponsorCode || undefined
      }

      const result = await register(userData)
      
      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Si è verificato un errore durante la registrazione')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Registrati</h1>
          <p>Crea il tuo account GLGMLM</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Nome</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Il tuo nome"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Cognome</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Il tuo cognome"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="La tua email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Il tuo numero di telefono"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Tipo di account</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="ambassador">Ambassador</option>
              <option value="client">Cliente</option>
            </select>
          </div>

          {formData.role === 'client' && (
            <div className="form-group">
              <label htmlFor="sponsorCode">Codice Ambassador (opzionale)</label>
              <input
                type="text"
                id="sponsorCode"
                name="sponsorCode"
                value={formData.sponsorCode}
                onChange={handleChange}
                placeholder="Codice del tuo ambassador"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Crea una password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Conferma Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Conferma la password"
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
              />
              <span className="checkmark"></span>
              Accetto i <Link to="/terms" className="inline-link">Termini e Condizioni</Link> e la <Link to="/privacy" className="inline-link">Privacy Policy</Link>
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
            {loading ? 'Registrazione in corso...' : 'Registrati'}
          </Button>
        </form>

        <div className="auth-links">
          <div className="login-link">
            <p>Hai già un account?</p>
            <Link to="/login" className="link-button">
              Accedi
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

export default Register 