# GoMate Transport - Feature-based Git Commits Script
# Run this script to commit features one by one

Write-Host "Starting Git initialization..." -ForegroundColor Green

# Initialize Git
git init
git remote add origin https://github.com/SamashaHettiarachchi/Lab-Assignment--IN3210---Mobile-Applications-Development.git

Write-Host "`nCommit 1: Initial Project Setup" -ForegroundColor Cyan
git add package.json tsconfig.json babel.config.js app.json index.ts
git add android/
git commit -m "feat: initial project setup with Expo and TypeScript configuration"

Write-Host "`nCommit 2: Project Structure & Types" -ForegroundColor Cyan
git add src/types/
git add src/declarations.d.ts
git commit -m "feat: add TypeScript types and declarations"

Write-Host "`nCommit 3: Redux Store Setup" -ForegroundColor Cyan
git add src/store/index.ts
git add src/store/hooks.ts
git commit -m "feat: setup Redux store with TypeScript hooks"

Write-Host "`nCommit 4: Authentication Slice" -ForegroundColor Cyan
git add src/store/slices/authSlice.ts
git commit -m "feat: implement authentication slice with AsyncStorage persistence"

Write-Host "`nCommit 5: Items/Routes Slice" -ForegroundColor Cyan
git add src/store/slices/itemsSlice.ts
git commit -m "feat: implement routes slice with favourites and async data fetching"

Write-Host "`nCommit 6: Theme Slice (Dark Mode)" -ForegroundColor Cyan
git add src/store/slices/themeSlice.ts
git add src/utils/theme.ts
git commit -m "feat: implement dark mode with theme slice and persistence"

Write-Host "`nCommit 7: Form Validation" -ForegroundColor Cyan
git add src/utils/validation.ts
git commit -m "feat: add Yup validation schema for login form"

Write-Host "`nCommit 8: API Integration" -ForegroundColor Cyan
git add src/api/transportApi.ts
git commit -m "feat: integrate DummyJSON API for authentication and data fetching"

Write-Host "`nCommit 9: Navigation Setup" -ForegroundColor Cyan
git add src/navigation/AppNavigator.tsx
git commit -m "feat: setup React Navigation with Stack and Bottom Tab navigators"

Write-Host "`nCommit 10: Login Screen" -ForegroundColor Cyan
git add src/screens/LoginScreen.tsx
git commit -m "feat: implement login screen with Formik validation and gradient UI"

Write-Host "`nCommit 11: Item Card Component" -ForegroundColor Cyan
git add src/components/ItemCard.tsx
git commit -m "feat: create reusable ItemCard component with status badges"

Write-Host "`nCommit 12: Home Screen" -ForegroundColor Cyan
git add src/screens/HomeScreen.tsx
git commit -m "feat: implement home screen with dynamic route list and pull-to-refresh"

Write-Host "`nCommit 13: Details Screen" -ForegroundColor Cyan
git add src/screens/DetailsScreen.tsx
git commit -m "feat: implement details screen with schedule information and favourites"

Write-Host "`nCommit 14: Favourites Screen" -ForegroundColor Cyan
git add src/screens/FavouritesScreen.tsx
git commit -m "feat: implement favourites screen with empty state handling"

Write-Host "`nCommit 15: Profile Screen" -ForegroundColor Cyan
git add src/screens/ProfileScreen.tsx
git commit -m "feat: implement profile screen with settings and dark mode toggle"

Write-Host "`nCommit 16: App Entry Point" -ForegroundColor Cyan
git add App.tsx
git commit -m "feat: setup app entry with Redux Provider and state hydration"

Write-Host "`nCommit 17: Assets & Mock Data" -ForegroundColor Cyan
git add assets/
git add mock-api/
git commit -m "chore: add assets and mock API data"

Write-Host "`nCommit 18: Documentation" -ForegroundColor Cyan
git add README.md API_SETUP.md GIT_COMMIT_GUIDE.md
git commit -m "docs: add comprehensive README and API setup documentation"

Write-Host "`nCommit 19: Configuration Files" -ForegroundColor Cyan
git add .gitignore
git commit -m "chore: add gitignore configuration"

Write-Host "`nAll commits completed!" -ForegroundColor Green
Write-Host "`nReady to push to GitHub. Run:" -ForegroundColor Yellow
Write-Host "git branch -M main" -ForegroundColor White
Write-Host "git push -u origin main" -ForegroundColor White

Write-Host "`nView commits:" -ForegroundColor Yellow
git log --oneline
