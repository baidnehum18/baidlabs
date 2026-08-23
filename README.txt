BAIDLABS — LAUNCH PACKAGE
=========================

Files in this package (upload ALL of them to your web root):

  index.html    the website (single file, self-contained)
  og.jpg        social/link-preview image (used when the site is shared)
  logo.png      square logo referenced by the structured data
  robots.txt    welcomes search + AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.)
  llms.txt      plain-language summary of the business for AI engines
  sitemap.xml   sitemap for crawlers

HOW TO GO LIVE
--------------
1. Pick a host (all free): Netlify, Vercel, Cloudflare Pages, or GitHub Pages.
   Easiest: netlify.com -> "Deploy manually" -> drag this whole folder in.
2. Connect your domain in the host's dashboard.

IF YOUR DOMAIN IS NOT baidlabs.com
----------------------------------
The files reference https://baidlabs.com in a few places (canonical URL,
og:image, sitemap, robots). Do a find-and-replace of "baidlabs.com" with
your real domain in: index.html, robots.txt, sitemap.xml, llms.txt.

CONTACT FORM
------------
The form currently opens the visitor's email app addressed to
baidnehum181@gmail.com. For a hosted form that emails you directly, create
a free form at formspree.io and swap the mailto logic in index.html — the
spot is marked with a comment ("To wire this form to a backend...").

AFTER LAUNCH (GEO checklist)
----------------------------
1. Google Search Console: verify the site and submit sitemap.xml.
2. Bing Webmaster Tools: same (Bing powers ChatGPT search + Copilot).
3. Keep content fresh — AI engines strongly favor recently updated pages.
