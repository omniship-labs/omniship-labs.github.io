# omniship.dev

The [OmniShip Labs](https://omniship.dev) collective home page. A static site built on the OmniShip Labs design system, deployed to GitHub Pages on every push to `main`.

## Layout

```
site.config.json            ← page content: projects, stats, Discord invite
scripts/
└─ build.mjs                build: renders config into HTML, compiles Less
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

- **Add or edit a project** — edit `projects` in [`site.config.json`](site.config.json). Each entry needs `repo`, `name`, `category`, `description`, `language`, `accent`, `href`, and a `mark` URL (the project's own brand mark, served from the project's site — e.g. `https://get.eyeread.in/eyeread-mark.svg`). Set `live: true` to show the live badge.
- **Update the stats band** — edit `stats`.
- **Rotate the Discord invite** — edit `discordInvite`; the `/discord` redirect page is generated from it.
- **Sponsor links** — edit `openCollective`; the sponsor buttons reference it via a `{{openCollective}}` token in the template.

Commit and push; CI rebuilds and deploys.

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
