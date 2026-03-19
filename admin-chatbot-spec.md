# Admin Chatbot — Functional Specification
## Digitizing.US Internal Tool
**Version:** 1.0 | **Date:** 2026-03 | **For:** Abraham (Dev Lead)

---

## Overview

The Admin Chatbot is a **password-protected internal interface** accessible via the hidden dot in the top nav. It gives staff the ability to review incoming orders, manage quotes, flag issues, update pricing copy, and get AI-assisted responses to customer emails — all without leaving the site.

This is NOT the customer-facing chatbot. It shares the same UI shell but points to a different backend and system prompt.

---

## Access & Authentication

### Entry Point
- Hidden tap/click on the `•` element in the top nav bar (already wired in `App` via `setShowAdmin`)
- Password field appears below nav
- Password: `digitizing2026` (hardcoded for MVP — should move to env var before go-live)
- On success: `isAdmin = true`, admin panel renders instead of (or alongside) main site

### Admin Session
- Session persists while tab is open (React state)
- No cookie/localStorage for MVP — re-auth required on page refresh
- Future: JWT-based session with role support (admin, staff, read-only)

---

## Admin Chatbot Modes

The admin bot has 5 distinct modes selectable from a tab bar at the top of the panel:

### Mode 1: ORDER QUEUE
**Purpose:** See pending orders/quotes submitted through the customer chatbot

**Displays:**
- Order reference code (e.g., `DUS-ABC123`)
- Customer name + email + company
- Service type (Digitizing / Artwork)
- Design description (size, product, format, colors, special)
- File attached (filename or "None")
- Turnaround requested
- Submitted timestamp
- Status badge: `New` / `In Progress` / `Complete` / `Flagged`

**Actions:**
- Click order → expand full detail
- Mark as In Progress / Complete
- Flag for review (shows red badge)
- "Reply to Customer" → pre-fills email draft with order reference
- "Assign to [Staff]" dropdown

**Data source:** Orders submitted via customer chatbot POST to `/api/orders` (to be built). For MVP, can render from a mock JSON array in state.

---

### Mode 2: AI REPLY ASSISTANT
**Purpose:** Paste a customer email → get a suggested reply, pre-filled with correct pricing and policies

**UI Flow:**
1. Paste customer email into text area
2. Click "Generate Reply"
3. Bot returns a draft response in Digitizing.US voice
4. Staff can edit inline
5. "Copy to Clipboard" button

**System Prompt for this mode:**
```
You are a customer service assistant for Digitizing.US, a professional embroidery digitizing service.

COMPANY INFO:
- Phone: 401-655-1153 | Email: mail@digitizing.us
- Simple left chest: $15 standard / $19 express
- Complex left chest: $25 / $30
- Back designs from: $35 / $45
- Cap designs from: $20 / $24
- Edits: $10 flat
- New customers: 50% off first 2 designs
- Turnaround: 1-2 days standard, next-day express
- We test on real machines and send sew-out proofs
- We never store payment info
- Files stored 30 days
- Patches via USABadge.com

TONE: Professional but warm. Direct. Not salesy. Match the customer's register — if they're informal, be informal. If they're formal, be formal.

ALWAYS:
- Reference their specific question
- Include relevant pricing if they asked about cost
- Sign off as "The Digitizing.US Team"
- Keep replies concise — 3-5 short paragraphs max

NEVER:
- Make up pricing not listed above
- Promise turnaround times shorter than what's listed
- Discuss competitor services
```

---

### Mode 3: PRICING EDITOR
**Purpose:** Live-edit the pricing copy that appears in the chatbot and on the pricing page, without a code deploy

**UI:**
- Table showing all price rows (pulled from `content.json`)
- Inline editable cells: price, note, turnaround
- "Save Draft" → stores to localStorage under `admin_pricing_draft`
- "Publish" → POST to `/api/admin/pricing` (requires auth header)
- Visual diff showing what changed vs. current live

