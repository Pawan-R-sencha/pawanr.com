const mobileToggle = document.getElementById('sidebar-toggle');
const collapseBtn = document.getElementById('sidebar-collapse');
const sidebar = document.getElementById('writeup-sidebar');
const overlay = document.getElementById('sidebar-overlay');

const isMobile = () => window.innerWidth <= 900;

if (sidebar && overlay && mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('is-open');

    mobileToggle.classList.toggle('is-active', isOpen);
    overlay.classList.toggle('is-visible', isOpen);

    mobileToggle.setAttribute('aria-expanded', String(isOpen));
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('is-open');
    mobileToggle.classList.remove('is-active');
    overlay.classList.remove('is-visible');

    mobileToggle.setAttribute('aria-expanded', 'false');
  });

  window.addEventListener('resize', () => {
    if (!isMobile()) {
      sidebar.classList.remove('is-open');
      overlay.classList.remove('is-visible');
      mobileToggle.classList.remove('is-active');
    } else {
      sidebar.classList.remove('is-collapsed');
      collapseBtn?.setAttribute('aria-expanded', 'true');
    }
  });
}

if (sidebar && collapseBtn) {
  collapseBtn.addEventListener('click', () => {
    const isCollapsed = sidebar.classList.toggle('is-collapsed');

    collapseBtn.setAttribute('aria-expanded', String(!isCollapsed));
  });
}
