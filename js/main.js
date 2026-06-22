// Mobile nav toggle
document.addEventListener('click', function (e) {
  if (e.target.closest('.nav-toggle')) {
    document.querySelector('.nav-links')?.classList.toggle('open');
  }
});
