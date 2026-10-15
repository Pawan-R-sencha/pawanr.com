document.querySelectorAll('.nav-toggle').forEach((toggle) => {
  const id = toggle.getAttribute('aria-controls');
  const menu = id ? document.getElementById(id) : null;
  if (!menu) return;

  const setOpen = (open) => {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    setOpen(!menu.classList.contains('open'));
  });

  document.addEventListener('click', (event) => {
    if (
      menu.classList.contains('open') &&
      !menu.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      setOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
});
