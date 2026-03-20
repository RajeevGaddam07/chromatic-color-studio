# 🎨 Chromatic — Random Color Studio

A responsive, dark-themed color tool for designers. Generate random colors, build gradients, and save your palette — all in the browser and now available as a Visual Studio Code extension.

---

## 🚀 Live Demo

[View Demo](https://rajeevgaddam07.github.io/chromatic-color-studio/)

---

## 🧩 VS Code Extension (Manual Install)

You can install Chromatic Color Studio directly in Visual Studio Code using the `.vsix` file.

### 📥 Steps to Install

1. Download the latest `.vsix` file from the **Releases** section of this repository  
2. Open **Visual Studio Code**  
3. Go to the **Extensions** panel (`Ctrl + Shift + X`)  
4. Click on the `⋯` (three dots) in the top-right corner  
5. Select **Install from VSIX...**  
6. Choose the downloaded `.vsix` file  
7. Reload VS Code if prompted  

✅ The extension will now be installed and ready to use

---

## ✨ Features

- 🎲 **Random Color Generator** — generates a new color on every click (or press `Space`)
- 🔄 **HEX / RGB / HSL switcher** — switch between formats instantly
- 🌓 **Auto-contrast text** — uses WCAG luminance to automatically show black or white text over the swatch
- 📋 **Copy to clipboard** — copy the current color value with one click
- 🎨 **Gradient Studio** — combine two colors into a gradient with multiple styles
- 🕘 **Gradient History** — save and reuse gradients
- 🖌️ **Color History** — tracks recently generated colors
- 📱 **Fully Responsive UI**
- 🧩 **VS Code Integration** — use color tools directly inside your editor

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


## 🚀 Quick Start (Web Version)

1. Clone or download this repository  
2. Open `index.html` in your browser  

---

## 🧪 Using in VS Code

After installing the extension:

- Open Command Palette (`Ctrl + Shift + P`)
- Search: **Chromatic: Open Color Studio**
- Start generating colors inside your editor 🚀

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
