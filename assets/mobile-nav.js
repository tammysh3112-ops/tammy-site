(() => {
  const header = document.querySelector('header.hdr, nav#nav');
  if (!header) return;
  const links = header.querySelector('.nav-links, nav');
  if (!links) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'mobile-nav-toggle';
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', 'mobile-navigation');
  button.innerHTML = '<span aria-hidden="true">☰</span><span>תפריט</span>';

  const menu = document.createElement('div');
  menu.id = 'mobile-navigation';
  menu.className = 'mobile-navigation';
  menu.setAttribute('role', 'navigation');
  menu.setAttribute('aria-label', 'ניווט ראשי בנייד');
  menu.hidden = true;
  links.querySelectorAll('a').forEach((link) => {
    const copy = link.cloneNode(true);
    copy.removeAttribute('class');
    copy.removeAttribute('id');
    menu.append(copy);
  });
  links.parentElement.append(button);
  header.append(menu);

  const close = (restoreFocus = false) => {
    menu.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    if (restoreFocus) button.focus();
  };
  button.addEventListener('click', () => {
    const open = menu.hidden;
    menu.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) close();
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) close(true);
  });
  document.addEventListener('focusin', (event) => {
    if (!header.contains(event.target)) close();
  });
  const mobile = window.matchMedia('(max-width: 760px)');
  mobile.addEventListener('change', () => close(menu.contains(document.activeElement)));
})();
