/**
 * animations.js - Handles animations and visual effects
 * Uses GSAP for advanced animations and scroll-based effects
 */

const Animations = (function() {
    // Track initialized state
    let isInitialized = false;
    
    // Store animation instances
    const animations = {};
    
    /**
     * Initialize animations
     */
    function init() {
        if (isInitialized) return;
        
        // Add scroll event listener for scroll-based animations
        window.addEventListener('scroll', Utils.throttle(handleScroll, 100));
        
        // Initialize all animations
        initHeaderAnimation();
        initHeroAnimation();
        initServiceCardAnimations();
        initProjectCardAnimations();
        
        // Mark as initialized
        isInitialized = true;
    }
    
    /**
     * Handle scroll events for scroll-based animations
     */
    function handleScroll() {
        animateOnScroll();
    }
    
    /**
     * Initialize header animations
     */
    function initHeaderAnimation() {
        const header = document.querySelector('header');
        
        if (!header) return;
        
        // Create scroll-based animation for header
        animations.header = gsap.timeline({ paused: true });
        
        animations.header.to(header, {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            height: '70px',
            duration: 0.3,
            ease: 'power2.out'
        });
        
        // Update on scroll
        window.addEventListener('scroll', Utils.throttle(() => {
            if (window.scrollY > 50) {
                animations.header.play();
            } else {
                animations.header.reverse();
            }
        }, 100));
    }
    
    /**
     * Initialize hero section animations
     */
    function initHeroAnimation() {
        const heroContent = document.querySelectorAll('.hero-slider .swiper-slide-active .max-w-4xl > *');
        
        if (!heroContent.length) return;
        
        // Create animation for hero content
        animations.hero = gsap.timeline();
        
        animations.hero.from(heroContent, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
        
        // Reset and replay animation when slide changes
        const heroSwiper = Sliders.getHeroSlider();
        
        if (heroSwiper) {
            heroSwiper.on('slideChangeTransitionStart', () => {
                gsap.set(document.querySelectorAll('.hero-slider .swiper-slide:not(.swiper-slide-active) .max-w-4xl > *'), {
                    y: 50,
                    opacity: 0
                });
            });
            
            heroSwiper.on('slideChangeTransitionEnd', () => {
                const newSlideContent = document.querySelectorAll('.hero-slider .swiper-slide-active .max-w-4xl > *');
                
                gsap.to(newSlideContent, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out'
                });
            });
        }
    }
    
    /**
     * Initialize service card animations
     */
    function initServiceCardAnimations() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (!serviceCards.length) return;
        
        // Set initial state
        gsap.set(serviceCards, { y: 50, opacity: 0 });
        
        // Create animation
        animations.serviceCards = gsap.timeline({
            scrollTrigger: {
                trigger: serviceCards[0].parentElement,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        animations.serviceCards.to(serviceCards, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }
    
    /**
     * Initialize project card animations
     */
    function initProjectCardAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        
        if (!projectCards.length) return;
        
        // Set initial state
        gsap.set(projectCards, { y: 50, opacity: 0 });
        
        // Create animation
        animations.projectCards = gsap.timeline({
            scrollTrigger: {
                trigger: projectCards[0].parentElement,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        animations.projectCards.to(projectCards, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }
    
    /**
     * Animate elements when they scroll into view
     */
    function animateOnScroll() {
        // Animate section titles
        const sectionTitles = document.querySelectorAll('.section-title:not(.animated)');
        
        sectionTitles.forEach(title => {
            if (Utils.isInViewport(title, 100)) {
                gsap.from(title, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    onComplete: () => title.classList.add('animated')
                });
            }
        });
        
        // Animate call-to-action sections
        const ctaSections = document.querySelectorAll('section.bg-primary:not(.animated)');
        
        ctaSections.forEach(section => {
            if (Utils.isInViewport(section, 100)) {
                const content = section.querySelectorAll('.max-w-4xl > *');
                
                gsap.from(content, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    onComplete: () => section.classList.add('animated')
                });
            }
        });
    }
    
    /**
     * Play a specific animation
     * @param {string} name - Animation name
     */
    function playAnimation(name) {
        if (animations[name]) {
            animations[name].play();
        }
    }
    
    /**
     * Pause a specific animation
     * @param {string} name - Animation name
     */
    function pauseAnimation(name) {
        if (animations[name]) {
            animations[name].pause();
        }
    }
    
    /**
     * Reset a specific animation
     * @param {string} name - Animation name
     */
    function resetAnimation(name) {
        if (animations[name]) {
            animations[name].progress(0).pause();
        }
    }
    
    // Public API
    return {
        init: init,
        playAnimation: playAnimation,
        pauseAnimation: pauseAnimation,
        resetAnimation: resetAnimation
    };
})();