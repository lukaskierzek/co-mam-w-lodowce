import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const shouldInit = import.meta.env.VITE_USE_FIREBASE === 'true' && Boolean(firebaseConfig.apiKey)

export const app  = shouldInit ? initializeApp(firebaseConfig) : null
export const auth = shouldInit ? getAuth(app) : null
export const db   = shouldInit ? getFirestore(app) : null

export const analytics = shouldInit
  ? isSupported()
      .then((yes) => yes ? getAnalytics(app) : null)
      .catch(() => null)
  : Promise.resolve(null)
