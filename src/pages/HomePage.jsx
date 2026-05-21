import TopNav from '../components/TopNav.jsx'
import RecipeCard from '../components/RecipeCard.jsx'
import heroImg from '../assets/hero.png'

function HomePage() {
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
        </section>
        <section style={{ marginTop: 26 }}>
          <h2 className="section-title">Odkryj najpopularniejsze przepisy!</h2>
          <div className="cards">
            <RecipeCard title="Makaron z pomidorami i bazylią" meta="20 min | Średni" />
            <RecipeCard title="Zupa krem z cukinii" meta="40 min | Łatwy" />
            <RecipeCard title="Faworki" meta="1 h | Trudny" />
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
