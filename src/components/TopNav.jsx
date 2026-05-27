import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { useAuth } from '../context/useAuth.jsx'

import logo from '../assets/ui/logo.png'
import bell from '../assets/ui/bell.png'
import userIcon from '../assets/ui/user.png'
import arrow from '../assets/ui/arrow.png'

function TopNav() {

  const { user, logout } = useAuth()

  const navigate = useNavigate()

  const [query, setQuery] =
    useState('')

  const handleSearch = (e) => {

    e.preventDefault()

    const value =
      query.trim()

    navigate(

      value

        ? `/przepisy?q=${encodeURIComponent(value)}`

        : '/przepisy'

    )

  }

  return (

    <header className="topbar">

 <Link
  to="/"
  className="brand nav-link"
>

  <img
    src={logo}
    alt="Logo"
    className="brand-logo"
  />

  <span>

    Co mam w lodówce?

  </span>

</Link>

      <Link
        to="/przepisy"
        className="btn primary nav-link"
      >

        Przepisy

      </Link>

      <Link
        to="/dodaj-skladniki"
        className="btn primary nav-link"
      >

        Dodaj Składniki

      </Link>

      {

        user ? (

          <>

            <Link
              to="/kontakt"
              className="btn primary nav-link"
            >

              Kontakt

            </Link>

            <form
              onSubmit={handleSearch}
            >

              <input

                className="search"

                placeholder="wyszukaj przepis"

                value={query}

                onChange={(e)=>

                  setQuery(
                    e.target.value
                  )

                }

              />

            </form>

<div className="top-icons">

  <img
    src={bell}
    alt="Powiadomienia"
    className="top-icon"
  />

<img
  src={userIcon}
  alt="Profil"
  className="top-icon"
  onClick={() => navigate('/ustawienia')}
/>

  <img
    src={arrow}
    alt="Wyloguj"
    className="top-icon arrow-icon"
    onClick={logout}
  />

</div>
          </>

        ) : (

          <>

            <Link
              to="/jak-to-dziala"
              className="btn primary nav-link"
            >

              Jak to działa?

            </Link>

            <Link
              to="/o-nas"
              className="btn primary nav-link"
            >

              O nas

            </Link>

            <Link
              to="/login"
              className="btn nav-link"
            >

              Zaloguj się

            </Link>

            <Link
              to="/register"
              className="btn primary nav-link"
            >

              Załóż konto

            </Link>

          </>

        )

      }

    </header>

  )

}

export default TopNav