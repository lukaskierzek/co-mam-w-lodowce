import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TopNav from '../components/TopNav.jsx'
import {
  loginUser,
  loginWithGoogle
} from '../services/auth/authService.js'
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

  const handleGoogleLogin = async () => {
    setError('')

    try {
      const user = await loginWithGoogle()

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
          <div className="auth-logo">🧊</div>

          <h1>Logowanie</h1>

          <p className="auth-subtitle">
            Zarządzaj swoją inteligentną lodówką
          </p>

          <input
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            className="btn primary"
            type="submit"
          >
            Zaloguj się
          </button>

          <div className="auth-divider">
            <span>lub</span>
          </div>

          <button
            type="button"
            className="btn google-btn"
            onClick={handleGoogleLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="20"
              height="20"
            >
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2c-2.1 1.6-4.7 2.4-7.3 2.4-5.2 0-9.6-3.3-11.2-8H6.3C9.6 39.6 16.1 44 24 44z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.3 5.3-6 6.8l6.2 5.2C39.2 36.5 44 31 44 24c0-1.3-.1-2.4-.4-3.5z" />
            </svg>

            Kontynuuj z Google
          </button>

          <p className="auth-footer">
            Nie masz konta?
            <Link to="/register">
              {' '}Zarejestruj się
            </Link>
          </p>
        </form>
      </main>
    </div>
  )
}

export default LoginPage