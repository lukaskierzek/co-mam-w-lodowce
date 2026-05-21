import { useParams } from 'react-router-dom'
import AuthedLayout from '../layouts/AuthedLayout.jsx'
import { addRecentlyViewed, getRecipeById, toggleFavorite } from '../services/dataService.js'
import pastaImg from '../assets/ui/dish-pasta.png'
import faworkiImg from '../assets/ui/dish-faworki.png'

const mapImage = (name) => (name === 'dish-faworki.png' ? faworkiImg : pastaImg)

function RecipeDetailsPage() {
  const { id } = useParams()
  const recipe = getRecipeById(id)
  if (recipe) addRecentlyViewed(recipe.id)
  if (!recipe) return <AuthedLayout><section className="data-page"><h1>Nie znaleziono przepisu</h1></section></AuthedLayout>

  return (
    <AuthedLayout>
      <section className="data-page">
        <h1>{recipe.title}</h1>
        <div className="recipe-details-image" style={{ backgroundImage: `url(${mapImage(recipe.image)})` }} />
        <p>{recipe.description}</p>
        <p><b>Czas:</b> {recipe.time} | <b>Poziom:</b> {recipe.difficulty} | <b>Kategoria:</b> {recipe.category}</p>
        <h3>Składniki</h3>
        <ul className="data-list">{recipe.ingredients.map((x) => <li key={x}>{x}</li>)}</ul>
        <h3>Kroki</h3>
        <ol className="data-list">{recipe.steps.map((x) => <li key={x}>{x}</li>)}</ol>
        <button className="btn" onClick={() => { toggleFavorite(recipe.id); window.location.reload() }}>
          {recipe.favorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        </button>
      </section>
    </AuthedLayout>
  )
}

export default RecipeDetailsPage
