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

  function base() {
    /* legal pages sit one level down, like insights and tools */
    return /\/(insights|tools|work|legal)\//.test(location.pathname) ? "../" : "";
  }

  function banner() {
    var el = document.createElement("div");
    el.className = "cc";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-live", "polite");
    el.setAttribute("aria-label", "Cookie choice");
    el.innerHTML =
      '<p>We use analytics cookies only if you say yes. Nothing is set until you choose, and we never run advertising or tracking pixels. ' +
      '<a href="' + base() + 'legal/cookies.html">Cookie Policy</a></p>' +
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
