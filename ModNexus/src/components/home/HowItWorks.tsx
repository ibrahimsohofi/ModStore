import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ContentLockerDialog } from "../shared/ContentLockerDialog";
import { Search, Shield, Download } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Browse Games",
    description: "Explore our collection of premium mobile games across various categories.",
    icon: <Search className="h-6 w-6 text-primary-foreground" />
  },
  {
    number: 2,
    title: "Quick Verification",
    description: "Complete a simple verification step to confirm you're human (takes less than a minute).",
    icon: <Shield className="h-6 w-6 text-primary-foreground" />
  },
  {
    number: 3,
    title: "Play Instantly",
    description: "After verification, download your game immediately and start playing. No waiting!",
    icon: <Download className="h-6 w-6 text-primary-foreground" />
  }
];

export function HowItWorks() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section id="how-it-works" className="py-16 bg-card/30">
      <div className="container-custom">
        <h2 className="section-title">
          HOW IT <span className="highlight">WORKS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00f7ff] to-secondary text-primary-foreground flex items-center justify-center text-xl font-bold mb-6 shadow-[0_0_20px_rgba(0,247,255,0.5)] group-hover:shadow-[0_0_30px_rgba(0,247,255,0.7)] transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#00f7ff]">
                {step.title}
              </h3>
              <p className="text-muted-foreground max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => setIsDialogOpen(true)}
            size="lg"
            className="btn-primary text-lg px-8 py-6 rounded-full shine-effect"
          >
            BROWSE GAMES NOW
          </Button>
        </div>

        <ContentLockerDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title="Download Premium Mobile Games"
          description="Complete one quick verification to access our premium games:"
          contentId="all-access-pass"
        />
      </div>
    </section>
  );
}
