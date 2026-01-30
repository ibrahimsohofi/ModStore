document.addEventListener('DOMContentLoaded', function() {
    // Set up the package selector
    const packageSelector = document.getElementById('package-selector');
    if (packageSelector) {
        // Check if we have a saved preference
        const savedPackage = localStorage.getItem('selected_package');
        if (savedPackage) {
            packageSelector.value = savedPackage;
        }
    }

    // Initialize the price options
    initializePriceOptions();
});

// Function to show the price modal
function showPriceModal() {
    const packageSelector = document.getElementById('package-selector');
    const selectedPackage = packageSelector.value;

    // Mark the selected option as active
    selectOption(selectedPackage);

    // Show the modal
    document.getElementById('price-modal').style.display = 'flex';

    // Track this event
    if (typeof trackEvent === 'function') {
        trackEvent('engagement', 'price_modal_open', selectedPackage);
    }
}

// Function to close the modal
function closeModal() {
    document.getElementById('price-modal').style.display = 'none';

    // Reset the package selector to the saved value or default
    const packageSelector = document.getElementById('package-selector');
    const savedPackage = localStorage.getItem('selected_package') || 'basic';
    packageSelector.value = savedPackage;

    // Track this event
    if (typeof trackEvent === 'function') {
        trackEvent('engagement', 'price_modal_close');
    }
}

// Function to select a price option
function selectOption(option) {
    // Remove 'active' class from all options
    const options = document.querySelectorAll('.price-option');
    options.forEach(opt => opt.classList.remove('active'));

    // Add 'active' class to the selected option
    const selectedOption = document.getElementById(`${option}-option`);
    if (selectedOption) {
        selectedOption.classList.add('active');
    }

    // Track this event
    if (typeof trackEvent === 'function') {
        trackEvent('engagement', 'price_option_selected', option);
    }
}

// Function to continue with selected option
function continueWithOption() {
    // Get the selected option
    const activeOption = document.querySelector('.price-option.active');
    if (!activeOption) return;

    const selectedPackage = activeOption.id.replace('-option', '');

    // Save the selection
    localStorage.setItem('selected_package', selectedPackage);

    // Update the dropdown
    const packageSelector = document.getElementById('package-selector');
    packageSelector.value = selectedPackage;

    // Close the modal
    closeModal();

    // Adjust the content based on the package
    updateContentForPackage(selectedPackage);

    // If not the free option, show payment UI or initiate OGads with higher value offer
    if (selectedPackage !== 'basic') {
        handlePaidOption(selectedPackage);
    }

    // Track this event
    if (typeof trackEvent === 'function') {
        trackEvent('engagement', 'package_confirmed', selectedPackage);
    }
}

// Function to initialize price options
function initializePriceOptions() {
    // Get the saved package or default to 'basic'
    const savedPackage = localStorage.getItem('selected_package') || 'basic';

    // Update content based on the saved package
    updateContentForPackage(savedPackage);
}

// Function to update content based on package
function updateContentForPackage(packageType) {
    let modCount, title, description;

    switch (packageType) {
        case 'premium':
            modCount = '50+';
            title = 'Premium Minecraft Mods';
            description = 'Access to 50+ premium mods with advanced shaders';
            break;
        case 'ultimate':
            modCount = '100+';
            title = 'Ultimate Minecraft Mods';
            description = 'Full access to 100+ mods including exclusives';
            break;
        default: // basic
            modCount = '10';
            title = 'Essential Minecraft Mods';
            description = 'Access to 10 essential mods for basic gameplay enhancement';
    }

    // Update content on the page
    const viewMoreText = document.querySelector('.view-more p');
    if (viewMoreText) {
        viewMoreText.textContent = `+ ${parseInt(modCount) - 4} more mods included in the ${packageType} pack`;
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = `Download ${packageType} Minecraft mods. ${description}.`;
    }

    // Update title if needed
    document.title = `${title} Pack 2025 - Unlock Latest Mods`;
}

// Function to handle paid options (Premium or Ultimate)
function handlePaidOption(packageType) {
    // In a real implementation, this would handle payment processing
    // or adjust the OGads integration to use higher value offers

    // Update the content locker configuration for OGads
    let lockerValue;

    if (packageType === 'premium') {
        lockerValue = 'premium_offers';
    } else if (packageType === 'ultimate') {
        lockerValue = 'ultimate_offers';
    }

    // This is where we would update the OGads configuration
    // For the demo, we'll just log it
    console.log(`Updating OGads offer set to: ${lockerValue}`);

    // Example of how this would be implemented with OGads
    /*
    if (typeof Ogads !== 'undefined' && Ogads.Locker) {
        Ogads.Locker.updateConfig({
            offers: [lockerValue],
            // Other config options
        });
    }
    */
}
