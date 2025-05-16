/**
 * main.js - Main JavaScript file for Gridline Architects website
 * This file handles the initialization of all modules and global functionality
 */

// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    Navigation.init();
    Sliders.init();
    Accordion.init();
    PageTransitions.init();
    Forms.init();
    
    // Additional initialization if needed
    window.addEventListener('resize', handleResize);
    
    // Initial call to set correct states
    handleResize();
});

/**
 * Handle window resize events
 */
function handleResize() {
    // Adjust any elements that need to respond to window size changes
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        // Set minimum height for smaller screens
        if (window.innerWidth < 768) {
            heroSlider.style.height = '60vh';
        } else {
            heroSlider.style.height = 'calc(100vh - 80px)';
        }
    }
}