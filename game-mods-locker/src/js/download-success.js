document.addEventListener('DOMContentLoaded', function() {
    // Initialize the download page based on the game and package
    initializeDownloadPage();

    // Set up the download progress simulation
    simulateDownloadProgress();

    // Track success page view if analytics is enabled
    if (typeof trackEvent === 'function') {
        trackEvent('success', 'view_success_page');
    }
});

/**
 * Initialize the download page based on the game and selected package
 */
function initializeDownloadPage() {
    // Detect which game the user was on previously
    const currentGame = detectPreviousGame();

    // Get the user's selected package
    const selectedPackage = localStorage.getItem('selected_package') || 'basic';

    // Update page content based on game and package
    updatePageContent(currentGame, selectedPackage);

    // Set up download button click handler
    setupDownloadButton(currentGame, selectedPackage);
}

/**
 * Detect which game the user was on previously using localStorage or referrer
 * @returns {string} The game identifier
 */
function detectPreviousGame() {
    // First check if we have a game stored in localStorage
    const storedGame = localStorage.getItem('current_game');
    if (storedGame) return storedGame;

    // If not, check the referrer URL
    const referrer = document.referrer;
    if (referrer.includes('fortnite')) {
        return 'fortnite';
    } else if (referrer.includes('roblox')) {
        return 'roblox';
    } else if (referrer.includes('gta5')) {
        return 'gta5';
    } else if (referrer.includes('among-us')) {
        return 'among-us';
    }

    // Default to minecraft
    return 'minecraft';
}

/**
 * Update the page content based on game and package
 * @param {string} game - The game identifier
 * @param {string} package - The selected package (basic, premium, ultimate)
 */
function updatePageContent(game, package) {
    // Game-specific configuration
    const gameConfig = {
        minecraft: {
            title: 'Minecraft Mods',
            fileSize: {
                basic: '45 MB',
                premium: '145 MB',
                ultimate: '380 MB'
            },
            modCount: {
                basic: 10,
                premium: 50,
                ultimate: 100
            }
        },
        fortnite: {
            title: 'Fortnite Mods',
            fileSize: {
                basic: '60 MB',
                premium: '180 MB',
                ultimate: '420 MB'
            },
            modCount: {
                basic: 10,
                premium: 50,
                ultimate: 100
            }
        },
        roblox: {
            title: 'Roblox Mods',
            fileSize: {
                basic: '40 MB',
                premium: '120 MB',
                ultimate: '350 MB'
            },
            modCount: {
                basic: 10,
                premium: 50,
                ultimate: 100
            }
        },
        gta5: {
            title: 'GTA 5 Mods',
            fileSize: {
                basic: '80 MB',
                premium: '250 MB',
                ultimate: '650 MB'
            },
            modCount: {
                basic: 10,
                premium: 50,
                ultimate: 100
            }
        },
        'among-us': {
            title: 'Among Us Mods',
            fileSize: {
                basic: '30 MB',
                premium: '90 MB',
                ultimate: '200 MB'
            },
            modCount: {
                basic: 10,
                premium: 50,
                ultimate: 100
            }
        }
    };

    // Get the appropriate configuration
    const config = gameConfig[game] || gameConfig.minecraft;

    // Update page title
    document.title = `Download Success - ${config.title} Pack`;

    // Update heading
    const pageTitle = document.querySelector('h1');
    if (pageTitle) {
        pageTitle.textContent = `Thank You for Unlocking ${config.title}!`;
    }

    // Update download button text and file size
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        const fileSize = config.fileSize[package] || config.fileSize.basic;
        downloadBtn.innerHTML = `<i class="fas fa-download"></i> Download ${package.charAt(0).toUpperCase() + package.slice(1)} Mod Pack (${fileSize})`;
    }

    // Update mod count in the description
    const downloadDescription = document.querySelector('.download-section p');
    if (downloadDescription) {
        const modCount = config.modCount[package] || config.modCount.basic;
        downloadDescription.textContent = `Preparing your download package (${modCount}+ mods included):`;
    }

    // Update installation instructions based on game
    updateInstallationInstructions(game);

    // Update mod list items based on game and package
    updateModList(game, package);

    // Update logos and images if needed
    updateImages(game);
}

/**
 * Update installation instructions based on the game
 * @param {string} game - The game identifier
 */
