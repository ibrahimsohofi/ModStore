document.addEventListener('DOMContentLoaded', function() {
<<<<<<< HEAD
    // Initialize the OGads configuration based on current game and package
    initializeOgadsConfig();

    // Set up event tracking for important actions if analytics.js is loaded
    if (typeof setupEventTracking === 'function') {
        setupEventTracking();
=======
    // Example of how OGads integration would work
    // Replace this with your actual OGads code when you have your account
    setupContentLocker();

    // Animated counter for download count
    function animateCounter() {
        const counter = document.getElementById('download-count');
        if (!counter) return;

        const target = parseInt(counter.innerText.replace(/,/g, ''));
        let count = 0;
        const duration = 2000; // 2 seconds
        const frameRate = 60;
        const increment = target / (duration / 1000 * frameRate);

        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                clearInterval(timer);
                count = target;
            }
            counter.innerText = Math.floor(count).toLocaleString();
        }, 1000 / frameRate);
    }

    // Run counter animation when in viewport
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        const downloadCount = document.getElementById('download-count');
        if (downloadCount) {
            observer.observe(downloadCount);
        }
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        setTimeout(animateCounter, 500);
>>>>>>> origin/main
    }
});

/**
<<<<<<< HEAD
 * Initialize OGads configuration based on current page and saved preferences
 */
function initializeOgadsConfig() {
    // Detect current game based on page URL or HTML class
    const currentGame = detectCurrentGame();

    // Get saved package preference or default to 'basic'
    const selectedPackage = localStorage.getItem('selected_package') || 'basic';

    // Configure OGads based on game and package
    configureOgads(currentGame, selectedPackage);

    // Set up content locker buttons
    setupContentLocker();
}

/**
 * Detect which game page we're currently on
 * @returns {string} The current game identifier
 */
function detectCurrentGame() {
    const path = window.location.pathname;

    if (path.includes('fortnite')) {
        return 'fortnite';
    } else if (path.includes('roblox')) {
        return 'roblox';
    } else if (path.includes('gta5')) {
        return 'gta5';
    } else if (path.includes('among-us')) {
        return 'among-us';
    } else {
        // Default to minecraft
        return 'minecraft';
    }
}

/**
 * Configure OGads based on the current game and package selection
 * @param {string} game - The current game identifier
 * @param {string} package - The selected package (basic, premium, ultimate)
 */
function configureOgads(game, package) {
    // Game-specific offer configurations
    const gameOffers = {
        minecraft: {
            basic: 'minecraft_basic_offers',
            premium: 'minecraft_premium_offers',
            ultimate: 'minecraft_ultimate_offers'
        },
        fortnite: {
            basic: 'fortnite_basic_offers',
            premium: 'fortnite_premium_offers',
            ultimate: 'fortnite_ultimate_offers'
        },
        roblox: {
            basic: 'roblox_basic_offers',
            premium: 'roblox_premium_offers',
            ultimate: 'roblox_ultimate_offers'
        },
        gta5: {
            basic: 'gta5_basic_offers',
            premium: 'gta5_premium_offers',
            ultimate: 'gta5_ultimate_offers'
        },
        'among-us': {
            basic: 'amongus_basic_offers',
            premium: 'amongus_premium_offers',
            ultimate: 'amongus_ultimate_offers'
        }
    };

    // Get the appropriate offer set
    const offerSet = gameOffers[game]?.[package] || 'recommended';

    // Store the current configuration in window object for reference
    window.ogadsConfig = {
        game: game,
        package: package,
        offerSet: offerSet,
        lockerKey: 'YOUR_OGADS_KEY_HERE' // In production, you might have different keys per game
    };

    // Log the configuration (remove in production)
    console.log(`OGads configured for ${game} with ${package} package using offer set: ${offerSet}`);

    // In a real implementation, this would initialize the OGads library
    // loadOgadsScript();
}

/**
 * Load the OGads script dynamically
 */
function loadOgadsScript() {
    // In a real implementation, this would load the OGads script dynamically
    // const script = document.createElement('script');
    // script.src = 'https://ogads.com/api/locker.js';
    // document.head.appendChild(script);

    // For demo purposes, we're just logging
    console.log('OGads script would be loaded here in production');
}

/**
 * Set up content locker buttons
 */
function setupContentLocker() {
    const downloadButtons = document.querySelectorAll('.download-btn');

    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track the click if analytics is available
            if (typeof trackEvent === 'function') {
                trackEvent('engagement', 'download_button_click', button.id || 'unnamed_button');
            }

            // Show simulated OGads locker
            showSimulatedContentLocker();
        });
    });
}

/**
 * Simulate the OGads content locker for demonstration purposes
 */
function showSimulatedContentLocker() {
    // In a real implementation, this would call OGads.Locker.show()
    const config = window.ogadsConfig || {};

    alert(`This is where your OGads content locker would appear.

Game: ${config.game || 'unknown'}
Package: ${config.package || 'basic'}
Offer Set: ${config.offerSet || 'recommended'}

In a real implementation, this would be replaced with actual OGads integration.`);

    // For demo purposes, simulate successful completion after a short delay
    simulateOfferCompletion();
}

/**
 * Simulate successful offer completion (for demo only)
 */
function simulateOfferCompletion() {
    console.log('Simulating offer completion...');

    // Simulate an API call delay
    setTimeout(() => {
        console.log('Offer completed successfully');

        // Track conversion if analytics is available
        if (typeof trackConversion === 'function') {
            const config = window.ogadsConfig || {};
            trackConversion(`${config.game}_${config.package}_offer`, config.package === 'basic' ? 0 : (config.package === 'premium' ? 4.99 : 9.99));
        }

        // Redirect to the download success page
        window.location.href = "download-success.html";
    }, 1500);
}

