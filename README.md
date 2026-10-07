# JeevanCare – one app, one deploy

Frontend (React) + backend (Express) now run as **one service**. The backend serves the built website, and all API calls are relative (`/api/...`), so nothing needs changing between local and live.

## Run locally
1. Start MongoDB (or put an Atlas link in `.env`, see `.env.example`).
2. ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:5173

## Deploy live on Render (one step)
1. Create a free database at https://www.mongodb.com/atlas -> Connect -> Drivers -> copy the connection string
   (Network Access: allow `0.0.0.0/0`).
2. Push this folder to a GitHub repo.
3. Render -> **New +** -> **Blueprint** -> pick the repo.
   Paste the Atlas string into `MONGODB_URI` when asked -> **Apply**.

Done. Render gives you one URL for the whole site. (Manual alternative: New Web Service,
Build `npm install --include=dev && npm run build`, Start `npm start`, env vars `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`.)

## Technician logins (created automatically on first start)
`tech001 / tech123` and `tech002 / tech456` – change these before real use.
