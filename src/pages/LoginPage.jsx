import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TopNav from '../components/TopNav.jsx'
import { loginUser } from '../services/auth/authService.js'
import { useAuth } from '../context/useAuth.jsx'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const user = await loginUser({ email, password })
      setUser(user)
      navigate('/welcome')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="page-shell">
      <TopNav />
      <main className="auth-page">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h1>Logowanie</h1>
          <input className="auth-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="auth-input" type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="auth-error">{error}</p>}
          <button className="btn primary" type="submit">Zaloguj się</button>
          <p>Nie masz konta? <Link to="/register">Zarejestruj się</Link></p>
        </form>
      </main>
    </div>
  )
}

export default LoginPage
