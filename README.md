# Zen Stones

A calm interactive composition toy that lets you place and drag stones across a digital sand garden while flowing rake lines respond around them.

## Overview

Zen Stones is a standalone static web piece inspired by dry landscape gardens and minimalist visual toys. It invites the user to move stones, alter composition, and enjoy a quiet sense of balance rather than chase goals or scores.

## Highlights

- Drag stones to reshape the composition
- Double-click to drop additional stones
- Dynamic rake-like line flow around objects
- Export the current scene as an image
- Hide interface elements for a pure visual mode
- Visible GitHub repo entry inside the page UI
- Fully static and deployment-friendly

## Positioning

This project works well as:
- a meditative visual toy
- a minimalist interactive poster
- a calming web experiment
- a portfolio piece with Eastern composition aesthetics

## Project Structure

```text
zen-stones/
├── index.html
├── README.md
├── favicon.svg
├── css/
│   ├── base.css
│   └── app.css
├── js/
│   ├── data.js
│   ├── scene.js
│   ├── ui.js
│   └── main.js
└── assets/
```

## Architecture Notes

- `index.html` is the page shell and resource loader
- `css/base.css` contains the base interaction and reset layer
- `css/app.css` contains the visual identity for this project
- `js/data.js` stores layout configuration values
- `js/scene.js` manages canvas rendering, drag state, and stone behavior
- `js/ui.js` manages DOM controls, stats sync, and interface visibility
- `js/main.js` bootstraps the application

## Local Preview

```bash
cd zen-stones
python3 -m http.server 8080
```

Then open:

- <http://localhost:8080>

## Deployment

This project is static-only and can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- Any basic static host

## Repository

- GitHub: <https://github.com/wanxb/zen-stones>

## Notes

- No build tooling is required
- Works as a single-file-feel experience with a cleaner internal structure
- Refactored from a single HTML prototype into a clearer static project layout
