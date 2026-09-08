const toggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('writeup-sidebar');
const overlay = document.getElementById('sidebar-overlay');

if (toggle && sidebar && overlay) {
  const isMobile = () => window.innerWidth <= 900;

  toggle.addEventListener('click', () => {
    if (isMobile()) {
      const isOpen = sidebar.classList.toggle('is-open');

      toggle.classList.toggle('is-active', isOpen);
      overlay.classList.toggle('is-visible', isOpen);

      toggle.setAttribute('aria-expanded', String(isOpen));
    } else {
      const isCollapsed = sidebar.classList.toggle('is-collapsed');

      toggle.classList.toggle('is-collapsed', isCollapsed);
      toggle.classList.toggle('is-active', isCollapsed);

      toggle.setAttribute('aria-expanded', String(!isCollapsed));
    }
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('is-open');
    toggle.classList.remove('is-active');
    overlay.classList.remove('is-visible');

    toggle.setAttribute('aria-expanded', 'false');
  });

  window.addEventListener('resize', () => {
    if (!isMobile()) {
      sidebar.classList.remove('is-open');
      overlay.classList.remove('is-visible');
    }
  });
}
