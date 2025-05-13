import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ZKIDLogo from "@/components/ZKIDLogo";
import {  Menu, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleWalletConnect = () => {
    // Find the wallet-adapter button and click it programmatically
    const walletAdapterButton = document.querySelector(
      ".wallet-adapter-button-trigger"
    ) as HTMLButtonElement
    if (walletAdapterButton) {
      walletAdapterButton.click()
    }
  }

  // Handle scroll event to apply different styles when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-blue-900/90 backdrop-blur-sm shadow-lg py-2" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ZKIDLogo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
         
          <Link to="/about" className="no-underline">
          <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
              About Us
             </Button>
            </Link>
              <Button
              onClick={handleWalletConnect}
              className="hidden md:flex bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Connect
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            className="md:hidden text-white p-2" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-6 animate-in fade-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-4">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 justify-start"
              >
                For Businesses
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 justify-start"
              >
                About Us
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 text-white bg-blue-800 hover:bg-blue-700 justify-start"
              >
                Connect
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;