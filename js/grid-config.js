/**
 * grid-config.js - Configuration file for the Gridline Architects website
 * Contains global settings and configuration options
 */

const GridConfig = {
    /**
     * Site information
     */
    site: {
        name: 'Gridline Architects and MEP Design Consultants',
        shortName: 'Gridline',
        description: 'Comprehensive architectural and MEP design services for residential, commercial and industrial projects.',
        url: 'https://www.gridlinedesigns.com',
        email: 'info@gridlinedesigns.com',
        phone: '+44 (0) 123 456 7890',
        address: '123 Design Street, Creative District, London, UK',
        social: {
            facebook: 'https://www.facebook.com/gridlinedesigns',
            twitter: 'https://twitter.com/gridlinedesigns',
            linkedin: 'https://www.linkedin.com/company/gridlinedesigns',
            instagram: 'https://www.instagram.com/gridlinedesigns'
        }
    },
    
    /**
     * Navigation configuration
     */
    nav: {
        items: [
            { name: 'Home', path: 'home' },
            { name: 'About Us', path: 'about' },
            { name: 'Services', path: 'services' },
            { name: 'Portfolio', path: 'portfolio' },
            { name: 'Contact Us', path: 'contact' }
        ]
    },
    
    /**
     * Services configuration
     */
    services: {
        categories: [
            {
                name: 'Architecture',
                icon: 'drafting-compass',
                items: [
                    'Building Regulations design',
                    'Extensions',
                    'Loft Conversions',
                    'New Builds',
                    'Multi-storey buildings'
                ]
            },
            {
                name: 'MEP Design',
                icon: 'bolt',
                subcategories: [
                    {
                        name: 'Electrical & Allied System Design',
                        items: [
                            'Load Assessments',
                            'Primary Source Selection & Prioritization',
                            'Genset Sizing & Selection',
                            'LV Cable trunking, Conduiting and routing plans',
                            'LT distribution Sizing',
                            'Raw Power Plans',
                            'Illuminations Plans',
                            'Lightning Protection and Structure Earthing System',
                            'LV/MV earthing System Design'
                        ]
                    },
                    {
                        name: 'Security & Communication Systems',
                        items: [
                            'Fire Alarm System Design',
                            'Public Address System Design',
                            'Security and Surveillance System Design'
                        ]
                    },
                    {
                        name: 'Telecommunication',
                        items: [
                            'Copper (Cat-6/Telephony/Data) Networking Planning',
                            'Telecom Grounding and Surge Protection'
                        ]
                    }
                ]
            },
            {
                name: 'HVAC Design',
                icon: 'temperature-high',
                items: [
                    'Indoor FCU/CA/WM drawings',
                    'Outdoor Unit Sizing',
                    'Duct Design',
                    'Copper Piping',
                    'Multi Split VRF'
                ]
            },
            {
                name: 'Plumbing & Fire Fighting Design',
                icon: 'faucet',
                items: [
                    'Hot and cold water supply',
                    'Sewerage Design',
                    'Drainage Design',
                    'Clean Agent Fire Suppression System for Electrical'
                ]
            },
            {
                name: 'Structural Design',
                icon: 'building',
                items: [
                    'Structural Calculation and Design',
                    '3D modelling'
                ]
            },
            {
                name: 'Quantity Surveying & Cost Estimation',
                icon: 'calculator',
                items: [
                    'Bill of Quantities',
                    'Material Take-offs',
                    'Cost Estimation',
                    'Schedule of Works'
                ]
            }
        ]
    },
    
    /**
     * Project types configuration
     */
    projectTypes: [
        {
            name: 'Residential',
            description: 'Custom homes, extensions, renovations and multi-unit residential developments',
            examples: ['Single Family Homes', 'Multi-Unit Developments', 'Custom Home Designs']
        },
        {
            name: 'Commercial',
            description: 'Office buildings, retail spaces, restaurants and hospitality projects',
            examples: ['Office Buildings', 'Retail Spaces', 'Hospitality Projects']
        },
        {
            name: 'Industrial',
            description: 'Warehouses, factories, production facilities and industrial complexes',
            examples: ['Warehouses', 'Manufacturing Facilities', 'Industrial Complexes']
        }
    ],
    
    /**
     * Portfolio projects configuration
     */
    portfolioProjects: [
        {
            id: 'modern-home',
            title: 'Modern Home Design',
            category: 'residential',
            description: 'Luxury residence with contemporary design elements and sustainable features',
            imageUrl: '/images/projects/modern-home.jpg'
        },
        {
            id: 'office-complex',
            title: 'Office Complex',
            category: 'commercial',
            description: 'Modern office space with integrated MEP systems for optimal efficiency',
            imageUrl: '/images/projects/office-complex.jpg'
        },
        {
            id: 'manufacturing-facility',
            title: 'Manufacturing Facility',
            category: 'industrial',
            description: 'State-of-the-art industrial facility with advanced MEP and structural systems',
            imageUrl: '/images/projects/manufacturing-facility.jpg'
        },
        {
            id: 'luxury-apartments',
            title: 'Luxury Apartment Complex',
            category: 'residential',
            description: 'Multi-unit residential development with premium amenities and modern design',
            imageUrl: '/images/projects/luxury-apartments.jpg'
        },
        {
            id: 'retail-center',
            title: 'Retail Center',
            category: 'commercial',
            description: 'Modern shopping complex with innovative architectural and MEP solutions',
            imageUrl: '/images/projects/retail-center.jpg'
        },
        {
            id: 'warehouse-complex',
            title: 'Warehouse Complex',
            category: 'industrial',
            description: 'Large-scale storage facility with efficient structural and MEP systems',
            imageUrl: '/images/projects/warehouse-complex.jpg'
        }
    ],
    
    /**
     * Team members configuration
     */
    teamMembers: [
        {
            name: 'John Smith',
            position: 'Principal Architect',
            bio: 'With over 15 years of experience in architectural design and project management.',
            imageUrl: '/images/team/john-smith.jpg'
        },
        {
            name: 'Sarah Johnson',
            position: 'MEP Design Lead',
            bio: 'Specialized in innovative MEP solutions for complex building projects.',
            imageUrl: '/images/team/sarah-johnson.jpg'
        },
        {
            name: 'Michael Chen',
            position: 'Structural Engineer',
            bio: 'Expert in structural design with a focus on sustainable building practices.',
            imageUrl: '/images/team/michael-chen.jpg'
        },
        {
            name: 'Emma Roberts',
            position: 'HVAC Specialist',
            bio: 'Dedicated to creating efficient and sustainable HVAC systems for all project types.',
            imageUrl: '/images/team/emma-roberts.jpg'
        }
    ],
    
    /**
     * Testimonials configuration
     */
    testimonials: [
        {
            text: "Gridline delivered exceptional architectural and MEP design services for our new office building. Their integrated approach ensured all systems worked seamlessly together, and the final result exceeded our expectations.",
            author: "John Anderson",
            position: "CEO, Anderson Properties",
            rating: 5
        },
        {
            text: "Working with Gridline on our residential development was a pleasure. Their team provided comprehensive design solutions from architectural concepts to detailed MEP systems, ensuring a smooth and successful project.",
            author: "Sarah Williams",
            position: "Director, Williams Development",
            rating: 5
        },
        {
            text: "The Gridline team's expertise in both architectural and MEP design was invaluable for our industrial facility project. Their attention to detail and innovative solutions resulted in a highly efficient and functional space.",
            author: "Michael Roberts",
            position: "Operations Manager, Roberts Manufacturing",
            rating: 5
        }
    ],
    
    /**
     * Contact form configuration
     */
    contactForm: {
        fields: [
            { name: 'name', label: 'Your Name', type: 'text', required: true },
            { name: 'email', label: 'Your Email', type: 'email', required: true },
            { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
            { name: 'subject', label: 'Subject', type: 'text', required: true },
            { name: 'message', label: 'Your Message', type: 'textarea', required: true }
        ],
        successMessage: 'Thank you for your message! We will get back to you soon.',
        errorMessage: 'There was an error sending your message. Please try again.'
    },
    
    /**
     * Color scheme configuration
     */
    colors: {
        primary: '#2c3e50',
        primaryDark: '#1a2530',
        secondary: '#3498db',
        textDark: '#333333',
        textMedium: '#666666',
        textLight: '#999999',
        backgroundLight: '#f5f5f5',
        white: '#ffffff',
        black: '#000000'
    }
};