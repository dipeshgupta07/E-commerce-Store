function toggleMenu() {
    alert("Hamburger menu clicked! Add your menu logic here.");
  }
// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
});


