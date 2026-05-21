import seedUsers from './seedUsers.json'

const USERS_KEY = 'lodowka_users'
const SESSION_KEY = 'lodowka_session'

function getUsers() {
  const raw = localStorage.getItem(USERS_KEY)
  if (!raw) {
    localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers))
    return seedUsers
  }
  return JSON.parse(raw)
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function registerUser({ name, email, password }) {
  const users = getUsers()
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('Użytkownik z tym adresem email już istnieje.')
  }
  const user = { id: Date.now(), name, email, password, isAdmin: false }
  users.push(user)
  saveUsers(users)
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin }))
  return user
}

export function loginUser({ email, password }) {
  const users = getUsers()
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
  if (!user) {
    throw new Error('Nieprawidłowy email lub hasło.')
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin }))
  return user
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY)
}

export function getSessionUser() {
  const raw = localStorage.getItem(SESSION_KEY)
  return raw ? JSON.parse(raw) : null
}

export function updateSessionUser({ email, password }) {
  const session = getSessionUser()
  if (!session) throw new Error('Brak aktywnej sesji.')
  const users = getUsers()
  const index = users.findIndex((u) => u.id === session.id)
  if (index < 0) throw new Error('Nie znaleziono użytkownika.')
  if (email && users.some((u) => u.id !== session.id && u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('Email jest już zajęty.')
  }
  users[index] = { ...users[index], email: email || users[index].email, password: password || users[index].password }
  saveUsers(users)
  const updatedSession = { ...session, email: users[index].email, isAdmin: users[index].isAdmin }
  localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession))
  return updatedSession
}

export function getAllUsers() {
  return getUsers()
}

export function updateUserById(id, patch) {
  const users = getUsers()
  const index = users.findIndex((u) => u.id === id)
  if (index < 0) throw new Error('Nie znaleziono użytkownika.')
  users[index] = { ...users[index], ...patch }
  saveUsers(users)
  const session = getSessionUser()
  if (session && session.id === id) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ ...session, email: users[index].email, isAdmin: users[index].isAdmin }))
  }
  return users[index]
}
