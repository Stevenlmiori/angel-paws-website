# Angel Paws — website

Public-facing site for **Angel Paws**, a pet therapy organization: mission and beliefs, service areas, membership information, contact and visit requests, donations, and volunteer information. The UI follows the in-repo **AngelPaws Serif** design system (Tailwind v4 tokens, Lucide icons).

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router) — routes under `src/app/`
- React 19 and TypeScript
- Tailwind CSS v4
- Embedded third-party flows: **Tally** (forms on `/contact`), **Donorbox** (widget on `/donate`)
- Optional **Upstash Redis** for production persistence (member portal tooling); see `.env.example`

> This repo tracks a newer Next.js major than many tutorials. If you touch framework APIs, skim the version-specific notes in [`AGENTS.md`](./AGENTS.md) and the guides under `node_modules/next/dist/docs/` when something looks unfamiliar.

## Getting started

**Requirements:** Node.js **20** or newer and npm (or another compatible package manager).

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` with the values you need for local development. At minimum, set the `NEXT_PUBLIC_*` variables if you are working on `/contact` or `/donate`. See [.env.example](./.env.example) for every variable and short comments.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Local development server |
| `npm run build`| Production build         |
| `npm run start`| Serve production build   |
| `npm run lint` | ESLint                   |

## Documentation in this repo

| Doc | Purpose |
|-----|---------|
| [`docs/HANDOFF.md`](./docs/HANDOFF.md) | Route map, phased rollout, embeds (Tally / Donorbox), environment variables, indexing (`NEXT_PUBLIC_SITE_INDEXABLE`), and operator-focused notes |
| [`DESIGN.md`](./DESIGN.md) | **AngelPaws Serif** — typography, colors, spacing, and UI patterns |
| [`AGENTS.md`](./AGENTS.md) | Conventions for contributors and AI-assisted edits |

## Search indexing (launch)

Until you intentionally allow indexing, leave `NEXT_PUBLIC_SITE_INDEXABLE` unset (or not exactly `true`). When the site should appear in search engines, set `NEXT_PUBLIC_SITE_INDEXABLE=true` in your host’s environment, redeploy, and verify `robots.txt` and metadata as described in [`docs/HANDOFF.md`](./docs/HANDOFF.md).

## Deployment

The app runs as a standard **Node** Next.js deployment (server features such as cookies and optional Redis are supported). **[Vercel](https://vercel.com/)** is a common choice; add the same environment variables you use locally in the host’s project settings, then deploy from your default branch.

## Contributing

Issues and small, focused pull requests are welcome. Please match existing patterns (see `DESIGN.md` and `AGENTS.md`) and avoid committing secrets—use `.env.local` only on your machine.

## License

There is no `LICENSE` file in this repository yet. If you need permission to reuse or redistribute the code or assets, contact the project maintainers.
