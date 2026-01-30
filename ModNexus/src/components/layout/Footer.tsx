import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Gamepad2, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the email to a server
    alert(`Thanks for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <footer className="pt-16 pb-8 border-t border-[#00f7ff]/10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <img src="/assets/logo/modnexus-logo.svg" alt="ModNexus" className="h-12 logo-glow" />
            </div>
            <p className="text-muted-foreground">
              Your destination for premium mobile games. Download and play the best mobile games with ModNexus.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 inline-block relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-[#00f7ff]">Popular Games</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/games/clash-royale">
                    <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-[#00f7ff]">Clash Royale</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/games/clash-of-clans">
                    <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-[#00f7ff]">Clash of Clans</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/games/minecraft">
                    <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-[#00f7ff]">Minecraft</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/games/pubg-mobile">
                    <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-[#00f7ff]">PUBG Mobile</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/games/free-fire">
                    <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-[#00f7ff]">Free Fire</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/games/baseball-9">
                    <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-[#00f7ff]">Baseball 9</Button>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 inline-block relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-[#00f7ff]">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about">
                    <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-[#00f7ff]">About Us</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/terms">
                    <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-[#00f7ff]">Terms of Service</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/privacy">
                    <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-[#00f7ff]">Privacy Policy</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-[#00f7ff]">Contact</Button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Get Updates</h4>
            <p className="text-muted-foreground mb-4">
              Stay updated with the latest mobile games and exclusive releases from ModNexus.
            </p>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-muted border border-[#00f7ff]/20 rounded-l-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#00f7ff]"
                required
              />
              <button type="submit" className="bg-[#00f7ff] text-primary-foreground px-4 py-2 font-semibold rounded-r-md hover:bg-[#00c4cc] transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#00f7ff]/10 pt-6 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <p>© 2025 ModNexus. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button variant="ghost" size="icon" className="p-2 text-muted-foreground hover:text-[#00f7ff] hover:bg-[#00f7ff]/10" aria-label="Discord">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M7.5 7.5C8.83 6.17 10.47 5.5 12 5.5c1.53 0 3.17.67 4.5 2"/><path d="M16.5 16.5c-1.33 1.33-2.97 2-4.5 2-1.53 0-3.17-.67-4.5-2"/><path d="M8.5 11.5v2"/><path d="M15.5 11.5v2"/><path d="M18 21c1.1 0 2-.9 2-2v-9.5l-2-2.5H6l-2 2.5V19c0 1.1.9 2 2 2h12Z"/></svg>
            </Button>
            <Button variant="ghost" size="icon" className="p-2 text-muted-foreground hover:text-[#00f7ff] hover:bg-[#00f7ff]/10" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="p-2 text-muted-foreground hover:text-[#00f7ff] hover:bg-[#00f7ff]/10" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="p-2 text-muted-foreground hover:text-[#00f7ff] hover:bg-[#00f7ff]/10" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
