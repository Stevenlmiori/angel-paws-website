# Angel Paws website — handoff plan

Audience: **Miss Debbie** (primary operator) and future volunteers helping with content.  
Technical owner during build: development partner; goal is a **simple routine** after go-live.

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
2. **Donation platform** — primary money workflow.
3. **Form builder** — see all inquiries and visit requests.
4. **Google Workspace** (nonprofit) — email, Drive for documents, optional Forms.

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

## 6. CMS (optional later)

When Debbie needs to **edit paragraphs** without calling a developer:

- Add a **headless CMS** (e.g. Sanity) for: mission blurbs, team quotes, donation page copy.
- Keep layout in code; only **text and images** in CMS.

Not required for launch if copy changes are rare.

---

## 7. Technical notes (for developers)

- Next.js App Router routes live under `src/app/`.
- Member portal placeholder: `src/app/members/portal/page.tsx` — replace with protected layout + session check.
- Donorbox loads `widgets.js` (`type="module"`) with `next/script` (`afterInteractive`) and a `<dbox-widget>` custom element. If CSP is enabled later, allow `donorbox.org` and `tally.so` for frames and scripts.
- Embed URL helpers: `src/lib/embeds.ts`.

---

*Last updated: Donorbox + Tally embeds wired; env vars documented in `.env.example`.*
