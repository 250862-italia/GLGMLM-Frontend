import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import StatsCard from './StatsCard'
import Card from '../common/Card'
import './Dashboard.css'

const Dashboard = () => {
  const { user, apiCall } = useAuth()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result = await apiCall('/dashboard')
        if (result.success) {
          setDashboardData(result.data)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError('Errore nel caricamento della dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [apiCall])

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Caricamento dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-message">
          <h3>Errore</h3>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="dashboard-error">
        <div className="error-message">
          <h3>Nessun dato disponibile</h3>
          <p>Impossibile caricare i dati della dashboard</p>
        </div>
      </div>
    )
  }

  const { user: userData, stats, recentActivity } = dashboardData

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Benvenuto, {userData.firstName}!</h1>
        <p>Ecco un riepilogo della tua attività</p>
      </div>

      <div className="dashboard-grid">
        {/* User Info Card */}
        <Card 
          title="Informazioni Utente"
          variant="primary"
          className="user-info-card"
        >
          <div className="user-avatar">
            <div className="avatar-placeholder">
              {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
            </div>
          </div>
          <div className="user-details">
            <h4>{userData.firstName} {userData.lastName}</h4>
            <p className="user-email">{userData.email}</p>
            <p className="user-role">
              {userData.role === 'ambassador' ? 'Ambassador' : 
               userData.role === 'client' ? 'Cliente' : 'Utente'}
            </p>
            {userData.ambassadorCode && (
              <p className="user-code">Codice: {userData.ambassadorCode}</p>
            )}
            {userData.clientCode && (
              <p className="user-code">Codice: {userData.clientCode}</p>
            )}
          </div>
        </Card>

                {/* Stats Cards */}
        <Card title="Statistiche">
          <div className="stats-grid">
            <StatsCard
              title="Membri Downline"
              value={stats.downlineCount}
              icon="👥"
              color="primary"
              trend="up"
              trendValue="+12%"
            />
            <StatsCard
              title="Membri Attivi"
              value={stats.activeDownline}
              icon="✅"
              color="success"
              trend="up"
              trendValue="+8%"
            />
            <StatsCard
              title="Guadagni Totali"
              value={`€${stats.totalDownlineEarnings}`}
              icon="💰"
              color="warning"
              trend="up"
              trendValue="+15%"
            />
            <StatsCard
              title="Acquisti Totali"
              value={`€${stats.totalDownlinePurchases}`}
              icon="🛒"
              color="secondary"
              trend="up"
              trendValue="+22%"
            />
          </div>
        </Card>

        {/* Recent Activity */}
        <Card title="Attività Recente" variant="secondary">
          {recentActivity.recentDownline.length > 0 ? (
            <div className="activity-list">
              {recentActivity.recentDownline.map((member, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">
                    <div className="member-avatar">
                      {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                    </div>
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">
                      {member.firstName} {member.lastName}
                    </div>
                    <div className="activity-subtitle">
                      {member.role === 'ambassador' ? 'Ambassador' : 'Cliente'} • {member.status}
                    </div>
                  </div>
                  <div className="activity-date">
                    {new Date(member.createdAt).toLocaleDateString('it-IT')}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Nessuna attività recente</p>
            </div>
          )}
        </Card>

        {/* Role-specific content */}
        {userData.role === 'ambassador' && dashboardData.ambassadorStats && (
          <Card title="Guadagni Ambassador" variant="success">
            <div className="earnings-summary">
              <div className="earnings-item">
                <div className="earnings-label">Commissione Media</div>
                <div className="earnings-value">{dashboardData.ambassadorStats.averageCommission}</div>
              </div>
              <div className="earnings-item">
                <div className="earnings-label">Rank</div>
                <div className="earnings-value">{dashboardData.ambassadorStats.rank}</div>
              </div>
            </div>
          </Card>
        )}

        {userData.role === 'client' && dashboardData.clientStats && (
          <Card title="Dati Cliente" variant="warning">
            <div className="client-summary">
              <div className="client-item">
                <div className="client-label">Totale Speso</div>
                <div className="client-value">€{dashboardData.clientStats.totalSpent}</div>
              </div>
              <div className="client-item">
                <div className="client-label">Ordine Medio</div>
                <div className="client-value">€{dashboardData.clientStats.averageOrder}</div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Dashboard 