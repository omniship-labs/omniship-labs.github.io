# omniship.dev

The OmniShip Labs collective home page — a static site built on the [OmniShip Labs design system](vendor/omniship-ui/), served by GitHub Pages.

## Structure

```
src/
├─ index.html               the page
├─ styles/site.less         page styles (Less source)
├─ js/site.js               theme toggle, copy button, sponsor switch
└─ vendor/omniship-ui/      vendored design system: tokens, entry stylesheet, brand assets
dist/                       build output (gitignored) — what Pages serves
.github/workflows/          CI: builds dist/ and deploys it to Pages on push to main
CNAME                       custom domain, copied into dist/ at build time
```

## Working on it

```sh
npm install        # once, for the Less compiler
npm run build      # src → dist (compiles site.less)
npm run serve      # build + http://localhost:8080
```

Style with the design system's semantic tokens (`--accent`, `--surface-*`, `--text-*`) — never redefine colours or fonts outside `vendor/omniship-ui/`.

## License

AGPL-3.0 — like everything OmniShip Labs ships.
