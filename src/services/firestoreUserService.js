/**
 * firestoreUserService.js
 * Operacje na kolekcji "users" w Firestore (tryb Firebase).
 *
 * Struktura dokumentu users/{uid}:
 * {
 *   uid:     string,
 *   name:    string,
 *   email:   string,
 *   isAdmin: boolean,
 * }
 */
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
} from 'firebase/firestore'
import { db } from './firebase.js'

/** Zapisuje lub nadpisuje profil użytkownika (merge: true — nie kasuje innych pól) */
export async function saveUserProfile(uid, profile) {
  if (!db) throw new Error('Firestore nie jest zainicjalizowany.')
  await setDoc(doc(db, 'users', uid), profile, { merge: true })
}

/** Pobiera profil pojedynczego użytkownika po uid */
export async function getUserProfile(uid) {
  if (!db) return null
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

/** Pobiera wszystkich użytkowników (wymaga uprawnień admina w regułach Firestore) */
export async function getAllUserProfiles() {
  if (!db) return []
  const snap = await getDocs(collection(db, 'users'))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/** Aktualizuje wybrane pola profilu użytkownika */
export async function updateUserProfile(uid, patch) {
  if (!db) throw new Error('Firestore nie jest zainicjalizowany.')
  await updateDoc(doc(db, 'users', uid), patch)
  return getUserProfile(uid)
}

