# Make the free checker reliable (5 minutes, free, permanent)

## The problem

The checker can't read other websites directly — browsers block that (CORS).
So it relays requests through free public services (allorigins, codetabs and
friends). Those services are rate-limited, frequently busy, and some hosts
block them outright. That's why scans fail intermittently on sites that are
perfectly fine.

## The fix

Run your own relay on Cloudflare Workers. Free tier is 100,000 requests/day —
far more than this tool will ever use. Once it's live the checker uses yours
first and only falls back to the public ones.

### Step 1 — create the Worker

1. Go to https://dash.cloudflare.com and sign in (create a free account if you
   don't have one — no card needed).
2. In the sidebar: **Compute (Workers)** → **Create** → **Start with Hello World!**
3. Name it `baidlabs-relay` → **Deploy**.
4. Click **Edit code**, delete everything in the editor, and paste the code
   from `relay-worker.js` (next to this file).
5. **Deploy**.

### Step 2 — copy your Worker URL

It looks like:

    https://baidlabs-relay.<your-subdomain>.workers.dev

### Step 3 — tell the checker about it

Open `tools/ai-visibility-checker.html`, find this line near the top of the
script (search for `OWN_RELAY`):

    var OWN_RELAY = "";

Put your Worker URL inside the quotes:

    var OWN_RELAY = "https://baidlabs-relay.your-subdomain.workers.dev";

Commit and push. Done — scans now go through your own relay first.

## How to check it worked

Run a scan and open the "Technical detail" panel in any error, or check the
Network tab: requests should go to your workers.dev URL. Sites that previously
failed should now scan on the first try.

## Notes

- The Worker only fetches public pages and returns them as text. It stores
  nothing and has no access to your GitHub or Google accounts.
- It passes the origin site's real HTTP status back in an `X-Upstream-Status`
  header, which is how the checker tells "this file genuinely doesn't exist"
  apart from "the relay had a problem".
- If you later move to a custom domain, nothing here needs to change.
