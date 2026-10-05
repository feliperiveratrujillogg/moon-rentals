# Moon Rentals — Website

Static site for Moon Rentals (Savannah, GA party rentals). Plain HTML/CSS/JS — no build step.

## Deploy (GitHub + Vercel)
1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project → Import** the repo. Framework preset: **Other**. Leave build settings empty. Deploy.

## Inquiry form
The form posts to **Formspree**. Set the form's `action` in `index.html` to your Formspree endpoint (`https://formspree.io/f/<form-id>`), with the form's notification email set to moonrentalssav@gmail.com.

## Replace placeholders
Swap each `<div class="placeholder ...">` block for an `<img>` (hero, 5 inventory cards, service-area map).

## Logo files (`assets/`)
- `logo.png` — transparent background (use on white/light)
- `logo-white.png` — all-white version (dark backgrounds)
- `icon.png`, `icon-180.png`, `icon-32.png` — moon/tent icon only (favicon)
