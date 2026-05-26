/**
 * userService.js — fasada zarządzania profilami użytkowników.
 *
 * VITE_USE_FIREBASE=false → localAuthService  (localStorage)
 * VITE_USE_FIREBASE=true  → firestoreUserService (Firestore)
 */
import * as local from './auth/localAuthService.js'
import * as firestore from './firestoreUserService.js'

const useFirebase =
  import.meta.env.VITE_USE_FIREBASE === 'true' &&
  Boolean(import.meta.env.VITE_FIREBASE_API_KEY)

/**
 * Pobiera listę wszystkich użytkowników.
 * Local:    synchronicznie z localStorage
 * Firebase: asynchronicznie z Firestore (wymaga uprawnień admina)
 */
export async function getAllUsers() {
  if (useFirebase) return firestore.getAllUserProfiles()
  return local.getAllUsers()
}

/**
 * Aktualizuje dane użytkownika po id/uid.
 * Local:    aktualizuje localStorage
 * Firebase: aktualizuje dokument w Firestore
 */
export async function updateUserById(id, patch) {
  if (useFirebase) return firestore.updateUserProfile(id, patch)
  return local.updateUserById(id, patch)
}

/**
 * Pobiera profil pojedynczego użytkownika.
 * Local:    szuka w localStorage
 * Firebase: pobiera dokument z Firestore
 */
export async function getUserById(id) {
  if (useFirebase) return firestore.getUserProfile(id)
  return local.getAllUsers().find((u) => u.id === id) ?? null
}

