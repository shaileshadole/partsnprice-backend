# PriceNParts Backend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js) 
![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express) 
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen?logo=mongodb) 
![Render](https://img.shields.io/badge/Deployed%20on-Render-blue?logo=render)

RESTful API that powers the PriceNParts app. It lets authenticated makers create projects, curate a catalog of parts, and track per-project part usage plus total budgets. The service is built with Express, MongoDB (via Mongoose), and cookie-based JWT auth.

## Highlights

- Express 5 server with modular routers for users, projects, and parts.
- MongoDB persistence with dedicated models for `User`, `Project`, and `Parts`.
- Cookie-based JWT authentication (`isAuthenticated` middleware) with automatic cookie issuance (`sendCookies`) on login/register.
- Full CRUD for projects and parts, including helpers to add/remove parts from a project and adjust quantities quickly.
- Centralized error middleware and strict CORS config tied to `FRONTEND_URL`.

## Project Layout

```
backend/
├── app.js                # Express app, middleware, routers, CORS
├── server.js             # Boots the API after connecting to Mongo
├── data/
│   ├── config.env        # Environment variables (never commit secrets)
│   └── database.js       # Mongoose connection helper
├── controllers/          # Business logic for users, projects, parts
├── middlewares/
│   ├── auth.js           # JWT cookie auth guard
│   └── error.js          # Error handler + ErrorHandler class
├── models/               # Mongoose schemas
├── routes/               # Express routers for each resource
└── utils/features.js     # Helper for issuing JWT cookies
```

## Prerequisites

- Node.js 18+ and npm
- MongoDB instance/cluster (local or Atlas)
- Optional: a running frontend (defaults to `http://localhost:5173`)

## Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create `data/config.env` (or copy from the example below) and provide real values:

   | Key            | Description                                | Example                         |
   |----------------|--------------------------------------------|---------------------------------|
   | `PORT`         | Port for Express                           | `4000`                          |
   | `MONGO_URI`    | MongoDB connection string                  | `mongodb+srv://...`             |
   | `JWT_SECRET`   | Secret for signing auth tokens             | `super-secret-string`           |
   | `FRONTEND_URL` | Allowed CORS origin & cookie recipient     | `http://localhost:5173`         |
   | `NODE_ENV`     | `development` or `production` (affects CORS/cookies) | `development` |

   > ⚠️ Keep `config.env` out of source control; it currently lives under `backend/data`.

3. (Optional) Seed MongoDB with any starter data you need.

## Running Locally

```bash
# Watches with nodemon
npm run dev

# Production style
npm start
```

The server reads `PORT` from `config.env`. On boot, `server.js` connects to Mongo via `connectDB()` before attaching the HTTP listener.

## API Overview

All routes live under `/api/v1/*` and, unless noted, require a valid `token` cookie issued during login/register.

### Auth (`/api/v1/user`)

- `POST /register` – create account, returns auth cookie.
- `POST /login` – authenticate with `email` + `password`, returns auth cookie.
- `GET /logout` – clears cookie immediately.
- `GET /meprofile` – returns current user (`isAuthenticated` protected).

### Projects (`/api/v1/project`)

- `POST /new` – create project (`name`, optional `description`, `submitDate`).
- `GET /all` – list projects for the current user (sorted newest first).
- `GET /:projectId` – fetch a single project with populated parts.
- `PUT /:projectId` – update core fields.
- `DELETE /:projectId` – remove a project.
- Part helpers on a project:
  - `POST /:projectId/part/:partId/new` – attach a part or increment its quantity.
  - `PUT /:projectId/part/:partId/quantity` – set a specific quantity.
  - `PUT /:projectId/part/:partId/plusone` / `minusone` – increment/decrement.
  - `DELETE /:projectId/part/:partId` – remove the part from the project.

### Parts (`/api/v1/part`)

- `POST /new` – add a part to the catalog (`title`, optional `link`, `rate`).
- `GET /all` – fetch all parts (sorted by newest).
- `PUT /:partId` – edit a part.
- `DELETE /:partId` – delete a part.

### Error Handling & Responses

- All controllers forward problems to `errorMiddleware`, which normalizes responses to:
  ```json
  {
    "success": false,
    "message": "Human readable error"
  }
  ```
- Validation/auth failures typically return 400/401/404; unhandled issues default to `500`.

## Authentication Flow

1. `register` or `login` generates a signed JWT (`JWT_SECRET`) and stores it in an HTTP-only cookie named `token`.
2. `isAuthenticated` reads the cookie, verifies the token, loads the user, and attaches it to `req.user`. Missing/invalid cookies short-circuit with a `404 Login first` message.
3. Logout erases the cookie immediately and respects `NODE_ENV` for `sameSite`/`secure`.

## Notes & Tips

- Changing `FRONTEND_URL` requires a server restart because it feeds the CORS whitelist.
- Keep `NODE_ENV=production` when deploying so cookies are marked `secure` and `sameSite=none`.
- No seed or migration scripts are included; create your own if you need sample data.
- Tests are not yet defined. Consider adding integration tests around the controllers before large refactors.

---

## 🧑‍💻 Author

**Shailesh Adole**  
GitHub: [shaileshadole](https://github.com/shaileshadole)

---

## 🔗 Related Repositories

[PartsNPrice Frontend](https://github.com/shaileshadole/partsnprice-frontend)

---

## 🚀 Let's Connect

- 🌐 [LinkedIn](https://www.linkedin.com/in/shailesh-adole-01306a303/)
- ✉️ [Email](adoleshailesh2@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Need anything else documented? Open an issue or extend this README. Happy building!


