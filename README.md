# omniship.dev

The [OmniShip Labs](https://omniship.dev) collective home page. A static site built on the OmniShip Labs design system, deployed to GitHub Pages on every push to `main`.

## Layout

```
site.config.json            ← homepage-only settings + which projects to list
scripts/
└─ build.mjs                build: fetches project manifests, derives stats,
                             renders config into HTML, compiles Less
src/
├─ index.html               page template (content markers: @stats, @projects, …)
├─ styles/site.less         page styles (Less)
├─ js/site.js               theme toggle, copy button, sponsor switch
└─ vendor/omniship-ui/      vendored design system: tokens, entry CSS, brand assets
.github/workflows/deploy.yml  CI: build → GitHub Pages (custom domain via CNAME)
dist/                       build output (gitignored)
```

## Editing content

Day-to-day changes should not require touching HTML:

- **Add a project** — add `{ "manifest": "<url>", "live": true|false }` to `projects` in [`site.config.json`](site.config.json). The manifest URL points at a small JSON file the *project itself* publishes (e.g. `https://get.eyeread.in/omniship-project.json`) with `name`, `category`, `description`, `language`, `accent`, `href`, `mark`. The project repo is the source of truth for its own facts — this repo never hand-copies them, so they can't drift out of sync. License (shown as a badge) is looked up live from the GitHub API, not typed in either place.
- **Stats band** — the "N live projects" and "AGPL-3.0 %" stats are derived at build time from the `projects` list, not hand-typed. Only `fundingStat` (the "$0 forever" line) is static editorial copy, since it isn't a fact about any one project.
- **Rotate the Discord invite** — edit `discordInvite`; the `/discord` redirect page is generated from it.
- **Sponsor links** — edit `openCollective`; the sponsor buttons reference it via a `{{openCollective}}` token in the template.

Commit and push; CI rebuilds and deploys. The build fetches over the network (project manifests + GitHub license API), so it needs connectivity — this is fine in CI but means `npm run build` won't work fully offline.

### Adding a project to a repo

Each listed project repo should serve its own `omniship-project.json` (see `eyeread.in`'s `site/scripts/prerender.mjs` for the reference implementation) and expose its brand mark at a stable URL. Nothing about the project's identity should live in this repo except the manifest URL and the editorial `live` flag.

## Development

```sh
npm install     # once (Node version in .nvmrc)
npm run build   # site.config.json + src/ → dist/
npm run serve   # build, then serve dist/ at http://localhost:8080
```

## Conventions

- Style with the design system's semantic tokens (`--accent`, `--surface-*`, `--text-*`, radii/shadow/motion variables). Never hardcode colours or fonts outside `src/vendor/omniship-ui/`.
- `src/vendor/omniship-ui/` is a vendored copy of the [OmniShip Labs design system](https://github.com/omniship-labs/omniship-labs.github.io/tree/main/src/vendor/omniship-ui); update it from the design-system source rather than editing in place.
- Beacon (`--accent`) is a signal, not a fill — roughly one bright moment per view.
- Copy is sentence case, plain over clever, no exclamation marks. Every project ships as **AGPL-3.0**.

## Deploys

Pushing to `main` runs [`deploy.yml`](.github/workflows/deploy.yml): `npm ci && npm run build`, then the `dist/` artifact is published to GitHub Pages at [omniship.dev](https://omniship.dev).

## License

[AGPL-3.0](LICENSE) — like everything OmniShip Labs ships.
