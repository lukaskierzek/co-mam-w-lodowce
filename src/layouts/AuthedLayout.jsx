import TopNav from '../components/TopNav.jsx'
import SideMenu from '../components/SideMenu.jsx'

function AuthedLayout({ children }) {
  return (
    <div className="page-shell">
      <TopNav welcome />
      <div className="main-grid">
        <SideMenu />
        <main>{children}</main>
      </div>
    </div>
  )
}

export default AuthedLayout
