# Git Commit Guide - Feature by Feature

## Step 1: Initialize Git Repository

```bash
cd C:\Users\LENOVO\OneDrive\Desktop\Assignment_App\gomate-transport
git init
git remote add origin https://github.com/SamashaHettiarachchi/Lab-Assignment--IN3210---Mobile-Applications-Development.git
```

## Step 2: Feature-Based Commits

### Commit 1: Initial Project Setup
```bash
git add package.json tsconfig.json babel.config.js app.json index.ts
git add android/
git commit -m "feat: initial project setup with Expo and TypeScript configuration"
```

### Commit 2: Project Structure & Types
```bash
git add src/types/
git add src/declarations.d.ts
git commit -m "feat: add TypeScript types and declarations"
```

### Commit 3: Redux Store Setup
```bash
git add src/store/index.ts
git add src/store/hooks.ts
git commit -m "feat: setup Redux store with TypeScript hooks"
```

### Commit 4: Authentication Slice
```bash
git add src/store/slices/authSlice.ts
git commit -m "feat: implement authentication slice with AsyncStorage persistence"
```

### Commit 5: Items/Routes Slice
```bash
git add src/store/slices/itemsSlice.ts
git commit -m "feat: implement routes slice with favourites and async data fetching"
```

### Commit 6: Theme Slice (Dark Mode)
```bash
git add src/store/slices/themeSlice.ts
git add src/utils/theme.ts
git commit -m "feat: implement dark mode with theme slice and persistence"
```

### Commit 7: Form Validation
```bash
git add src/utils/validation.ts
git commit -m "feat: add Yup validation schema for login form"
```

### Commit 8: API Integration
```bash
git add src/api/transportApi.ts
git commit -m "feat: integrate DummyJSON API for authentication and data fetching"
```

### Commit 9: Navigation Setup
```bash
git add src/navigation/AppNavigator.tsx
git commit -m "feat: setup React Navigation with Stack and Bottom Tab navigators"
```

### Commit 10: Login Screen
```bash
git add src/screens/LoginScreen.tsx
git commit -m "feat: implement login screen with Formik validation and gradient UI"
```

### Commit 11: Home Screen
```bash
git add src/screens/HomeScreen.tsx
git commit -m "feat: implement home screen with dynamic route list and pull-to-refresh"
```

### Commit 12: Item Card Component
```bash
git add src/components/ItemCard.tsx
git commit -m "feat: create reusable ItemCard component with status badges"
```

### Commit 13: Details Screen
```bash
git add src/screens/DetailsScreen.tsx
git commit -m "feat: implement details screen with schedule information and favourites"
```

### Commit 14: Favourites Screen
```bash
git add src/screens/FavouritesScreen.tsx
git commit -m "feat: implement favourites screen with empty state handling"
```

### Commit 15: Profile Screen
```bash
git add src/screens/ProfileScreen.tsx
git commit -m "feat: implement profile screen with settings and dark mode toggle"
```

### Commit 16: App Entry Point
```bash
git add App.tsx
git commit -m "feat: setup app entry with Redux Provider and state hydration"
```

### Commit 17: Assets & Mock Data
```bash
git add assets/
git add mock-api/
git commit -m "chore: add assets and mock API data"
```

### Commit 18: Documentation
```bash
git add README.md API_SETUP.md
git commit -m "docs: add comprehensive README and API setup documentation"
```

### Commit 19: Final Polish
```bash
git add .
git commit -m "style: apply final UI polish with gradients, shadows, and animations"
```

## Step 3: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

## Alternative: Push All at Once (if needed)

If you want to push everything as one commit first, then add feature commits:

```bash
git add .
git commit -m "feat: complete GoMate Transport app with all features"
git push -u origin main
```

## Verify Your Commits

```bash
git log --oneline
```

You should see all your feature-based commits listed!

## Notes:
- Make sure you're logged into GitHub
- If you get authentication errors, you may need to setup a Personal Access Token
- Each commit message follows conventional commit format (feat:, docs:, style:, chore:)
