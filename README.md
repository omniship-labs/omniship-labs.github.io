# omniship.dev

The OmniShip Labs collective home page — a static site built on the [OmniShip Labs design system](vendor/omniship-ui/), served by GitHub Pages.

## Structure

```
index.html            the page
site.less             page styles (Less source)
site.css              compiled output — regenerate with `npm run build`
site.js               theme toggle, copy button, sponsor switch
vendor/omniship-ui/   vendored design system: tokens, entry stylesheet, brand assets
CNAME                 custom domain for GitHub Pages
```

## Working on it

```sh
npm install        # once, for the Less compiler
npm run build      # site.less → site.css
npm run serve      # http://localhost:8080
```

Style with the design system's semantic tokens (`--accent`, `--surface-*`, `--text-*`) — never redefine colours or fonts outside `vendor/omniship-ui/`.

## License

AGPL-3.0 — like everything OmniShip Labs ships.
