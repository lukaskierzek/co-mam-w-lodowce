import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function TopNav({ welcome = false }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const onSearch = (e) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/przepisy?q=${encodeURIComponent(q)}` : '/przepisy')
  }

  return (
    <header className="topbar">
      <Link to="/" className="brand">Co mam w lodówce?</Link>
      <Link to="/przepisy" className="btn primary nav-link">Przepisy</Link>
      <Link to="/dodaj-skladniki" className="btn primary nav-link">Dodaj składniki</Link>
      <Link to={welcome ? '/kontakt' : '/jak-to-dziala'} className="btn primary nav-link">
        {welcome ? 'Kontakt' : 'Jak to działa?'}
      </Link>
      {!welcome && <Link to="/o-nas" className="btn primary nav-link">O nas</Link>}
      <form onSubmit={onSearch} style={{ display: 'contents' }}>
        <input className="search" placeholder="wyszukaj przepis" value={query} onChange={(e) => setQuery(e.target.value)} />
      </form>
      {!welcome && <Link to="/login" className="btn nav-link">Zaloguj się</Link>}
      {welcome ? (
        <div className="top-icons" aria-label="Akcje użytkownika">
          <span>🔔</span>
          <span>👤</span>
          <span>⌄</span>
        </div>
      ) : (
        <Link to="/register" className="btn primary nav-link">Załóż konto</Link>
      )}
    </header>
  )
}

export default TopNav
