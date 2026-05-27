import TopNav from '../components/TopNav.jsx'

function AboutPage() {
  return (
    <div className="page-shell">

      <TopNav />

      <main className="info-page">

        <h1>O nas</h1>

        <div className="info-card">

          <p>
            „Co mam w lodówce?” to projekt wykonany w ramach
            przedmiotu Techniki Projektowania Frontendowego.
          </p>

          <p>
            Celem aplikacji jest ograniczenie marnowania żywności
            poprzez proponowanie przepisów na podstawie
            składników użytkownika.
          </p>

          <h2>Funkcje aplikacji</h2>

          <ul>

            <li>Dodawanie składników</li>

            <li>Przepisy kulinarne</li>

            <li>Ulubione dania</li>

            <li>Plan posiłków</li>

            <li>Lista zakupów</li>

            <li>Firebase Authentication</li>

            <li>Google Analytics</li>

            <li>Hotjar</li>

          </ul>

        </div>

      </main>

    </div>
  )
}

export default AboutPage