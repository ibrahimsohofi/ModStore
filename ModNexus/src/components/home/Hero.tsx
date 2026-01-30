import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ContentLockerDialog } from '../shared/ContentLockerDialog';
import { Gamepad2, Download, Star } from 'lucide-react';

export function Hero() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 relative">
      {/* Animated background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00f7ff]/5 to-transparent z-0" />

      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <img src="/assets/logo/modnexus-logo.svg" alt="ModNexus" className="h-16 logo-glow" />
            <div className="text-sm font-medium text-[#00f7ff] bg-[#00f7ff]/10 px-3 py-1 rounded-full">
              The Ultimate Mobile Gaming Hub
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wide">
            PREMIUM <span className="cyan-gradient-text logo-glow">MOBILE</span> GAMES HUB
          </h1>

          <p className="text-lg md:text-xl max-w-xl">
            Access <span className="text-[#00f7ff]">exclusive</span> mobile games with premium features.
            Get the best gaming experience on your device.
          </p>

          <div className="grid grid-cols-3 gap-4 my-8">
            <div className="flex flex-col items-center md:flex-row md:items-start gap-2">
              <div className="text-2xl text-[#00f7ff] shadow-[0_0_10px_rgba(0,247,255,0.5)]">🎮</div>
              <div className="text-center md:text-left font-semibold">Top Mobile Games</div>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-start gap-2">
              <div className="text-2xl text-[#00f7ff] shadow-[0_0_10px_rgba(0,247,255,0.5)]">⚡</div>
              <div className="text-center md:text-left font-semibold">Instant Downloads</div>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-start gap-2">
              <div className="text-2xl text-[#00f7ff] shadow-[0_0_10px_rgba(0,247,255,0.5)]">🔥</div>
              <div className="text-center md:text-left font-semibold">Weekly New Games</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => setIsDialogOpen(true)}
              className="btn-primary text-lg py-6 px-8 rounded-full shine-effect pulse"
            >
              <Download className="mr-2 h-5 w-5" />
              BROWSE GAMES
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="text-lg py-6 px-8 rounded-full border-[#00f7ff]/30 hover:bg-[#00f7ff]/10"
            >
              <Star className="mr-2 h-5 w-5" />
              POPULAR GAMES
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Over <span className="text-[#00f7ff]">15,000+</span> gamers already downloaded our games
          </p>
        </div>

        <div className="hidden md:block">
          <div className="relative rounded-lg shadow-[0_0_30px_rgba(0,247,255,0.3)] overflow-hidden border border-[#00f7ff]/30 glow-hover">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00f7ff]/10 to-transparent z-10" />
            <img
              src="/assets/game-controller.jpg"
              alt="Gaming controller with neon lights"
              className="w-full h-full object-cover transform perspective-[1000px] rotate-y-[-10deg] transition-transform duration-500 hover:rotate-y-0"
            />

            {/* ModNexus badge */}
            <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm border border-[#00f7ff]/30 px-4 py-2 rounded-lg flex items-center gap-2">
              <img src="/assets/logo/favicon.svg" alt="ModNexus icon" className="h-8 logo-glow" />
              <span className="font-bold tracking-wider">
                PREMIUM GAMES
              </span>
            </div>
          </div>
        </div>
      </div>

      <ContentLockerDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Download Premium Mobile Games"
        description="Complete one of the following actions to access our premium games:"
        contentId="premium-access"
      />
    </section>
  );
}
