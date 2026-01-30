import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAppById } from '../data/apps';
import { FiDownload, FiArrowLeft, FiExternalLink, FiCheckCircle, FiAlertTriangle, FiLock } from 'react-icons/fi';

// Content locker state
enum LockStatus {
  LOCKED = 'locked',
  VERIFYING = 'verifying',
  UNLOCKED = 'unlocked',
  DOWNLOAD_READY = 'download_ready'
}

const DownloadPage = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const [lockStatus, setLockStatus] = useState<LockStatus>(LockStatus.LOCKED);
  const [showLockerPopup, setShowLockerPopup] = useState(false);
  const [progress, setProgress] = useState(0);

  // Get app details from the data
  const app = appId ? getAppById(appId) : undefined;

  // If app not found, redirect to 404
  useEffect(() => {
    if (!app) {
      navigate('/404');
    }
  }, [app, navigate]);

  // Progress animation for the verification process
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (lockStatus === LockStatus.VERIFYING) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Move to the next state after verification is complete
            setLockStatus(LockStatus.UNLOCKED);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
    }

    return () => clearInterval(interval);
  }, [lockStatus]);

  if (!app) {
    return null; // Will redirect due to the useEffect
  }

  // Handle content locker activation
  const activateLocker = () => {
    setShowLockerPopup(true);
  };

  // This function would be replaced with the actual locker code integration
  const startVerification = () => {
    setLockStatus(LockStatus.VERIFYING);
    setProgress(0);

    // In a real implementation, this is where you would trigger the locker
    // For the prototype, we're just simulating the process
  };

  // This function simulates the completion of the locker verification
  const completeVerification = () => {
    setLockStatus(LockStatus.DOWNLOAD_READY);
    setShowLockerPopup(false);
  };

  return (
    <div className="min-h-screen bg-dark-500 flex flex-col">
      {/* Header */}
      <div className="bg-dark-600 py-4">
        <div className="container mx-auto px-4">
          <Link to={`/app/${app.id}`} className="inline-flex items-center text-gray-400 hover:text-primary-400 transition-colors">
            <FiArrowLeft className="mr-2" /> Back to App Details
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-dark-600 rounded-xl overflow-hidden shadow-lg">
            {/* App Info */}
            <div className="p-6 bg-gradient-to-r from-dark-500 to-dark-600">
              <div className="flex items-center mb-4">
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-16 h-16 rounded-xl object-cover mr-4"
                />
                <div>
                  <h1 className="text-xl font-display font-bold text-white">
                    {app.name}
                  </h1>
                  <p className="text-gray-400">
                    Version {app.version} • {app.size}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="bg-dark-500 px-3 py-1 rounded-full text-gray-300">
                  {app.category}
                </div>
                <div className="bg-dark-500 px-3 py-1 rounded-full text-gray-300">
                  APK File
                </div>
              </div>
            </div>

            {/* Download Section */}
            <div className="p-6">
              {lockStatus === LockStatus.LOCKED && (
                <>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center mb-4 bg-dark-400 p-4 rounded-full text-primary-400 text-3xl">
                      <FiLock />
                    </div>
                    <h2 className="text-xl font-display font-bold text-white mb-2">
                      Content Locked
                    </h2>
                    <p className="text-gray-300 mb-4">
                      Complete a short verification to unlock the download for {app.name}.
                    </p>
                  </div>

                  <button
                    onClick={activateLocker}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium py-3 px-8 rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all flex items-center justify-center"
                  >
                    <FiLock className="mr-2" /> Unlock Download
                  </button>

                  <div className="mt-6 text-gray-400 text-sm flex items-start">
                    <FiAlertTriangle className="mr-2 mt-0.5 flex-shrink-0" />
                    <p>
                      To prevent abuse and ensure fair distribution, we require a quick human verification.
                      This helps us maintain our servers and provide more modded apps.
                    </p>
                  </div>
                </>
              )}

              {lockStatus === LockStatus.UNLOCKED && (
                <>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center mb-4 bg-green-500/20 p-4 rounded-full text-green-400 text-3xl">
                      <FiCheckCircle />
                    </div>
                    <h2 className="text-xl font-display font-bold text-white mb-2">
                      Verification Complete!
                    </h2>
                    <p className="text-gray-300 mb-4">
                      Thank you for completing the verification. Your download is ready.
                    </p>
                  </div>

                  <button
                    onClick={completeVerification}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-medium py-3 px-8 rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center"
                  >
                    <FiDownload className="mr-2" /> Download {app.name} ({app.size})
                  </button>
                </>
              )}

              {lockStatus === LockStatus.DOWNLOAD_READY && (
                <>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center mb-4 bg-green-500/20 p-4 rounded-full text-green-400 text-3xl">
                      <FiDownload />
                    </div>
                    <h2 className="text-xl font-display font-bold text-white mb-2">
                      Download Ready
                    </h2>
                    <p className="text-gray-300 mb-4">
                      Your download link has been generated. Click the button below to download the APK file.
                    </p>
                  </div>

                  <a
                    href="#download-link"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-medium py-3 px-8 rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center mb-4"
                  >
                    <FiDownload className="mr-2" /> Download {app.name} APK
                  </a>

                  <div className="bg-dark-500 p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-2">Installation Instructions</h3>
                    <ol className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block bg-dark-400 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                        Download the APK file to your device.
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block bg-dark-400 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                        Open the APK file to start installation.
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block bg-dark-400 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                        If prompted, enable "Install from unknown sources" in your settings.
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block bg-dark-400 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                        Follow the on-screen instructions to complete installation.
                      </li>
                    </ol>
                  </div>
                </>
              )}
            </div>

            {/* Feature Highlights */}
            <div className="p-6 border-t border-dark-500">
              <h3 className="text-white font-medium mb-3">Premium Features Unlocked</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {app.features.slice(0, 6).map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-primary-500 mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mt-8 text-center text-gray-400 text-sm">
            <p>
              ModStore is not affiliated with the original developers of this application.
              We provide modified versions for educational purposes only.
            </p>
            <p className="mt-2">
              If you enjoy the app, please consider supporting the original developers.
            </p>
          </div>
        </div>
      </div>

      {/* Content Locker Modal */}
      {showLockerPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-600 rounded-xl max-w-md w-full overflow-hidden relative">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setShowLockerPopup(false)}
            >
              &times;
            </button>

            {/* Locker content */}
            <div className="p-6">
              <h2 className="text-xl font-display font-bold text-white mb-4 text-center">
                Verify to Continue
              </h2>

              {lockStatus === LockStatus.LOCKED && (
                <>
                  <p className="text-gray-300 mb-6 text-center">
                    Select one of the offers below and complete it to verify you're human.
                    This helps us prevent spam and abuse.
                  </p>

                  {/* Mock offers */}
                  <div className="space-y-4 mb-6">
                    <div className="border border-dark-400 rounded-lg p-4 hover:bg-dark-500 cursor-pointer transition-colors">
                      <div className="flex items-center">
                        <div className="bg-blue-500/20 p-2 rounded mr-3">
                          <FiExternalLink className="text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">Complete a Quick Survey</h3>
                          <p className="text-gray-400 text-sm">Answer a few questions - takes 30 seconds</p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-dark-400 rounded-lg p-4 hover:bg-dark-500 cursor-pointer transition-colors">
                      <div className="flex items-center">
                        <div className="bg-green-500/20 p-2 rounded mr-3">
                          <FiExternalLink className="text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">Install and Run an App</h3>
                          <p className="text-gray-400 text-sm">Install, open, and use for 30 seconds</p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-dark-400 rounded-lg p-4 hover:bg-dark-500 cursor-pointer transition-colors">
                      <div className="flex items-center">
                        <div className="bg-purple-500/20 p-2 rounded mr-3">
                          <FiExternalLink className="text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">Enter Email Address</h3>
                          <p className="text-gray-400 text-sm">Verify with a valid email address</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={startVerification}
                    className="w-full bg-primary-500 text-white font-medium py-2 px-4 rounded hover:bg-primary-600 transition-colors"
                  >
                    Continue to Verification
                  </button>
                </>
              )}

              {lockStatus === LockStatus.VERIFYING && (
                <div className="text-center py-4">
                  <h3 className="text-white font-medium mb-4">Verifying your completion...</h3>

                  {/* Progress bar */}
                  <div className="w-full bg-dark-400 rounded-full h-4 mb-6 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-primary-400 h-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  <p className="text-gray-400 text-sm">
                    Please wait while we verify your completion.
                    This usually takes less than a minute.
                  </p>
                </div>
              )}

              <div className="mt-6 text-gray-500 text-xs text-center">
                <p>Powered by OGAds Content Locker</p>
                <p className="mt-1">We value your privacy. No personal information is stored.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadPage;
