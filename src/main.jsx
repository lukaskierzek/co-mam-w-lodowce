import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import Hotjar from '@hotjar/browser'

import './index.css'

import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

const siteId =
  import.meta.env
    .VITE_HOTJAR_ID

const hotjarVersion = 6

if (
  import.meta.env.PROD &&
  siteId
) {

  Hotjar.init(
    siteId,
    hotjarVersion
  )

  console.log(
    'Hotjar uruchomiony'
  )

}

createRoot(
  document.getElementById(
    'root'
  )
).render(

  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>

)