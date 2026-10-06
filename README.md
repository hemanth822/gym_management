# Gym Management

A front-end web application for managing gym members. Admins can add, edit and delete members, while all visitors can browse, search, filter, sort and view member details, and shortlist members as favorites. The app is built with React and talks to a mock REST API powered by `json-server`.

## Technologies Used

| Area | Technology |
|---|---|
| UI library | React 19 |
| Build tool / dev server | Vite 8 (`@vitejs/plugin-react`) |
| Routing | React Router DOM 7 |
| State management | Redux Toolkit + React-Redux (favorites) |
| HTTP client | Axios |
| Mock backend | json-server (serves `db.json` as a REST API) |
| Styling | Plain CSS (`src/index.css`) |
| Linting | ESLint (with React Hooks and React Refresh plugins) |
| Browser storage | `localStorage` (logged-in user session) |

## Features

### Public (everyone)
- **Home page** with a hero banner.
- **Members list** shown as cards (photo, name, branch location, membership type, age, fees).
- **Search** members by name.
- **Filters** by membership type (Basic, Standard, Premium, Elite), duration (Monthly, Yearly) and fees range (under ₹5,000, ₹5,000 - ₹10,000, above ₹10,000).
- **Sort** by fees, high to low or low to high. Search, filters and sorting work together.
- **Member details page** showing location, city, membership type, duration, fees, age, workout days per week, weight, assigned trainer and description.
- **Favorites** list built with Redux: add members from the cards, remove them from the Favorites page, and see the live count in the navbar.

### Authentication
- **Signup** with name, email, password and role (User or Admin). Emails are stored in lowercase, and duplicate emails are rejected.
- **Login** matches email (case-insensitive) and password against the users stored in `db.json`.
- **Logout** clears the saved session.
- The logged-in user is kept in `localStorage`.

### Admin only
- **Add Member** form (`/add-member`).
- **Edit Member** form (`/edit-member/:id`), pre-filled with the current data.
- **Delete Member** button on each card.
- Admin pages are guarded by a `ProtectedRoute`: visitors who are not logged in are redirected to Login, and non-admin users are redirected to the members list.

## Project Structure

```
gym_management/
├── db.json                     # Mock database (users, members)
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                # App entry (Redux Provider + Router)
    ├── App.jsx                 # Navbar + routes
    ├── index.css               # Application styles
    ├── app/
    │   └── store.js            # Redux store
    ├── features/
    │   └── favoritesSlice.js   # Favorites reducer and actions
    ├── services/
    │   └── api.js              # Axios instance (http://localhost:3000)
    ├── routes/
    │   ├── AppRoutes.jsx       # Route definitions
    │   └── ProtectedRoute.jsx  # Login / admin guard
    ├── components/
    │   ├── Navbar.jsx
    │   └── MemberCard.jsx
    └── pages/
        ├── Home.jsx
        ├── Members.jsx         # List, search, filter, sort
        ├── MemberDetails.jsx
        ├── AddMember.jsx
        ├── EditMember.jsx
        ├── Favorites.jsx
        ├── Login.jsx
        ├── Register.jsx
        └── Logout.jsx
```

## Routes

| Path | Page | Access |
|---|---|---|
| `/` | Home | Everyone |
| `/members` | Members list | Everyone |
| `/members/:id` | Member details | Everyone |
| `/favorites` | Favorites | Everyone |
| `/register` | Signup | Everyone |
| `/login` | Login | Everyone |
| `/logout` | Logout | Everyone |
| `/add-member` | Add member | Admin |
| `/edit-member/:id` | Edit member | Admin |

## Data Model

Each member in `db.json` has these fields:

| Field | Description |
|---|---|
| `id` | Unique id |
| `name` | Member name |
| `location` | Gym branch |
| `city` | City |
| `type` | Membership type (Basic / Standard / Premium / Elite) |
| `duration` | Monthly or Yearly |
| `fees` | Fees in ₹ |
| `age` | Age in years |
| `workoutDays` | Workout days per week |
| `weight` | Weight in kg |
| `trainer` | Assigned trainer |
| `description` | Short description |
| `image` | Photo URL |

Users have `id`, `name`, `email`, `password` and `role` (`admin` or `user`).

## Getting Started

### Prerequisites
- Node.js 18 or newer
- npm

### Installation and run

```bash
# 1. Install dependencies
npm install

# 2. Start the mock API (keep this terminal open)
npx json-server --port 3000 db.json

# 3. In a second terminal, start the app
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173). The API runs at http://localhost:3000, which is the base URL set in `src/services/api.js`.

### Admin access
An admin account is already stored in the `users` list of `db.json`. You can also sign up with the **Admin** role from the Signup page.

### Other scripts

```bash
npm run build     # Production build
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

## Notes and Limitations
- This is a learning/demo project. Passwords are stored in plain text in `db.json` and the session lives in `localStorage`, so it is not suitable for production use.
- Admin protection is enforced only in the front end, and anyone can choose the Admin role at signup.
- Favorites are kept in Redux memory only, so they reset when the page is refreshed.
- The member photos are loaded from Unsplash, so an internet connection is needed to see them.
"# gym_management" 
