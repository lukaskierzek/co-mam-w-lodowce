import { Navigate, Route, Routes } from 'react-router-dom'
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
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/przepisy" element={<DataPage type="przepisy" />} />
      <Route path="/dodaj-skladniki" element={<DataPage type="dodaj-skladniki" />} />
      <Route path="/kontakt" element={<SimplePage title="Kontakt" />} />
      <Route path="/jak-to-dziala" element={<SimplePage title="Jak to działa?" />} />
      <Route path="/o-nas" element={<SimplePage title="O nas" />} />
      <Route path="/moje-skladniki" element={<DataPage type="dodaj-skladniki" />} />
      <Route path="/ulubione" element={<DataPage type="ulubione" />} />
      <Route path="/ostatnio-przegladane" element={<DataPage type="ostatnio-przegladane" />} />
      <Route path="/plan-posilkow" element={<DataPage type="plan-posilkow" />} />
      <Route path="/lista-zakupow" element={<DataPage type="lista-zakupow" />} />
      <Route path="/ustawienia" element={<SettingsPage />} />
      <Route path="/przepis/:id" element={<RecipeDetailsPage />} />
      <Route path="/kategoria/:slug" element={<CategoryPage />} />
      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  )
}

export default App
