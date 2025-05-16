/**
 * alpine-components.js - Custom Alpine.js components and data
 * Defines Alpine.js components for reactive UI elements
 */

document.addEventListener('alpine:init', () => {
    /**
     * Main navigation component
     * Handles page transitions and mobile menu
     */
    Alpine.data('navigation', () => ({
        mobileMenuOpen: false,
        currentPage: 'home',
        
        init() {
            // Handle direct navigation via URL hash
            if (window.location.hash) {
                const page = window.location.hash.substring(1);
                if (['home', 'about', 'services', 'portfolio', 'contact'].includes(page)) {
                    this.currentPage = page;
                }
            }
            
            // Update hash when page changes
            this.$watch('currentPage', (value) => {
                window.location.hash = value;
                window.scrollTo(0, 0);
            });
        },
        
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },
        
        closeMobileMenu() {
            this.mobileMenuOpen = false;
        },
        
        navigateTo(page) {
            this.currentPage = page;
            this.closeMobileMenu();
        }
    }));
    
    /**
     * Service accordion component
     * Handles accordion toggle functionality
     */
    Alpine.data('serviceAccordion', () => ({
        open: false,
        
        toggle() {
            this.open = !this.open;
        },
        
        get buttonLabel() {
            return this.open ? 'Hide details' : 'Show details';
        }
    }));
    
    /**
     * Project filter component
     * Handles filtering portfolio projects
     */
    Alpine.data('projectFilter', () => ({
        activeFilter: 'all',
        
        setFilter(filter) {
            this.activeFilter = filter;
        },
        
        isVisible(categories) {
            return this.activeFilter === 'all' || categories.includes(this.activeFilter);
        }
    }));
    
    /**
     * Contact form component
     * Handles form validation and submission
     */
    Alpine.data('contactForm', () => ({
        formData: {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        },
        errors: {},
        isSubmitting: false,
        submitSuccess: false,
        submitError: false,
        
        init() {
            // Reset form when navigating away
            this.$watch('$store.navigation.currentPage', (value) => {
                if (value !== 'contact') {
                    this.resetForm();
                }
            });
        },
        
        validateField(field) {
            this.errors[field] = '';
            
            // Required fields
            if (['name', 'email', 'subject', 'message'].includes(field) && !this.formData[field].trim()) {
                this.errors[field] = 'This field is required';
                return false;
            }
            
            // Email validation
            if (field === 'email' && this.formData.email) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(this.formData.email)) {
                    this.errors[field] = 'Please enter a valid email address';
                    return false;
                }
            }
            
            // Phone validation (optional field)
            if (field === 'phone' && this.formData.phone) {
                const phonePattern = /^[0-9+\-\s()]{7,20}$/;
                if (!phonePattern.test(this.formData.phone)) {
                    this.errors[field] = 'Please enter a valid phone number';
                    return false;
                }
            }
            
            return true;
        },
        
        validateForm() {
            let isValid = true;
            
            // Validate all fields
            ['name', 'email', 'phone', 'subject', 'message'].forEach(field => {
                if (!this.validateField(field)) {
                    isValid = false;
                }
            });
            
            return isValid;
        },
        
        async submitForm() {
            // Prevent submission if already submitting
            if (this.isSubmitting) return;
            
            // Validate the form
            if (!this.validateForm()) {
                return;
            }
            
            // Show submitting state
            this.isSubmitting = true;
            this.submitSuccess = false;
            this.submitError = false;
            
            try {
                // Simulate API call with timeout
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success
                this.submitSuccess = true;
                this.resetForm();
            } catch (error) {
                // Error
                this.submitError = true;
                console.error('Form submission error:', error);
            } finally {
                this.isSubmitting = false;
            }
        },
        
        resetForm() {
            // Reset form data
            this.formData = {
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            };
            
            // Reset errors
            this.errors = {};
            
            // Reset submission states
            this.isSubmitting = false;
            this.submitSuccess = false;
            this.submitError = false;
        }
    }));
    
    /**
     * Theme switcher component
     * Handles light/dark mode toggle
     */
    Alpine.data('themeSwitcher', () => ({
        isDarkMode: false,
        
        init() {
            // Check system preference or saved preference
            const savedTheme = localStorage.getItem('gridline-theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            this.isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
            this.applyTheme();
            
            // Listen for system preference changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!localStorage.getItem('gridline-theme')) {
                    this.isDarkMode = e.matches;
                    this.applyTheme();
                }
            });
        },
        
        toggleTheme() {
            this.isDarkMode = !this.isDarkMode;
            this.applyTheme();
            
            // Save preference
            localStorage.setItem('gridline-theme', this.isDarkMode ? 'dark' : 'light');
        },
        
        applyTheme() {
            // Apply dark mode class to html element
            if (this.isDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }));
});