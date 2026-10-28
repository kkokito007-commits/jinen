// Menu button: opens the full-screen menu, closes it on a link, Escape or a second press,
// keeps keyboard focus inside while it is open, then moves focus to the chosen section or back to the button.
(function () {
  var body = document.body;
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('menu');
  var main = document.getElementById('main');
  var footer = document.querySelector('.site-footer');
  if (!toggle || !menu) return;

  var links = Array.prototype.slice.call(menu.querySelectorAll('a'));

  function setOpen(open) {
    body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!open));
    [main, footer].forEach(function (el) { if (el) el.inert = open; });
    if (open && links[0]) links[0].focus({ preventScroll: true });
  }

  toggle.addEventListener('click', function () {
    setOpen(!body.classList.contains('menu-open'));
  });

  menu.querySelectorAll('.menu-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      var target = document.querySelector(link.getAttribute('href'));
      setOpen(false);
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (!body.classList.contains('menu-open')) return;
    if (e.key === 'Escape') {
      setOpen(false);
      toggle.focus();
      return;
    }
    if (e.key !== 'Tab') return;
    var focusable = [toggle].concat(links);
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
})();
