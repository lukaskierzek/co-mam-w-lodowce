import { Link } from 'react-router-dom'
import AuthedLayout from '../layouts/AuthedLayout.jsx'
import RecipeCard from '../components/RecipeCard.jsx'
import heroImg from '../assets/hero.png'
import { getImageUrl, getRecipes } from '../services/dataService.js'

function WelcomePage() {
  const recipeSuggestions = getRecipes().slice(0, 4)

  return (
    <AuthedLayout>
          <section className="hero">
            <div>
              <h1 style={{ fontSize: 50, margin: 0 }}>Cześć, User1!</h1>
              <p style={{ color: 'var(--text-muted)', marginTop: 12 }}>
                zobacz co możesz ugotować z tego co masz w lodówce
              </p>
            </div>
            <div className="hero-box">
              <img src={heroImg} alt="Lodówka ze składnikami" className="hero-image" />
            </div>
          </section>
          <h2 style={{ color: 'var(--primary-dark)', marginTop: 26 }}>Kategorie:</h2>
          <div className="category-grid">
            {[
              ['Wszystkie', 'wszystkie'],
              ['Szybkie', 'szybkie'],
              ['Wege', 'wege'],
              ['Zupy', 'zupy'],
              ['Dania główne', 'dania-glowne'],
              ['Sałatki', 'salatki'],
            ].map(([k, slug]) => (
              <Link className="category-card nav-link" to={`/kategoria/${slug}`} key={k}>
                <div className="card-body" style={{ textAlign: 'center', color: 'var(--primary-dark)', fontWeight: 600 }}>
                  <div className="category-icon">◌</div>
                  {k}
                </div>
              </Link>
            ))}
          </div>
          <h2 className="section-title">Propozycje na dzisiaj:</h2>
          <div className="cards" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            {recipeSuggestions.map((recipe) => (
              <Link to={`/przepis/${recipe.id}`} className="nav-link" key={recipe.id}>
                <RecipeCard
                  title={recipe.title}
                  meta={`${recipe.time} | ${recipe.difficulty} | ${recipe.category}`}
                  imageUrl={getImageUrl(recipe.image)}
                />
              </Link>
            ))}
          </div>
    </AuthedLayout>
  )
}

export default WelcomePage
