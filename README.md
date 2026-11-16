# KALRO website (local project)

Plain HTML, CSS and JavaScript. No build step.

```
kalro-website/
  index.html
  css/style.css
  js/main.js
```

## Run it
**Quickest:** double-click `index.html`.

**Recommended (local server):**
1. Install Python 3 (python.org) if you don't have it.
2. Open a terminal in the `kalro-website` folder.
3. Run `python -m http.server 8000` (use `python3` on Mac/Linux).
4. Open http://localhost:8000. Stop with Ctrl+C.

Alternative with Node: `npx serve .`

## Customise
- Colours and fonts: variables at the top of `css/style.css`.
- Text, news, centres, contacts: `index.html` (placeholders are marked "sample" or "placeholder").
- Logo: replace the inline SVG in the header with the official KALRO logo (`<img src="images/logo.png" alt="KALRO">`).
- Fonts load from Google Fonts when online; the site falls back to Georgia and system fonts offline.
- The contact form only validates. It sends nothing until connected to a backend or form service.
