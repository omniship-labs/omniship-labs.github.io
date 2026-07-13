/* omniship.dev — the little interactivity the page needs. */

// Theme toggle — persists to localStorage; the inline <head> script applies
// the saved choice before first paint.
(function () {
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', function () {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    var next = dark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('osl-home-theme', next); } catch (e) {}
  });
})();

// Code block copy button.
(function () {
  document.querySelectorAll('.codeblock-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      try { navigator.clipboard.writeText(btn.getAttribute('data-copy') || ''); } catch (e) {}
      btn.textContent = 'copied ✓';
      btn.classList.add('copied');
      setTimeout(function () {
        btn.textContent = 'copy';
        btn.classList.remove('copied');
      }, 1400);
    });
  });
})();
