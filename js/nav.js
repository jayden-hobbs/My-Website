// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add the navigation script to all pages
    const script = document.createElement('script');
    script.textContent = `
        const hamburger = document.querySelector('.hamburger-menu');
        const navLinks = document.querySelector('.nav-links');
        const nav = document.querySelector('.navbar');

        if (hamburger && navLinks) {
            // Toggle menu on hamburger click
            hamburger.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent click from bubbling to document
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (navLinks.classList.contains('active') && 
                    !nav.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        }
    `;
    document.head.appendChild(script);
});
