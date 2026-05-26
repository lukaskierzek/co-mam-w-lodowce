import { Navigate, Route, Routes } from 'react-router-dom'

import AnalyticsListener from './components/AnalyticsListener.jsx'

import ProtectedRoute from './components/ProtectedRoute.jsx'

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

    <>

      <AnalyticsListener />

      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/welcome"
          element={
            <ProtectedRoute>

              <WelcomePage />

            </ProtectedRoute>
          }
        />

        <Route
          path="/przepisy"
          element={
            <ProtectedRoute>

              <DataPage
                type="przepisy"
              />

            </ProtectedRoute>
          }
        />

        <Route
          path="/dodaj-skladniki"
          element={
            <ProtectedRoute>

              <DataPage
                type="dodaj-skladniki"
              />

            </ProtectedRoute>
          }
        />

        <Route
          path="/moje-skladniki"
          element={
            <ProtectedRoute>

              <DataPage
                type="dodaj-skladniki"
              />

            </ProtectedRoute>
          }
        />

        <Route
          path="/ulubione"
          element={
            <ProtectedRoute>

              <DataPage
                type="ulubione"
              />

            </ProtectedRoute>
          }
        />

        <Route
          path="/ostatnio-przegladane"
          element={
            <ProtectedRoute>

              <DataPage
                type="ostatnio-przegladane"
              />

            </ProtectedRoute>
          }
        />

        <Route
          path="/plan-posilkow"
          element={
            <ProtectedRoute>

              <DataPage
                type="plan-posilkow"
              />

            </ProtectedRoute>
          }
        />

        <Route
          path="/lista-zakupow"
          element={
            <ProtectedRoute>

              <DataPage
                type="lista-zakupow"
              />

            </ProtectedRoute>
          }
        />

        <Route
          path="/ustawienia"
          element={
            <ProtectedRoute>

              <SettingsPage />

            </ProtectedRoute>
          }
        />

        <Route
          path="/kontakt"
          element={
            <SimplePage
              title="Kontakt"
            />
          }
        />

        <Route
          path="/jak-to-dziala"
          element={
            <SimplePage
              title="Jak to działa?"
            />
          }
        />

        <Route
          path="/o-nas"
          element={
            <SimplePage
              title="O nas"
            />
          }
        />

        <Route
          path="/przepis/:id"
          element={<RecipeDetailsPage />}
        />

        <Route
          path="/kategoria/:slug"
          element={<CategoryPage />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </>

  )

}

export default App