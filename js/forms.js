/**
 * forms.js - Handles form validation and submission
 * Manages contact form functionality
 */

const Forms = (function() {
    // Cache form elements
    let contactForm;
    
    /**
     * Initialize form functionality
     */
    function init() {
        // Get contact form
        contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            setupContactForm();
        }
    }
    
    /**
     * Set up contact form validation and submission
     */
    function setupContactForm() {
        // Add submit event listener
        contactForm.addEventListener('submit', handleContactFormSubmit);
        
        // Add input validation on blur
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
        });
    }
    
    /**
     * Handle contact form submission
     * @param {Event} event - Form submission event
     */
    function handleContactFormSubmit(event) {
        event.preventDefault();
        
        // Validate all inputs first
        const isValid = validateForm(contactForm);
        
        if (isValid) {
            // Form is valid, proceed with submission
            submitContactForm();
        }
    }
    
    /**
     * Validate an individual input field
     * @param {Event} event - Blur event 
     */
    function validateInput(event) {
        const input = event.target;
        const value = input.value.trim();
        
        // Get the error element (create if it doesn't exist)
        let errorElement = input.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message text-red-500 text-sm mt-1';
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
        
        // Check for required fields
        if (input.required && value === '') {
            errorElement.textContent = 'This field is required';
            input.classList.add('border-red-500');
            return false;
        }
        
        // Validate email format
        if (input.type === 'email' && value !== '') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                errorElement.textContent = 'Please enter a valid email address';
                input.classList.add('border-red-500');
                return false;
            }
        }
        
        // Phone number validation (optional field)
        if (input.id === 'phone' && value !== '') {
            const phonePattern = /^[0-9+\-\s()]{7,20}$/;
            if (!phonePattern.test(value)) {
                errorElement.textContent = 'Please enter a valid phone number';
                input.classList.add('border-red-500');
                return false;
            }
        }
        
        // Field is valid
        errorElement.textContent = '';
        input.classList.remove('border-red-500');
        return true;
    }
    
    /**
     * Validate entire form
     * @param {HTMLFormElement} form - Form to validate
     * @returns {boolean} Whether the form is valid
     */
    function validateForm(form) {
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        // Validate each input
        inputs.forEach(input => {
            // Create a blur event to trigger validation
            const event = new Event('blur');
            input.dispatchEvent(event);
            
            // Check if input is valid
            const inputErrorElement = input.nextElementSibling;
            if (inputErrorElement && inputErrorElement.textContent !== '') {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    /**
     * Submit contact form (simulate AJAX submission)
     */
    function submitContactForm() {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Simulate AJAX request with timeout
        setTimeout(() => {
            // In a real application, you would send the form data to your server here
            
            // Show success message
            showFormMessage('success', 'Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }, 1500);
    }
    
    /**
     * Show form message (success or error)
     * @param {string} type - Message type ('success' or 'error')
     * @param {string} message - Message text
     */
    function showFormMessage(type, message) {
        // Check if message element already exists
        let messageElement = document.getElementById('form-message');
        
        if (!messageElement) {
            // Create message element
            messageElement = document.createElement('div');
            messageElement.id = 'form-message';
            contactForm.parentNode.insertBefore(messageElement, contactForm);
        }
        
        // Set message style and content
        if (type === 'success') {
            messageElement.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4';
        } else {
            messageElement.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4';
        }
        
        messageElement.textContent = message;
        
        // Scroll to message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Remove message after delay if it's a success
        if (type === 'success') {
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
    }
    
    // Public API
    return {
        init: init
    };
})();