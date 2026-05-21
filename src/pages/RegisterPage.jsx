import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TopNav from '../components/TopNav.jsx'
import { registerUser } from '../services/authService.js'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    try {
      registerUser({ name, email, password })
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
          <h1>Rejestracja</h1>
          <input className="auth-input" placeholder="Nazwa użytkownika" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="auth-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="auth-input" type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="auth-error">{error}</p>}
          <button className="btn primary" type="submit">Załóż konto</button>
          <p>Masz konto? <Link to="/login">Zaloguj się</Link></p>
        </form>
      </main>
    </div>
  )
}

export default RegisterPage
