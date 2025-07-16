// script.js

// Get references to elements
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

// Function to update active class for navigation links based on scroll position
function updateActiveNavLink() {
    let currentSectionId = 'home'; // Default to home

    // Iterate over sections to find the one currently in view
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop - document.querySelector('header').offsetHeight; // Adjust for fixed header
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSectionId = section.id;
        }
    });

    // Update active class for navigation links
    navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Add click event listeners to navigation links for smooth scrolling
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior

        const targetId = link.getAttribute('href').substring(1); // Get section ID
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const headerOffset = document.querySelector('header').offsetHeight; // Get header height
            const elementPosition = targetSection.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }

        // Hide mobile menu after selection
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Toggle mobile menu visibility
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Add scroll event listener to update active navigation link
window.addEventListener('scroll', updateActiveNavLink);

// Set initial active section on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink(); // Call once on load to set initial active state
});
