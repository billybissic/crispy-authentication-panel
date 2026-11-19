import { useEffect, useMemo, useState, useCallback, type FormEvent } from 'react';

type Page = 'overview' | 'users' | 'administrators' | 'api-keys' | 'configurations' | 'logs' | 'about';
type RecordValue = Record<string, unknown>;
const pages: { id: Page; label: string; icon: string; description: string }[] = [
  { id: 'overview', label: 'Overview', icon: '◫', description: 'Authentication workspace' },
  { id: 'users', label: 'Users', icon: '◉', description: 'Review accounts and access.' },
  { id: 'administrators', label: 'Administrators', icon: '◇', description: 'Review privileged accounts.' },
  { id: 'api-keys', label: 'API Keys', icon: '⌁', description: 'API key management.' },
  { id: 'configurations', label: 'Configurations', icon: '⚙', description: 'Review authentication settings.' },
  { id: 'logs', label: 'Logs', icon: '≡', description: 'Authentication activity.' },
];

const apiBase = (import.meta.env.VITE_AUTH_API_BASE_URL || '/crispy/v1').replace(/\/$/, '');

function currentPage(): Page {
  const value = window.location.hash.slice(1).replace(/^\//, '');
  return (['overview', 'users', 'administrators', 'api-keys', 'configurations', 'logs', 'about'].includes(value) ? value : 'overview') as Page;
}

async function readCollection(path: string, signal: AbortSignal): Promise<RecordValue[]> {
  const response = await fetch(`${apiBase}${path}`, {
    signal,
    credentials: 'include',
  });
  if (!response.ok) throw new Error(response.status === 401 || response.status === 403
    ? 'Your session expired or access was denied. Sign in again.'
    : `API request failed (${response.status}).`);
  const data: unknown = await response.json();
  const body = typeof data === 'object' && data !== null && 'response_body' in data
    ? (data as { response_body: unknown }).response_body : data;
  if (!Array.isArray(body)) throw new Error('The API did not return a list.');
  return body.filter((item): item is RecordValue => typeof item === 'object' && item !== null);
}

function valueOf(row: RecordValue, key: string): string {
  const value = key === 'email' ? (row.user_profile as RecordValue | undefined)?.email ?? row.email : row[key];
  if (value === null || value === undefined) return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function DataPage({ title, description, path, columns, onUnauthorized, maskValues = false }: {
  title: string; description: string; path: string; columns: { key: string; label: string }[];
  onUnauthorized: () => void; maskValues?: boolean;
}) {
  const [rows, setRows] = useState<RecordValue[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(0);
  const [sort, setSort] = useState<{ key: string; descending: boolean } | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(''); setRows([]);
    readCollection(path, controller.signal)
      .then(setRows)
      .catch((cause) => { if (!controller.signal.aborted) { const message = cause instanceof Error ? cause.message : 'Request failed.'; setError(message); if (message.startsWith('Your session expired')) onUnauthorized(); } })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [path, reload, onUnauthorized]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const result = rows.filter((row) => !term || columns.some((column) => valueOf(row, column.key).toLowerCase().includes(term)));
    if (sort) result.sort((a, b) => valueOf(a, sort.key).localeCompare(valueOf(b, sort.key), undefined, { numeric: true }) * (sort.descending ? -1 : 1));
    return result;
  }, [rows, query, sort, columns]);
  const visible = filtered.slice(page * 10, page * 10 + 10);
  return <section className="data-page">
    <div className="page-heading"><div><p className="eyebrow">IDENTITY & ACCESS</p><h1>{title}</h1><p>{description}</p></div><button className="secondary-button" onClick={() => setReload((n) => n + 1)}>Refresh</button></div>
    <div className="data-panel">
      <div className="data-toolbar"><div><h2>{title}</h2><span>{loading ? 'Loading…' : `${filtered.length} records`}</span></div><input aria-label={`Search ${title.toLowerCase()}`} placeholder={`Search ${title.toLowerCase()}…`} value={query} onChange={(event) => { setQuery(event.target.value); setPage(0); }} /></div>
      {error && <p className="notice error" role="alert">{error} <span>API: {apiBase}</span></p>}
      <div className="table-scroll"><table><thead><tr>{columns.map((column) => <th key={column.key}><button onClick={() => setSort((current) => ({ key: column.key, descending: current?.key === column.key && !current.descending }))}>{column.label} {sort?.key === column.key ? (sort.descending ? '↓' : '↑') : ''}</button></th>)}</tr></thead><tbody>
        {visible.map((row, index) => <tr key={String(row.uuid ?? row.id ?? `${page}-${index}`)}>{columns.map((column) => {
          const sensitive = maskValues && /secret|token|password|key|salt/i.test(valueOf(row, 'config_name'));
          return <td key={column.key}>{sensitive && column.key === 'config_value' ? '••••••••' : valueOf(row, column.key)}</td>;
        })}</tr>)}
        {!loading && !error && visible.length === 0 && <tr><td colSpan={columns.length} className="empty-cell">{query ? 'No matches.' : 'No records returned.'}</td></tr>}
      </tbody></table></div>
      <div className="table-footer"><span>Showing {filtered.length ? page * 10 + 1 : 0}–{Math.min((page + 1) * 10, filtered.length)} of {filtered.length}</span><div><button disabled={page === 0} onClick={() => setPage((n) => n - 1)}>Previous</button><button disabled={(page + 1) * 10 >= filtered.length} onClick={() => setPage((n) => n + 1)}>Next</button></div></div>
    </div>
  </section>;
}

function Overview({ navigate }: { navigate: (page: Page) => void }) {
  return <section className="overview"><div className="page-heading"><div><p className="eyebrow">IDENTITY & ACCESS</p><h1>Authentication overview</h1><p>Manage accounts, access, and security settings from one workspace.</p></div><span className="page-tag">CRISPY DISCO / AUTH</span></div>
    <div className="feature"><div><span className="eyebrow">CONTROL CENTER</span><h2>Keep your environment in sync.</h2><p>Choose an area below to review authentication data and configuration.</p></div><button onClick={() => navigate('users')}>Manage users <span>↗</span></button></div>
    <div className="section-title"><h2>Workspace</h2><span>Quick access</span></div><div className="card-grid">{pages.filter((page) => page.id !== 'overview').map((page) => <button className="nav-card" key={page.id} onClick={() => navigate(page.id)}><span className="card-icon">{page.icon}</span><strong>{page.label}</strong><span>{page.description}</span><em>Open {page.label.toLowerCase()} ↗</em></button>)}</div>
  </section>;
}

function Placeholder({ name, detail }: { name: string; detail: string }) {
  return <section className="data-page"><div className="page-heading"><div><p className="eyebrow">IDENTITY & ACCESS</p><h1>{name}</h1><p>{detail}</p></div></div><div className="data-panel placeholder"><span className="card-icon">◇</span><h2>{name} integration pending</h2><p>The existing panel did not contain a working {name.toLowerCase()} view. Connect the current API endpoint before enabling actions here.</p></div></section>;
}

type AuthUser = { uuid: string; username: string };
type Challenge = { temp_token: string; setup_required: boolean };

async function authRequest(path: string, body?: Record<string, string>, tempToken?: string): Promise<{ response_status?: string; temp_token?: string; setup_required?: boolean; manual_entry_secret?: string; user?: AuthUser; message?: string }> {
  const response = await fetch(`${apiBase}${path}`, {
    method: body ? 'POST' : 'GET', credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json', ...(tempToken ? { Authorization: `Bearer ${tempToken}` } : {}) } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok && response.status !== 202) throw new Error(response.status === 401 ? 'Invalid credentials or expired session.' : data.message || data.error || `Request failed (${response.status}).`);
  return data;
}

function SignIn({ onSignedIn }: { onSignedIn: (user: AuthUser) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function finish() {
    const session = await authRequest('/authenticate/session');
    if (!session.user) throw new Error('The server did not create a session.');
    onSignedIn(session.user);
  }
  async function submit(event: FormEvent) {
    event.preventDefault(); setError(''); setBusy(true);
    try {
      if (!challenge) {
        const response = await authRequest('/authenticate/login', { _username: username, _password: password });
        setPassword('');
        if (response.response_status === 'AWAITING_MFA' && response.temp_token) {
          setChallenge({ temp_token: response.temp_token, setup_required: Boolean(response.setup_required) });
        } else await finish();
      } else {
        await authRequest('/mfa/verify-2fa', { mfa_code: code }, challenge.temp_token);
        setChallenge(null); setSecret(''); setCode(''); await finish();
      }
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Sign-in failed.'); }
    finally { setBusy(false); }
  }
  async function setupMfa() {
    if (!challenge) return;
    setBusy(true); setError('');
    try {
      const response = await authRequest('/mfa/setup-2fa', {}, challenge.temp_token);
      if (!response.manual_entry_secret) throw new Error('The API did not return a setup secret.');
      setSecret(response.manual_entry_secret);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Setup failed.'); }
    finally { setBusy(false); }
  }
  return <div className="signin-layout"><div className="signin-brand"><div className="brand-mark">✦</div><strong>CRISPY DISCO</strong><span>AUTHENTICATION</span></div><form className="signin-card" onSubmit={submit}>
    <p className="eyebrow">SECURE WORKSPACE</p><h1>{challenge ? 'Verify your identity' : 'Welcome back'}</h1><p>{challenge ? 'Enter the six-digit code from your authenticator.' : 'Sign in to manage authentication.'}</p>
    {error && <div className="signin-error" role="alert">{error}</div>}
    {!challenge ? <><label htmlFor="username">Username</label><input id="username" autoComplete="username" required value={username} onChange={event => setUsername(event.target.value)} />
      <label htmlFor="password">Password</label><input id="password" type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} /></>
      : <><label htmlFor="mfa-code">Authenticator code</label><input id="mfa-code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="one-time-code" required value={code} onChange={event => setCode(event.target.value.replace(/\D/g, ''))} />
      {challenge.setup_required && <div className="mfa-setup">{secret ? <p>Add this key to your authenticator, then enter its code: <strong className="setup-secret">{secret}</strong></p> : <button type="button" onClick={setupMfa} disabled={busy}>Set up authenticator</button>}</div>}
      <button type="button" className="back-button" onClick={() => { setChallenge(null); setSecret(''); setCode(''); }}>Use a different account</button></>}
    <button className="signin-submit" disabled={busy}>{busy ? 'Please wait…' : challenge ? 'Verify code' : 'Sign in'}</button>
  </form><small>Connected to {apiBase}</small></div>;
}

export default function App() {
  const [page, setPage] = useState<Page>(currentPage);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checking, setChecking] = useState(true);
  useEffect(() => { authRequest('/authenticate/session').then(result => setUser(result.user || null)).catch(() => setUser(null)).finally(() => setChecking(false)); }, []);
  useEffect(() => { const update = () => setPage(currentPage()); window.addEventListener('hashchange', update); return () => window.removeEventListener('hashchange', update); }, []);
  const navigate = (next: Page) => { window.location.hash = next === 'overview' ? '#/' : `#/${next}`; setPage(next); setSidebarOpen(false); };
  const accountColumns = useMemo(() => [{ key: 'username', label: 'Username' }, { key: 'email', label: 'Email' }, { key: 'uuid', label: 'UUID' }, { key: 'last_login', label: 'Last login' }, { key: 'is_2FA_configured', label: '2FA' }], []);
  const onUnauthorized = useCallback(() => setUser(null), []);
  async function signOut() { try { await authRequest('/authenticate/logout', {}); } catch { /* Clear the local view even if the session already expired. */ } finally { setUser(null); } }
  if (checking) return <div className="auth-loading">Checking your session…</div>;
  if (!user) return <SignIn onSignedIn={setUser} />;
  return <div className="shell">
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}><div className="brand"><div className="brand-mark">✦</div><div><strong>CRISPY DISCO</strong><span>AUTHENTICATION</span></div></div><div className="nav-label">WORKSPACE</div><nav aria-label="Main navigation">{pages.map((item) => <button key={item.id} className={page === item.id ? 'active' : ''} onClick={() => navigate(item.id)}><span>{item.icon}</span>{item.label}</button>)}</nav><div className="sidebar-foot"><span className="status-dot" /> Signed in as {user.username}</div></aside>
    <div className="main"><header className="topbar"><button className="menu-toggle" aria-label="Toggle menu" onClick={() => setSidebarOpen((open) => !open)}>☰</button><div className="breadcrumb">CRISPY DISCO <span>/</span> AUTHENTICATION</div><span className="signed-in-name">{user.username}</span><button className="connection-trigger" onClick={signOut}>SIGN OUT</button></header>
      <main className="content">{page === 'overview' ? <Overview navigate={navigate} /> : page === 'users' ? <DataPage title="Users" description="Review accounts registered with Crispy Disco." path="/users/getUsers" onUnauthorized={onUnauthorized} columns={accountColumns} /> : page === 'administrators' ? <DataPage title="Administrators" description="Review privileged accounts and authentication state." path="/administrators/getAdministrators" onUnauthorized={onUnauthorized} columns={accountColumns} /> : page === 'configurations' ? <DataPage title="Configurations" description="Review authentication API settings. Sensitive values are hidden." path="/web-panel/getAllConfigurations" onUnauthorized={onUnauthorized} maskValues columns={[{ key: 'config_name', label: 'Setting' }, { key: 'config_value', label: 'Value' }, { key: 'last_updated', label: 'Updated' }]} /> : page === 'about' ? <Placeholder name="About" detail="Standalone Crispy Disco authentication control panel." /> : <Placeholder name={page === 'logs' ? 'Logs' : 'API Keys'} detail="This section needs a current API integration." />}</main>
    </div>
  </div>;
}
