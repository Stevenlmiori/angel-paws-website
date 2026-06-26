# Angel Paws website — handoff plan

Audience: **Miss Debbie** (primary operator) and future content helpers.
Technical owner during build: development partner; goal is a **simple routine** after go-live.

### Git & deploy (nimble phase)

Repo: **https://github.com/Stevenlmiori/angel-paws-website** — default branch **`main`**. Vercel deploys from **`main`**.

Production domain: **https://www.angelpawspettherapy.com**. Older `angelpawshouston.com` references should be treated as legacy unless Debbie explicitly decides to restore that domain as canonical.

### Until launch: “under construction” on production

On **Vercel → Production → Environment Variables**, set **`NEXT_PUBLIC_UNDER_CONSTRUCTION`** to **`true`** (and redeploy). Visitors then see only the notice page on **every URL**; **`/api/*`** responds **503**; **`robots.txt`** disallows all; **`sitemap.xml`** is empty. Keep this variable **unset** on Preview/local **`npm run dev`** so you can keep building the full site. To preview the **full** site online before launch, use a **Preview** deployment (or a branch deploy) **without** this variable—Production stays gated.

When you’re ready to go live: remove that variable (or set it to `false`), redeploy, then turn on **`NEXT_PUBLIC_SITE_INDEXABLE=true`** only when you want search indexing.

---

While it’s just the build team and the site isn’t in real use yet: **commit and push to `main` when a change is approved** (no PR requirement). Revisit branch protection / reviews when collaborators join or you go fully public.

---

## Public action model

The public site should present only two action paths:

- **Request a Visit** → `/contact`
- **Give** → `/donate`

Do not add public “become a member,” “join the team,” or volunteer recruitment CTAs. Keep `/members/portal` available only as a protected direct URL for existing handlers/operators.

## 1. Route map (Debbie’s list → this site)

| Need                           | Route                  | Status                                                                               |
| ------------------------------ | ---------------------- | ------------------------------------------------------------------------------------ |
| Who we are / mission & beliefs | `/about`               | Live — refine copy as needed; beliefs align with CFBC-style language                 |
| Where we serve                 | `/where-we-serve`      | Live                                                                                 |
| What is pet therapy            | `/what-is-pet-therapy` | Live — editorial page                                                                |
| Existing handler resources     | `/members/portal`      | Protected direct URL; not public navigation                                          |
| Contact + visit requests       | `/contact`             | Live — email contact plus offsite **Google Form** for visit requests                 |
| Give / donations               | `/donate`              | Live — **Donorbox** embed (see §5 + env vars)                                        |
| Board                          | `/meet-the-board`      | Live layout; sample roster/bios/photos need Debbie’s real board details              |
| Stories (blog)                 | `/stories`             | Live — repo-backed launch story + **Sanity** content; home strip optional tag filter |

**Operator admin (one login):** After signing in at `/admin/member-portal/login`, you land on **`/admin`**. From there open **Member portal links** or **Stories**. Stories are stored in Sanity; no separate Sanity account is required for day-to-day editing.

---

## 2. Phased rollout (recommended order)

### Phase A — Content & clarity (before “portal” complexity)

- [ ] Finalize wording on `/about`, `/what-is-pet-therapy`, and `/meet-the-board`.
- [x] Donation platform: **Donorbox** — embed on `/donate` (§5).
- [x] Forms: **Google Forms** — visit request opens offsite from `/contact` (§4).
- [x] Replace footer placeholder links with real routes / site URL.

### Phase B — Debbie’s weekly tools (low code)

- [ ] **Donations:** log in to the chosen platform to see gifts, issue receipts, run small campaigns.
- [ ] **Forms:** log in to the form tool to see submissions, export to spreadsheet if needed.
- [ ] **Files (policies, PDFs):** start with **Google Drive** in a nonprofit Google Workspace—shared folders with clear names (`Policies`, `Forms templates`). Link from `/members/portal` when gated auth exists, or link from emails to members until then.

### Phase C — Member portal (current lightweight gate + future auth)

