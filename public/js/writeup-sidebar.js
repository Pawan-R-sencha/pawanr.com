const mobileToggle = document.getElementById('sidebar-toggle');
const collapseBtn = document.getElementById('sidebar-collapse');
const sidebar = document.getElementById('writeup-sidebar');
const overlay = document.getElementById('sidebar-overlay');

const isMobile = () => window.innerWidth <= 900;

const openDrawer = () => {
  if (!sidebar || !overlay || !mobileToggle) return;

  sidebar.classList.add('is-open');
  mobileToggle.classList.add('is-active');
  overlay.classList.add('is-visible');
  mobileToggle.setAttribute('aria-expanded', 'true');

  const firstLink = sidebar.querySelector('a');
  if (firstLink) firstLink.focus({ preventScroll: true });
};

const closeDrawer = (restoreFocus = false) => {
  if (!sidebar || !overlay || !mobileToggle) return;

  sidebar.classList.remove('is-open');
  mobileToggle.classList.remove('is-active');
  overlay.classList.remove('is-visible');
  mobileToggle.setAttribute('aria-expanded', 'false');

  if (restoreFocus) mobileToggle.focus({ preventScroll: true });
};

if (sidebar && overlay && mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    if (sidebar.classList.contains('is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  overlay.addEventListener('click', () => closeDrawer());

  sidebar.addEventListener('click', (event) => {
    if (isMobile() && event.target.closest('a')) closeDrawer();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
      closeDrawer(true);
    }
  });
}

if (sidebar && collapseBtn) {
  collapseBtn.addEventListener('click', () => {
    const isCollapsed = sidebar.classList.toggle('is-collapsed');

    collapseBtn.setAttribute('aria-expanded', String(!isCollapsed));
  });
}

window.addEventListener('resize', () => {
  if (!isMobile()) {
    closeDrawer();
  } else {
    sidebar?.classList.remove('is-collapsed');
    collapseBtn?.setAttribute('aria-expanded', 'true');
  }
});

const tocLinks = Array.from(document.querySelectorAll('[data-toc]'));

if (tocLinks.length > 0) {
  const targets = tocLinks
    .map((link) => {
      const id = decodeURIComponent(link.getAttribute('href').slice(1));
      const heading = document.getElementById(id);
      return heading ? { link, heading } : null;
    })
    .filter(Boolean);

  let timer = null;

  const updateActive = () => {

    let current = null;

    for (const target of targets) {
      if (target.heading.getBoundingClientRect().top <= 160) {
        current = target;
      } else {
        break;
      }
    }

    if (!current && targets.length > 0) current = targets[0];

    for (const target of targets) {
      const isActive = target === current;
      target.link.classList.toggle('is-active', isActive);

      if (isActive) {
        target.link.setAttribute('aria-current', 'location');
      } else {
        target.link.removeAttribute('aria-current');
      }
    }
  };

  const requestUpdate = () => {
    if (timer !== null) return;

    timer = window.setTimeout(() => {
      timer = null;
      updateActive();
    }, 90);
  };

  updateActive();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
}