// Animated counter for download count
function animateCounter() {
    const counter = document.getElementById('download-count');
    if (!counter) return;

    const target = parseInt(counter.innerText.replace(/,/g, ''));
    let count = 0;
    const duration = 2000; // 2 seconds
    const frameRate = 60;
    const increment = target / (duration / 1000 * frameRate);

    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            clearInterval(timer);
            count = target;
        }
        counter.innerText = Math.floor(count).toLocaleString();
    }, 1000 / frameRate);
}

// Run counter animation when in viewport
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observer.unobserve(entry.target);
=======
 * OGads Content Locker Integration
 * This function sets up the content locker with OGads
 * Replace the placeholders with your actual OGads account details
 */
function setupContentLocker() {
    // Get the selected package or default to 'basic'
    const savedPackage = localStorage.getItem('selected_package') || 'basic';

    // Configure OGads options based on package
    let offerSet;
    switch (savedPackage) {
        case 'premium':
            offerSet = 'premium_offers';
            break;
        case 'ultimate':
            offerSet = 'ultimate_offers';
            break;
        default:
            offerSet = 'recommended';
    }

    // Set up OGads configuration
    window.ogadsOptions = {
        offers: [offerSet],
        key: 'YOUR_OGADS_KEY',  // Replace with your actual OGads key
        theme: 'custom',        // You can create custom themes in OGads dashboard
        type: 'modal',          // 'modal', 'embed', or 'corner'
        game: getCurrentGame(), // Determine which game page we're on
        onShow: function() {
            if (typeof trackEvent === 'function') {
                trackEvent('engagement', 'locker_displayed', getCurrentGame());
            }
        }
    };

    // Add the OGads script dynamically
    const script = document.createElement('script');
    script.src = 'https://ogads.com/api/locker.js';
    document.head.appendChild(script);

    // Set up click handlers for all download buttons
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            // For development testing (remove in production)
            if (isDevelopmentMode()) {
                // In development, simulate completion after 2 seconds
                alert('Development Mode: This is where your OGads content locker would appear. In production, this will be replaced with the actual OGads locker.');
                console.log('Development mode: Simulating offer completion...');
                setTimeout(function() {
                    handleOfferCompletion();
                }, 2000);
                return;
            }

            // In production, show the OGads locker
            if (typeof Ogads !== 'undefined' && Ogads.Locker) {
                Ogads.Locker.show();
            } else {
                console.error('OGads not loaded correctly. Check your implementation.');
                alert('Error loading content locker. Please try again later or contact support.');
>>>>>>> origin/main
            }
        });
    });

<<<<<<< HEAD
    const downloadCount = document.getElementById('download-count');
    if (downloadCount) {
        observer.observe(downloadCount);
    }
} else {
    // Fallback for browsers that don't support IntersectionObserver
    setTimeout(animateCounter, 500);
=======
    // Set up OGads completion handler
    if (script.onload) {
        script.onload = function() {
            if (typeof Ogads !== 'undefined' && Ogads.Locker) {
                Ogads.Locker.onComplete(handleOfferCompletion);
            }
        };
    } else {
        // For browsers that don't support script.onload
        // Wait for OGads to be available
        const checkInterval = setInterval(function() {
            if (typeof Ogads !== 'undefined' && Ogads.Locker) {
                clearInterval(checkInterval);
                Ogads.Locker.onComplete(handleOfferCompletion);
            }
        }, 100);

        // Timeout after 10 seconds to prevent infinite checking
        setTimeout(function() {
            clearInterval(checkInterval);
        }, 10000);
    }
}

/**
 * Handle offer completion by redirecting to success page
 * This function is called when a user successfully completes an offer
 */
function handleOfferCompletion() {
    // Track the conversion
    if (typeof trackConversion === 'function') {
        // Get the selected package price for value
        let value = 0;
        const savedPackage = localStorage.getItem('selected_package') || 'basic';
        if (savedPackage === 'premium') value = 6.99;
        if (savedPackage === 'ultimate') value = 12.99;

        trackConversion(savedPackage, value);
    }

    // Get the current game to construct correct success URL
    const game = getCurrentGame();
    const successPage = game === 'minecraft' ? 'download-success.html' : `${game}-download-success.html`;

    // Redirect to success page
    window.location.href = successPage;
}

/**
 * Determine which game page we're on based on URL or HTML content
 * @returns {string} The current game ('minecraft', 'fortnite', etc.)
 */
function getCurrentGame() {
    const url = window.location.pathname;

    if (url.includes('fortnite')) return 'fortnite';
    if (url.includes('roblox')) return 'roblox';
    if (url.includes('gta5')) return 'gta5';
    if (url.includes('among-us')) return 'among-us';

    // If no specific game found in URL, try checking the page content
    const title = document.title.toLowerCase();
    if (title.includes('fortnite')) return 'fortnite';
    if (title.includes('roblox')) return 'roblox';
    if (title.includes('gta')) return 'gta5';
    if (title.includes('among us')) return 'among-us';

    // Default to minecraft if can't determine
    return 'minecraft';
}

/**
 * Check if we're in development mode
 * @returns {boolean} True if in development mode
 */
function isDevelopmentMode() {
    // Check if we're in development mode
    return (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.includes('192.168.') ||
        window.location.hostname.includes('.local')
    );
>>>>>>> origin/main
}
