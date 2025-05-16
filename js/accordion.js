/**
 * accordion.js - Handles accordion functionality
 * Manages service accordion toggles on the services page
 */

const Accordion = (function() {
    // Cache DOM elements
    let accordions;
    
    /**
     * Initialize accordion functionality
     */
    function init() {
        // Get all accordions
        accordions = document.querySelectorAll('.service-accordion');
        
        if (!accordions.length) {
            return;
        }
        
        // Set up each accordion
        accordions.forEach(accordion => {
            setupAccordion(accordion);
        });
    }
    
    /**
     * Set up a single accordion
     * @param {HTMLElement} accordion - The accordion element
     */
    function setupAccordion(accordion) {
        const button = accordion.querySelector('button');
        const content = accordion.querySelector('.service-accordion-content');
        const icon = accordion.querySelector('.service-accordion-icon i');
        
        if (!button || !content) {
            return;
        }
        
        // Add event listener to toggle button
        button.addEventListener('click', function() {
            toggleAccordion(accordion, content, icon);
        });
        
        // Add keyboard support
        button.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleAccordion(accordion, content, icon);
            }
        });
        
        // Set initial ARIA attributes
        button.setAttribute('aria-expanded', 'false');
        
        // Generate a unique ID for the content panel if it doesn't have one
        if (!content.id) {
            const contentId = 'accordion-content-' + Math.random().toString(36).substr(2, 9);
            content.id = contentId;
            button.setAttribute('aria-controls', contentId);
        } else {
            button.setAttribute('aria-controls', content.id);
        }
    }
    
    /**
     * Toggle accordion state
     * @param {HTMLElement} accordion - The accordion element
     * @param {HTMLElement} content - The accordion content element
     * @param {HTMLElement} icon - The icon element to toggle
     */
    function toggleAccordion(accordion, content, icon) {
        const isOpen = accordion.classList.contains('active');
        
        // Toggle active class
        accordion.classList.toggle('active');
        
        // Update button aria attributes
        const button = accordion.querySelector('button');
        button.setAttribute('aria-expanded', !isOpen);
        
        // Update max height for smooth animation
        if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + 'px';
            
            // Update icon if it exists
            if (icon) {
                icon.classList.replace('fa-plus', 'fa-minus');
            }
        } else {
            content.style.maxHeight = '0';
            
            // Update icon if it exists
            if (icon) {
                icon.classList.replace('fa-minus', 'fa-plus');
            }
        }
    }
    
    /**
     * Open a specific accordion by its index
     * @param {number} index - The index of the accordion to open
     */
    function openAccordion(index) {
        if (accordions && accordions[index]) {
            const accordion = accordions[index];
            const content = accordion.querySelector('.service-accordion-content');
            const icon = accordion.querySelector('.service-accordion-icon i');
            
            if (!accordion.classList.contains('active')) {
                toggleAccordion(accordion, content, icon);
            }
        }
    }
    
    /**
     * Close a specific accordion by its index
     * @param {number} index - The index of the accordion to close
     */
    function closeAccordion(index) {
        if (accordions && accordions[index]) {
            const accordion = accordions[index];
            const content = accordion.querySelector('.service-accordion-content');
            const icon = accordion.querySelector('.service-accordion-icon i');
            
            if (accordion.classList.contains('active')) {
                toggleAccordion(accordion, content, icon);
            }
        }
    }
    
    /**
     * Close all accordions
     */
    function closeAllAccordions() {
        if (!accordions) return;
        
        accordions.forEach(accordion => {
            const content = accordion.querySelector('.service-accordion-content');
            const icon = accordion.querySelector('.service-accordion-icon i');
            
            if (accordion.classList.contains('active')) {
                toggleAccordion(accordion, content, icon);
            }
        });
    }
    
    // Public API
    return {
        init: init,
        openAccordion: openAccordion,
        closeAccordion: closeAccordion,
        closeAllAccordions: closeAllAccordions
    };
})();