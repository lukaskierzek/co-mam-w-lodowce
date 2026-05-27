import TopNav from '../components/TopNav.jsx'

function ContactPage() {

  return (

    <div className="page-shell">

      <TopNav />

      <main className="info-page">

        <h1>

          Kontakt

        </h1>

        <div className="info-card">

          <p>

            Projekt wykonany w ramach przedmiotu
            Techniki Projektowania Frontendowego.

          </p>

          <h2>

            Autorzy projektu

          </h2>

          <ul>

            <li>
              Łukasz Kierzek
            </li>

            <li>
              Tomasz Gondek
            </li>

            <li>
                Adam Bahonko
            </li>

          </ul>

          <a
            className="btn"
            href="
mailto:kierzu96@gmail.com?subject=Kontakt%20-%20Co%20mam%20w%20lodowce
"
          >

            Napisz email

          </a>

        </div>

      </main>

    </div>

  )

}

export default ContactPage