**Note for Abraham:** The customer chatbot currently has pricing hardcoded in the `go()` switch. Phase 2 should pull from the API so pricing changes flow through automatically.

---

### Mode 4: FAQ MANAGER
**Purpose:** Add/edit/reorder FAQ items without code deploy

**UI:**
- Drag-to-reorder list of current FAQ items
- Inline edit Q and A
- "Add FAQ" button → blank row
- "Delete" with confirm dialog
- "Save" → PUT `/api/admin/faq`

---

### Mode 5: SITE HEALTH
**Purpose:** Quick dashboard of recent activity

**Displays:**
- Orders submitted today / this week
- Average response time (if tracked)
- Chatbot sessions started vs. completed (funnel)
- Last 5 file uploads with timestamps
- Any flagged orders

**Data source:** GET `/api/admin/stats` — to be built

---

## API Endpoints Required

All endpoints require `Authorization: Bearer <adminToken>` header.

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/orders` | List all orders |
| GET | `/api/orders/:id` | Get single order detail |
| PATCH | `/api/orders/:id` | Update status, assignee |
| POST | `/api/admin/pricing` | Update pricing data |
| PUT | `/api/admin/faq` | Update FAQ list |
| GET | `/api/admin/stats` | Site health metrics |
| POST | `/api/ai/reply` | Proxy to Anthropic API for reply assistant |

---

## Admin Panel UI Spec

```
┌─────────────────────────────────────────────────────┐
│  🔒 ADMIN PANEL          [Orders] [AI Reply] [Pricing] [FAQ] [Health]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│   [Mode-specific content here]                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

- Full-width panel below nav (not a floating widget like customer chat)
- Background: `#0f0f1e` (same dark as customer chatbot)
- Tab bar with active indicator (red underline)
- Each mode is a separate React component lazy-loaded on tab switch
- "Close Admin" button top-right → sets `isAdmin = false`

---

## MVP vs. Phase 2

### MVP (deploy with site)
- [x] Password gate (already built)
- [x] Admin panel renders on auth
- [ ] Mode 1: Order queue with mock data
- [ ] Mode 2: AI Reply Assistant (calls Anthropic API)
- [ ] Mode 5: Health with static mock metrics

### Phase 2 (post-launch)
- [ ] Real `/api/orders` backend (Node/Express + PostgreSQL or Supabase)
- [ ] File upload storage (S3 or Cloudflare R2)
- [ ] Mode 3: Live pricing editor with publish flow
- [ ] Mode 4: FAQ manager with persistence
- [ ] Email notifications on new orders (SendGrid or Resend)
- [ ] Staff accounts with roles
- [ ] Customer email verification (real SMTP, not demo code)

---

## Notes for Abraham

1. **The demo verification code** in the customer chatbot is a 6-digit random number shown in the chat for testing. Before launch, replace with real SMTP email via Resend or SendGrid. The code lives in `ST2.VER` step in the `go()` function.

2. **The `CHAT_PAGES` array** controls which pages show the chatbot button. Currently: `["home","digitizing","artwork","pricing"]`. Add/remove page IDs as needed.

3. **Admin password** is hardcoded as `"digitizing2026"`. Move to `process.env.ADMIN_PASSWORD` before production.

4. **File uploads** in the chatbot are validated client-side only (type + size). Actual file storage needs a `/api/upload` endpoint with server-side validation.

5. **The `content.json`** file is the source of truth for all site copy. Wire the React components to import from it rather than having strings inline — this makes content updates a JSON edit, not a code deploy.

6. **`usabadge.com`** links open in a new tab (`target="_blank"`). Confirm this is the correct behavior with the client.

7. **Google Fonts** are loaded via a `<link>` tag inside the JSX. For production, move to `<head>` in `index.html` or use `next/font` if migrating to Next.js.

---

*Last updated: 2026-03 | Questions: mail@digitizing.us*
