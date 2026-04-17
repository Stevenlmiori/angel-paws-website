# Angel Paws website — handoff plan

Audience: **Miss Debbie** (primary operator) and future volunteers helping with content.  
Technical owner during build: development partner; goal is a **simple routine** after go-live.

### Git & deploy (nimble phase)

Repo: **https://github.com/Stevenlmiori/angel-paws-website** — default branch **`main`**. Vercel deploys from **`main`**.

While it’s just the build team and the site isn’t in real use yet: **commit and push to `main` when a change is approved** (no PR requirement). Revisit branch protection / reviews when collaborators join or you go fully public.

---

## 1. Route map (Debbie’s list → this site)

| Need | Route | Status |
|------|--------|--------|
| Who we are / mission & beliefs | `/about` | Live — refine copy as needed; beliefs align with CFBC-style language |
| Where we serve | `/where-we-serve` | Live |
| What is pet therapy | `/what-is-pet-therapy` | Live — editorial page |
| How to become a member | `/members` | Live — steps + expectations |
| Members only (forms, policies, roster) | `/members/portal` | **Placeholder** — replace with real login + forms when ready |
| Contact + visit requests | `/contact` | Live — **Tally** embeds (see §4 + env vars) |
| Donations | `/donate` | Live — **Donorbox** embed (see §5 + env vars) |
| Get involved (volunteer, etc.) | `/get-involved` | Live |
| Board | `/meet-the-board` | Live |
| Stories (blog) | `/stories` | Live — **Sanity** content; home strip optional tag filter |

**Operator admin (one login):** After signing in at `/admin/member-portal/login`, you land on **`/admin`**. From there open **Member portal links** or **Stories**. Stories are stored in Sanity; no separate Sanity account is required for day-to-day editing.

---

## 2. Phased rollout (recommended order)

### Phase A — Content & clarity (before “portal” complexity)

- [ ] Finalize wording on `/about`, `/what-is-pet-therapy`, `/members`.
- [x] Donation platform: **Donorbox** — embed on `/donate` (§5).
- [x] Forms: **Tally** — contact + optional visit form on `/contact` (§4).
- [ ] Replace `#` placeholder links in the footer with real routes (donate, privacy, etc. when ready).

### Phase B — Debbie’s weekly tools (low code)

- [ ] **Donations:** log in to the chosen platform to see gifts, issue receipts, run small campaigns.
- [ ] **Forms:** log in to the form tool to see submissions, export to spreadsheet if needed.
- [ ] **Files (policies, PDFs):** start with **Google Drive** in a nonprofit Google Workspace—shared folders with clear names (`Policies`, `Forms templates`). Link from `/members/portal` when gated auth exists, or link from emails to members until then.

### Phase C — Member portal (auth + private pages)

- [ ] Pick **one** auth approach: e.g. Clerk, Memberstack, or Supabase Auth (developer implements).
- [ ] Restrict `/members/portal` to signed-in members only.
- [ ] Host member-only PDFs in Drive with link sharing off, or in secure storage behind the app.

---

## 3. One-page “runbook” for Debbie

**Logins to keep in a password manager (1Password, Bitwarden, etc.):**

1. **Website hosting** (Vercel/similar) — only if she needs to invite someone; optional for day-to-day.
2. **Site admin** — bookmark `/admin` (sign in at `/admin/member-portal/login`) for **member portal links** and **Stories**; same operator email/password as today.
3. **Donation platform** — primary money workflow.
4. **Form builder** — see all inquiries and visit requests.
5. **Google Workspace** (nonprofit) — email, Drive for documents, optional Forms.

**Weekly (5–10 minutes):** Check form tool for new messages; check donation platform for new recurring issues.

**Monthly:** Download or archive form submissions if the tool does not keep them forever.

**When something breaks:** Note the page URL, what she clicked, and screenshot — send to technical contact.

---

## 4. Forms — **Tally** (implemented)

| Form | Public? | Env var | Notes |
|------|---------|---------|--------|
| Contact | Yes | `NEXT_PUBLIC_TALLY_CONTACT_FORM_ID` | Embed under “Send a message” on `/contact` |
| Request a visit | Yes | `NEXT_PUBLIC_TALLY_VISIT_FORM_ID` (optional) | Second embed; omit if one Tally form covers both |
| Member-only forms | No | — | After Phase C: add hidden or gated Tally links on `/members/portal` |

**Debbie’s workflow:** Log in at [tally.so](https://tally.so) → Submissions → email notifications per form.

**Code:** `src/components/embeds/TallyContactSection.tsx` (loads `https://tally.so/widgets/embed.js` once, iframes use `data-tally-src`), `src/lib/embeds.ts`.

---

## 5. Donations — **Donorbox** (implemented)

The site uses Donorbox’s **widget** embed: `widgets.js` (module) + `<dbox-widget>` with `type="donation_form"` and `enable-auto-scroll="true"`.

- **`NEXT_PUBLIC_DONORBOX_CAMPAIGN`** — optional; must match the `campaign="..."` value from the Donorbox dashboard. If unset, it defaults to **`angel-paws-donation`**.

**Debbie’s workflow:** Log in at [donorbox.org](https://donorbox.org) → campaigns, receipts, recurring donors.

**Code:** `src/components/embeds/DonorboxFrame.tsx` (renders `<dbox-widget>` via `createElement`), `src/lib/embeds.ts`.

---

### Environment variables (local + hosting)

Copy `.env.example` to `.env.local` and set values. In **Vercel** (or similar), add the same `NEXT_PUBLIC_*` variables under Project → Settings → Environment Variables, then redeploy.

---

## 6. Stories — **Sanity** + `/admin`

- **Public:** `/stories` and each post at `/stories/[slug]`. Optional **home** section shows up to three posts; set **`NEXT_PUBLIC_HOME_STORIES_TAG`** to a tag (e.g. `home-spotlight`) so only tagged posts appear, or leave it unset for the three latest.
- **Editing:** `/admin` → **Stories** (same email/password as member portal admin). Featured image, title, slug, tags, date, and body blocks (paragraphs, headings, quotes, bullets).
- **Env:** See `.env.example` (`NEXT_PUBLIC_SANITY_*`, `SANITY_API_WRITE_TOKEN`, optional `SANITY_REVALIDATE_SECRET` for the revalidate webhook at `/api/revalidate-sanity`).
- **Sample posts:** Run `npm run seed:stories` once (requires write token + three images under `public/stories-seed/` — see script header).

---

## 7. Technical notes (for developers)

- Next.js App Router routes live under `src/app/`.
- Member portal placeholder: `src/app/members/portal/page.tsx` — replace with protected layout + session check.
- Donorbox loads `widgets.js` (`type="module"`) with `next/script` (`afterInteractive`) and a `<dbox-widget>` custom element. If CSP is enabled later, allow `donorbox.org` and `tally.so` for frames and scripts.
- Embed URL helpers: `src/lib/embeds.ts`.

---

### Search indexing (pre-launch)

Until you are ready for Google, **do not** set `NEXT_PUBLIC_SITE_INDEXABLE` in Vercel (or set it to anything other than exactly `true`). The site then serves:

- `robots.txt` with `Disallow: /` for all crawlers
- `<meta name="robots" content="noindex,nofollow">` (via root layout metadata)
- `X-Robots-Tag: noindex, nofollow` on all responses (via `next.config.ts`)

When you launch publicly, set **`NEXT_PUBLIC_SITE_INDEXABLE=true`** in Vercel, **redeploy**, then optionally request indexing in Google Search Console.

---

*Last updated: Donorbox + Tally embeds wired; env vars documented in `.env.example`; pre-launch indexing controls.*
