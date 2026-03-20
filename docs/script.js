/* ============================================================
   1.  DOM REFS
   ============================================================ */
// Main swatch
const swatch         = document.getElementById('swatch');
const colorBigValue  = document.getElementById('colorBigValue');
const subVal1        = document.getElementById('subVal1');
const subVal2        = document.getElementById('subVal2');
const contrastBadge  = document.getElementById('contrastBadge');
const generateBtn    = document.getElementById('generateBtn');
const copyBtn        = document.getElementById('copyBtn');
const copyLabel      = document.getElementById('copyLabel');
const copyToast      = document.getElementById('copyToast');
const formatBtns     = document.querySelectorAll('.fmt-btn');

// Gradient panel
const gradientSwatch = document.getElementById('gradientSwatch');
const stop1Chip      = document.getElementById('stop1Chip');
const stop2Chip      = document.getElementById('stop2Chip');
const stop1Dot       = document.getElementById('stop1Dot');
const stop2Dot       = document.getElementById('stop2Dot');
const stop1Val       = document.getElementById('stop1Val');
const stop2Val       = document.getElementById('stop2Val');
const gradType       = document.getElementById('gradType');
const refreshGradBtn = document.getElementById('refreshGradBtn');
const swapGradBtn    = document.getElementById('swapGradBtn');
const lockColor1Btn  = document.getElementById('lockColor1Btn');
const lockColor2Btn  = document.getElementById('lockColor2Btn');
const gradCSS        = document.getElementById('gradCSS');
const copyGradBtn    = document.getElementById('copyGradBtn');
const saveGradBtn    = document.getElementById('saveGradBtn');

// Color history
const historyGrid     = document.getElementById('historyGrid');
const historyCount    = document.getElementById('historyCount');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Gradient history
const gradHistoryGrid    = document.getElementById('gradHistoryGrid');
const gradHistoryCount   = document.getElementById('gradHistoryCount');
const clearGradHistBtn   = document.getElementById('clearGradHistoryBtn');

/* ============================================================
   2.  STATE
   ============================================================ */
let currentHex    = '#3A86FF';
let activeFormat  = 'hex';      // 'hex' | 'rgb' | 'hsl'
let gradColor1    = '#3A86FF';
let gradColor2    = '#FF006E';
let lock1         = false;
let lock2         = false;

const colorHistory    = [];      // string[]  — hex colors
const gradientHistory = [];      // {css, color1, color2, type}[]
const MAX_COLORS      = 30;
const MAX_GRADIENTS   = 20;

/* ============================================================
   3.  COLOR UTILITIES
   ============================================================ */

/** Random hex color: "#RRGGBB" */
function randomHex() {
  return '#' + Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join('').toUpperCase();
}

/** "#RRGGBB" → { r, g, b } */
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

/** { r, g, b } → "rgb(r, g, b)" */
function rgbString({ r, g, b }) {
  return `rgb(${r}, ${g}, ${b})`;
}

