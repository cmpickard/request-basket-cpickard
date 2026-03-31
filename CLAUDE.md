# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Backend (`/server`)
```bash
cd server
npm run dev        # Start Express server with hot reload (tsx watch)
```

### Frontend (`/front_end`)
```bash
cd front_end
npm run dev        # Start Vite dev server at http://localhost:5173
npm run build      # TypeScript compile + Vite build → dist/
npm run lint       # ESLint
npm run preview    # Preview production build
```

No tests are currently implemented.

## Architecture

**request-basket** is a webhook capture/inspection tool (like RequestBin). Users create named baskets (unique HTTP endpoints), send HTTP requests to them, and inspect what was captured.

### Stack
- **Backend**: Express 5, TypeScript, MongoDB (Mongoose), PostgreSQL (pg), JWT
- **Frontend**: React 19, Vite, React Router, TypeScript

### Backend structure (`/server/src`)
- `server.ts` — Express app entry, mounts routes, connects to both databases
- `routes/` — Route definitions
- `controllers/basketController.ts` — All request handlers
- `models/mongoModel.ts` — MongoDB queries (store/retrieve/clear captured requests)
- `models/pgModel.ts` — PostgreSQL queries (basket registry: endpoint → token)
- `services/token.ts` — JWT generation using endpoint name + `SECRET_KEY`

### API routes
| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/baskets/create/:endpoint` | Create a basket |
| `GET` | `/api/baskets/:endpoint` | Get captured requests |
| `ALL` | `/api/:endpoint` | Capture any incoming HTTP request |
| `PUT` | `/api/:endpoint/clear` | Clear all requests in basket |
| `GET` | `/api/health` | Health check |

### Dual-database design
- **PostgreSQL**: Basket registry — maps `basket_endpoint` (unique, 8–25 alphanumeric chars) → JWT token
- **MongoDB**: Request storage — each captured webhook request is stored with `endpoint`, `method`, `headers`, `body`

### Frontend structure (`/front_end/src`)
- `App.tsx` — Routing (`/` → Home, `/:endpoint` → Basket view)
- `components/Home.tsx` — Basket creation form + list of user's existing baskets
- `components/Basket.tsx` — View captured requests for an endpoint
- `components/SingleRequest.tsx` — Render individual request details
- `components/Modal.tsx` — Post-creation success popup with copyable URLs
- `hooks/` — Custom React hooks for data fetching
- `utils/basketUtilities.ts` — Validation logic and localStorage helpers

### Auth / token model
JWT tokens are generated at basket creation and stored in browser `localStorage` (key: `basket_<endpoint>`). There is no user account system. Losing the token means losing access to the basket — this is a documented design choice.

### Environment variables (`server/.env`)
```
MONGO_URI=...
PG_URI=...
SECRET_KEY=...
```
