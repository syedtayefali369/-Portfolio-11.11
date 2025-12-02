# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This repository contains a static, single-page portfolio website for **MD TAYEF ALI**, built with vanilla HTML, CSS, and JavaScript. There is no build pipeline or dependency manager; development is done directly against `index.html`, the CSS in `styles/`, and `index.js`.

Key technologies (from `README.md`):
- HTML5, CSS3, JavaScript
- Font Awesome 6 for icons
- Google Fonts (Poppins)
- CSS Grid, Flexbox, CSS variables, keyframe animations, 3D transforms, and glassmorphism effects

The site is intended to be opened directly in a browser or served via a simple static file server such as `live-server`.

## Common Commands

There is no `package.json` or framework-specific tooling. Recommended workflows:

### Local development

From the repo root (`-Portfolio-11.11`):

```bash
# Option 1: open directly in a browser (no server needed)
open index.html  # macOS-specific; on other OSes, open the file via your browser

# Option 2: use live-server for auto-reload (if installed globally)
live-server --port=3000
```

If `live-server` is not installed, you can add it globally (optional, not required by the repo):

```bash
npm install -g live-server
```

### Lightweight checks

Because there is no test or lint setup in the repo, the main checks are manual:
- Open `index.html` in multiple browsers and inspect the console for JavaScript errors.
- Use the browser devtools responsive mode to verify breakpoints and layout.

If you want to add tooling (e.g., ESLint, Prettier), create the relevant config files and `package.json`; nothing in the repo depends on them today.

## High-Level Architecture

### Top-level structure

- `index.html` — single-page layout that defines all sections (navigation, hero, skills, projects, about, contact, footer) and wires in scripts/styles.
- `index.js` — small, DOM-based interaction layer for animation control, mobile navigation, form handling, and smooth scrolling.
- `styles/` — CSS split by concern/section (global theme, layout, and individual sections such as hero, skills, projects, about, contact, navigation, responsive rules, and footer).
- `assets/` — static images including the hero background (`bg.png`) and profile image (`profile.png`).

There is no routing framework or component system; the entire site is a single HTML document styled via multiple linked stylesheets.

### HTML layout (`index.html`)

`index.html` includes, in order:
- `<head>`: links to all CSS files in `styles/`, Font Awesome, and Google Fonts; loads `index.js` with `defer`.
- `<nav>`: fixed, glassmorphism-style navigation bar containing the logo, anchor links to page sections (`#home`, `#about`, `#projects`, `#contact`), and a hamburger icon for mobile.
- `#home` (hero section):
  - `hero-text`: main heading, subheading, intro text, and primary CTA buttons linking to `#projects` and `#contact`.
  - `hero-image`: glassmorphism profile card showing the profile image and social links (GitHub, LinkedIn, X/Twitter, Instagram).
- `#skills` (skills-section): grid of 3D flip cards (Python, JavaScript, React, HTML, CSS, Node.js, MongoDB, Git). Each card has a front (logo + name) and back (skill level + description).
- `#projects` (projects): vertical timeline-style project showcase with alternating left/right entries, each containing an image, title, description, and links for Live Demo / GitHub.
- `#about` (about): two-column layout with descriptive paragraphs and a set of skill bars (frontend, backend, UI/UX, problem solving) implemented as styled progress bars.
- `#contact` (contact):
  - `contact-info`: cards for location, email, and phone.
  - `contact-form`: `#contactForm` with name, email, subject, and message fields plus a submit button.
- `<footer>`: logo repeat, internal navigation links, social links, and copyright text.

Anchors in the nav and CTA buttons rely on the IDs attached to these sections for scrolling.

### Styling architecture (`styles/`)

CSS is split into multiple files, all imported directly in the `<head>` of `index.html`:

- `styles/global.css`
  - Defines the core design system via CSS variables (`--primary`, `--secondary`, `--accent`, `--dark`, `--light`, glass colors, etc.).
  - Sets base typography, body background gradient, and the animated grid background (`body::before`).
  - Provides shared utility classes: `.neon-glow`, `.glass`, `.section-title`, `.btn`, `.btn-primary`, `.btn-secondary`, and global `section` padding.
- `styles/nav.css`
  - Fixed, blurred nav bar with gradient logo text and hover-underlined nav links.
  - Desktop nav uses flex layout; `.hamburger` is hidden on large screens and revealed via media queries in `responsive.css`.
  - `.theme-toggle` styles exist but are not currently used (the corresponding DOM element is not present).
