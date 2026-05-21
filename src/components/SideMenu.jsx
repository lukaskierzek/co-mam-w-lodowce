import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/authService.js'

const mainItems = [
  { label: 'Strona główna', to: '/welcome' },
  { label: 'Moje składniki', to: '/moje-skladniki' },
  { label: 'Ulubione', to: '/ulubione' },
  { label: 'Ostatnio przeglądane', to: '/ostatnio-przegladane' },
  { label: 'Plan posiłków', to: '/plan-posilkow' },
  { label: 'Lista zakupów', to: '/lista-zakupow' },
]

const accountItems = [
  { label: 'Ustawienia', to: '/ustawienia' },
  { label: 'Wyloguj', to: '/login' },
]

function SideMenu() {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <aside className="side-menu">
      {mainItems.map((item, idx) => (
        <Link className={`menu-item nav-link ${location.pathname === item.to ? 'active' : ''}`} to={item.to} key={item.label}>
          {item.label}
        </Link>
      ))}
      <div style={{ height: 18 }} />
      {accountItems.map((item) => (
        item.label === 'Wyloguj'
          ? <button type="button" className="menu-item nav-link" key={item.label} onClick={() => { logoutUser(); navigate('/login') }}>{item.label}</button>
          : <Link className="menu-item nav-link" to={item.to} key={item.label}>{item.label}</Link>
      ))}
    </aside>
  )
}

export default SideMenu
