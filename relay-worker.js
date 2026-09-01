/**
 * BAIDLABS relay — Cloudflare Worker
 *
 * Fetches a public page and returns it with permissive CORS headers so the
 * AI visibility checker can read it from the browser.
 *
 * Deploy: dash.cloudflare.com -> Workers -> Create -> paste this -> Deploy.
 * Then put the resulting URL into OWN_RELAY in tools/ai-visibility-checker.html
 */
export default {
  async fetch(request) {
    const CORS = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Expose-Headers": "X-Upstream-Status",
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });

    const target = new URL(request.url).searchParams.get("url");
    if (!target) return new Response("missing ?url=", { status: 400, headers: CORS });

    let t;
    try { t = new URL(target); } catch { return new Response("bad url", { status: 400, headers: CORS }); }
    if (t.protocol !== "http:" && t.protocol !== "https:")
      return new Response("bad protocol", { status: 400, headers: CORS });

    try {
      const upstream = await fetch(t.toString(), {
        redirect: "follow",
        headers: {
          // identify honestly; some hosts block unlabelled bots
          "User-Agent": "Mozilla/5.0 (compatible; BaidlabsChecker/1.0; +https://baidnehum18.github.io/baidlabs/)",
          "Accept": "text/html,application/xhtml+xml,text/plain,*/*",
        },
        cf: { cacheTtl: 300, cacheEverything: true },
      });

      const body = await upstream.text();

      // Always 200 so the browser can read the body; the real status rides
      // in a header, which is how the checker distinguishes a genuine 404
      // from a relay failure.
      return new Response(body, {
        status: 200,
        headers: {
          ...CORS,
          "Content-Type": "text/plain; charset=utf-8",
          "X-Upstream-Status": String(upstream.status),
          "Cache-Control": "public, max-age=300",
        },
      });
    } catch (err) {
      return new Response("upstream fetch failed: " + (err && err.message), {
        status: 502,
        headers: { ...CORS, "X-Upstream-Status": "0" },
      });
    }
  },
};
