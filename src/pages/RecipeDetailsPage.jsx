import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import TopNav from '../components/TopNav.jsx'
import SideMenu from '../components/SideMenu.jsx'

import { useAuth } from '../context/useAuth.jsx'

import {
  getRecipeById,
  addRecentlyViewed,
  toggleFavorite,
  getImageUrl
} from '../services/dataService.js'

function RecipeDetailsPage() {

  const { id } = useParams()

  const { user } = useAuth()

  const recipe = getRecipeById(
    Number(id)
  )

  if (!recipe) {

    return (

      <div className="page-shell">

        <TopNav />

        <section className="data-page">

          <h1>

            Nie znaleziono przepisu

          </h1>

          <p>

            ID: {id}

          </p>

        </section>

      </div>

    )

  }

  const handleFavorite = () => {

    const updated = toggleFavorite(recipe.id)

    setRecipe(updated)

  }

  return (

    <div className="page-shell">

      <TopNav
        welcome={!!user}
      />

      <div
        className={
          user
            ? 'main-grid'
            : 'main-grid guest'
        }
      >

        {user && (
          <SideMenu />
        )}

        <section className="data-page">

          <h1>

            {recipe.title}

          </h1>

          <div
            className="recipe-details-image"
            style={{
              backgroundImage:
                `url(${getImageUrl(recipe.image)})`
            }}
          />

          <p>

            {recipe.description}

          </p>

          <p>

            <strong>
              Czas:
            </strong>

            {' '}
            {recipe.time}

            {' | '}

            <strong>
              Poziom:
            </strong>

            {' '}
            {recipe.difficulty}

            {' | '}

            <strong>
              Kategoria:
            </strong>

            {' '}
            {recipe.category}

          </p>

          <h3>

            Składniki

          </h3>

          <ul className="data-list">

            {recipe.ingredients?.map(
              ingredient => (

                <li
                  key={ingredient}
                >

                  {ingredient}

                </li>

              )
            )}

          </ul>

          <h3>

            Kroki

          </h3>

          <ol className="data-list">

            {recipe.steps?.map(
              step => (

                <li
                  key={step}
                >

                  {step}

                </li>

              )
            )}

          </ol>

          {user && (

            <button
              className="btn"
              onClick={
                handleFavorite
              }
            >

              {recipe.favorite
                ? 'Usuń z ulubionych'
                : 'Dodaj do ulubionych'
              }

            </button>

          )}

        </section>

      </div>

    </div>

  )

}

export default RecipeDetailsPage