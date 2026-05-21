import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import PublicOnlyRoute from './components/PublicOnlyRoute.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import DataPage from './pages/DataPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import RecipeDetailsPage from './pages/RecipeDetailsPage.jsx'
import SimplePage from './pages/SimplePage.jsx'
import WelcomePage from './pages/WelcomePage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/welcome" element={<ProtectedRoute><WelcomePage /></ProtectedRoute>} />
      <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
      <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
      <Route path="/przepisy" element={<ProtectedRoute><DataPage type="przepisy" /></ProtectedRoute>} />
      <Route path="/dodaj-skladniki" element={<ProtectedRoute><DataPage type="dodaj-skladniki" /></ProtectedRoute>} />
      <Route path="/kontakt" element={<ProtectedRoute><SimplePage title="Kontakt" /></ProtectedRoute>} />
      <Route path="/jak-to-dziala" element={<ProtectedRoute><SimplePage title="Jak to działa?" /></ProtectedRoute>} />
      <Route path="/o-nas" element={<ProtectedRoute><SimplePage title="O nas" /></ProtectedRoute>} />
      <Route path="/moje-skladniki" element={<ProtectedRoute><DataPage type="dodaj-skladniki" /></ProtectedRoute>} />
      <Route path="/ulubione" element={<ProtectedRoute><DataPage type="ulubione" /></ProtectedRoute>} />
      <Route path="/ostatnio-przegladane" element={<ProtectedRoute><DataPage type="ostatnio-przegladane" /></ProtectedRoute>} />
      <Route path="/plan-posilkow" element={<ProtectedRoute><DataPage type="plan-posilkow" /></ProtectedRoute>} />
      <Route path="/lista-zakupow" element={<ProtectedRoute><DataPage type="lista-zakupow" /></ProtectedRoute>} />
      <Route path="/ustawienia" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/przepis/:id" element={<ProtectedRoute><RecipeDetailsPage /></ProtectedRoute>} />
      <Route path="/kategoria/:slug" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  )
}

export default App
