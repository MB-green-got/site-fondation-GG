/*
  Le seul JavaScript du site, et il ne porte aucun contenu.

  Il fait trois choses. Il ouvre et ferme le menu des écrans étroits. Il pose
  une classe sur la barre quand la page a défilé. Il fait apparaître les blocs
  au défilement. Si ce fichier ne se charge pas, la page reste entièrement
  lisible et navigable, tous les liens sont des liens et tout le texte est
  déjà dans le HTML.
*/

/* Menu des écrans étroits */
(function () {
  var mb = document.getElementById('menu-btn');
  var mn = document.getElementById('mnav');
  var tb = document.getElementById('topbar');
  if (!mb || !mn || !tb) return;
  var mbl = mb.querySelector('.lb');

  function setMenu(o) {
    mn.classList.toggle('open', o);
    tb.classList.toggle('menu-open', o);
    mb.setAttribute('aria-expanded', String(o));
    if (mbl) mbl.textContent = o ? 'Fermer' : 'En savoir plus';
  }
  function closeMenu() { setMenu(false); }

  mb.addEventListener('click', function () { setMenu(!mn.classList.contains('open')); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mn.classList.contains('open')) { closeMenu(); mb.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (mn.classList.contains('open') && !tb.contains(e.target)) closeMenu();
  });
})();

/* Barre au défilement */
(function () {
  var tb = document.getElementById('topbar');
  if (!tb) return;
  function onScroll() {
    tb.classList.toggle('scrolled', (window.scrollY || document.documentElement.scrollTop) > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* Révélations au défilement, désactivées si le mouvement est réduit */
(function () {
  if (!('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });

  var rvs = [].slice.call(document.querySelectorAll('.rv'));
  rvs.forEach(function (el) { io.observe(el); });

  /* Ce qui est déjà visible au chargement est posé sans transition. */
  rvs.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.height && r.top < window.innerHeight - 40) { el.classList.add('in'); io.unobserve(el); }
  });
})();
