
# 🎨 Chromatic — Random Color Studio

A responsive, dark-themed color tool for designers. Generate random colors, build gradients, and save your palette — all in the browser with zero dependencies.

---

## 🚀 Live Demo

[View Demo](https://rajeevgaddam07.github.io/chromatic-color-studio/)

---

## ✨ Features

- 🎲 **Random Color Generator** — generates a new color on every click (or press `Space`)
- 🔄 **HEX / RGB / HSL switcher** — switch between formats instantly
- 🌓 **Auto-contrast text** — uses WCAG luminance to automatically show black or white text over the swatch
- 📋 **Copy to clipboard** — copy the current color value with one click
- 🎨 **Gradient Studio** — combine two colors into a gradient with 4 types (linear ↗ → ↓ and radial), lock/unlock stops, and swap colors
- 🕘 **Gradient History** — save your favorite gradients; click any saved tile to reload it into the studio
- 🖌️ **Color History** — tracks the last 30 generated colors as a clickable palette
- 📱 **Fully Responsive** — optimized for phones, tablets, laptops, and desktops

---

## 📁 File Structure

```
color-generator/
├── index.html         # HTML structure
├── style.css          # All styles
├── script.js          # Vanilla JS logic (no dependencies)
├── README.md          # Project documentation
├── CODE_OF_CONDUCT.md # Contributor Covenant Code of Conduct
├── LICENSE            # MIT License
└── SECURITY.md        # Security policy and reporting
```

---

## ⌨️ Keyboard Shortcut

| Key     | Action                |
|---------|-----------------------|
| Space   | Generate a new color  |

---

## 🚀 Quick Start

1. Clone or download this repository.
2. Open `index.html` in your browser — no build step required.

---

## 🔑 Environment Variables

No environment variables are required. All logic runs client-side in the browser.

---

## 📦 Required Services

None. This project is fully client-side and does not require any external services.

---

## 🛠️ Tech Stack

- Vanilla HTML5, CSS3, JavaScript (ES6+)
- Google Fonts: Bebas Neue · DM Mono · DM Sans
- No frameworks, no build step — open `index.html` and it works

---

## 📝 Important Notes

- Works offline after first load.
- All color and gradient history is stored in localStorage.

---

## 🔒 Security

See [SECURITY.md](SECURITY.md) for vulnerability reporting and security policy.

---

## 📄 License

MIT — free to use and modify.
