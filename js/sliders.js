/**
 * sliders.js - Initializes and manages all sliders on the website
 * Uses Swiper.js for creating responsive, touch-enabled sliders
 */

const Sliders = (function() {
    // Store slider instances
    let heroSwiper;
    let testimonialSwiper;
    
    /**
     * Initialize all sliders
     */
    function init() {
        initHeroSlider();
        initTestimonialSlider();
        
        // Add window resize handler to update sliders
        window.addEventListener('resize', updateSliders);
    }
    
    /**
     * Initialize the hero slider
     */
    function initHeroSlider() {
        const heroSliderElement = document.querySelector('.hero-swiper');
        
        if (!heroSliderElement) {
            return;
        }
        
        heroSwiper = new Swiper(heroSliderElement, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.hero-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.hero-next',
                prevEl: '.hero-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 1000,
            grabCursor: true,
            a11y: {
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
                firstSlideMessage: 'This is the first slide',
                lastSlideMessage: 'This is the last slide',
                paginationBulletMessage: 'Go to slide {{index}}'
            }
        });
    }
    
    /**
     * Initialize the testimonial slider
     */
    function initTestimonialSlider() {
        const testimonialSliderElement = document.querySelector('.testimonial-swiper');
        
        if (!testimonialSliderElement) {
            return;
        }
        
        testimonialSwiper = new Swiper(testimonialSliderElement, {
            slidesPerView: 1,
            spaceBetween: 20,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            grabCursor: true,
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
            a11y: {
                prevSlideMessage: 'Previous testimonial',
                nextSlideMessage: 'Next testimonial',
                firstSlideMessage: 'This is the first testimonial',
                lastSlideMessage: 'This is the last testimonial',
                paginationBulletMessage: 'Go to testimonial {{index}}'
            }
        });
    }
    
    /**
     * Update sliders on resize
     */
    function updateSliders() {
        // Update all sliders
        if (heroSwiper) {
            heroSwiper.update();
        }
        
        if (testimonialSwiper) {
            testimonialSwiper.update();
        }
    }
    
    /**
     * Get hero slider instance
     * @returns {Swiper} Hero slider instance
     */
    function getHeroSlider() {
        return heroSwiper;
    }
    
    /**
     * Get testimonial slider instance
     * @returns {Swiper} Testimonial slider instance
     */
    function getTestimonialSlider() {
        return testimonialSwiper;
    }
    
    // Public API
    return {
        init: init,
        getHeroSlider: getHeroSlider,
        getTestimonialSlider: getTestimonialSlider
    };
})();