import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import TopNav from '../components/TopNav.jsx'
import RecipeCard from '../components/RecipeCard.jsx'

import heroImg from '../assets/ui/fridge-hero.png'
import jak_to_dziala from '../assets/ui/jak_to_dziala.png'

import {
  getRecipes,
  getImageUrl
} from '../services/dataService.js'

function HomePage() {

  const featuredRecipes =
    getRecipes().slice(0, 6)

  const navigate = useNavigate()

  const [search, setSearch] =
    useState('')

  const handleSearch = (e) => {

    e.preventDefault()

    const value =
      search.trim()

    navigate(

      value

        ? `/przepisy?q=${encodeURIComponent(value)}`

        : '/przepisy'

    )

  }

  return (

    <div className="page-shell">

      <TopNav />

      <main
        style={{
          padding:
            '0 24px 30px'
        }}
      >

        <section
          className="hero"
          style={{
            marginTop: 16
          }}
        >

          <div>

            <h1
              style={{
                color:
                  'var(--primary-dark)',

                fontSize: 46,

                marginBottom: 8
              }}
            >

              Smaczne przepisy z tego,
              co masz w lodówce

            </h1>

            <p
              style={{
                color:
                  'var(--text-muted)'
              }}
            >

              Nie wiesz co ugotować?

              Dodaj składniki które masz
              pod ręką,

              a my pokażemy Ci
              pyszne przepisy!

            </p>

            <form
              onSubmit={
                handleSearch
              }
            >

              <input

                className="hero-search"

                placeholder="np. jajka, ser, fasola..."

                value={search}

                onChange={(e)=>

                  setSearch(
                    e.target.value
                  )

                }

              />

            </form>

            <div
              style={{
                display: 'flex',

                gap: 18,

                marginTop: 28,

                flexWrap: 'wrap',

                alignItems: 'center'
              }}
            >

              <span>

                Wypróbuj przepisy:

              </span>

              {

                [
                  'Makaron',
                  'Kurczak',
                  'Cukinia',
                  'Jajka'
                ].map(

                  item => (

                    <button

                      key={item}

                      className="btn-secondary"

                      onClick={()=>

                        navigate(
                          `/przepisy?q=${item}`
                        )

                      }

                    >

                      {item}

                    </button>

                  )

                )

              }

            </div>

          </div>

          <div className="hero-box">

            <img
              src={heroImg}

              alt="Lodówka"

              className="hero-image"
            />

          </div>

        </section>

        <section
          style={{
            marginTop: 26,
            padding: 0
          }}
        >

          <img

            src={jak_to_dziala}

            alt="Jak działa"

            style={{
              width: '100%',

              maxWidth:
                '1200px',

              display:
                'block',

              margin:
                '0 auto'
            }}

          />

        </section>

        <section
          style={{
            marginTop: 26
          }}
        >

          <h2
            className="section-title"
          >

            Odkryj najpopularniejsze przepisy!

          </h2>

          <div className="cards">

            {

              featuredRecipes.map(

                recipe => (

                  <Link

                    key={recipe.id}

                    to={`/przepis/${recipe.id}`}

                    className="nav-link"

                  >

                    <RecipeCard

                      title={recipe.title}

                      meta={`${recipe.time} | ${recipe.difficulty} | ${recipe.category}`}

                      imageUrl={
                        getImageUrl(
                          recipe.image
                        )
                      }

                    />

                  </Link>

                )

              )

            }

          </div>

        </section>

      </main>

    </div>

  )

}

export default HomePage