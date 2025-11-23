# API Setup Guide

## Using DummyJSON Public API

This app now uses **DummyJSON** (https://dummyjson.com) - a free REST API for testing and prototyping.

### Authentication Endpoint

**Login URL:** `https://dummyjson.com/auth/login`

**Demo Credentials:**

- Username: `emilys`
- Password: `emilyspass`

**Other Available Users:**

- Username: `michaelw` / Password: `michaelwpass`
- Username: `sophiab` / Password: `sophiabpass`
- Username: `jamesd` / Password: `jamesdpass`

Full list: https://dummyjson.com/users

### Data Endpoint

**Products API (mapped to Transport Routes):**

- URL: `https://dummyjson.com/products`
- Returns product data that we transform into transport routes
- No authentication required

### How It Works

1. **Login Flow:**

   ```
   POST https://dummyjson.com/auth/login
   Body: { username: "emilys", password: "emilyspass" }
   Returns: { token, user data }
   ```

2. **Fetch Routes:**

   ```
   GET https://dummyjson.com/products?limit=20
   Returns: Product data transformed to transport routes
   ```

3. **Data Mapping:**
   - Product title → Route title
   - Product description → Route description
   - Product thumbnail → Route image
   - Product price > 500 → Status "Active"
   - Product price ≤ 500 → Status "Upcoming"

### Why DummyJSON?

✅ **No Setup Required** - No need to run json-server locally  
✅ **Real Authentication** - Actual login API with tokens  
✅ **Always Available** - Hosted online, works on any device  
✅ **Perfect for Demos** - No localhost issues on physical devices

### Advantages Over json-server

| Feature               | DummyJSON        | json-server           |
| --------------------- | ---------------- | --------------------- |
| Setup                 | None             | Requires local server |
| Mobile Testing        | Works everywhere | localhost issues      |
| Authentication        | Real API         | Fake/manual           |
| Deployment            | Already hosted   | Need to host          |
| Assignment Compliance | ✅ Public API    | ⚠️ Local only         |

### Testing

1. Login with demo credentials
2. Browse transport routes (products)
3. Add favorites (persisted locally)
4. View route details
5. Logout and login again

No local server needed! The app works immediately after `npm start`.
