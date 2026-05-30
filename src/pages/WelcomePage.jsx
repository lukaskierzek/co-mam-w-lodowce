import { Link } from 'react-router-dom'
import AuthedLayout from '../layouts/AuthedLayout.jsx'
import RecipeCard from '../components/RecipeCard.jsx'
import heroImg from '../assets/ui/fridge-hero.png'
import { getImageUrl, getRecipes } from '../services/dataService.js'

import wszystkieIcon from '../assets/ui/wszystkie.png'
import szybkieIcon from '../assets/ui/szybkie.png'
import wegeIcon from '../assets/ui/wege.png'
import zupyIcon from '../assets/ui/zupy.png'
import daniaGlowneIcon from '../assets/ui/dania-glowne.png'
import salatkiIcon from '../assets/ui/salatki.png'

function WelcomePage() {
  const recipeSuggestions = getRecipes().slice(0, 4)

  return (
    <AuthedLayout>
          <section className="hero">
            <div>
              <h1 className="welcome-title">Cześć, User1!</h1>
              <p className="welcome-copy">
                zobacz co możesz ugotować z tego co masz w lodówce
              </p>
            </div>
            <div className="hero-box">
              <img src={heroImg} alt="Lodówka ze składnikami" className="hero-image" />
            </div>
          </section>
          <h2 className="section-heading">Kategorie:</h2>
          <div className="category-grid">

  {[

    ['Wszystkie', 'wszystkie', wszystkieIcon],

    ['Szybkie', 'szybkie', szybkieIcon],

    ['Wege', 'wege', wegeIcon],

    ['Zupy', 'zupy', zupyIcon],

    ['Dania główne', 'dania-glowne', daniaGlowneIcon],

    ['Sałatki', 'salatki', salatkiIcon],

  ].map(([k, slug, icon]) => (

    <Link
      className="category-card nav-link"
      to={`/kategoria/${slug}`}
      key={k}
    >

      <div
        className="card-body category-card-content"
      >

        <img
          src={icon}
          alt={k}
          className="category-icon"
        />

        {k}

      </div>

    </Link>

  ))}

</div>
          <h2 className="section-title">Propozycje na dzisiaj:</h2>
          <div className="cards suggestion-cards">
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
