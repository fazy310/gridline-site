/**
 * data-service.js - Handles data loading and API interactions
 * Manages loading content from data sources or APIs
 */

const DataService = (function() {
    /**
     * Load services data from config
     * @returns {Array} Array of service categories
     */
    function getServices() {
        // In a real application, this might load from an API
        return GridConfig.services.categories;
    }
    
    /**
     * Load project types data from config
     * @returns {Array} Array of project types
     */
    function getProjectTypes() {
        return GridConfig.projectTypes;
    }
    
    /**
     * Load portfolio projects data from config
     * @param {string} category - Optional category filter
     * @returns {Array} Array of projects, optionally filtered by category
     */
    function getPortfolioProjects(category) {
        const projects = GridConfig.portfolioProjects;
        
        // Return all projects if no category is specified
        if (!category || category === 'all') {
            return projects;
        }
        
        // Filter projects by category
        return projects.filter(project => project.category === category);
    }
    
    /**
     * Load team members data from config
     * @returns {Array} Array of team members
     */
    function getTeamMembers() {
        return GridConfig.teamMembers;
    }
    
    /**
     * Load testimonials data from config
     * @returns {Array} Array of testimonials
     */
    function getTestimonials() {
        return GridConfig.testimonials;
    }
    
    /**
     * Get site information
     * @returns {Object} Site information
     */
    function getSiteInfo() {
        return GridConfig.site;
    }
    
    /**
     * Get navigation items
     * @returns {Array} Navigation items
     */
    function getNavItems() {
        return GridConfig.nav.items;
    }
    
    /**
     * Get contact form configuration
     * @returns {Object} Contact form configuration
     */
    function getContactFormConfig() {
        return GridConfig.contactForm;
    }
    
    /**
     * Submit contact form data
     * @param {Object} formData - Form data to submit
     * @returns {Promise} Promise that resolves when form is submitted
     */
    function submitContactForm(formData) {
        return new Promise((resolve, reject) => {
            // In a real application, this would make an API call
            // For demonstration, we'll simulate an API call with a timeout
            setTimeout(() => {
                try {
                    console.log('Form data submitted:', formData);
                    
                    // Simulate validation
                    if (!formData.name || !formData.email || !formData.message) {
                        throw new Error('Missing required fields');
                    }
                    
                    // Simulate successful submission
                    resolve({
                        success: true,
                        message: GridConfig.contactForm.successMessage
                    });
                } catch (error) {
                    reject({
                        success: false,
                        message: GridConfig.contactForm.errorMessage,
                        error: error.message
                    });
                }
            }, 1500); // Simulate network delay
        });
    }
    
    /**
     * Load content for a specific page
     * @param {string} pageName - Name of the page to load content for
     * @returns {Object} Page content
     */
    function getPageContent(pageName) {
        // In a real application, this might load from a CMS or API
        const pageContent = {
            home: {
                hero: {
                    title: 'Expert Architectural Design',
                    subtitle: 'Turning your vision into reality with creative and functional design solutions',
                    ctaText: 'Our Services',
                    ctaLink: 'services'
                },
                services: getServices().slice(0, 3) // Just the first 3 services for the home page
            },
            about: {
                hero: {
                    title: 'About Gridline',
                    subtitle: 'Innovative design solutions for architecture, engineering and construction'
                },
                company: {
                    title: 'Our Company',
                    content: [
                        'Gridline Architects and MEP Design Consultants is a full-service design firm specializing in architectural, mechanical, electrical, plumbing, and structural solutions for diverse project types.',
                        'With years of experience and a team of skilled professionals, we deliver exceptional results for our clients across residential, commercial, and industrial sectors.',
                        'Our integrated approach combines creative design with technical expertise, ensuring that every project we undertake is both aesthetically pleasing and functionally superior.'
                    ]
                },
                mission: {
                    title: 'Our Mission',
                    content: 'To deliver innovative, sustainable and functional design solutions that exceed client expectations, enhance the built environment, and contribute positively to communities and society.'
                },
                vision: {
                    title: 'Our Vision',
                    content: 'To be recognized as a leading design consultancy known for technical excellence, creative innovation, and collaborative approach in creating spaces that inspire, function efficiently, and stand the test of time.'
                },
                values: [
                    {
                        title: 'Excellence',
                        icon: 'star',
                        content: 'We strive for excellence in everything we do, from design concepts to technical documentation.'
                    },
                    {
                        title: 'Innovation',
                        icon: 'lightbulb',
                        content: 'We embrace innovative solutions and stay at the forefront of industry trends and technologies.'
                    },
                    {
                        title: 'Integrity',
                        icon: 'handshake',
                        content: 'We operate with the highest level of integrity, transparency and professionalism in all our interactions.'
                    },
                    {
                        title: 'Collaboration',
                        icon: 'users',
                        content: 'We believe in collaborative partnerships with our clients, working together to achieve the best possible outcomes.'
                    }
                ],
                team: getTeamMembers()
            },
            services: {
                hero: {
                    title: 'Our Services',
                    subtitle: 'Comprehensive design solutions for your building projects'
                },
                intro: [
                    'At Gridline, we offer a comprehensive range of design services to meet all your building project needs. Our integrated approach ensures seamless coordination between architectural, MEP, and structural elements.',
                    'Our team of specialists work collaboratively to deliver exceptional results, combining creative design with technical expertise for projects of all scales and complexity.'
                ],
                categories: getServices(),
                projectTypes: getProjectTypes()
            },
            portfolio: {
                hero: {
                    title: 'Our Portfolio',
                    subtitle: 'Showcasing our diverse range of successful projects'
                },
                projects: getPortfolioProjects(),
                testimonials: getTestimonials()
            },
            contact: {
                hero: {
                    title: 'Contact Us',
                    subtitle: 'Get in touch with our team to discuss your project'
                },
                info: getSiteInfo(),
                form: getContactFormConfig()
            }
        };
        
        return pageContent[pageName] || null;
    }
    
    // Public API
    return {
        getServices: getServices,
        getProjectTypes: getProjectTypes,
        getPortfolioProjects: getPortfolioProjects,
        getTeamMembers: getTeamMembers,
        getTestimonials: getTestimonials,
        getSiteInfo: getSiteInfo,
        getNavItems: getNavItems,
        getContactFormConfig: getContactFormConfig,
        submitContactForm: submitContactForm,
        getPageContent: getPageContent
    };
})();