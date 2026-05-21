import { Navigate } from 'react-router-dom'
import { getSessionUser } from '../services/authService.js'

function PublicOnlyRoute({ children }) {
  const user = getSessionUser()
  if (user) return <Navigate to="/welcome" replace />
  return children
}

export default PublicOnlyRoute
