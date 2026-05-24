import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { logEvent } from 'firebase/analytics'
import { analytics } from '../services/firebase.js'

const isDebugMode = import.meta.env.VITE_GA_DEBUG_MODE === 'true'

/**
 * AnalyticsListener – śledzi zmiany podstron i wysyła pageview do Firebase Analytics.
 * Działa TYLKO gdy VITE_USE_FIREBASE=true (DEVPROD / PROD).
 * W trybie DEV analytics rozwiązuje się do null i nic się nie wysyła.
 * Komponent nie renderuje żadnego HTML – zwraca null.
 */
function AnalyticsListener() {
  const location = useLocation()

  useEffect(() => {
    analytics
      .then((instance) => {
        if (!instance) return
        logEvent(instance, 'page_view', {
          page_path:  location.pathname + location.search,
          page_title: document.title,
          ...(isDebugMode && { debug_mode: true }),
        })
      })
      .catch(() => {})
  }, [location])

  return null
}

export default AnalyticsListener
