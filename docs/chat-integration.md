# Taraz — Chat Integration (Secure, OpenRouter)

Single source of truth for the site chat architecture, secret handling, and deployment.
Latest folder: **`taraz-site-v18-chat-secure-openrouter`**

## 1. Why this exists

- v17 shipped the chat with an **OpenRouter API key hardcoded in `assets/js/chat.js`** (line 7).
- Pushing to GitHub was blocked by **GH013 (push protection)**:
  ```
  file:  assets/js/chat.js
  line:  7
  commit: 02b61fef7742aa3bd0205d3ce6bb66ac98937e7e
  ```
- Client-side keys are public: anyone can open DevTools and steal them.
- v18 moves the key to the server (environment variables) and keeps the same UX.

## 2. Architecture

```
Browser (chat.html)
   │  POST /api/chat        { messages: [...], locale: "fa"|"en" }
   ▼
Serverless endpoint (Vercel api/chat.js  OR  Cloudflare worker.js)
   │  reads OPENROUTER_API_KEY from environment (never from code)
   │  POST https://openrouter.ai/api/v1/chat/completions
   │  headers: Authorization: Bearer $KEY, HTTP-Referer, X-Title
   │  model fallback chain + 20s timeout per attempt
   ▼
OpenRouter (models below)  ──►  { replyText } ──►  chat bubble in browser
```

If the endpoint is unreachable, returns 503, or no key is configured, the client
falls back to the **canned keyword replies** that already exist in `chat.js` —
the chat never "breaks".

## 3. Files

| File | Role |
|---|---|
| `assets/js/chat.js` | Client. **No secrets.** Sends `{ messages, locale }` to `/api/chat`, expects `{ replyText }`. Keeps history, chips, typing indicator, canned fallback. |
| `api/chat.js` | Vercel serverless function (Node, CommonJS). Reads `OPENROUTER_API_KEY`, proxies to OpenRouter, sanitizes input, never leaks error details. |
| `worker.js` | Cloudflare Workers alternative (Service Worker format; secret via `OPENROUTER_API_KEY` binding). Same logic. |
| `docs/chat-integration.md` | This document. |
| `docs/changelog.md` | Version history (v18 entry at top). |

## 4. Model chain (server-side)

Tried in order; first success wins:

1. `deepseek/deepseek-v4-flash-0731` — primary. Pricing is effectively zero
   (≈ $0.00000014 per M prompt tokens); best Persian quality. Requires a few
   cents of credit on the OpenRouter account.
2. `google/gemma-4-31b-it:free` — free fallback (shared Google pool, so it is
   frequently rate-limited with 429).
3. `nvidia/nemotron-3-super-120b-a12b:free` — last free fallback.

Behavior on failure: each attempt has a **20s timeout** (`AbortController`);
429/402/5xx/timeout just moves to the next model. If all three fail the endpoint
returns `503 { error: "ai_unavailable" }` and the client uses canned replies.

Note on "free": DeepSeek is no longer offered as `:free` on OpenRouter. The two
`:free` models are backups; for them the account's privacy settings must allow
free endpoints (Settings → Privacy → free-endpoint data-policy toggles).

## 5. System prompts (server-side, per locale)

- `api/chat.js` / `worker.js` contain `SYSTEM_PROMPTS.en` and `.fa`.
- The client sends `locale`; the server prepends the matching system prompt to
  the last 20 messages of the conversation.
- Both prompts enforce:
  - **Facts list** — the ONLY company information the bot may state (services,
    process, contact, hours). Anything else: "I don't have that information".
  - Lead-qualification flow: listen → diagnose the visitor's workflow →
    propose a tailored AI/automation step → collect contact details at the end.
  - Flawless language rules (standard Persian, Persian digits, no foreign words,
    no invented prices/guarantees/case studies).

## 6. How to fix GH013 locally (already done, keep for reference)

The bad commit (`02b61fe`) had never reached GitHub — `origin/main` was one
commit behind, so a simple amend was enough:

```bash
# 1. Remove the key from the client code (done in v18 chat.js)
# 2. Search for any remaining secrets
rg -n -i "sk-or-v1|openrouter|api[_-]?key" .
# 3. Stage and amend the local commit (replaces 02b61fe)
git add assets/js/chat.js api/chat.js worker.js docs/
git commit --amend --no-edit
# 4. Verify nothing secret remains in HEAD
git grep -n "sk-or-v1" HEAD
# 5. Push again (fast-forward, no force needed in this case)
git push origin main
```

If the secret had already been pushed, you would instead need to rewrite
history (`git filter-repo` or BFG), then force-push, and GitHub's scanning
would still flag it until the history is purged — revoking the key is the only
real fix.

## 7. REVOKE the leaked key (do this now)

The key that was committed to git and sent over chat is **compromised**.
**Revoke it now.** At https://openrouter.ai/keys:

1. Delete/revoke that key.
2. Create a new key.
3. Use the new key ONLY in the deployment environment (below). Never in code.

## 8. Deploy — Vercel

1. Import the project folder (`taraz-site-v18-chat-secure-openrouter`) on
   Vercel (it already contains `api/chat.js`; no `vercel.json` needed).
2. Settings → Environment Variables → add:
   ```
   OPENROUTER_API_KEY=sk-or-v1-<new-key>
   ```
3. Redeploy.
4. Verify with curl:
   ```bash
   curl -X POST https://<your-domain>/api/chat \
     -H "Content-Type: application/json" \
     -d '{"messages":[{"role":"user","content":"سلام، چه خدماتی دارید؟"}],"locale":"fa"}'
   ```
   Expected: `{"replyText":"..."}` on success, `{"error":"ai_unavailable"}`
   (503) when offline / no key.

Note: Vercel Hobby default function timeout is 10s. With a 20s per-attempt
timeout, slow free endpoints may return 503 → client falls back gracefully.
If you want more patience, raise the function timeout to 60s in project
settings.

## 9. Deploy — Cloudflare Workers (alternative)

```bash
npx wrangler deploy worker.js
npx wrangler secret put OPENROUTER_API_KEY
# then POST to https://<worker-subdomain>/api/chat
```

The worker reads the key from the `OPENROUTER_API_KEY` binding; the client
should point `chat.js` at the worker URL instead of `/api/chat`:
in `assets/js/chat.js` change `var API_ENDPOINT = '/api/chat';` to the worker
URL (or set up a custom domain route and keep `/api/chat`).

## 10. Test checklist

- Open `chat.html` locally via `file://` → canned replies work (no API).
- Deployed: Persian + English questions → AI replies, no typos in standard
  sentences, no invented company facts.
- Kill the endpoint (or unset env var) → chat still answers with canned replies.
- RTL/FA + LTR/EN layout, chips re-render on language switch, typing indicator,
  `prefers-reduced-motion` all unchanged from v17.
