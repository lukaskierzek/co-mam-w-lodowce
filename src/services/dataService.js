import seedData from './seedData.json'

const DATA_KEY = 'lodowka_data'

// Dynamicznie ładuje wszystkie zdjęcia dań
const dishImages =
  import.meta.glob(
    '../assets/ui/dish/*',
    { eager: true }
  )

// Buduje mapę:
// nazwa_pliku -> url
const imageMap =
  Object.fromEntries(

    Object.entries(dishImages).map(

      ([path, module]) => {

        const fileName =
          path.split('/').pop()

        return [
          fileName,
          module.default
        ]

      }

    )

  )

const FALLBACK_IMAGE =
  imageMap['dish-no-defined.jpg']

export function getImageUrl(imageName) {

  if (!imageName)
    return FALLBACK_IMAGE

  return (
    imageMap[imageName]
    ?? FALLBACK_IMAGE
  )

}

function getData() {

  const raw =
    localStorage.getItem(
      DATA_KEY
    )

  // Pierwsze uruchomienie
  if (!raw) {

    localStorage.setItem(
      DATA_KEY,
      JSON.stringify(seedData)
    )

    return seedData

  }

  const stored =
    JSON.parse(raw)

  const mergedRecipes =

    seedData.recipes.map(
      recipe => {

        const existing =
          stored.recipes.find(
            r => r.id === recipe.id
          )

        return existing

          ? {

              ...recipe,

              favorite: existing.favorite ?? false,

            }

          : recipe

      }
    )

  const updatedData = {

    ...stored,

    recipes: mergedRecipes

  }

  localStorage.setItem(

    DATA_KEY,

    JSON.stringify(updatedData)

  )

  return updatedData

}

export function getRecipes() {

  return getData().recipes

}

export function getIngredients() {

  return getData().ingredients

}

export function getFavorites() {

  return getData()

    .recipes

    .filter(
      recipe => recipe.favorite
    )

}

export function getShoppingList() {

  return getData().shoppingList

}

export function getMealPlan() {

  return getData().mealPlan

}

export function getRecipeById(id) {

  return getRecipes()

    .find(
      recipe =>
        recipe.id === Number(id)
    )

}

export function getRecipesByCategory(category) {

  if (category === 'Wszystkie')
    return getRecipes()

  return getRecipes()

    .filter(
      recipe =>
        recipe.category === category
    )

}

export function toggleFavorite(recipeId) {

  const data = getData()

  data.recipes =

    data.recipes.map(
      recipe => (

        recipe.id === recipeId

          ? {

              ...recipe,

              favorite:
                !recipe.favorite

            }

          : recipe

      )
    )

  localStorage.setItem(

    DATA_KEY,

    JSON.stringify(data)

  )

  return data.recipes.find(

    recipe =>
      recipe.id === recipeId

  )

}

export function addIngredient(name) {

  const value =
    String(name || '').trim()

  if (!value) {

    throw new Error(
      'Podaj nazwę składnika.'
    )

  }

  const data = getData()

  if (
    !data.ingredients.includes(value)
  ) {

    data.ingredients.push(value)

  }

  localStorage.setItem(
    DATA_KEY,
    JSON.stringify(data)
  )

  return data.ingredients

}

export function removeIngredient(name) {

  const data = getData()

  data.ingredients =

    data.ingredients.filter(
      item => item !== name
    )

  localStorage.setItem(
    DATA_KEY,
    JSON.stringify(data)
  )

  return data.ingredients

}

export function addShoppingItem(name) {

  const value =
    String(name || '').trim()

  if (!value) {

    throw new Error(
      'Podaj nazwę produktu.'
    )

  }

  const data = getData()

  if (
    !data.shoppingList.includes(value)
  ) {

    data.shoppingList.push(value)

  }

  localStorage.setItem(
    DATA_KEY,
    JSON.stringify(data)
  )

  return data.shoppingList

}

export function removeShoppingItem(name) {

  const data = getData()

  data.shoppingList =

    data.shoppingList.filter(
      item => item !== name
    )

  localStorage.setItem(
    DATA_KEY,
    JSON.stringify(data)
  )

  return data.shoppingList

}

export function addRecentlyViewed(recipeId) {

  const data = getData()

  const id =
    Number(recipeId)

  data.recentlyViewed = [

    id,

    ...(data.recentlyViewed || [])

      .filter(
        item => item !== id
      )

  ].slice(0, 10)

  localStorage.setItem(
    DATA_KEY,
    JSON.stringify(data)
  )

}

export function getRecentlyViewedRecipes() {

  const data = getData()

  const ids =
    data.recentlyViewed || []

  const byId =
    new Map(

      data.recipes.map(
        recipe => [
          recipe.id,
          recipe
        ]
      )

    )

  return ids

    .map(
      id => byId.get(id)
    )

    .filter(Boolean)

}