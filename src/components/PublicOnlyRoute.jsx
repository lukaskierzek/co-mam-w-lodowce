import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.jsx'

function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <div className="auth-loading">Ładowanie...</div>
  if (user) return <Navigate to="/welcome" replace />
  return children
}

export default PublicOnlyRoute
