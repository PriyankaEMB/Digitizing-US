# Digitizing.US — Deployment Package
## For: Abraham | Date: 2026-03 | Version: 2.0

---

## What's in This Package

```
digitizing-us/
├── site_v2.jsx              ← Complete React app (1,019 lines, all pages)
├── data/
│   └── content.json         ← All site copy, pricing, blog, team, FAQ, terms
└── docs/
    └── admin-chatbot-spec.md ← Full spec for the admin panel backend
```

---

## New in v2 (vs original site_v2.jsx)

### Pages completed (were Placeholder before)
- **About** — Team profiles, company values, 30-year timeline, stats
- **Contact** — Working contact form (submit → success state), direct info panel, hours
- **Blog** — 4 full articles with category filter, featured post, individual post view
- **Terms & Privacy** — 9 plain-English sections, numbered layout

### Admin Panel (password-gated)
- Accessible via hidden `•` in top nav → password `digitizing2026`
- **Orders tab** — Order queue with status management (New / In Progress / Complete / Flagged)
- **AI Reply tab** — Paste customer email → AI drafts a reply using Anthropic API
- **Health tab** — Dashboard stats (demo data in MVP, wire to `/api/admin/stats`)
- Inline `mailto:` links pre-filled with order reference

---

## USABadge.com Data — Pull Before Launch

The patches page and FAQ currently send users to USABadge.com for minimums, pricing, and lead times rather than stating them inline. This is intentional — the numbers need to come from the live site, not be hardcoded.

**Abraham: before launch, pull the following from USABadge.com and either hardcode or wire via API:**

| Data point | Where to display |
|------------|-----------------|
| Minimum order per patch type | PatchesPage intro, FAQ "minimum order" answer |
| Production / turnaround time per patch type | FAQ "how long does production take" answer |
| Price ranges per patch type | PatchesPage product cards |
| Rush options and costs | FAQ answer |

Search for these strings in `site_v2.jsx` to find the placeholder locations:
- `"Visit USABadge.com for current minimums"`
- `"Pricing depends on size, type, and complexity"`
- `"Production time varies by patch type"`

---



### 1. Drop in your React project
```bash
# Replace your existing site_v2.jsx with the new one
cp site_v2.jsx src/site_v2.jsx   # adjust path to match your structure
```

### 2. No new dependencies needed
All pages use the same deps as before:
- React (useState, useRef, useEffect, useCallback)
- No external component libraries
- Google Fonts loaded inline via `<link>` tag

### 3. Environment variable (before production)
The admin password is currently hardcoded. Move it:

```js
// Current (change this before go-live):
if(adminPass==="digitizing2026")

// Target:
if(adminPass===process.env.REACT_APP_ADMIN_PASSWORD)
```

Add to `.env`:
```
REACT_APP_ADMIN_PASSWORD=your_secure_password_here
```

### 4. The AI Reply Assistant
The admin AI Reply tab calls the Anthropic API directly from the browser.
For production, **proxy this through your backend** to avoid exposing API keys:

```js
// Current call in AdminPanel → callAI():
const r = await fetch("https://api.anthropic.com/v1/messages", {
  // ... no auth header (works in Claude.ai preview context only)
});

// Production: proxy through your backend
const r = await fetch("/api/ai/reply", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Authorization": `Bearer ${adminToken}` },
  body: JSON.stringify({ customerEmail: aiInput })
});
```

Your backend endpoint handles the Anthropic API key securely. See `docs/admin-chatbot-spec.md` for the full API spec.

---

## Customer Email Verification (Demo → Real)

Currently the verification code is a 6-digit number shown in the chat (demo only). Before launch:

1. Set up an email provider (Resend is the easiest — free tier covers this)
2. Replace the `ST2.EM` step in `Chat` component:

```js
// Current (demo):
const c = String(Math.floor(100000 + Math.random() * 900000));
setGc(c);
bot(`...Demo code: **${c}**`);

// Production:
const c = String(Math.floor(100000 + Math.random() * 900000));
setGc(c);
await fetch("/api/send-verification", {
  method: "POST",
  body: JSON.stringify({ email: v, code: c })
});
bot(`We've sent a 6-digit code to **${v}**. Check your inbox.`);
```

Backend endpoint sends the email via Resend/SendGrid and returns `200 OK`.

---

## File Upload (Client-Side Only → Server)

File validation in the chatbot is client-side (type + size check). To actually store uploads:

```js
// Add to the file() handler after setUf(f):
const formData = new FormData();
formData.append("file", f);
formData.append("sessionId", generateSessionId());
await fetch("/api/upload", { method: "POST", body: formData });
```

Backend: store to S3 or Cloudflare R2, return a URL, attach to the order object.

---

## Order Submission (Chat → Real API)

The final order submission in the chatbot (`ST2.CMT` step → `ST2.DONE`) currently just logs to state. To actually save orders:

```js
// In the go() function, ST2.CMT case, after building `o`:
await fetch("/api/orders", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    ...o,
    code,
    submittedAt: new Date().toISOString(),
    fileUrl: /* from upload step */
  })
});
```

---

## Content Updates Without Code

All site content lives in `data/content.json`:
- Pricing → `pricing.digitizing[]` and `pricing.artwork[]`
- Blog posts → `blog[]`
- FAQ → `faq[]`
- Team → `team[]`
- Terms → `terms.sections[]`

**Current state:** Content is written directly in the JSX components for simplicity. For v3, wire components to import from `content.json` so content changes don't require code deploys.

---

## Known Issues / TODO Before Launch

| # | Issue | Where | Priority |
|---|-------|--------|----------|
| 1 | Admin password hardcoded | App component | HIGH — move to env var |
| 2 | Email verification is demo-only | Chat `ST2.EM` step | HIGH — before real orders |
| 3 | File uploads not persisted | Chat `file()` handler | HIGH — need storage backend |
| 4 | Orders not saved to DB | Chat `ST2.CMT` step | HIGH — need `/api/orders` |
| 5 | AI Reply uses bare API call | AdminPanel `callAI()` | MEDIUM — proxy through backend |
| 6 | Google Fonts in JSX `<link>` | App return | LOW — move to `index.html` |
| 7 | Contact form not wired | ContactPage `submit()` | MEDIUM — needs form backend |

---

## Quick Links

- Portal: https://system.digitizing.systems
- Register: https://system.digitizing.systems/register
- Patches: https://usabadge.com
- Admin: hidden `•` in top nav bar → password gate

---

*Questions? mail@digitizing.us | 401-655-1153*
