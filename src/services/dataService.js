import seedData from './seedData.json'

const DATA_KEY = 'lodowka_data'

function getData() {
  const raw = localStorage.getItem(DATA_KEY)
  if (!raw) {
    localStorage.setItem(DATA_KEY, JSON.stringify(seedData))
    return seedData
  }
  return JSON.parse(raw)
}

export function getRecipes() { return getData().recipes }
export function getIngredients() { return getData().ingredients }
export function getFavorites() { return getData().recipes.filter((r) => r.favorite) }
export function getShoppingList() { return getData().shoppingList }
export function getMealPlan() { return getData().mealPlan }
export function getRecipeById(id) { return getRecipes().find((r) => r.id === Number(id)) }
export function getRecipesByCategory(category) {
  if (category === 'Wszystkie') return getRecipes()
  return getRecipes().filter((r) => r.category === category)
}
export function toggleFavorite(recipeId) {
  const data = getData()
  data.recipes = data.recipes.map((r) => (r.id === recipeId ? { ...r, favorite: !r.favorite } : r))
  localStorage.setItem(DATA_KEY, JSON.stringify(data))
  return data.recipes.find((r) => r.id === recipeId)
}
export function addIngredient(name) {
  const value = String(name || '').trim()
  if (!value) throw new Error('Podaj nazwę składnika.')
  const data = getData()
  if (!data.ingredients.includes(value)) data.ingredients.push(value)
  localStorage.setItem(DATA_KEY, JSON.stringify(data))
  return data.ingredients
}
export function removeIngredient(name) {
  const data = getData()
  data.ingredients = data.ingredients.filter((x) => x !== name)
  localStorage.setItem(DATA_KEY, JSON.stringify(data))
  return data.ingredients
}
export function addShoppingItem(name) {
  const value = String(name || '').trim()
  if (!value) throw new Error('Podaj nazwę produktu.')
  const data = getData()
  if (!data.shoppingList.includes(value)) data.shoppingList.push(value)
  localStorage.setItem(DATA_KEY, JSON.stringify(data))
  return data.shoppingList
}
export function removeShoppingItem(name) {
  const data = getData()
  data.shoppingList = data.shoppingList.filter((x) => x !== name)
  localStorage.setItem(DATA_KEY, JSON.stringify(data))
  return data.shoppingList
}
export function addRecentlyViewed(recipeId) {
  const data = getData()
  const id = Number(recipeId)
  data.recentlyViewed = [id, ...(data.recentlyViewed || []).filter((x) => x !== id)].slice(0, 10)
  localStorage.setItem(DATA_KEY, JSON.stringify(data))
}
export function getRecentlyViewedRecipes() {
  const data = getData()
  const ids = data.recentlyViewed || []
  const byId = new Map(data.recipes.map((r) => [r.id, r]))
  return ids.map((id) => byId.get(id)).filter(Boolean)
}
