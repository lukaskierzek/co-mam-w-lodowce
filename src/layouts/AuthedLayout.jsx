import TopNav from '../components/TopNav.jsx'
import SideMenu from '../components/SideMenu.jsx'

import { useAuth } from '../context/useAuth.jsx'

import corner from '../assets/ui/corner_leaf.png'

function AuthedLayout({
  children
}) {

  const {
    user
  } = useAuth()

  return (

    <div className="page-shell">

      <TopNav
        welcome={!!user}
      />

      <div
        className={
          user
            ? 'main-grid'
            : 'main-grid guest'
        }
      >

        {user && (

          <SideMenu />

        )}

        <main>

          {children}

        </main>

      </div>



    </div>

  )

}

export default AuthedLayout