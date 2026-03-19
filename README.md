# Chromatic — Random Color Studio

A responsive, dark-themed color tool for designers. Generate random colors, build gradients, and save your palette — all in the browser with zero dependencies.

## 🚀 Live Demo

> https://rajeevgaddam07.github.io/chromatic-color-studio/

## ✨ Features

- **Random Color Generator** — generates a new color on every click (or press `Space`)
- **HEX / RGB / HSL switcher** — switch between formats instantly
- **Auto-contrast text** — uses WCAG luminance to automatically show black or white text over the swatch
- **Copy to clipboard** — copy the current color value with one click
- **Gradient Studio** — combine two colors into a gradient with 4 types (linear ↗ → ↓ and radial), lock/unlock stops, and swap colors
- **Gradient History** — save your favorite gradients; click any saved tile to reload it into the studio
- **Color History** — tracks the last 30 generated colors as a clickable palette
- **Fully Responsive** — optimized for phones (320px+), tablets, laptops, and desktops

## 📁 File Structure

```
chromatic-color-studio/
├── index.html   — HTML structure
├── style.css    — All styles with fluid responsive breakpoints
├── script.js    — Vanilla JS logic (no dependencies)
└── README.md    — This file
```

## ⌨️ Keyboard Shortcut

| Key       | Action               |
|-----------|----------------------|
| `Space`   | Generate a new color |

## 🛠️ Tech Stack

- Vanilla HTML5, CSS3, JavaScript (ES6+)
- Google Fonts: Bebas Neue · DM Mono · DM Sans
- No frameworks, no build step — open `index.html` and it works

## 📐 Responsive Breakpoints

| Range        | Layout                        |
|--------------|-------------------------------|
| < 360px      | Single column, compact spacing|
| 360–599px    | Single column (phones)        |
| 600–767px    | Single column, wider controls |
| 768–1023px   | **Two-column** (tablet)       |
| 1024–1279px  | Two-column, wider gradient    |
| ≥ 1280px     | Full desktop layout           |

## License

MIT — free to use and modify.
