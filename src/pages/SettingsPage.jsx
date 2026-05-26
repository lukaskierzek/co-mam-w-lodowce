import { useState, useEffect } from 'react'
import AuthedLayout from '../layouts/AuthedLayout.jsx'
import { updateSessionUser } from '../services/auth/authService.js'
import { getAllUsers, updateUserById } from '../services/userService.js'
import { useAuth } from '../context/useAuth.jsx'

function SettingsPage() {
  const { user: session, setUser } = useAuth()
  const [email, setEmail] = useState(session?.email || '')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isAdmin, setIsAdmin] = useState(Boolean(session?.isAdmin))
  const [users, setUsers] = useState([])

  // Załaduj listę użytkowników (async – działa dla local i Firebase)
  useEffect(() => {
    getAllUsers().then(setUsers)
  }, [])

  const refreshUsers = () => getAllUsers().then(setUsers)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    try {
      const [updated] = await Promise.all([
        updateSessionUser({ email, password }),
        session?.id ? updateUserById(session.id, { isAdmin }) : Promise.resolve(),
      ])
      if (updated) setUser({ ...updated, isAdmin })
      await refreshUsers()
      setMessage('Dane zostały zapisane.')
      setPassword('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AuthedLayout>
      <section className="data-page">
        <h1>Ustawienia</h1>
        <form className="auth-card" onSubmit={onSubmit}>
          <input className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nowy email" />
          <input className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nowe hasło" type="password" />
          <label><input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} /> Uprawnienia admina</label>
          {error && <p className="auth-error">{error}</p>}
          {message && <p style={{ color: '#2e7d32', margin: 0 }}>{message}</p>}
          <button className="btn primary" type="submit">Zapisz zmiany</button>
        </form>
        {session?.isAdmin && (
          <section style={{ marginTop: 20 }}>
            <h2>Użytkownicy</h2>
            <ul className="data-list">
              {users.map((u) => (
                <li key={u.id}>
                  {u.name} ({u.email}){' '}
                  <button
                    className="btn"
                    type="button"
                    onClick={async () => {
                      const newIsAdmin = !u.isAdmin
                      await updateUserById(u.id, { isAdmin: newIsAdmin })
                      if (u.id === session?.id) {
                        setUser({ ...session, isAdmin: newIsAdmin })
                        setIsAdmin(newIsAdmin)
                      }
                      await refreshUsers()
                    }}
                  >
                    {u.isAdmin ? 'Odbierz admina' : 'Nadaj admina'}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>
    </AuthedLayout>
  )
}

export default SettingsPage
