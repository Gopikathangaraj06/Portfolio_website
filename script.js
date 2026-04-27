document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    const updateNavbar = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('glass-nav', 'py-3');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.remove('glass-nav', 'py-3');
            navbar.classList.add('py-4');
        }
    };

    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // check on load

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const icon = mobileMenuBtn.querySelector('i');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
        if(mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
    });

    // Scroll Animation Observer Setup
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Optional: observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Highlight Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.md\\:flex a, .mobile-link');

    const updateActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-indigo-400');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('text-indigo-400');
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Check on load
});
