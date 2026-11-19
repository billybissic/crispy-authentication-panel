# Crispy Disco Authentication Panel

Standalone React and Vite workspace for the current Crispy Disco authentication API. The interface uses custom components and CSS, without Angular or Material.

## Run

```bash
npm install
cp .env.example .env
npm run dev
```

Set `VITE_AUTH_API_BASE_URL` in `.env` to the authentication API's `/crispy/v1` root. The default is `http://localhost:3000/crispy/v1`. Open the Vite URL (port 4200 by default), then use **Connect API** to supply a bearer token for protected requests. The token stays in memory and clears when the tab reloads.

Users, Administrators, and Configurations read from the current API's existing endpoints. API Keys and Logs show integration pending because the former standalone panel did not implement those screens. Configuration values whose names suggest credentials are masked in the UI; the API must still enforce authorization and avoid exposing secrets to unauthorized clients.

```bash
npm run build
```
