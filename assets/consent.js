/* BAIDLABS cookie consent - no analytics loads until the visitor chooses. */
(function () {
  "use strict";
  var KEY = "baidlabs_consent";
  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  window.baidlabsConsent = read;

  function grant() {
    write("granted");
    if (typeof window.__baidlabsLoadAnalytics === "function") window.__baidlabsLoadAnalytics();
  }

  /* Analytics loader. index.html and the checker define their own copy in <head>;
     every other page gets this one, so an accepted choice is honoured site-wide
     and not only on the two pages that happened to carry the snippet. */
  var GA_ID = "G-0RFKMBR3DQ";
  if (typeof window.__baidlabsLoadAnalytics !== "function") {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") window.gtag = function () { window.dataLayer.push(arguments); };
    window.__baidlabsLoadAnalytics = function () {
      if (window.__gaLoaded) return; window.__gaLoaded = true;
      var s = document.createElement("script");
      s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
      document.head.appendChild(s);
      window.gtag("js", new Date());
      window.gtag("config", GA_ID, { anonymize_ip: true });
    };
  }

  function banner() {
    var el = document.createElement("div");
    el.className = "cc";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-live", "polite");
    el.setAttribute("aria-label", "Cookie choice");
    el.innerHTML =
      '<p>We use analytics cookies only if you say yes. Nothing is set until you choose, and we never run advertising or tracking pixels. ' +
      '<a href="/legal/cookies.html">Cookie Policy</a></p>' +
      '<div class="cc-actions">' +
      '<button type="button" class="btn btn-line btn-sm" id="ccNo">Decline</button>' +
      '<button type="button" class="btn btn-ink btn-sm" id="ccYes">Accept analytics</button>' +
      '</div>';
    document.body.appendChild(el);
    var yes = el.querySelector("#ccYes");
    yes.focus();
    yes.addEventListener("click", function () { grant(); el.remove(); });
    el.querySelector("#ccNo").addEventListener("click", function () { write("denied"); el.remove(); });
  }

  function init() {
    var c = read();
    if (c === "granted" && typeof window.__baidlabsLoadAnalytics === "function") {
      window.__baidlabsLoadAnalytics();
    }
    if (c !== "granted" && c !== "denied") banner();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
