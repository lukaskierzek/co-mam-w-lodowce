import { useEffect, useState } from 'react'
import { subscribeToAuth, logoutUser as serviceLogout } from '../services/auth/authService.js'
import { AuthContext } from './authContextValue.js'

/**
 * AuthProvider – obudowuje całą aplikację.
 * Obsługuje oba tryby:
 *  - Local (DEV):    callback wywoływany synchronicznie → loading=false od razu
 *  - Firebase (DEVPROD/PROD): onAuthStateChanged → loading=true do pierwszej odpowiedzi
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // subscribeToAuth działa dla obu trybów – zwraca funkcję unsubscribe
    const unsubscribe = subscribeToAuth((resolvedUser) => {
      setUser(resolvedUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  async function logout() {
    await serviceLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

