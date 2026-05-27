import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import RecipeCard from '../components/RecipeCard.jsx'
import AuthedLayout from '../layouts/AuthedLayout.jsx'

import {
  addIngredient,
  addShoppingItem,
  getImageUrl,
  getIngredients,
  getMealPlan,
  getRecentlyViewedRecipes,
  getRecipes,
  getRecipesByCategory,
  getShoppingList,
  removeIngredient,
  removeShoppingItem,
  toggleFavorite,
} from '../services/dataService.js'

const slugToCategory = {
  wszystkie: 'Wszystkie',
  szybkie: 'Szybkie',
  wege: 'Wege',
  zupy: 'Zupy',
  'dania-glowne': 'Dania główne',
  salatki: 'Sałatki',
}

function DataPage({ type, categorySlug }) {

  const [recipes, setRecipes] = useState(
    getRecipes()
  )

  const [ingredients, setIngredients] = useState(
    getIngredients()
  )

  const [shoppingList, setShoppingList] = useState(
    getShoppingList()
  )

  const [newShoppingItem, setNewShoppingItem] =
    useState('')

  const [newIngredient, setNewIngredient] =
    useState('')

  const [error, setError] =
    useState('')

  const [searchParams] =
    useSearchParams()

  const query =
    (
      searchParams.get('q') || ''
    )
      .toLowerCase()
      .trim()

  const recipeList = useMemo(() => {

    const recipeBase =

      type === 'ulubione'

        ? recipes.filter(
            recipe =>
              recipe.favorite
          )

        : type === 'kategoria'

          ? getRecipesByCategory(
              slugToCategory[
                categorySlug
              ] || 'Wszystkie'
            )

          : type ===
            'ostatnio-przegladane'

            ? getRecentlyViewedRecipes()

            : type === 'przepisy'

              ? recipes

              : []

    if (!query) {

      return recipeBase

    }

    return recipeBase.filter(
      recipe => {

        const titleMatch =

          recipe.title
            ?.toLowerCase()
            .includes(query)

        const ingredientMatch =

          (
            recipe.ingredients ||
            []
          )

          .some(

            ingredient =>

              ingredient
                ?.toLowerCase()

                .includes(
                  query
                )

          )

        return (

          titleMatch ||

          ingredientMatch

        )

      }
    )

  }, [
    categorySlug,
    query,
    recipes,
    type
  ])

  const title =

    type === 'kategoria'

      ? `Kategoria: ${
          slugToCategory[
            categorySlug
          ] || 'Wszystkie'
        }`

      : type.replace(
          '-',
          ' '
        )

  const onToggleFavorite = (
    id
  ) => {

    toggleFavorite(id)

    setRecipes(
      getRecipes()
    )

  }

  const onAddIngredient = (
    e
  ) => {

    e.preventDefault()

    setError('')

    try {

      setIngredients(
        addIngredient(
          newIngredient
        )
      )

      setNewIngredient('')

    }

    catch (err) {

      setError(
        err.message
      )

    }

  }

  const onAddShopping = (
    e
  ) => {

    e.preventDefault()

    setError('')

    try {

      setShoppingList(
        addShoppingItem(
          newShoppingItem
        )
      )

      setNewShoppingItem('')

    }

    catch (err) {

      setError(
        err.message
      )

    }

  }

  return (

    <AuthedLayout>

      <section className="data-page">

        <h1>

          {title}

        </h1>

        {

          (
            type === 'przepisy' ||

            type === 'ulubione' ||

            type === 'kategoria' ||

            type ===
            'ostatnio-przegladane'

          ) && (

            recipeList.length > 0

            ? (

              <div className="cards">

                {

                  recipeList.map(
                    recipe => (

                      <div
                        key={
                          recipe.id
                        }
                      >

                        <Link
                          to={`/przepis/${recipe.id}`}
                          className="nav-link"
                        >

                          <RecipeCard

                            title={
                              recipe.title
                            }

                            meta={`${recipe.time} | ${recipe.difficulty} | ${recipe.category}`}

                            imageUrl={
                              getImageUrl(
                                recipe.image
                              )
                            }

                          />

                        </Link>

                        <button

                          type="button"

                          className="btn"

                          style={{
                            marginTop: 8
                          }}

                          onClick={() =>
                            onToggleFavorite(
                              recipe.id
                            )
                          }

                        >

                          {

                            recipe.favorite

                              ? 'Usuń z ulubionych'

                              : 'Dodaj do ulubionych'

                          }

                        </button>

                      </div>

                    )

                  )

                }

              </div>

            )

            : (

              <div
                className="empty-state"
              >

                <h2>

                  🍳 Nie znaleziono przepisu

                </h2>

                <p>

                  Brak wyników dla:

                </p>

                <p>

                  <strong>

                    {

                      query ||

                      'wyszukiwania'

                    }

                  </strong>

                </p>

                <div
                  className="empty-tags"
                >

                  <Link
                    to="/przepisy?q=makaron"
                  >

                    Makaron

                  </Link>

                  <Link
                    to="/przepisy?q=kurczak"
                  >

                    Kurczak

                  </Link>

                  <Link
                    to="/przepisy?q=jajka"
                  >

                    Jajka

                  </Link>

                  <Link
                    to="/przepisy?q=zupa"
                  >

                    Zupa

                  </Link>

                </div>

              </div>

            )

          )

        }

        {

          type ===
          'dodaj-skladniki' && (

            <>

              <form
                onSubmit={
                  onAddIngredient
                }
                className="ingredient-form"
              >

                <input

                  className="auth-input"

                  value={
                    newIngredient
                  }

                  onChange={e =>
                    setNewIngredient(
                      e.target.value
                    )
                  }

                  placeholder="np. Papryka"

                />

                <button
                  className="btn primary"
                  type="submit"
                >

                  Dodaj składnik

                </button>

              </form>

              {

                error && (

                  <p className="auth-error">

                    {error}

                  </p>

                )

              }

              <ul className="data-list">

                {

                  ingredients.map(
                    item => (

                      <li
                        key={item}
                      >

                        {item}

                        <button

                          type="button"

                          className="inline-x"

                          onClick={() =>
                            setIngredients(
                              removeIngredient(
                                item
                              )
                            )
                          }

                        >

                          x

                        </button>

                      </li>

                    )

                  )

                }

              </ul>

            </>

          )

        }

        {

          type ===
          'plan-posilkow' && (

            <ul className="data-list">

              {

                getMealPlan()
                  .map(
                    item => (

                      <li
                        key={
                          item.day
                        }
                      >

                        <b>

                          {

                            item.day

                          }

                          :

                        </b>

                        {' '}

                        {

                          item.dish

                        }

                      </li>

                    )

                  )

              }

            </ul>

          )

        }

        {

          type ===
          'lista-zakupow' && (

            <>

              <form

                onSubmit={
                  onAddShopping
                }

                className="ingredient-form"

              >

                <input

                  className="auth-input"

                  value={
                    newShoppingItem
                  }

                  onChange={e =>
                    setNewShoppingItem(
                      e.target.value
                    )
                  }

                  placeholder="np. Masło"

                />

                <button
                  className="btn primary"
                  type="submit"
                >

                  Dodaj produkt

                </button>

              </form>

              <ul className="data-list">

                {

                  shoppingList.map(
                    item => (

                      <li
                        key={item}
                      >

                        {item}

                        <button

                          type="button"

                          className="inline-x"

                          onClick={() =>
                            setShoppingList(
                              removeShoppingItem(
                                item
                              )
                            )
                          }

                        >

                          x

                        </button>

                      </li>

                    )

                  )

                }

              </ul>

            </>

          )

        }

      </section>

    </AuthedLayout>

  )

}

export default DataPage