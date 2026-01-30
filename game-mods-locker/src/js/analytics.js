document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already made a choice about analytics
    if (localStorage.getItem('analytics_accepted') === null) {
        // Show the analytics notice
        document.getElementById('analytics-notice').style.display = 'block';
    }

    // Set up event tracking for important actions
    setupEventTracking();
});

// Function to accept analytics
function acceptAnalytics() {
    localStorage.setItem('analytics_accepted', 'true');
    document.getElementById('analytics-notice').style.display = 'none';

    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');

    // Track that user accepted analytics
    trackEvent('consent', 'analytics_accepted');
}

// Function to track events if analytics is enabled
function trackEvent(category, action, label = null, value = null) {
    // Only track if user has accepted analytics
    if (localStorage.getItem('analytics_accepted') === 'true') {
        if (window.gtag) {
            gtag('event', action, {
                'event_category': category,
                'event_label': label,
                'value': value
            });
        }

        // Log the event for debugging (remove in production)
        console.log(`Event tracked: ${category} - ${action} - ${label} - ${value}`);
    }
}

// Set up event tracking for key user interactions
function setupEventTracking() {
    // Track button clicks
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonId = this.id || 'unnamed_button';
            trackEvent('engagement', 'download_button_click', buttonId);
        });
    });

    // Track package selection
    const packageSelector = document.getElementById('package-selector');
    if (packageSelector) {
        packageSelector.addEventListener('change', function() {
            trackEvent('engagement', 'package_selected', this.value);
        });
    }

    // Track scroll depth
    let scrollDepthTracked = {
        '25': false,
        '50': false,
        '75': false,
        '100': false
    };

    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrolledPercentage = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);

        if (scrolledPercentage >= 25 && !scrollDepthTracked['25']) {
            trackEvent('engagement', 'scroll_depth', '25%');
            scrollDepthTracked['25'] = true;
        }

        if (scrolledPercentage >= 50 && !scrollDepthTracked['50']) {
            trackEvent('engagement', 'scroll_depth', '50%');
            scrollDepthTracked['50'] = true;
        }

        if (scrolledPercentage >= 75 && !scrollDepthTracked['75']) {
            trackEvent('engagement', 'scroll_depth', '75%');
            scrollDepthTracked['75'] = true;
        }

        if (scrolledPercentage >= 99 && !scrollDepthTracked['100']) {
            trackEvent('engagement', 'scroll_depth', '100%');
            scrollDepthTracked['100'] = true;
        }
    });

    // Track time spent on page
    let timeInSeconds = 0;
    let timeInterval = setInterval(function() {
        timeInSeconds += 30;

        if (timeInSeconds === 30) {
            trackEvent('engagement', 'time_spent', '30 seconds');
        } else if (timeInSeconds === 60) {
            trackEvent('engagement', 'time_spent', '1 minute');
        } else if (timeInSeconds === 180) {
            trackEvent('engagement', 'time_spent', '3 minutes');
        } else if (timeInSeconds === 300) {
            trackEvent('engagement', 'time_spent', '5 minutes');
            clearInterval(timeInterval); // Stop tracking after 5 minutes
        }
    }, 30000); // Check every 30 seconds

    // Track outbound links
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        if (link.hostname !== window.location.hostname && !link.classList.contains('social-link')) {
            link.addEventListener('click', function(e) {
                trackEvent('navigation', 'outbound_link_click', this.href);
            });
        }
    });
}

// Function to track conversion after offer completion
function trackConversion(offerName, value = 0) {
    trackEvent('conversion', 'offer_completed', offerName, value);

    // For advanced tracking with OGads, we might want to pass the conversion
    // information back to their system
    if (typeof window.OgadsTracker !== 'undefined') {
        window.OgadsTracker.trackConversion(offerName);
    }
}
