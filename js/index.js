/**
 * index.js - Main entry point for the Gridline Architects website
 * This file initializes all modules and handles the application lifecycle
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initializeModules();
    
    // Set up global event listeners
    setupGlobalEventListeners();
    
    // Initialize Alpine.js components
    // (Alpine.js initializes automatically if the script is included)
    
    // Log initialization complete
    console.log('Gridline Architects website initialized successfully.');
});

/**
 * Initialize all application modules
 */
function initializeModules() {
    // Initialize modules in the correct order
    Navigation.init();
    PageTransitions.init();
    Sliders.init();
    Accordion.init();
    Forms.init();
    
    // Initialize animations if GSAP is available
    if (typeof gsap !== 'undefined' && Animations) {
        Animations.init();
    } else {
        console.warn('GSAP not available, animations will be disabled.');
    }
}

/**
 * Set up global event listeners
 */
function setupGlobalEventListeners() {
    // Handle resize events
    window.addEventListener('resize', handleResize);
    
    // Handle hash changes for navigation
    window.addEventListener('hashchange', handleHashChange);
    
    // Handle scroll events
    window.addEventListener('scroll', Utils.throttle(handleScroll, 100));
    
    // Handle clicks on anchors with hash links
    document.addEventListener('click', handleHashLinkClicks);
    
    // Initial resize handler call
    handleResize();
}

/**
 * Handle window resize events
 */
function handleResize() {
    // Update dimensions and responsive elements
    updateResponsiveElements();
    
    // Update sliders
    if (Sliders) {
        try {
            const heroSlider = Sliders.getHeroSlider();
            if (heroSlider) {
                heroSlider.update();
            }
            
            const testimonialSlider = Sliders.getTestimonialSlider();
            if (testimonialSlider) {
                testimonialSlider.update();
            }
        } catch (error) {
            console.error('Error updating sliders:', error);
        }
    }
}

/**
 * Handle hash change events
 */
function handleHashChange() {
    const hash = window.location.hash.substring(1);
    
    // Handle page navigation
    if (['home', 'about', 'services', 'portfolio', 'contact'].includes(hash)) {
        // Handle page change if PageTransitions is available
        if (PageTransitions) {
            PageTransitions.navigateTo(hash);
        }
    } else if (hash) {
        // Handle section navigation within pages
        navigateToSection(hash);
    }
}

/**
 * Handle scroll events
 */
function handleScroll() {
    // Show/hide back to top button
    toggleBackToTopButton();
    
    // Handle scroll animations if using GSAP
    if (typeof gsap !== 'undefined' && ScrollTrigger) {
        // ScrollTrigger handles this automatically
    } else {
        // Check for elements to animate on scroll
        animateElementsOnScroll();
    }
    
    // Handle header state changes
    updateHeaderOnScroll();
}

/**
 * Update responsive elements based on viewport size
 */
function updateResponsiveElements() {
    // Get current viewport dimensions
    const viewport = Utils.getViewportDimensions();
    
    // Adjust hero slider height
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        // Set minimum height for smaller screens
        if (viewport.width < 768) {
            heroSlider.style.height = '60vh';
        } else {
            heroSlider.style.height = 'calc(100vh - 80px)';
        }
    }
    
    // Other responsive adjustments as needed
}

/**
 * Toggle back to top button visibility
 */
function toggleBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    }
}

/**
 * Navigate to a specific section on the page
 * @param {string} sectionId - ID of the section to navigate to
 */
function navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    
    if (section) {
        // Use smooth scroll animation
        Utils.animateScroll(section, 800, 'easeInOutCubic');
    }
}

/**
 * Update header styles based on scroll position
 */
function updateHeaderOnScroll() {
    const header = document.querySelector('header');
    
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

/**
 * Animate elements when they come into viewport
 */
function animateElementsOnScroll() {
    // Only run if not using GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        return;
    }
    
    // Animate elements with data-animate attribute
    const animateElements = document.querySelectorAll('[data-animate]:not(.animated)');
    
    animateElements.forEach(element => {
        if (Utils.isInViewport(element, 100)) {
            // Get animation type
            const animationType = element.getAttribute('data-animate') || 'fadeIn';
            
            // Add animation class
            element.classList.add('animated', animationType);
        }
    });
}

/**
 * Handle clicks on hash links
 * @param {Event} event - Click event
 */
function handleHashLinkClicks(event) {
    const target = event.target.closest('a[href^="#"]');
    
    if (target) {
        const hash = target.getAttribute('href').substring(1);
        
        // Ignore empty hash
        if (!hash) return;
        
        // Check if hash is a page
        if (['home', 'about', 'services', 'portfolio', 'contact'].includes(hash)) {
            // Handle with page transitions
            event.preventDefault();
            if (PageTransitions) {
                PageTransitions.navigateTo(hash);
            }
        } else {
            // It's a section anchor, handle smooth scrolling
            event.preventDefault();
            navigateToSection(hash);
        }
    }
}