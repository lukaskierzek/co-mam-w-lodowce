<div align="center">

# 🧊 Co mam w lodówce?

### Platforma z wirtualną lodówką i inteligentnym doborem przepisów

Projekt wykonany w ramach przedmiotu:

**Techniki Projektowania Frontendowego**

Politechnika Krakowska  
Wydział Informatyki i Matematyki

---

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-latest-purple?logo=vite)
![Router](https://img.shields.io/badge/React_Router-enabled-red)
![CSS](https://img.shields.io/badge/CSS-Styled-1572B6?logo=css3)
![Status](https://img.shields.io/badge/Status-In_Development-success)

</div>

---

# 📖 Opis projektu

**„Co mam w lodówce?”** to aplikacja wspierająca użytkownika w:

🥬 zarządzaniu produktami spożywczymi

🍝 wyszukiwaniu przepisów na podstawie składników

🛒 tworzeniu list zakupów

📅 planowaniu posiłków

⭐ zapisywaniu ulubionych przepisów

🔔 kontrolowaniu terminów ważności

Celem projektu jest ograniczenie **marnowania żywności** oraz usprawnienie codziennego planowania gotowania.

Projekt bazuje na analizie potrzeb użytkowników oraz przygotowanym prototypie UI.

---

# 👨‍💻 Autorzy

| Imię i nazwisko | Rola |
|---|---|
| Łukasz Kierzek | Frontend / UI / Dokumentacja |
| Tomasz Gondek | Analiza / Projekt funkcjonalny |

**Grupa:** CY2  

**Kierunek:** Informatyka  

**Specjalność:** Cyberbezpieczeństwo

---

# 🏗 Architektura projektu

```txt
src/
│
├── assets/
│   ├── dishes/
│   ├── ui/
│   └── illustrations/
│
├── components/
│   ├── ProtectedRoute.jsx
│   ├── PublicOnlyRoute.jsx
│   ├── RecipeCard.jsx
│   ├── SideMenu.jsx
│   └── TopNav.jsx
│
├── layouts/
│   └── AuthedLayout.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── WelcomePage.jsx
│   ├── CategoryPage.jsx
│   ├── RecipeDetailsPage.jsx
│   ├── SettingsPage.jsx
│   ├── DataPage.jsx
│   └── SimplePage.jsx
│
├── services/
│   ├── authService.js
│   ├── dataService.js
│   ├── seedData.json
│   └── seedUsers.json
│
├── App.jsx
└── main.jsx
```

---

# 🚀 Funkcjonalności

## 👤 Konto użytkownika

- logowanie
- rejestracja
- sesja użytkownika
- ochrona tras
- przekierowania po autoryzacji

---

## 🧊 Wirtualna lodówka

Użytkownik może:

- dodawać składniki
- przeglądać zapisane produkty
- zarządzać zawartością lodówki
- filtrować dane

---

## 🍽 System przepisów

Dostępne funkcje:

- lista przepisów
- szczegóły przepisu
- kategorie
- ulubione
- ostatnio przeglądane
- wyszukiwarka

---

## 🛒 Organizacja zakupów

System pozwala:

- tworzyć listy zakupów
- zarządzać produktami
- usuwać pozycje
- przygotowywać zakupy pod plan posiłków

---

## 📅 Planowanie posiłków

Moduł:

- planowania tygodniowego
- organizacji posiłków
- przechowywania zapisanych propozycji

---

# 🖼 Widoki aplikacji

## 🏠 Strona główna

Adres:

```txt
/
```

Elementy:

- hero section
- wyszukiwarka
- opis działania aplikacji
- popularne przepisy
- CTA logowania

---

## 📋 Dashboard użytkownika

Adres:

```txt
/welcome
```

Zawiera:

- menu boczne
- sekcję kategorii
- rekomendowane przepisy
- panel użytkownika
- wyszukiwarkę

---

## 🔐 Logowanie

Adres:

```txt
/login
```

Obsługuje:

- walidację
- zapis sesji
- autoryzację

---

## 📝 Rejestracja

Adres:

```txt
/register
```

Obsługuje:

- tworzenie użytkownika
- zapis danych
- automatyczne logowanie

---

## ⚙ Ustawienia

Adres:

```txt
/ustawienia
```

Możliwości:

- konfiguracja konta
- zmiana danych
- zarządzanie profilem

---

# 🧪 Dane testowe

### Konto testowe nr 1

Email:

```txt
user1@example.com
```

Hasło:

```txt
haslo123
```

---

### Konto testowe nr 2

Email:

```txt
user2@example.com
```

Hasło:

```txt
haslo123
```

---

# 🛠 Technologie

### Frontend

- React
- React Router
- Vite
- CSS

### Przechowywanie danych

- LocalStorage

### Dane demonstracyjne

- seedData.json
- seedUsers.json

### Planowane integracje

- Firebase Authentication
- Google Analytics
- Hotjar

---

# 📦 Instalacja

### 1. Pobranie projektu

```bash
git clone REPO_URL
```

---

### 2. Instalacja zależności

```bash
npm install
```

---

### 3. Uruchomienie lokalne

```bash
npm run dev
```

Projekt będzie dostępny pod:

```txt
http://localhost:5173
```

---

### 4. Build produkcyjny

```bash
npm run build
```

---

### 5. Preview

```bash
npm run preview
```

---

# 📸 Screeny aplikacji

## Home

Dodaj:

```txt
docs/screens/home.png
```

---

## Dashboard

Dodaj:

```txt
docs/screens/welcome.png
```

---

## Login

Dodaj:

```txt
docs/screens/login.png
```

---

## Lista zakupów

Dodaj:

```txt
docs/screens/shopping.png
```

---

## Ustawienia

Dodaj:

```txt
docs/screens/settings.png
```

---

## Google Analytics

Dodaj:

```txt
docs/screens/analytics.png
```

---

## Hotjar

Dodaj:

```txt
docs/screens/hotjar.png
```

---

# 🎯 Zgodność z wymaganiami projektu

| Wymaganie | Status |
|---|---|
| Odwzorowanie prototypu | ✅ |
| Routing React Router | ✅ |
| Folder pages | ✅ |
| Komponenty reużywalne | ✅ |
| Stylowanie | ✅ |
| Logowanie | 🟡 lokalne |
| Firebase | ⏳ |
| Hotjar | ⏳ |
| Google Analytics | ⏳ |
| Deploy | ⏳ |
| README | ✅ |

---

# 🗺 Roadmap

### UI

- [ ] dopracowanie spacingów
- [ ] pełne odwzorowanie Figma
- [ ] responsywność mobile

### Funkcjonalności

- [ ] Firebase Auth
- [ ] daty ważności produktów
- [ ] procentowa zgodność przepisów
- [ ] powiadomienia

### Analityka

- [ ] Hotjar
- [ ] Google Analytics
- [ ] raporty użytkowników

### Deployment

- [ ] Vercel
- [ ] Railway
- [ ] Netlify

---

# 🌍 Deploy

Frontend:

```txt
DO_UZUPEŁNIENIA
```

Repozytorium:

```txt
DO_UZUPEŁNIENIA
```

---

<div align="center">

### 🧊 Co mam w lodówce?

Projekt frontendowy — React + Vite

Politechnika Krakowska

2026

</div>