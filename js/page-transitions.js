/**
 * page-transitions.js - Handles transitions between pages
 * Manages the SPA-like behavior without page refreshes
 */

const PageTransitions = (function() {
    // Cache DOM elements
    let pages;
    let currentPage = 'home';
    
    /**
     * Initialize page transitions
     */
    function init() {
        // Get all page containers
        pages = {
            home: document.getElementById('home'),
            about: document.getElementById('about'),
            services: document.getElementById('services'),
            portfolio: document.getElementById('portfolio'),
            contact: document.getElementById('contact')
        };
        
        // Check if pages exist
        if (!pages.home) {
            console.error('Page elements not found. Check IDs in HTML.');
            return;
        }
        
        // Initialize with the current hash or default to home
        const initialPage = window.location.hash.substring(1);
        if (initialPage && pages[initialPage]) {
            navigateTo(initialPage);
        } else {
            navigateTo('home');
        }
    }
    
    /**
     * Navigate to a specific page
     * @param {string} pageName - Name of the page to navigate to
     */
    function navigateTo(pageName) {
        // Validate the page name
        if (!pages[pageName]) {
            console.error(`Page "${pageName}" does not exist.`);
            return;
        }
        
        // Don't do anything if we're already on this page
        if (currentPage === pageName) {
            return;
        }
        
        // Hide all pages first with a fade out
        Object.keys(pages).forEach(key => {
            if (pages[key]) {
                pages[key].classList.remove('active');
            }
        });
        
        // After a short delay, show the selected page with a fade in
        setTimeout(() => {
            // Update current page
            currentPage = pageName;
            
            // Show the selected page
            pages[pageName].classList.add('active');
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Update the window hash (without triggering another navigation)
            updateUrlHash(pageName);
            
            // Announce page change for accessibility
            announcePageChange(pageName);
        }, 300); // This should match the CSS transition time
    }
    
    /**
     * Update URL hash without triggering hashchange event
     * @param {string} pageName - Name of the page
     */
    function updateUrlHash(pageName) {
        // Remove the hashchange listener temporarily
        const hashChangeHandler = window.onhashchange;
        window.onhashchange = null;
        
        // Update the hash
        window.location.hash = pageName;
        
        // Restore the hashchange handler
        setTimeout(() => {
            window.onhashchange = hashChangeHandler;
        }, 0);
    }
    
    /**
     * Announce page change for screen readers
     * @param {string} pageName - Name of the page
     */
    function announcePageChange(pageName) {
        // Create or use an existing live region
        let announcer = document.getElementById('page-announcer');
        
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'page-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.style.position = 'absolute';
            announcer.style.width = '1px';
            announcer.style.height = '1px';
            announcer.style.overflow = 'hidden';
            announcer.style.clip = 'rect(0, 0, 0, 0)';
            document.body.appendChild(announcer);
        }
        
        // Announce the page change
        announcer.textContent = `Navigated to ${pageName} page`;
    }
    
    // Public API
    return {
        init: init,
        navigateTo: navigateTo,
        getCurrentPage: () => currentPage
    };
})();