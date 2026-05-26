import { Link } from 'react-router-dom'
import TopNav from '../components/TopNav.jsx'
import RecipeCard from '../components/RecipeCard.jsx'
import heroImg from '../assets/ui/fridge-hero.png'
import jak_to_dziala from '../assets/ui/jak_to_dziala.png'
import { getImageUrl, getRecipes } from '../services/dataService.js'

function HomePage() {
  const featuredRecipes = getRecipes().slice(0, 6)

  return (
    <div className="page-shell">
      <TopNav />
      <main style={{ padding: '0 24px 30px' }}>
        <section className="hero" style={{ marginTop: 16 }}>
          <div>
            <h1 style={{ color: 'var(--primary-dark)', fontSize: 46, marginBottom: 8 }}>
              Smaczne przepisy z tego, co masz w lodówce
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>
              Nie wiesz co ugotować? Dodaj składniki i znajdź propozycje.
            </p>
          </div>
          <div className="hero-box">
            <img src={heroImg} alt="Lodówka ze składnikami" className="hero-image" />
          </div>
        </section>
        <section style={{ marginTop: 26, padding: '28px 18px', background: '#e6f1f3' }}>
          <h2 className="section-title" style={{ fontSize: 48, marginTop: 0 }}>
            Jak to działa?
          </h2>
          <img
            src={jak_to_dziala}
            alt="Instrukcja działania aplikacji"
            style={{ width: '100%', borderRadius: 12, display: 'block' }}
          />
        </section>
        <section style={{ marginTop: 26 }}>
          <h2 className="section-title">Odkryj najpopularniejsze przepisy!</h2>
          <div className="cards">
            {featuredRecipes.map((recipe) => (
              <Link to={`/przepis/${recipe.id}`} className="nav-link" key={recipe.id}>
                <RecipeCard
                  title={recipe.title}
                  meta={`${recipe.time} | ${recipe.difficulty} | ${recipe.category}`}
                  imageUrl={getImageUrl(recipe.image)}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
