import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CircleCheck,
  Download,
  Facebook,
  Mail,
  Share2,
  Twitter,
  Unlock,
  FileDown,
  Smartphone
} from "lucide-react";

type ContentLockerDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  contentId: string;
};

export function ContentLockerDialog({
  isOpen,
  onClose,
  title,
  description,
  contentId,
}: ContentLockerDialogProps) {
  const [verificationComplete, setVerificationComplete] = useState<boolean>(false);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [downloadComplete, setDownloadComplete] = useState<boolean>(false);

  // Check if content is already unlocked
  const isUnlocked = localStorage.getItem(`unlocked_${contentId}`) === 'true';

  // Reset states when dialog is opened
  useEffect(() => {
    if (isOpen) {
      setVerificationComplete(isUnlocked);
      setShowProgress(false);
      setProgress(0);
      setDownloadComplete(false);
    }
  }, [isOpen, isUnlocked]);

  // Progress simulation
  useEffect(() => {
    let interval: number | undefined;

    if (showProgress && progress < 100) {
      interval = window.setInterval(() => {
        setProgress(prevProgress => {
          const increment = Math.floor(Math.random() * 10) + 1;
          const newProgress = Math.min(prevProgress + increment, 100);

          if (newProgress === 100) {
            setDownloadComplete(true);
            window.clearInterval(interval);
          }

          return newProgress;
        });
      }, 300);
    }

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [showProgress, progress]);

  const handleUnlockClick = () => {
    // Simulate verification with the chosen method
    setVerificationComplete(true);
    // Store unlock status in localStorage
    localStorage.setItem(`unlocked_${contentId}`, 'true');

    // Start download progress simulation
    setShowProgress(true);
  };

  const handleCloseClick = () => {
    onClose();
    // If download completed, refresh to update UI
    if (downloadComplete) {
      window.location.reload();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {verificationComplete ? (
              <>{downloadComplete ? <CircleCheck className="h-5 w-5 text-green-500" /> : <FileDown className="h-5 w-5 text-[#00f7ff]" />} {downloadComplete ? "Download Complete" : title}</>
            ) : (
              <><Unlock className="h-5 w-5 text-[#00f7ff]" /> {title}</>
            )}
          </DialogTitle>
          <DialogDescription>
            {verificationComplete ?
              (downloadComplete ?
                "Your game is ready to play! You can now close this dialog." :
                "Download in progress. Please wait while we prepare your game...") :
              description}
          </DialogDescription>
        </DialogHeader>

        {/* Progress bar for download simulation */}
        {showProgress && (
          <div className="my-4 space-y-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Downloading game files...</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-200 dark:bg-gray-700" />
            <p className="text-xs text-muted-foreground mt-1">
              {progress < 30 ? "Preparing files..." :
               progress < 60 ? "Downloading game assets..." :
               progress < 90 ? "Verifying file integrity..." :
               "Finalizing download..."}
            </p>
          </div>
        )}

        {/* Verification options */}
        {!verificationComplete && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleUnlockClick}
                className="flex items-center justify-center gap-2 btn-primary shine-effect"
              >
                <Share2 className="h-4 w-4" />
                Share on Social
              </Button>
              <Button
                onClick={handleUnlockClick}
                className="flex items-center justify-center gap-2 btn-primary shine-effect"
              >
                <Mail className="h-4 w-4" />
                Subscribe
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant="outline"
                onClick={handleUnlockClick}
                className="flex items-center justify-center gap-2 border-[#00f7ff]/30 hover:bg-[#00f7ff]/10"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </Button>
              <Button
                variant="outline"
                onClick={handleUnlockClick}
                className="flex items-center justify-center gap-2 border-[#00f7ff]/30 hover:bg-[#00f7ff]/10"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                onClick={handleUnlockClick}
                className="flex items-center justify-center gap-2 border-[#00f7ff]/30 hover:bg-[#00f7ff]/10"
              >
                <Smartphone className="h-4 w-4" />
                SMS Verify
              </Button>
            </div>
          </div>
        )}

        <DialogFooter className="sm:justify-center">
          {verificationComplete ? (
            <Button
              onClick={handleCloseClick}
              className={downloadComplete ? "bg-green-600 hover:bg-green-700" : "btn-primary"}
              disabled={!downloadComplete && showProgress}
            >
              {downloadComplete ? "PLAY GAME" : "DOWNLOADING..."}
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={onClose}
              className="border-[#00f7ff]/30 hover:bg-[#00f7ff]/10"
            >
              Cancel
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
