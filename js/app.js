/**
 * app.js - Application entry point for bundling
 * Imports all required modules and initializes the application
 * 
 * This file is used when using a bundler like Webpack, Rollup, or Parcel
 * For direct script inclusion, use the individual files instead
 */

// Import styles
import './styles/gridline-styles.css';

// Import utility modules
import './js/utils.js';
import './js/grid-config.js';

// Import core modules
import './js/navigation.js';
import './js/page-transitions.js';
import './js/sliders.js';
import './js/accordion.js';
import './js/forms.js';
import './js/animations.js';
import './js/alpine-components.js';

// Import main entry point
import './js/index.js';

/**
 * Initialize application when the DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Gridline application initialized');
});