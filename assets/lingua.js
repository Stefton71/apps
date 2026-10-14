// Lingua del sito: ricorda la lingua scelta dal menu e, alla prima visita di una pagina
// italiana, passa alla lingua del browser se la pagina esiste in quella lingua.
(function () {
  var key = "lingua";
  function saved() { try { return localStorage.getItem(key); } catch (e) { return "it"; } }
  function save(value) { try { localStorage.setItem(key, value); } catch (e) {} }

  var links = document.querySelectorAll(".lang a[hreflang]");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () { save(this.getAttribute("hreflang")); });
  }

  if (document.documentElement.lang !== "it" || saved()) return;
  var alternates = {};
  var tags = document.querySelectorAll('link[rel="alternate"][hreflang]');
  for (var j = 0; j < tags.length; j++) alternates[tags[j].getAttribute("hreflang")] = tags[j].href;
  var preferred = navigator.languages || [navigator.language || ""];
  for (var k = 0; k < preferred.length; k++) {
    var code = String(preferred[k]).slice(0, 2).toLowerCase();
    if (code === "it") return;
    if (alternates[code]) { location.replace(alternates[code]); return; }
  }
})();