function updateInstallationInstructions(game) {
    const instructionsElement = document.getElementById('installation');
    if (!instructionsElement) return;

    const instructionsByGame = {
        minecraft: `
            <h3>Installation Instructions</h3>
            <ol>
                <li>Download and install <a href="https://files.minecraftforge.net/" target="_blank">Minecraft Forge</a> for version 1.16.5 through 1.20.1</li>
                <li>Extract the downloaded mod pack ZIP file</li>
                <li>Copy all mod files (.jar) to your Minecraft mods folder:
                    <ul>
                        <li>Windows: %appdata%\\.minecraft\\mods</li>
                        <li>Mac: ~/Library/Application Support/minecraft/mods</li>
                        <li>Linux: ~/.minecraft/mods</li>
                    </ul>
                </li>
                <li>Launch Minecraft with the Forge profile</li>
                <li>Enjoy your premium mods!</li>
            </ol>
        `,
        fortnite: `
            <h3>Installation Instructions</h3>
            <ol>
                <li>Close Fortnite if it's currently running</li>
                <li>Extract the downloaded mod pack ZIP file</li>
                <li>Run the "FortniteModInstaller.exe" file as administrator</li>
                <li>Select your Fortnite installation directory when prompted</li>
                <li>Click "Install Mods" and wait for the process to complete</li>
                <li>Start Fortnite and press F8 in-game to access the mod menu</li>
                <li>Enjoy your enhanced Fortnite experience!</li>
            </ol>
        `,
        roblox: `
            <h3>Installation Instructions</h3>
            <ol>
                <li>Close Roblox if it's currently running</li>
                <li>Extract the downloaded mod pack ZIP file</li>
                <li>Run the "RobloxModInstaller.exe" file as administrator</li>
                <li>Follow the on-screen instructions to complete the installation</li>
                <li>Start Roblox and press Insert key to open the mod menu</li>
                <li>Enjoy your enhanced Roblox experience!</li>
            </ol>
        `,
        gta5: `
            <h3>Installation Instructions</h3>
            <ol>
                <li>Close GTA V if it's currently running</li>
                <li>Extract the downloaded mod pack ZIP file</li>
                <li>Copy all files to your GTA V installation directory</li>
                <li>Install the included "GTAModLauncher.exe" application</li>
                <li>Start GTA V through the mod launcher</li>
                <li>Press F4 in-game to access the mod menu</li>
                <li>Enjoy your enhanced GTA V experience!</li>
            </ol>
        `,
        'among-us': `
            <h3>Installation Instructions</h3>
            <ol>
                <li>Close Among Us if it's currently running</li>
                <li>Extract the downloaded mod pack ZIP file</li>
                <li>Run the "AmongUsModInstaller.exe" file</li>
                <li>Select your Among Us installation directory when prompted</li>
                <li>Click "Install" and wait for the process to complete</li>
                <li>Start Among Us and press Tab in-game to access the mod menu</li>
                <li>Enjoy your enhanced Among Us experience!</li>
            </ol>
        `
    };

    // Get the appropriate instructions or default to minecraft
    const instructions = instructionsByGame[game] || instructionsByGame.minecraft;

    // Update the instructions content
    instructionsElement.innerHTML = instructions;
}

/**
 * Update the mod list based on the game and package
 * @param {string} game - The game identifier
 * @param {string} package - The selected package
 */
