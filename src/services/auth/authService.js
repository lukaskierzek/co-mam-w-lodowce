/**
 * Fasada authService – wybiera implementację na podstawie zmiennej środowiskowej.
 *
 * VITE_USE_FIREBASE=false  →  localAuthService  (localStorage, tryb DEV)
 * VITE_USE_FIREBASE=true   →  firebaseAuthService (Firebase Auth, tryb DEVPROD/PROD)
 *
 * Jeśli zmienna nie jest ustawiona lub Firebase nie skonfigurowany → zawsze local.
 */
import * as local from './localAuthService.js'
import * as fb from './firebaseAuthService.js'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../firebase.js'

const useFirebase =
  import.meta.env.VITE_USE_FIREBASE === 'true' &&
  Boolean(import.meta.env.VITE_FIREBASE_API_KEY)

const svc = useFirebase ? fb : local

if (import.meta.env.DEV) {
  console.info(`[Auth] Tryb: ${useFirebase ? 'Firebase (DEVPROD)' : 'Local (DEV)'}`)
}

export const loginUser         = (args) => svc.loginUser(args)
export const registerUser      = (args) => svc.registerUser(args)
export const logoutUser        = ()     => svc.logoutUser()
export const getSessionUser    = ()     => svc.getSessionUser()
export const updateSessionUser = (args) => svc.updateSessionUser(args)
export const getAllUsers        = ()     => svc.getAllUsers()
export const updateUserById    = (id, patch) => svc.updateUserById(id, patch)
export const subscribeToAuth   = (cb)   => svc.subscribeToAuth(cb)
export async function loginWithGoogle() {
  console.log('auth:', auth)
  console.log('googleProvider:', googleProvider)

  if (!auth || !googleProvider) {
    throw new Error('Firebase Authentication nie jest skonfigurowane')
  }

  const result = await signInWithPopup(
    auth,
    googleProvider
  )

  return result.user
}