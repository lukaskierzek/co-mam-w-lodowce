import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { useAuth } from '../context/useAuth.jsx'

function TopNav() {

  const [query, setQuery] = useState('')

  const navigate = useNavigate()

  const { user, logout } = useAuth()

  const onSearch = (e) => {

    e.preventDefault()

    const q = query.trim()

    navigate(

      q
        ? `/przepisy?q=${encodeURIComponent(q)}`
        : '/przepisy'

    )

  }

  return (

    <header className="topbar">

      <Link
        to="/"
        className="brand"
      >

        Co mam w lodówce?

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

        Dodaj składniki

      </Link>

      <Link
        to={
          user
            ? '/kontakt'
            : '/jak-to-dziala'
        }
        className="btn primary nav-link"
      >

        {
          user
            ? 'Kontakt'
            : 'Jak to działa?'
        }

      </Link>

      {

        !user && (

          <Link
            to="/o-nas"
            className="btn primary nav-link"
          >

            O nas

          </Link>

        )

      }

      <form
        onSubmit={onSearch}
        style={{
          display:
            'contents'
        }}
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

      {

        !user ? (

          <>

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

        ) : (

          <>

            <button

              className="btn nav-link"

              onClick={logout}

            >

              Wyloguj

            </button>

            <div
              className="top-icons"
            >

              <span>

                🔔

              </span>

              <span>

                👤

              </span>

              <span>

                ⌄

              </span>

            </div>

          </>

        )

      }

    </header>

  )

}

export default TopNav