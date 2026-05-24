import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../firebase.js'
import { saveUserProfile, getUserProfile } from '../firestoreUserService.js'

/** Buduje pełny profil łącząc dane Firebase Auth + Firestore */
async function buildUserProfile(firebaseUser) {
  if (!firebaseUser) return null
  const profile = await getUserProfile(firebaseUser.uid)
  return {
    id:      firebaseUser.uid,
    name:    profile?.name || firebaseUser.displayName || firebaseUser.email,
    email:   firebaseUser.email,
    isAdmin: profile?.isAdmin ?? false,
  }
}

export async function loginUser({ email, password }) {
  if (!auth) throw new Error('Firebase nie jest skonfigurowany.')
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return buildUserProfile(cred.user)
}

export async function registerUser({ name, email, password }) {
  if (!auth) throw new Error('Firebase nie jest skonfigurowany.')
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  // Zapisz profil do Firestore przy rejestracji
  await saveUserProfile(cred.user.uid, {
    uid: cred.user.uid,
    name,
    email,
    isAdmin: false,
  })
  return buildUserProfile(cred.user)
}

export async function logoutUser() {
  if (!auth) return
  await signOut(auth)
}

export function getSessionUser() {
  // Sync – zwraca podstawowe dane bez Firestore (isAdmin może być nieaktualne)
  const u = auth?.currentUser
  if (!u) return null
  return { id: u.uid, name: u.displayName || u.email, email: u.email, isAdmin: false }
}

export async function updateSessionUser({ email, password }) {
  if (!auth?.currentUser) throw new Error('Brak aktywnej sesji.')
  const user = auth.currentUser
  if (email && email !== user.email) await updateEmail(user, email)
  if (password) await updatePassword(user, password)
  // Zsynchronizuj email w Firestore
  if (email) await saveUserProfile(user.uid, { email })
  return buildUserProfile(auth.currentUser)
}

export function getAllUsers() { return [] }
export function updateUserById() {
  console.warn('[Firebase] Użyj userService.updateUserById zamiast firebaseAuthService.')
}

/**
 * Subskrypcja zmian auth – ładuje pełny profil (z isAdmin) z Firestore.
 */
export function subscribeToAuth(callback) {
  if (!auth) {
    callback(null)
    return () => {}
  }
  return onAuthStateChanged(auth, async (firebaseUser) => {
    const profile = await buildUserProfile(firebaseUser)
    callback(profile)
  })
}
