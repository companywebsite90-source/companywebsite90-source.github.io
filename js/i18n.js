/* ===========================================================
   Sparkon Labs — EN <-> AR language toggle
   Uses the static dictionary in translations.js (window.AR_TRANSLATIONS).
   Remembers the chosen language across pages via localStorage.
   =========================================================== */
(function () {
  var DICT = window.AR_TRANSLATIONS || {};
  var STORAGE_KEY = 'sparkon-lang';

  // MUST match norm() in build_arabic.py
  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

  function textNodes() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var p = node.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.nodeName.toLowerCase();
        if (tag === 'script' || tag === 'style') return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest('.lang-toggle')) return NodeFilter.FILTER_REJECT;
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var out = [], n;
    while ((n = walker.nextNode())) out.push(n);
    return out;
  }

  function toArabic() {
    textNodes().forEach(function (node) {
      var key = norm(node.nodeValue);
      var ar = DICT[key];
      if (ar) {
        if (node._en === undefined) node._en = node.nodeValue;   // remember original
        var lead = node.nodeValue.match(/^\s*/)[0];
        var trail = node.nodeValue.match(/\s*$/)[0];
        node.nodeValue = lead + ar + trail;
      }
    });
    document.querySelectorAll('[placeholder]').forEach(function (el) {
      var ar = DICT[norm(el.getAttribute('placeholder'))];
      if (ar) {
        if (el._enPh === undefined) el._enPh = el.getAttribute('placeholder');
        el.setAttribute('placeholder', ar);
      }
    });
    document.documentElement.setAttribute('lang', 'ar');
    document.documentElement.setAttribute('dir', 'rtl');
    setButtonLabel('ar');
  }

  function toEnglish() {
    textNodes().forEach(function (node) {
      if (node._en !== undefined) node.nodeValue = node._en;
    });
    document.querySelectorAll('[placeholder]').forEach(function (el) {
      if (el._enPh !== undefined) el.setAttribute('placeholder', el._enPh);
    });
    document.documentElement.setAttribute('lang', 'en');
    document.documentElement.setAttribute('dir', 'ltr');
    setButtonLabel('en');
  }

  function setButtonLabel(lang) {
    var btn = document.querySelector('.lang-toggle');
    if (btn) btn.textContent = (lang === 'ar') ? 'English' : 'العربية';
  }

  function apply(lang) {
    if (lang === 'ar') { toArabic(); } else { toEnglish(); }
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('.lang-toggle')) {
      var current = document.documentElement.getAttribute('lang') === 'ar' ? 'ar' : 'en';
      apply(current === 'ar' ? 'en' : 'ar');
    }
  });

  // On load, restore the previously chosen language (defaults to English).
  document.addEventListener('DOMContentLoaded', function () {
    var saved = 'en';
    try { saved = localStorage.getItem(STORAGE_KEY) || 'en'; } catch (e) {}
    if (saved === 'ar') { toArabic(); } else { setButtonLabel('en'); }
  });
})();