- [x] Current launch gate: shared member password + signed session cookie.
- [ ] Future upgrade, if needed: pick **one** auth approach, e.g. Clerk, Memberstack, or Supabase Auth.
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

## 4. Forms — **Google Forms** (implemented)

| Form              | Public? | Link source                                  | Notes                                                               |
| ----------------- | ------- | -------------------------------------------- | ------------------------------------------------------------------- |
| General contact   | Yes     | `CONTACT_EMAIL` in `src/lib/siteLinks.ts`    | Visitors email Angel Paws directly from `/contact`                  |
| Request a visit   | Yes     | `VISITATION_REQUEST_FORM_URL` in `siteLinks` | Offsite Google Form opens from `/contact#visitation-request`        |
| Member-only forms | No      | Member portal admin links                    | Add gated Google Form or Drive links on `/members/portal` as needed |

The public site does not embed forms. Visit requests open in a new tab using the official Google Form so Debbie can manage submissions in Google Workspace.

**Debbie’s workflow:** Log in to Google → Forms → Submissions, or use Google Form email notifications.

**Code:** `src/components/contact/VisitationRequestCTA.tsx`, `src/lib/siteLinks.ts`.

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

## 6. Stories — repo launch stories + **Sanity** `/admin`

- **Public:** `/stories` and each post at `/stories/[slug]`. The site merges repo-backed launch stories from `src/lib/stories/localStories.ts` with Sanity stories, with Sanity slugs winning if duplicated so Debbie's admin edits control the public story. Optional **home** section shows up to three posts; set **`NEXT_PUBLIC_HOME_STORIES_TAG`** to a tag (e.g. `home-spotlight`) so only tagged posts appear, or leave it unset for the three latest.
- **Editing:** `/admin` → **Stories** (same email/password as member portal admin). Featured image, title, slug, tags, date, and body blocks (paragraphs, headings, quotes, bullets).
- **Env:** See `.env.example` (`NEXT_PUBLIC_SANITY_*`, `SANITY_API_WRITE_TOKEN`, optional `SANITY_REVALIDATE_SECRET` for the revalidate webhook at `/api/revalidate-sanity`). If Sanity rejects story edits with 403, replace `SANITY_API_WRITE_TOKEN` with a token that has create/update/delete permissions.
- **Sample posts:** Run `npm run seed:stories` once (requires write token + three images under `public/stories-seed/` — see script header).

---

## 7. Technical notes (for developers)

- Next.js App Router routes live under `src/app/`.
- Member portal gate: `src/app/members/portal/page.tsx`, `src/app/members/portal/actions.ts`, and server helpers under `src/lib/memberPortal/`.
- Donorbox loads `widgets.js` (`type="module"`) with `next/script` (`afterInteractive`) and a `<dbox-widget>` custom element. If CSP is enabled later, allow `donorbox.org` for scripts and frames.
- Embed URL helpers: `src/lib/embeds.ts`.
- Visual system: **AngelPaws Serif — Blue Edition** with optional **navy (`section-tone-inverse`)** and **charcoal (`section-tone-charcoal`)** marketing bands documented in **`DESIGN.md`**. Historical token snapshots remain in **`docs/theme-archive/angelpaws-serif-blue.css`**.

---

### Search indexing (pre-launch)

Until you are ready for Google, **do not** set `NEXT_PUBLIC_SITE_INDEXABLE` in Vercel (or set it to anything other than exactly `true`). The site then serves:

- `robots.txt` with `Disallow: /` for all crawlers
- `<meta name="robots" content="noindex,nofollow">` (via root layout metadata)
- `X-Robots-Tag: noindex, nofollow` on all responses (via `next.config.ts`)

When you launch publicly, set **`NEXT_PUBLIC_SITE_INDEXABLE=true`** in Vercel, **redeploy**, then optionally request indexing in Google Search Console.

---

_Last updated: June 2026 — Blue Edition palette plus inverse/charcoal section bands; production domain, Google Forms visit requests, member portal gate, Donorbox env notes, and pre-launch indexing controls._
