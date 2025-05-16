/**
 * navigation.js - Handles navigation functionality
 * Manages mobile menu, active states for navigation links, and scroll behavior
 */

const Navigation = (function() {
    // Cache DOM elements
    let mobileMenuButton;
    let mobileMenu;
    let navLinks;
    
    /**
     * Initialize navigation functionality
     */
    function init() {
        // Get DOM elements
        mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
        mobileMenu = document.getElementById('mobile-menu');
        navLinks = document.querySelectorAll('.nav-link');
        
        // Set up event listeners
        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', toggleMobileMenu);
        }
        
        // Set up navigation link click handlers
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavLinkClick);
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (mobileMenu && 
                mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(event.target) && 
                !mobileMenuButton.contains(event.target)) {
                closeMobileMenu();
            }
        });
        
        // Handle direct navigation via URL hash
        handleUrlHash();
        
        // Listen for hash changes
        window.addEventListener('hashchange', handleUrlHash);
    }
    
    /**
     * Toggle mobile menu visibility
     */
    function toggleMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
            
            // Update aria attributes for accessibility
            const expanded = mobileMenu.classList.contains('active');
            mobileMenuButton.setAttribute('aria-expanded', expanded);
        }
    }
    
    /**
     * Close the mobile menu
     */
    function closeMobileMenu() {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    }
    
    /**
     * Handle navigation link clicks
     * @param {Event} event - Click event
     */
    function handleNavLinkClick(event) {
        event.preventDefault();
        
        // Get the target page from data attribute
        const targetPage = event.currentTarget.getAttribute('data-target');
        if (targetPage) {
            // Update URL hash
            window.location.hash = targetPage;
            
            // Navigate to the page
            PageTransitions.navigateTo(targetPage);
            
            // Close mobile menu if open
            closeMobileMenu();
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Update active state
            updateActiveNavLink(targetPage);
        }
    }
    
    /**
     * Handle URL hash for direct navigation
     */
    function handleUrlHash() {
        const hash = window.location.hash.substring(1);
        if (hash && ['home', 'about', 'services', 'portfolio', 'contact'].includes(hash)) {
            PageTransitions.navigateTo(hash);
            updateActiveNavLink(hash);
        } else if (!hash || hash === '') {
            // Default to home page if no hash
            PageTransitions.navigateTo('home');
            updateActiveNavLink('home');
        }
    }
    
    /**
     * Update active state for navigation links
     * @param {string} activePage - Current active page
     */
    function updateActiveNavLink(activePage) {
        navLinks.forEach(link => {
            const linkTarget = link.getAttribute('data-target');
            
            if (linkTarget === activePage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Public API
    return {
        init: init
    };
})();