- `styles/hero.css`
  - Hero background uses a combination of a dark gradient and `assets/bg.png` with `background-attachment: fixed` to simulate a parallax effect.
  - Defines the two-column hero grid, text typography, CTA button styles (duplicating some of `global.css` for local control), and the circular profile-image border animation.
  - Also includes a `.social-links` layout for the hero card.
- `styles/skills.css`
  - Layout for the `skills-section`, including `skills-container` grid and 3D flip-card implementation using `perspective`, `transform-style: preserve-3d`, and `rotateY`.
  - Card front and back use glass and gradient backgrounds; technology-specific fronts (Python, JavaScript, React, etc.) have custom branded gradients.
  - Adds a floating keyframe animation (`@keyframes float`) applied to `.skill-card` with staggered delays.
  - Contains its own `.section-title` definitions overlapping with `global.css` (be aware of specificity/overlap when changing section titles).
- `styles/projects.css`
  - Implements the vertical timeline layout using a pseudo-element vertical line (`.timeline::after`) and alternating `.timeline-item` positioning.
  - Uses `::before` and `::after` pseudo-elements for arrows and accent dots, plus hover scaling on project images.
- `styles/about.css`
  - Two-column grid for the About section and simple paragraph styling.
- `styles/contact.css`
  - Two-column grid for contact info vs. form.
  - `contact-item` hover shift, circular gradient icons, and glassmorphism cards.
  - Form field styling (`.form-control`, focus states, textarea sizing).
- `styles/footer.css`
  - Centered footer layout with gradient text logo, inline nav links, and subtle hover effects.
- `styles/responsive.css`
  - Breakpoints mainly at `max-width: 992px` and `max-width: 768px`.
  - On narrower screens:
    - Hero, about, and contact grids collapse to single-column.
    - Timeline line/dots and items adjust to align on the left side rather than alternating.
    - Nav padding shrinks; `.nav-links` becomes an overlay menu triggered by adding/removing the `.active` class; `.hamburger` is displayed.
    - Section padding and skill grids are reduced.

When altering layout or adding new sections, keep section-specific rules grouped in these files to maintain the current separation of concerns.

### JavaScript behavior (`index.js`)

All interactive behavior is implemented using vanilla DOM APIs; there are no external JS libraries.

`index.js` does the following on load:

- **Skill card hover behavior**
  - Adds `mouseenter` / `mouseleave` listeners to `.skill-card` elements.
  - On hover, sets `animationPlayState = 'paused'` on the card; on leave, sets it back to `'running'`.
  - This ties into the `float` keyframe animation defined in `styles/skills.css`.

- **Mobile navigation toggle**
  - Attaches a click handler to `.hamburger` that toggles the `.active` class on `.nav-links`.
  - The `.active` class is what shows/hides the mobile menu in `styles/responsive.css`.

- **Contact form submission**
  - Listens for `submit` on `#contactForm` and prevents default form submission.
  - Shows a simple `alert()` thanking the user and then resets the form.
  - There is no backend integration; this is a front-end-only UX affordance.

- **Smooth scrolling**
  - Attaches click listeners to all anchor tags whose `href` starts with `#`.
  - Prevents default navigation, resolves the target element via `document.querySelector(targetId)`, and scrolls using `window.scrollTo` with `behavior: 'smooth'`.
  - Offsets the scroll position by 80px to account for the fixed nav, and hides the mobile nav by removing `.active` from `.nav-links`.

- **Navbar scroll effect**
  - Adds a `scroll` listener that adjusts the nav background and blur depending on `window.scrollY` (darker/more opaque when scrolled beyond 50px).

- **Theme toggle cleanup**
  - Attempts to select `.theme-toggle` and set `style.display = 'none'`.
  - **Note:** There is no `.theme-toggle` element in `index.html`. If this selector returns `null`, accessing `.style` will throw a runtime error in the console. When modifying or extending the JS, either:
    - Add a `.theme-toggle` element in the DOM, or
    - Guard this code with a null check before accessing `.style`.

When adding new interactivity, follow the pattern of attaching listeners after DOMContentLoaded (via `defer` script and querying at top level) and keep logic small and section-focused.

## Working Effectively in This Repo

- All meaningful work happens in `index.html`, `index.js`, and the CSS files under `styles/`.
- Because there is no build step, changes are reflected immediately on refresh.
- Be careful when refactoring shared selectors like `.section-title`, `.btn`, and `.glass` because they are reused across multiple sections.
- When introducing new sections or components, prefer:
  - New section-specific CSS in a dedicated file under `styles/` and link it in `index.html`.
  - Reusing global utilities (`.glass`, `.neon-glow`, `.btn-*`) for consistent design.
- If you encounter JS errors in the browser, check for DOM elements referenced in `index.js` that may not exist (such as `.theme-toggle`).
