Deployment Guide — Fruitflow

This file summarizes the production deployment steps, required environment variables, and the files I updated to make the project production-ready (Vercel frontend + Render backend).

Backend (Render) — service root: `backend`
- Install and start (Render will run these):
  - Build/Install step: `npm install`
  - Start command: `npm start` (runs `node index.js`)

Required backend environment variables (set these in Render):
- MONGO_URI
  - Example: `mongodb+srv://<user>:<password>@cluster0.mongodb.net/fruitflow?retryWrites=true&w=majority`
  - NOTE: rotate the Atlas user/password if the previous one was exposed.
- JWT_SECRET
  - Example: a long random string; used to sign/verify JWTs.
- FRONTEND_URL
  - Example: `https://fruitflow-peach.vercel.app`
- PORT (optional) — Render provides this automatically.

Backend configuration notes:
- MongoDB URI is read from `process.env.MONGO_URI` (falls back to `mongodb://localhost:27017/fruitflow-dev` for local dev).
- JWT secret is read from `process.env.JWT_SECRET` (falls back to `dev-secret` for local dev).
- CORS origin is read from `process.env.FRONTEND_URL` (falls back to `http://localhost:5173`).
- Production `start` script uses `node index.js`. `nodemon` is kept as `dev` script only.

Vercel (Frontend) — project settings
- Root Directory: `frontend/fruitflow-frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment variable (Vercel -> Project Settings):
  - `VITE_API_URL` → e.g. `https://<your-backend-domain>/api`
    - Example: `https://fruitflow-backend.onrender.com/api`

Frontend notes:
- The frontend reads `import.meta.env.VITE_API_URL` via `frontend/fruitflow-frontend/src/config/api.js` and falls back to `/api` for local dev.
- Do not rely on the Vite dev proxy for production; production must use `VITE_API_URL`.

Files I modified
- [backend/index.js](backend/index.js) — replaced hardcoded MongoDB URI with `process.env.MONGO_URI`, replaced hardcoded JWT verify secret with `process.env.JWT_SECRET`, ensured routes are mounted at `/api/*`.
- [backend/controllers/userController.js](backend/controllers/userController.js) — replaced hardcoded JWT signing secret with `process.env.JWT_SECRET`.
- [backend/config/security.js](backend/config/security.js) — switched CORS to use `process.env.FRONTEND_URL`.
- [backend/package.json](backend/package.json) — changed `start` to `node index.js` and added `dev` = `nodemon index.js`.

How to test locally
1. Backend (local dev):
```powershell
cd backend
$env:MONGO_URI='mongodb://localhost:27017/fruitflow-dev'
$env:JWT_SECRET='dev-secret'
$env:FRONTEND_URL='http://localhost:5173'
npm install
npm run dev
```
2. Frontend (local dev):
```bash
cd frontend/fruitflow-frontend
npm install
npm run dev
```
3. Frontend production build (local test):
```bash
cd frontend/fruitflow-frontend
npm install
VITE_API_URL='http://localhost:3000/api' npm run build
# then serve the `dist` folder with a static server, or test via Vercel preview
```

Notes & security checklist
- Rotate the Atlas credentials used previously.
- Store `MONGO_URI`, `JWT_SECRET`, and `FRONTEND_URL` only in your environment (Render/Vercel) and never commit them to the repository.

If you want, I can:
- Commit these changes to a branch and push them for you.
- Create a short README section in the repo root with these steps.
- Assist with adding Render service settings or linking Vercel to the correct project root.

