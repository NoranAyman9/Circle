# Social App

A social media web app built with **React**, **TypeScript** and **Vite**. Users can create an account, sign in, browse a feed of posts, view post details, and manage their profile.

## Features

- User authentication (Sign Up / Sign In) with form validation
- Protected routes for authenticated and guest-only pages
- Posts feed with post details and comments
- Create new posts
- Simple profile page with editable name and email
- Loading screen and 404 (Not Found) page
- Responsive UI built with HeroUI and Tailwind CSS

## Tech Stack

| Category        | Tools                                  |
| --------------- | -------------------------------------- |
| Framework       | React + TypeScript                     |
| Build tool      | Vite                                   |
| UI library      | [HeroUI](https://www.heroui.com/)      |
| Styling         | Tailwind CSS                           |
| Routing         | React Router DOM                       |
| Forms           | React Hook Form                        |
| Validation      | Zod (`@hookform/resolvers/zod`)        |
| HTTP client     | Axios                                  |

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm (or yarn / pnpm)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd socialApp

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Type-check and build for production  |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

## Project Structure

```
src/
├── assets/           # Images and static assets
├── components/       # Reusable components (Navbar, Post, Comment, CreatePost, LoadingScreen)
├── contexts/         # React contexts (e.g. authContext)
├── hooks/            # Custom hooks (e.g. useFetch)
├── interfaces/       # TypeScript interfaces
├── layouts/          # Page layouts
├── lib/              # Library configuration (e.g. axios instance)
├── pages/            # Feed, PostDetails, Profile, SignIn, SignUp, NotFound
├── protectedRoutes/  # ProtectedRoute and ProtectedAuthRoute
├── schemas/          # Zod validation schemas
├── services/         # API calls (e.g. authService)
├── types/            # Shared TypeScript types
├── utils/            # Helper functions
├── App.tsx
└── main.tsx
```

## Routing

| Path            | Page        | Access          |
| --------------- | ----------- | --------------- |
| `/`             | Feed        | Authenticated   |
| `/profile`      | Profile     | Authenticated   |
| `/post/:id`     | PostDetails | Authenticated   |
| `/signin`       | Sign In     | Guests only     |
| `/signup`       | Sign Up     | Guests only     |
| `*`             | Not Found   | Public          |

> Adjust the paths above to match your router configuration.

## API

The app communicates with the Route Posts API:

```
https://route-posts.routemisr.com
```

Authentication endpoints:

- `POST /users/signup` — create a new account
- `POST /users/signin` — sign in and receive a token

After a successful sign in, the token is stored in `localStorage` and used to access protected pages.

> **Note:** If the API returns `409 PRO FEATURE ONLY`, the request is being rejected by the server itself, not by the frontend. Check the API documentation for access requirements.

## Form Validation

All forms are validated on the client using Zod schemas located in `src/schemas/`:

- `signInSchema` — email and password
- `signUpSchema` — name, email, password, password confirmation, date of birth and gender

## Future Improvements

- Connect the profile page to real user data and persist edits through the API
- Add post likes and comment management
- Add dark mode toggle
- Add unit and integration tests

## License

This project is for educational purposes.