function updateModList(game, package) {
    const modListElement = document.querySelector('.mod-list');
    if (!modListElement) return;

    // Number of mods to show based on package
    const modCount = package === 'basic' ? 5 : package === 'premium' ? 8 : 10;

    // Game-specific mod lists
    const modsByGame = {
        minecraft: [
            "Shader Pack Pro - Ultra-realistic lighting effects and shadows",
            "Building Expansion - 500+ new building blocks and elements",
            "Adventure Plus - New dungeons, bosses, and quests",
            "Survival Enhancement - New mechanics and crafting recipes",
            "Biomes Expanded - 12 new biomes with unique blocks and mobs",
            "Craft Plus - 200+ new crafting recipes",
            "Modern Furniture - Decorative items for your builds",
            "Enhanced Animations - Improved character and mob animations",
            "Inventory Management - Quality of life improvements",
            "Weather Overhaul - Dynamic weather systems"
        ],
        fortnite: [
            "Pro Aimbot - Advanced targeting system with customizable settings",
            "Exclusive Skins - 100+ premium and rare skins",
            "V-Bucks Generator - Generate unlimited in-game currency",
            "Map Hack - Real-time opponent and item tracking",
            "No Recoil - Eliminate weapon recoil for perfect shots",
            "Speed Boost - Move faster than other players",
            "Wall Hack - See enemies through walls and structures",
            "Auto Build - Instant fortress construction with one click",
            "Damage Multiplier - Increase your weapon damage",
            "Teleport - Instantly move to any location on the map"
        ],
        roblox: [
            "Unlimited Robux - Generate in-game currency",
            "Admin Commands - Access administrator tools and powers",
            "Speed Hack - Move faster in any game",
            "Noclip - Walk through walls and objects",
            "Auto-Farm - Automatic resource collection",
            "Teleport - Move instantly to any location",
            "Script Executor - Run custom scripts in any game",
            "Anti-Ban - Protection from game moderators",
            "Character Customization - Exclusive avatar items",
            "Game GUI - Custom interface with all hacks"
        ],
        gta5: [
            "Unlimited Money - Generate endless cash",
            "Vehicle Spawner - Spawn any vehicle instantly",
            "Teleport - Fast travel anywhere on the map",
            "God Mode - Become invincible to all damage",
            "Weapon Arsenal - Access all weapons with unlimited ammo",
            "Police Evader - Automatically escape wanted levels",
            "Character Customization - Exclusive clothing options",
            "Mission Skipper - Complete any mission instantly",
            "Weather Controller - Change game weather at will",
            "Time Controller - Adjust game time as desired"
        ],
        'among-us': [
            "Impostor Hack - Always play as impostor",
            "See Impostors - Identify impostors through visual cues",
            "No Kill Cooldown - Eliminate players without waiting",
            "Speed Hack - Move faster around the map",
            "Wall Hack - See through walls and locate players",
            "Task Completer - Automatically complete tasks",
            "Vent as Crewmate - Use vents while playing as crewmate",
            "Anti-Vote - Cannot be ejected from meetings",
            "Sabotage Controller - Trigger or fix sabotages at will",
            "Custom Skins - Exclusive character customizations"
        ]
    };

    // Get the appropriate mod list or default to minecraft
    const mods = modsByGame[game] || modsByGame.minecraft;

    // Create the HTML for the mod list
    let modListHTML = `<h4>Included Mods (${package === 'basic' ? 10 : package === 'premium' ? 50 : 100}+)</h4>`;

    // Add the visible mods
    for (let i = 0; i < Math.min(modCount, mods.length); i++) {
        modListHTML += `<div class="mod-item">${mods[i]}</div>`;
    }

    // Add the "and many more" item if not showing all mods
    modListHTML += `<div class="mod-item">... and many more!</div>`;

    // Update the mod list content
    modListElement.innerHTML = modListHTML;
}

/**
 * Update images based on the current game
 * @param {string} game - The game identifier
 */
function updateImages(game) {
    // Update logo in header
    const headerLogo = document.querySelector('header .logo img');
    if (headerLogo) {
        headerLogo.src = `images/${game}-logo.png`;
        headerLogo.alt = `${game.charAt(0).toUpperCase() + game.slice(1)} Logo`;
    }

    // Update logo in footer
    const footerLogo = document.querySelector('.footer-logo img');
    if (footerLogo) {
        footerLogo.src = `images/${game}-logo.png`;
        footerLogo.alt = `${game.charAt(0).toUpperCase() + game.slice(1)} Logo`;
    }

    // Update other game-specific images if needed
}

/**
 * Set up the download button's click handler
 * @param {string} game - The game identifier
 * @param {string} package - The selected package
 */
function setupDownloadButton(game, package) {
    const downloadBtn = document.getElementById('download-btn');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // Track the download click if analytics is available
        if (typeof trackEvent === 'function') {
            trackEvent('success', 'download_button_click', `${game}_${package}`);
        }

        // In a real implementation, this would initiate an actual download
        // For demo purposes, show an alert
        alert(`In a real implementation, this would download the ${package} ${game} mod pack. For this template, we're just showing what would happen.`);
    });
}

/**
 * Simulate download progress for visual feedback
 */
function simulateDownloadProgress() {
    const progressFill = document.getElementById('progress-fill');
    const downloadBtn = document.getElementById('download-btn');
    const preparingText = document.getElementById('preparing-text');

    if (!progressFill || !downloadBtn || !preparingText) return;

    let width = 0;
    const interval = setInterval(function() {
        if (width >= 100) {
            clearInterval(interval);
            downloadBtn.style.display = 'inline-block';
            preparingText.style.display = 'none';

            // Track download ready event if analytics is available
            if (typeof trackEvent === 'function') {
                trackEvent('success', 'download_ready');
            }
        } else {
            width++;
            progressFill.style.width = width + '%';
            progressFill.textContent = width + '%';
        }
    }, 30);
}
