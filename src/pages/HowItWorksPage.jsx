import TopNav from '../components/TopNav.jsx'
import image from '../assets/ui/jak_to_dziala.png'

function HowItWorksPage() {
  return (
    <div className="page-shell">

      <TopNav />

      <main className="info-page">

        <h1>Jak to działa?</h1>

        <img
          src={image}
          alt="Jak działa aplikacja"
          className="how-image"
        />

        <div className="info-card">

          <h2>1. Dodaj składniki</h2>

          <p>
            Dodaj produkty znajdujące się w Twojej lodówce.
          </p>

          <h2>2. Otrzymaj propozycje</h2>

          <p>
            System wyszuka przepisy pasujące do składników.
          </p>

          <h2>3. Zapisuj ulubione</h2>

          <p>
            Oznacz przepisy i buduj własną bazę.
          </p>

          <h2>4. Zaplanuj posiłki</h2>

          <p>
            Korzystaj z planu tygodniowego oraz list zakupów.
          </p>

        </div>

      </main>

    </div>
  )
}

export default HowItWorksPage