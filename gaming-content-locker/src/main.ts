// Initialize any interactive elements
document.addEventListener('DOMContentLoaded', () => {
  console.log('Gaming Content Locker Page Loaded');

  // Add smooth scrolling for anchor links
  const anchors = document.querySelectorAll('a[href^="#"]');
  for (const anchor of anchors) {
    anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
      e.preventDefault();
      const href = this.getAttribute('href') || '';
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  }
});
