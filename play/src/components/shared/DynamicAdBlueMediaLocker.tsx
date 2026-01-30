import { useState, useEffect, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Unlock, X, AlertCircle, Loader2 } from "lucide-react";
import { getAdBlueMediaConfig, getDownloadUrl, type AdBlueMediaConfig } from "@/data/lockerConfig";

// Extend window to include dynamic AdBlueMedia functions
declare global {
  interface Window {
    [key: string]: unknown; // Allow dynamic function names like _iH, _VR, etc.
  }
}

type DynamicAdBlueMediaLockerProps = {
  isOpen: boolean;
  onClose: (adBlockerActive?: boolean) => void;
  title: string;
  description: string;
  gameId: string;
};

export function DynamicAdBlueMediaLocker({
  isOpen,
  onClose,
  title,
  description,
  gameId,
}: DynamicAdBlueMediaLockerProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [scriptsLoaded, setScriptsLoaded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const configRef = useRef<AdBlueMediaConfig | null>(null);

  // Maximum retry attempts
  const MAX_RETRIES = 3;

  // Check if content is already unlocked
  const contentUnlocked = localStorage.getItem(`unlocked_${gameId}`) === 'true';

  // Ad blocker detection wrapped in useCallback
  const checkAdBlocker = useCallback((): boolean => {
    try {
      const testDiv = document.createElement('div');
      testDiv.className = 'ad-unit adsbox ad-placement';
      testDiv.innerHTML = '&nbsp;';
      testDiv.style.position = 'absolute';
      testDiv.style.left = '-999px';
      document.body.appendChild(testDiv);

      const baitElement = document.createElement('div');
      baitElement.setAttribute('id', 'ad-banner-test');
      baitElement.style.height = '10px';
      baitElement.style.width = '100%';
      document.body.appendChild(baitElement);

      const isBlocking = testDiv.offsetHeight === 0 ||
                         testDiv.offsetParent === null ||
                         baitElement.offsetHeight === 0 ||
                         baitElement.offsetParent === null;

      document.body.removeChild(testDiv);
      document.body.removeChild(baitElement);

      return isBlocking;
    } catch (error) {
      console.error('Error during ad blocker detection:', error);
      return false;
    }
  }, []);

  // Function to load AdBlueMedia scripts dynamically, wrapped in useCallback
  const loadAdBlueMediaScripts = useCallback((config: AdBlueMediaConfig): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (window[config.functionName] && typeof window[config.functionName] === 'function') {
        console.log(`AdBlueMedia function ${config.functionName} already loaded`);
        resolve();
        return;
      }

      // Remove any existing scripts for this game first
      cleanupScripts();

      // Create the configuration variable
      const configScript = document.createElement('script');
      configScript.type = 'text/javascript';
      configScript.innerHTML = `var ${config.variable}={"it":${config.it},"key":"${config.key}"};`;
      configScript.setAttribute('data-game-id', gameId);
      document.head.appendChild(configScript);

      // Load the main script
      const mainScript = document.createElement('script');
      mainScript.src = config.scriptSrc;
      mainScript.setAttribute('data-game-id', gameId);

      mainScript.onload = () => {
        console.log(`AdBlueMedia script loaded for ${gameId}: ${config.functionName}`);
        // Give the script a moment to initialize
        setTimeout(() => {
          if (window[config.functionName] && typeof window[config.functionName] === 'function') {
            resolve();
          } else {
            reject(new Error(`Function ${config.functionName} not available after script load`));
          }
        }, 500);
      };

      mainScript.onerror = () => {
        reject(new Error(`Failed to load AdBlueMedia script: ${config.scriptSrc}`));
      };

      document.head.appendChild(mainScript);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  // Function to cleanup scripts
  const cleanupScripts = () => {
    // Remove scripts for this specific game
    const scripts = document.querySelectorAll(`script[data-game-id="${gameId}"]`);
    for (const script of scripts) {
      script.remove();
    }
  };

  // If content is already unlocked, redirect directly
  useEffect(() => {
    if (isOpen && contentUnlocked) {
      onClose();
      const downloadUrl = getDownloadUrl(gameId);
      if (downloadUrl) {
        window.location.href = downloadUrl;
      }
    }
  }, [isOpen, contentUnlocked, gameId, onClose]);

  // Initialize locker when dialog opens
  useEffect(() => {
    if (!isOpen || contentUnlocked) {
      return;
    }

    // Reset states
    setIsLoading(true);
    setLoadError(null);
    setRetryCount(0);
    setScriptsLoaded(false);

    // Get configuration for this game
    const config = getAdBlueMediaConfig(gameId);
    configRef.current = config;

    console.log(`Loading AdBlueMedia config for ${gameId}:`, config);

    // Check for ad blocker
    const isBlocking = checkAdBlocker();
    if (isBlocking) {
      setLoadError(
        'Ad blocker detected. To access this content, please:\n' +
        '1. Disable your ad blocker for this site\n' +
        '2. Refresh the page\n' +
        '3. Try again\n\n' +
        'Need help? Check our FAQ for detailed instructions on disabling common ad blockers.'
      );
      setIsLoading(false);
      return;
    }

    // Load the AdBlueMedia scripts for this game
    loadAdBlueMediaScripts(config)
      .then(() => {
        setScriptsLoaded(true);
        setIsLoading(false);
        console.log(`Scripts loaded successfully for ${gameId}`);
      })
      .catch((error) => {
        console.error(`Failed to load scripts for ${gameId}:`, error);
        setLoadError(`Failed to load offer system: ${error.message}`);
        setIsLoading(false);
      });

    // Set timeout for loading
    timerRef.current = window.setTimeout(() => {
      if (isLoading) {
        setLoadError('Loading timeout. Please try again.');
        setIsLoading(false);
      }
    }, 10000);

    // Cleanup function
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isOpen, contentUnlocked, gameId, isLoading, checkAdBlocker, loadAdBlueMediaScripts]);

  // Function to open the locker
  const openLocker = () => {
    if (!configRef.current) {
      setLoadError('Configuration not loaded');
      return;
    }

    const config = configRef.current;
    const lockerFunction = window[config.functionName];

    if (typeof lockerFunction === 'function') {
      try {
        console.log(`Opening locker with function: ${config.functionName}`);
        lockerFunction();

        // Set up completion detection
        setupCompletionDetection();
      } catch (error) {
        console.error(`Error calling ${config.functionName}:`, error);
        setLoadError(`Failed to open locker: ${error}`);
      }
    } else {
      setLoadError(`Locker function ${config.functionName} not available`);
    }
  };

  // Set up completion detection
  const setupCompletionDetection = () => {
    const handleCompletion = () => {
      console.log('AdBlueMedia offer completed for game:', gameId);
      localStorage.setItem(`unlocked_${gameId}`, 'true');

      const downloadUrl = getDownloadUrl(gameId);
      if (downloadUrl) {
        window.location.href = downloadUrl;
      } else {
        console.error('No download URL found for game:', gameId);
        setLoadError('Download URL not configured for this game.');
      }
    };

    // Listen for completion messages
    const messageHandler = (event: MessageEvent) => {
      if (event.data && event.data.type === 'adblue_completion') {
        handleCompletion();
      }
    };

    window.addEventListener('message', messageHandler);

    // Cleanup after 30 minutes
    setTimeout(() => {
      window.removeEventListener('message', messageHandler);
    }, 30 * 60 * 1000);
  };

  // Handle manual retry
  const handleRetry = () => {
    if (retryCount >= MAX_RETRIES) {
      setLoadError('Maximum retry attempts reached. Please refresh the page and try again.');
      return;
    }

    setIsLoading(true);
    setLoadError(null);
    setScriptsLoaded(false);
    setRetryCount(prev => prev + 1);

    if (configRef.current && !checkAdBlocker()) {
      loadAdBlueMediaScripts(configRef.current)
        .then(() => {
          setScriptsLoaded(true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error during retry:', error);
          setLoadError(`Retry failed: ${error.message}`);
          setIsLoading(false);
        });
    } else {
      setLoadError('Please disable your ad blocker and refresh the page.');
      setIsLoading(false);
    }
  };

  // Handle dialog close
  const handleClose = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Clean up scripts when closing
    cleanupScripts();

    const isAdBlockerActive = checkAdBlocker();
    onClose(isAdBlockerActive);
  };

  if (contentUnlocked) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] md:w-[80vw] lg:w-[70vw] max-w-[600px] mx-auto my-[10px] flex flex-col p-6 rounded-xl">
        <div className="sr-only">
          <DialogTitle>{title}</DialogTitle>
        </div>

        <div className="flex-1 w-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <Unlock className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center h-full p-6 min-h-[200px]">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground text-center">Loading offer system...</p>
                <p className="text-xs text-muted-foreground/70 text-center max-w-md">
                  Setting up the offer for this specific game. This may take a moment.
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {loadError && (
            <div className="flex flex-col items-center justify-center h-full p-6 min-h-[200px]">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <h3 className="text-xl font-bold mb-2">We've Detected an Issue</h3>
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4 max-w-md">
                <p className="text-center whitespace-pre-line text-sm">
                  {loadError}
                </p>
              </div>

              {loadError.includes('Ad blocker') && (
                <div className="flex flex-col gap-3 w-full max-w-md">
                  <Button
                    variant="outline"
                    onClick={() => window.open('/faq#disable-adblocker', '_blank')}
                    className="w-full"
                  >
                    View Ad Blocker Disable Guide
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleRetry}
                    className="w-full"
                  >
                    I've Disabled My Ad Blocker
                  </Button>
                </div>
              )}

              {!loadError.includes('Ad blocker') && retryCount < MAX_RETRIES && (
                <Button
                  variant="default"
                  onClick={handleRetry}
                  className="mt-4"
                >
                  Retry ({MAX_RETRIES - retryCount} attempts left)
                </Button>
              )}

              <Button
                variant="ghost"
                onClick={handleClose}
                className="mt-4 text-muted-foreground"
              >
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </div>
          )}

          {/* Ready State - Scripts Loaded */}
          {!isLoading && !loadError && scriptsLoaded && (
            <div className="flex flex-col items-center justify-center h-full p-6 min-h-[200px]">
              <div className="text-center mb-6">
                <div className="mb-4">
                  <Unlock className="h-16 w-16 text-primary mx-auto" />
                </div>
                <h3 className="text-xl font-bold mb-2">Ready to Unlock</h3>
                <p className="text-muted-foreground mb-4">
                  Click the button below to open the offer and unlock this game.
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Complete the offer in the new window to get access to the download.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full max-w-md">
                <Button
                  variant="default"
                  onClick={openLocker}
                  className="w-full text-lg py-6"
                >
                  <Unlock className="h-5 w-5 mr-2" />
                  Open Offer
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleClose}
                  className="w-full text-muted-foreground"
                >
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
              </div>
            </div>
          )}

          {/* Container for locker (if needed) */}
          <div
            ref={containerRef}
            id="adblue-locker-container"
            className="w-full hidden"
          >
            {/* This container is hidden since we're using dynamic functions */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
