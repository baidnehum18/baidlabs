# BAIDLABS — baidlabs.com

Static one-page site for BAIDLABS (GEO + AEO agency), served by GitHub Pages
from the root of this repository as a project site.

**Live:** https://baidlabs.com/

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole site — HTML, CSS and JS in one self-contained file |
| `og.jpg` | Link-preview image used when the site is shared |
| `logo.png` | Square logo referenced by the structured data |
| `robots.txt` | Crawler directives — now authoritative, served from the domain root |
| `CNAME` | Custom domain for GitHub Pages. Must contain exactly `baidlabs.com` — do not edit or delete |
| `llms.txt` | Plain-language summary of the business for AI engines |
| `sitemap.xml` | Sitemap for crawlers |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Contact form

The audit form posts to a **Google Form** endpoint. Submissions land in the
Google Sheet **“BAIDLABS Leads (Website Form)”** and Google emails an alert
for every new response.

- Endpoint and field IDs live at the bottom of `index.html` (`FORM_ENDPOINT`, `FORM_FIELDS`).
- A hidden honeypot field (`company`) silently discards bot submissions.
- Form questions must not be reordered or renamed in Google Forms without
  updating the `entry.*` IDs here.

## Analytics

Google Analytics 4 (`G-0RFKMBR3DQ`) is loaded in `<head>`. A `generate_lead`
event fires on every successful form submission.

## Moving to a custom domain

If the site moves to e.g. `baidlabs.com`:

1. Find-and-replace `baidlabs.com` with the new domain in
   `index.html`, `robots.txt`, `sitemap.xml`, `llms.txt`.
2. Add a `CNAME` file containing the bare domain.
3. Point DNS at GitHub Pages and set the custom domain in **Settings → Pages**.
4. Update the stream URL in Google Analytics.

## Crawler directives

The site now runs on its own domain, so `robots.txt` and `llms.txt` are served
from the root and are honoured directly. Edit them here — there is no longer a
separate repository holding the authoritative copy.

The `CNAME` file is what binds the domain to this repo. GitHub Pages recreates
it from Settings → Pages, and deleting it silently drops the site back to the
old `github.io` address, so leave it alone.

## After launch

1. Google Search Console — verify the site and submit `sitemap.xml`.
2. Bing Webmaster Tools — same (Bing powers ChatGPT search + Copilot).
3. Keep the content fresh; AI engines favour recently updated pages.
