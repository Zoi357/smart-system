# Orange/Red/Yellow UI Improvement Patch (Design + Clean Premium)

## Goal
Keep your existing orange/red/yellow theme, but reduce visual noise so the UI reads more “premium” and less “busy”.

## What to change (safe + high ROI)
### 1) Add an “effects reduction” switch in CSS
Add a small CSS block to `app/globals.css` to reduce animation intensity and shimmer/spotlight effects.

**Insert near your existing `@media (prefers-reduced-motion: reduce)` block**:

```css
/* ── UI Calm Mode (disable heavy effects) ── */
/* Activate by setting: document.documentElement.dataset.effects = 'calm' */
html[data-effects='calm'] *,
html[data-effects='calm'] *::before,
html[data-effects='calm'] *::after {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}

/* Turn off the biggest “attention stealers” even if components use inline styles */
html[data-effects='calm'] .card-glow-border::before,
html[data-effects='calm'] .btn-shimmer::after,
html[data-effects='calm'] .landing-premium::before,
html[data-effects='calm'] .landing-grid,
html[data-effects='calm'] .landing-orb,
html[data-effects='calm'] .mesh-blob {
  animation: none !important;
}

html[data-effects='calm'] .scroll-reveal-3d,
html[data-effects='calm'] .scroll-reveal-flip,
html[data-effects='calm'] .card-glow-border::before {
  transform: none !important;
}
```

### 2) Enable calm mode on kiosk / for users who want less motion
Add a tiny snippet to your `ThemeProvider` or any top-level client component.

Example (in `ThemeProvider`, after reading theme):

```ts
const savedCalm = localStorage.getItem('effects') === 'calm';
if (savedCalm) document.documentElement.setAttribute('data-effects', 'calm');
```

You can also default it to calm for kiosk devices if you already detect kiosk mode.

### 3) Stop hover tilt from being the default “every card everywhere” effect
Your dashboards do lots of `onMouseMove` tilt + 3D. Keep it only for “primary” tiles.

- For large data tables (students/grades), remove tilt handlers entirely.
- For smaller cards, keep only a subtle shadow lift.

### 4) Standardize “accent border” color
Use the same orange/yellow glow for all primary CTAs:
- Border: `rgba(251,191,36,0.35)`
- Glow: `rgba(249,115,22,0.35)`

This reduces perceived inconsistency across components.

## Acceptance criteria
- Same orange/red/yellow identity remains.
- Animations no longer compete for attention.
- Navigation, cards, tables and dropdowns feel calmer and more “premium”.

