import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard.jsx'
import AuthedLayout from '../layouts/AuthedLayout.jsx'
import { addIngredient, addShoppingItem, getImageUrl, getIngredients, getMealPlan, getRecentlyViewedRecipes, getRecipes, getRecipesByCategory, getShoppingList, removeIngredient, removeShoppingItem, toggleFavorite } from '../services/dataService.js'
const slugToCategory = {
  wszystkie: 'Wszystkie',
  szybkie: 'Szybkie',
  wege: 'Wege',
  zupy: 'Zupy',
  'dania-glowne': 'Dania główne',
  salatki: 'Sałatki',
}

function DataPage({ type, categorySlug }) {
  const [recipes, setRecipes] = useState(getRecipes())
  const [ingredients, setIngredients] = useState(getIngredients())
  const [shoppingList, setShoppingList] = useState(getShoppingList())
  const [newShoppingItem, setNewShoppingItem] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [error, setError] = useState('')
  const [searchParams] = useSearchParams()
  const query = (searchParams.get('q') || '').toLowerCase()

  const recipeList = useMemo(() => {
    const recipeBase = type === 'ulubione'
      ? recipes.filter((r) => r.favorite)
      : type === 'kategoria'
        ? getRecipesByCategory(slugToCategory[categorySlug] || 'Wszystkie')
        : type === 'ostatnio-przegladane'
          ? getRecentlyViewedRecipes()
          : type === 'przepisy'
            ? recipes
            : []

    return recipeBase.filter((r) => r.title.toLowerCase().includes(query))
  }, [categorySlug, query, recipes, type])

  const title = type === 'kategoria' ? `Kategoria: ${slugToCategory[categorySlug] || 'Wszystkie'}` : type.replace('-', ' ')

  const onToggleFavorite = (id) => {
    toggleFavorite(id)
    setRecipes(getRecipes())
  }

  const onAddIngredient = (e) => {
    e.preventDefault()
    setError('')
    try {
      setIngredients(addIngredient(newIngredient))
      setNewIngredient('')
    } catch (err) {
      setError(err.message)
    }
  }
  const onAddShopping = (e) => {
    e.preventDefault()
    setError('')
    try {
      setShoppingList(addShoppingItem(newShoppingItem))
      setNewShoppingItem('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AuthedLayout>
      <section className="data-page">
        <h1>{title}</h1>
        {(type === 'przepisy' || type === 'ulubione' || type === 'kategoria' || type === 'ostatnio-przegladane') && (
          <div className="cards">
            {recipeList.map((r) => (
              <div key={r.id}>
                <Link to={`/przepis/${r.id}`} className="nav-link">
                  <RecipeCard
                    title={r.title}
                    meta={`${r.time} | ${r.difficulty} | ${r.category}`}
                    imageUrl={getImageUrl(r.image)}
                  />
                </Link>
                <button type="button" className="btn" style={{ marginTop: 8 }} onClick={() => onToggleFavorite(r.id)}>
                  {r.favorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                </button>
              </div>
            ))}
          </div>
        )}
        {type === 'dodaj-skladniki' && (
          <>
            <form onSubmit={onAddIngredient} className="ingredient-form">
              <input className="auth-input" value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} placeholder="np. Papryka" />
              <button className="btn primary" type="submit">Dodaj składnik</button>
            </form>
            {error && <p className="auth-error">{error}</p>}
            <ul className="data-list">{ingredients.map((x) => <li key={x}>{x} <button type="button" className="inline-x" onClick={() => setIngredients(removeIngredient(x))}>x</button></li>)}</ul>
          </>
        )}
        {type === 'plan-posilkow' && <ul className="data-list">{getMealPlan().map((x) => <li key={x.day}><b>{x.day}:</b> {x.dish}</li>)}</ul>}
        {type === 'lista-zakupow' && (
          <>
            <form onSubmit={onAddShopping} className="ingredient-form">
              <input className="auth-input" value={newShoppingItem} onChange={(e) => setNewShoppingItem(e.target.value)} placeholder="np. Masło" />
              <button className="btn primary" type="submit">Dodaj produkt</button>
            </form>
            <ul className="data-list">{shoppingList.map((x) => <li key={x}>{x} <button type="button" className="inline-x" onClick={() => setShoppingList(removeShoppingItem(x))}>x</button></li>)}</ul>
          </>
        )}
      </section>
    </AuthedLayout>
  )
}

export default DataPage
