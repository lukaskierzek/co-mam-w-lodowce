import { useState } from 'react'
import AuthedLayout from '../layouts/AuthedLayout.jsx'
import { getAllUsers, getSessionUser, updateSessionUser, updateUserById } from '../services/authService.js'

function SettingsPage() {
  const session = getSessionUser()
  const [email, setEmail] = useState(session?.email || '')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isAdmin, setIsAdmin] = useState(Boolean(session?.isAdmin))
  const [users, setUsers] = useState(getAllUsers())

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    try {
      updateSessionUser({ email, password })
      updateUserById(session.id, { isAdmin })
      setUsers(getAllUsers())
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
        {isAdmin && (
          <section style={{ marginTop: 20 }}>
            <h2>Użytkownicy</h2>
            <ul className="data-list">
              {users.map((u) => (
                <li key={u.id}>
                  {u.name} ({u.email}){' '}
                  <button className="btn" type="button" onClick={() => { updateUserById(u.id, { isAdmin: !u.isAdmin }); setUsers(getAllUsers()) }}>
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
