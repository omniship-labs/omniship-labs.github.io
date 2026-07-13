# omniship.dev

The [OmniShip Labs](https://omniship.dev) collective home page. A React app on Vite, statically prerendered at build time, deployed to GitHub Pages on every push to `main`.

## Layout

```
site.config.json            ← homepage-only settings + which projects to list
index.html                   Vite entry (client bundle + hashed asset tags)
scripts/
├─ data.mjs                 build: fetches project manifests, GitHub license,
│                            Open Collective totals; derives all headline stats
└─ prerender.mjs            build: renders <App> to a string via the SSR
                             bundle, injects it + window.__DATA__ into dist/
src/
├─ entry-client.jsx         browser entry: hydrates <App> over the SSR markup
├─ entry-server.jsx         SSR entry: renderToString(<App>)
├─ App.jsx                  page composition
├─ components/*.jsx         Nav, Hero, Stats, ProjectGrid, Mission,
│                            SponsorLedger, Footer
└─ styles/site.less         page styles (Less)
public/
├─ js/site.js                theme toggle, copy button (vanilla, post-hydration)
└─ vendor/omniship-ui/       vendored design system: tokens, entry CSS, brand assets
.github/workflows/deploy.yml  CI: build → GitHub Pages (custom domain via CNAME)
dist/, dist-ssr/             build output (gitignored; dist-ssr is deleted after build)
```

## Editing content

Day-to-day changes should not require touching components:

- **Add a project** — add `{ "manifest": "<url>", "live": true|false }` to `projects` in [`site.config.json`](site.config.json). The manifest URL points at a small JSON file the *project itself* publishes (e.g. `https://get.eyeread.in/omniship-project.json`) with `name`, `category`, `description`, `language`, `accent`, `href`, `mark`. The project repo is the source of truth for its own facts — this repo never hand-copies them, so they can't drift out of sync. License (shown as a badge) is looked up live from the GitHub API, not typed in either place.
- **Stats band** — "N live projects", "AGPL-3.0 %", and "$ raised via Open Collective" are all derived at build time (from the `projects` list and the Open Collective API) — never hand-typed.
- **Funding ledger** — the "Where it goes" section on the sponsor panel (`components/brand/DonationAsk`, ledger format, in the design system) shows a live raised/backer count from Open Collective plus a budget breakdown. The breakdown percentages aren't exposed by the Open Collective API, so they're editorial: edit `fundingLedger` in `site.config.json`.
- **Rotate the Discord invite** — edit `discordInvite`; the `/discord` redirect page is generated from it.
- **Sponsor links** — edit `openCollective`.

Commit and push; CI rebuilds and deploys. The build fetches over the network (project manifests, GitHub license API, Open Collective API), so it needs connectivity — fine in CI, but `npm run build` won't work fully offline.

### Adding a project to a repo

Each listed project repo should serve its own `omniship-project.json` (see `eyeread.in`'s `site/scripts/prerender.mjs` for the reference implementation) and expose its brand mark at a stable URL. Nothing about the project's identity should live in this repo except the manifest URL and the editorial `live` flag.

## Development

```sh
npm install     # once (Node version in .nvmrc)
npm run dev     # Vite dev server with HMR (client-only, no prerendered data)
npm run build   # data fetch + client build + SSR build + prerender → dist/
npm run serve   # build, then serve dist/ at http://localhost:8080
```

## Conventions

- Style with the design system's semantic tokens (`--accent`, `--surface-*`, `--text-*`, radii/shadow/motion variables). Never hardcode colours or fonts outside `public/vendor/omniship-ui/`.
- `public/vendor/omniship-ui/` is a vendored copy of the [OmniShip Labs design system](https://github.com/omniship-labs/omniship-labs.github.io/tree/main/public/vendor/omniship-ui); update it from the design-system source rather than editing in place.
- Beacon (`--accent`) is a signal, not a fill — roughly one bright moment per view. The funding ledger's budget bars are deliberately muted so the "Become a backer" button stays the only accent moment on the panel.
- Copy is sentence case, plain over clever, no exclamation marks. Every project ships as **AGPL-3.0**.

## Deploys

Pushing to `main` runs [`deploy.yml`](.github/workflows/deploy.yml): `npm ci && npm run build`, then the `dist/` artifact is published to GitHub Pages at [omniship.dev](https://omniship.dev).

## License

[AGPL-3.0](LICENSE) — like everything OmniShip Labs ships.
