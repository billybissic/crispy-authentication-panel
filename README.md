# Crispy Disco Authentication Panel

Standalone React and Vite workspace for the current Crispy Disco authentication API. The interface uses custom components and CSS, without Angular or Material.

## Run

```bash
npm install
cp .env.example .env
npm run dev
```

The development server proxies `/crispy` to the authentication API at `http://localhost:6767`. For production, serve the panel and reverse proxy `/crispy` through the same site over HTTPS. `VITE_AUTH_API_BASE_URL` defaults to `/crispy/v1`.

Sign in with a Crispy Disco username and password. Accounts with MFA complete a six-digit authenticator challenge; accounts requiring initial setup receive an enrollment key. The API keeps a one-hour, HttpOnly session cookie and supports session recovery on reload and server-side logout. This panel requires the companion authentication API changes in the Crispy Disco PR.

Users, Administrators, and Configurations read from the current API's existing endpoints. API Keys and Logs show integration pending. Configuration values whose names suggest credentials are masked in the UI; the API must still enforce authorization and avoid exposing secrets to unauthorized clients.

```bash
npm run build
```
