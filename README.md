# GoMate — Transport App

Cross-platform transport companion built with Expo (React Native) showcasing authentication, navigation, API integration, Redux Toolkit state management, favourites persistence, and dark-mode support via the device theme.

## Features

- Expo-managed app with React Navigation stack + bottom tabs.
- Dummy authentication flow backed by Redux Toolkit and persisted with AsyncStorage.
- Transport routes fetched from a mock API (`json-server`) and rendered in card form.
- Details screen per route with ability to toggle favourites; favourites persist locally.
- Global state management via Redux Toolkit with typed hooks.
- Form validation powered by Formik + Yup.
- Feather icons and responsive styling with `StyleSheet`.
- Dark/light theme driven by the system colour scheme.

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

   If you add the project to a fresh Expo workspace run the bundled CLI commands instead of the deprecated global `expo-cli`.

2. **Install required native modules (managed by Expo)**

   Expo SDK 54 matches the dependency versions declared in `package.json`. If you need to re-sync, run:

   ```bash
   npx expo install @react-native-async-storage/async-storage @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens
   ```

3. **Run optional mock API**

   ```bash
   npx json-server --watch mock-api/db.json --port 3001
   ```

   The app points to `http://localhost:3001/routes` by default; update `src/api/transportApi.ts` to swap in a real service when ready.

4. **Start the Expo development server**

   ```bash
   npx expo start
   ```

   Scan the QR code using Expo Go (Android) or run on an emulator/simulator (`a`, `i`, `w` keys).

## Project Structure

```
gomate-transport/
├─ App.tsx
├─ app.json
├─ babel.config.js
├─ mock-api/
│  └─ db.json
├─ src/
│  ├─ api/
│  │  └─ transportApi.ts
│  ├─ components/
│  │  └─ ItemCard.tsx
│  ├─ navigation/
│  │  └─ AppNavigator.tsx
│  ├─ screens/
│  │  ├─ DetailsScreen.tsx
│  │  ├─ FavouritesScreen.tsx
│  │  ├─ HomeScreen.tsx
│  │  └─ LoginScreen.tsx
│  ├─ store/
│  │  ├─ hooks.ts
│  │  ├─ index.ts
│  │  └─ slices/
│  │     ├─ authSlice.ts
│  │     └─ itemsSlice.ts
│  ├─ types/
│  │  └─ index.ts
│  └─ utils/
│     └─ validation.ts
└─ README.md
```

## Key Source Files

- `App.tsx` wires up navigation, Redux, SafeArea, and persisted hydration.
- `src/navigation/AppNavigator.tsx` defines the login stack and main tab navigator with icons.
- `src/screens/*.tsx` contain UI and logic for login, list, favourites, and detail flows.
- `src/store/slices/*.ts` manage auth and transport data, including AsyncStorage persistence.
- `src/api/transportApi.ts` centralises the Axios client so you can swap in a real backend.

## Mock API

The project ships with `mock-api/db.json` for `json-server`. Start it before running the app to return sample transport data.

```json
{
  "routes": [
    {
      "id": 1,
      "title": "Central Station - Northline",
      "description": "Frequent services between Central and Northline.",
      "status": "Active",
      "image": "https://picsum.photos/300/200?random=1"
    },
    {
      "id": 2,
      "title": "Seaside Express",
      "description": "Limited-stop express service to the coast.",
      "status": "Upcoming",
      "image": "https://picsum.photos/300/200?random=2"
    },
    {
      "id": 3,
      "title": "Airport Shuttle",
      "description": "Runs every 30 mins; luggage storage available.",
      "status": "Active",
      "image": "https://picsum.photos/300/200?random=3"
    }
  ]
}
```

## Suggested Commit Messages

- `feat/auth: add login form and redux slice`
- `feat/navigation: add stack + tab navigators`
- `feat/routes: fetch transport data and cards`
- `feat/favourites: persist selections with asyncstorage`
- `chore: add mock api and docs`

## Evaluation Checklist

- **Authentication & Validation** – Formik + Yup enforce basic rules; state persists between launches.
- **Navigation** – Stack handles auth gating; tabs cover main content + favourites.
- **API Integration** – Axios thunk fetches mock transport data and renders lists.
- **State Management** – Redux Toolkit slices for auth and items with async thunks.
- **UI/UX** – Card layout, icons, and safe-area aware screens with basic responsive styles.
- **Code Quality** – Modularised feature slices, typed hooks, and clean separation of concerns.
- **Bonus** – Theme automatically adapts to system dark/light preferences.

## Next Steps

1. Add an explicit dark-mode toggle and persist it alongside other settings.
2. Replace the mock API with a live transport feed and add error states.
3. Record a demo video covering authentication, browsing, favourites, and detail views.