/** { r, g, b } → "hsl(h, s%, l%)" */
function rgbToHsl({ r, g, b }) {
  const rN = r / 255, gN = g / 255, bN = b / 255;
  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  const delta = max - min;
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    if (max === rN)      h = ((gN - bN) / delta) % 6;
    else if (max === gN) h = (bN - rN) / delta + 2;
    else                 h = (rN - gN) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }
  return `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

/** WCAG relative luminance — returns true if color reads as "light" */
function isLight(hex) {
  const { r, g, b } = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55;
}

/** hex + alpha → "rgba(r,g,b,a)" */
function hexToRgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Format color value based on activeFormat */
function getFormattedValue(hex) {
  const rgb = hexToRgb(hex);
  if (activeFormat === 'hex') return hex;
  if (activeFormat === 'rgb') return rgbString(rgb);
  return rgbToHsl(rgb);
}

/* ============================================================
   4.  GRADIENT CSS BUILDER
   ============================================================ */
function buildGradientCSS(type, c1, c2) {
  if (type.startsWith('radial')) {
    return `radial-gradient(circle, ${c1}, ${c2})`;
  }
  return `${type}, ${c1}, ${c2})`;
}

/* ============================================================
   5.  RENDER: MAIN SWATCH
   ============================================================ */
function renderSwatch(hex) {
  const rgb = hexToRgb(hex);

  // Background
  swatch.style.backgroundColor = hex;

  // Primary value
  colorBigValue.textContent = getFormattedValue(hex);

  // Sub values (the two other formats)
  const all = {
    hex: hex,
    rgb: rgbString(rgb),
    hsl: rgbToHsl(rgb),
  };
  const others = ['hex', 'rgb', 'hsl'].filter(k => k !== activeFormat);
  subVal1.textContent = all[others[0]];
  subVal2.textContent = all[others[1]];

  // Contrast text
  const light = isLight(hex);
  swatch.classList.toggle('text-dark', light);
  swatch.classList.toggle('text-light', !light);
  contrastBadge.classList.toggle('dark-text', light);
  contrastBadge.classList.toggle('light-text', !light);
  contrastBadge.title = light
    ? 'Dark text recommended'
    : 'Light text recommended';

  // Copy label
  copyLabel.textContent = `Copy ${activeFormat.toUpperCase()}`;

  // Generate button shadow tint
  generateBtn.style.boxShadow = `0 8px 30px ${hexToRgba(hex, 0.38)}`;
}

/* ============================================================
   6.  RENDER: GRADIENT PANEL
   ============================================================ */
function renderGradient() {
  const css = buildGradientCSS(gradType.value, gradColor1, gradColor2);
  gradientSwatch.style.background = css;
  stop1Dot.style.backgroundColor  = gradColor1;
  stop2Dot.style.backgroundColor  = gradColor2;
  stop1Val.textContent             = gradColor1;
  stop2Val.textContent             = gradColor2;
  gradCSS.textContent              = `background: ${css};`;
}

/* ============================================================
   7.  RENDER: COLOR HISTORY
   ============================================================ */
function renderColorHistory() {
  historyCount.textContent = colorHistory.length;
  historyGrid.innerHTML    = '';

  if (colorHistory.length === 0) {
    const p = document.createElement('p');
    p.className   = 'history-empty';
    p.textContent = 'Generate colors to build your palette';
    historyGrid.appendChild(p);
    return;
  }

  colorHistory.forEach((hex, idx) => {
    const tile = document.createElement('div');
    tile.className              = 'history-tile';
    tile.style.backgroundColor  = hex;
    tile.setAttribute('data-hex', hex);
    tile.title                  = hex;
    tile.style.animationDelay   = `${Math.min(idx, 12) * 0.025}s`;

    tile.addEventListener('click', () => {
      currentHex = hex;
      swatch.style.transition = 'background-color 0.35s';
      renderSwatch(hex);
    });

    historyGrid.appendChild(tile);
  });
}

/** Push a hex to color history (newest-first, no duplicates) */
function addColorToHistory(hex) {
  if (colorHistory[0] === hex) return;
  colorHistory.unshift(hex);
  if (colorHistory.length > MAX_COLORS) colorHistory.pop();
  renderColorHistory();
}

/* ============================================================
   8.  RENDER: GRADIENT HISTORY
   ============================================================ */
function renderGradientHistory() {
  gradHistoryCount.textContent = gradientHistory.length;
  gradHistoryGrid.innerHTML    = '';

  if (gradientHistory.length === 0) {
    const p = document.createElement('p');
    p.className   = 'history-empty';
    p.textContent = 'Save gradients to build your collection';
    gradHistoryGrid.appendChild(p);
    return;
  }

  gradientHistory.forEach((entry, idx) => {
    const tile = document.createElement('div');
    tile.className            = 'grad-history-tile';
    tile.style.animationDelay = `${Math.min(idx, 10) * 0.04}s`;

    // Preview bar
    const preview          = document.createElement('div');
    preview.className      = 'grad-tile-preview';
    preview.style.background = entry.css;

    // Info row
    const info     = document.createElement('div');
    info.className = 'grad-tile-info';

    const stops   = document.createElement('div');
    stops.className = 'grad-tile-stops';

    const dot1          = document.createElement('span');
    dot1.className      = 'grad-tile-dot';
    dot1.style.backgroundColor = entry.color1;

    const dot2          = document.createElement('span');
    dot2.className      = 'grad-tile-dot';
    dot2.style.backgroundColor = entry.color2;

    const label         = document.createElement('span');
    label.className     = 'grad-tile-label';
    label.textContent   = `${entry.color1} · ${entry.color2}`;
    label.title         = label.textContent;

    const copyBtn       = document.createElement('button');
    copyBtn.className   = 'grad-tile-copy';
    copyBtn.textContent = 'Copy';
    copyBtn.title       = 'Copy CSS';
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      copyToClipboard(`background: ${entry.css};`);
      copyBtn.textContent = '✓';
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
    });

    stops.appendChild(dot1);
    stops.appendChild(dot2);
    info.appendChild(stops);
    info.appendChild(label);
    info.appendChild(copyBtn);

    tile.appendChild(preview);
    tile.appendChild(info);

    // Click tile → load gradient into the studio
    tile.addEventListener('click', () => {
      gradColor1 = entry.color1;
      gradColor2 = entry.color2;
      // Select matching type option if present
      for (const opt of gradType.options) {
        if (entry.type && entry.type.startsWith(opt.value.split('(')[0])) {
          opt.selected = true;
          break;
        }
      }
      renderGradient();
    });

    gradHistoryGrid.appendChild(tile);
  });
}

/** Push current gradient to gradient history */
function saveCurrentGradient() {
  const css = buildGradientCSS(gradType.value, gradColor1, gradColor2);

  // Avoid saving the exact same gradient twice in a row
  if (gradientHistory.length > 0 && gradientHistory[0].css === css) return;

  gradientHistory.unshift({
    css,
    color1: gradColor1,
    color2: gradColor2,
    type  : gradType.value,
  });
  if (gradientHistory.length > MAX_GRADIENTS) gradientHistory.pop();

  renderGradientHistory();

  // Brief button feedback
  const orig = saveGradBtn.innerHTML;
  saveGradBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Saved!`;
  saveGradBtn.style.color        = 'var(--success)';
  saveGradBtn.style.borderColor  = 'var(--success)';
  setTimeout(() => {
    saveGradBtn.innerHTML        = orig;
    saveGradBtn.style.color      = '';
    saveGradBtn.style.borderColor= '';
  }, 1500);
}

