/**
 * utils.js - Utility functions for general use across the website
 * Contains helper methods that can be used by multiple modules
 */

const Utils = (function() {
    /**
     * Debounce function to limit how often a function can be called
     * @param {Function} func - Function to debounce
     * @param {number} wait - Time to wait in milliseconds
     * @param {boolean} immediate - Whether to call immediately
     * @returns {Function} Debounced function
     */
    function debounce(func, wait, immediate) {
        let timeout;
        
        return function() {
            const context = this;
            const args = arguments;
            
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            
            if (callNow) func.apply(context, args);
        };
    }
    
    /**
     * Throttle function to ensure function is called at most once in specified time
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    function throttle(func, limit) {
        let inThrottle;
        
        return function() {
            const context = this;
            const args = arguments;
            
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    /**
     * Check if an element is in viewport
     * @param {HTMLElement} element - Element to check
     * @param {number} offset - Offset for triggering (default: 0)
     * @returns {boolean} Whether element is in viewport
     */
    function isInViewport(element, offset = 0) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= offset &&
            rect.left <= (window.innerWidth - offset) &&
            rect.right >= offset
        );
    }
    
    /**
     * Format a date with custom options
     * @param {Date|string} date - Date to format
     * @param {object} options - Formatting options (optional)
     * @returns {string} Formatted date string
     */
    function formatDate(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        const formatOptions = { ...defaultOptions, ...options };
        
        return new Date(date).toLocaleDateString('en-US', formatOptions);
    }
    
    /**
     * Get query parameters from URL
     * @param {string} param - Parameter name (optional)
     * @returns {object|string} All parameters or specific parameter value
     */
    function getQueryParams(param) {
        const urlParams = new URLSearchParams(window.location.search);
        
        if (param) {
            return urlParams.get(param);
        }
        
        const params = {};
        for (const [key, value] of urlParams.entries()) {
            params[key] = value;
        }
        
        return params;
    }
    
    /**
     * Set a cookie
     * @param {string} name - Cookie name
     * @param {string} value - Cookie value
     * @param {number} days - Days until expiration
     */
    function setCookie(name, value, days) {
        let expires = '';
        
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        
        document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
    }
    
    /**
     * Get a cookie value
     * @param {string} name - Cookie name
     * @returns {string|null} Cookie value or null if not found
     */
    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        
        return null;
    }
    
    /**
     * Delete a cookie
     * @param {string} name - Cookie name
     */
    function deleteCookie(name) {
        setCookie(name, '', -1);
    }
    
    /**
     * Add event listener with automatic cleanup
     * @param {HTMLElement} element - Element to attach listener to
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     * @param {boolean|object} options - Event listener options
     * @returns {Function} Function to remove the listener
     */
    function addEventListenerWithCleanup(element, event, handler, options = false) {
        if (!element) return () => {};
        
        element.addEventListener(event, handler, options);
        
        return function cleanup() {
            element.removeEventListener(event, handler, options);
        };
    }
    
    /**
     * Get viewport dimensions
     * @returns {object} Viewport width and height
     */
    function getViewportDimensions() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight
        };
    }
    
    /**
     * Animate scroll to a specific element or position
     * @param {HTMLElement|number} target - Element or Y position to scroll to
     * @param {number} duration - Animation duration in milliseconds
     * @param {string} easing - Easing function name
     */
    function animateScroll(target, duration = 500, easing = 'easeInOutCubic') {
        // Get target position
        let targetPosition;
        
        if (typeof target === 'number') {
            targetPosition = target;
        } else if (target instanceof HTMLElement) {
            targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        } else {
            return;
        }
        
        // Get start position
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        // Easing functions
        const easings = {
            linear: t => t,
            easeInQuad: t => t * t,
            easeOutQuad: t => t * (2 - t),
            easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
            easeInCubic: t => t * t * t,
            easeOutCubic: t => (--t) * t * t + 1,
            easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
        };
        
        // Fallback to linear if easing doesn't exist
        const easingFunction = easings[easing] || easings.linear;
        
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easingFunction(progress);
            
            window.scrollTo(0, startPosition + distance * eased);
            
            if (elapsed < duration) {
                window.requestAnimationFrame(step);
            }
        }
        
        window.requestAnimationFrame(step);
    }
    
    // Public API
    return {
        debounce: debounce,
        throttle: throttle,
        isInViewport: isInViewport,
        formatDate: formatDate,
        getQueryParams: getQueryParams,
        setCookie: setCookie,
        getCookie: getCookie,
        deleteCookie: deleteCookie,
        addEventListenerWithCleanup: addEventListenerWithCleanup,
        getViewportDimensions: getViewportDimensions,
        animateScroll: animateScroll
    };
})();