/* ============================================================
   9.  GENERATE
   ============================================================ */
function generateColor() {
  const hex = randomHex();
  currentHex = hex;
  swatch.style.transition = 'background-color 0.4s var(--ease)';

  renderSwatch(hex);
  addColorToHistory(hex);

  // Auto-sync unlocked gradient stop
  if (!lock1 && !lock2) {
    gradColor1 = hex;
  } else if (!lock1) {
    gradColor1 = hex;
  } else if (!lock2) {
    gradColor2 = hex;
  }
  renderGradient();
}

/* ============================================================
   10. CLIPBOARD
   ============================================================ */
function copyToClipboard(text, isMain = false) {
  const write = () => {
    copyToast.classList.add('show');
    if (isMain) copyLabel.textContent = '✓ Copied!';
    setTimeout(() => {
      copyToast.classList.remove('show');
      if (isMain) copyLabel.textContent = `Copy ${activeFormat.toUpperCase()}`;
    }, 1600);
  };

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(write).catch(legacyCopy);
  } else {
    legacyCopy();
  }

  function legacyCopy() {
    const ta      = document.createElement('textarea');
    ta.value      = text;
    ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    write();
  }
}

/* ============================================================
   11. EVENT LISTENERS
   ============================================================ */

// Generate
generateBtn.addEventListener('click', generateColor);

// Format switcher
formatBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    formatBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFormat = btn.dataset.fmt;
    renderSwatch(currentHex);
  });
});

// Copy main color
copyBtn.addEventListener('click', () => {
  copyToClipboard(getFormattedValue(currentHex), true);
});

// Gradient: new random
refreshGradBtn.addEventListener('click', () => {
  if (!lock1) gradColor1 = randomHex();
  if (!lock2) gradColor2 = randomHex();
  renderGradient();
});

// Gradient: swap
swapGradBtn.addEventListener('click', () => {
  [gradColor1, gradColor2] = [gradColor2, gradColor1];
  renderGradient();
});

// Gradient: lock toggles
lockColor1Btn.addEventListener('click', () => {
  lock1 = !lock1;
  lockColor1Btn.textContent = lock1 ? '🔒' : '🔓';
  lockColor1Btn.classList.toggle('locked', lock1);
});
lockColor2Btn.addEventListener('click', () => {
  lock2 = !lock2;
  lockColor2Btn.textContent = lock2 ? '🔒' : '🔓';
  lockColor2Btn.classList.toggle('locked', lock2);
});

// Gradient: type change
gradType.addEventListener('change', renderGradient);

// Gradient: apply stop to main swatch
stop1Chip.addEventListener('click', () => {
  currentHex = gradColor1;
  renderSwatch(gradColor1);
});
stop2Chip.addEventListener('click', () => {
  currentHex = gradColor2;
  renderSwatch(gradColor2);
});

// Gradient: copy CSS
copyGradBtn.addEventListener('click', () => {
  copyToClipboard(gradCSS.textContent);
  const svg = copyGradBtn.querySelector('svg').outerHTML;
  copyGradBtn.innerHTML = '✓ Copied';
  setTimeout(() => { copyGradBtn.innerHTML = `${svg} Copy`; }, 1500);
});

// Gradient: save to history
saveGradBtn.addEventListener('click', saveCurrentGradient);

// Color history: clear
clearHistoryBtn.addEventListener('click', () => {
  colorHistory.length = 0;
  renderColorHistory();
});

// Gradient history: clear
clearGradHistBtn.addEventListener('click', () => {
  gradientHistory.length = 0;
  renderGradientHistory();
});

// Keyboard: Spacebar → generate
document.addEventListener('keydown', (e) => {
  const tag = document.activeElement?.tagName;
  if (e.code === 'Space' && tag !== 'BUTTON' && tag !== 'SELECT' && tag !== 'INPUT') {
    e.preventDefault();
    generateColor();
  }
});

/* ============================================================
   12. INIT
   ============================================================ */
renderSwatch(currentHex);
renderGradient();
addColorToHistory(currentHex);
renderGradientHistory();
