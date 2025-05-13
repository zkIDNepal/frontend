import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  // You can add any props here if needed in the future
}

// Bubble animation component
const FloatingBubble = ({ size, delay, duration, left, top }: { 
  size: number, 
  delay: number, 
  duration: number, 
  left: string, 
  top: string 
}) => {
  return (
    <div 
      className="absolute rounded-full bg-primary/30 animate-float"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left,
        top,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
};

const HeroSection: React.FC<HeroSectionProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Particles for interactive background
  const particles = [];
  for (let i = 0; i < 15; i++) {
    const size = Math.random() * 60 + 20;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    const left = `${Math.random() * 100}%`;
    const top = `${Math.random() * 100}%`;
    
    particles.push(
      <FloatingBubble 
        key={i} 
        size={size} 
        delay={delay} 
        duration={duration}
        left={left}
        top={top}
      />
    );
  }

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-900/50 to-black">
      {/* Enhanced background elements with bubbles */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
        
        {/* Floating bubbles */}
        {particles}
      </div>
      
      {/* Enhanced grid pattern overlay with animation */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-subtle-pulse"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-8'}`}>
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-primary/50 transition-all hover:scale-105">
              <p className="text-sm font-medium text-gray-200 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-primary animate-pulse" />
                The Future of Digital Identity in Nepal
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-gradient-text">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary">One ID Verification</span>
              <br />For All Your Payments
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              zkID Nepal simplifies KYC verification across all payment systems in Nepal. 
              Verify once, use everywhere with blockchain security.
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white px-8 py-6 rounded-xl shadow-glow hover:shadow-glow-intense transition-all duration-300">
              <Link to="/kyc-verification" className="flex items-center text-lg">
                Get Started <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 bg-blue-900/20 hover:bg-blue-800/30 hover:border-primary/60 text-primary hover:text-white px-8 py-6 rounded-xl transition-all duration-300">
              <Link to="/about" className="flex items-center text-lg">
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
          <div className="relative">
            {/* Enhanced decorative elements with animations */}
            <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-primary/30 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-secondary/30 animate-pulse"></div>
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 rounded-full filter blur-xl animate-float"></div>
            
            {/* Main card with improved styling */}
            <div className="glass-card rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-lg hover:border-primary/30 transition-all duration-500">
              <div className="p-8 bg-gradient-to-br from-black/60 to-primary/5">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left side with verification status */}
                  <div className="md:w-1/2">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-glow-sm">
                        <ShieldCheck className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">Verified Identity</h3>
                        <p className="text-sm text-gray-300">Secured with zkSNARK technology</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300 group">
                        <CheckCircle className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-gray-200">Government ID Verified</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300 group">
                        <CheckCircle className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-gray-200">Biometric Authentication</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300 group">
                        <CheckCircle className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-gray-200">Decentralized Storage</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side with visualization */}
                  <div className="md:w-1/2 relative">
                    <div className="relative h-full flex flex-col justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl"></div>
                      <div className="relative p-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary p-1 hover:scale-110 transition-transform duration-300 shadow-glow-sm">
                          <div className="w-full h-full rounded-full bg-black/40 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">ID</span>
                          </div>
                        </div>
                        
                        <div className="text-center mb-6">
                          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4"></div>
                          <p className="text-sm text-gray-300">Connected to 5 payment systems</p>
                        </div>
                        
                        <div className="flex justify-center">
                          <div className="bg-gradient-to-r from-green-500/20 to-green-300/20 px-4 py-2 rounded-full text-sm font-medium text-green-300 flex items-center hover:scale-105 transition-transform duration-300">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                            Active & Secured
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute bottom-10 left-10 w-32 h-1 bg-gradient-to-r from-primary to-transparent"></div>
      <div className="absolute top-10 right-10 w-32 h-1 bg-gradient-to-l from-secondary to-transparent"></div>
    </section>
  );
};

// Add these animations to your global CSS
const styleTag = `
@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0.1;
  }
  50% {
    transform: translateY(-20px) translateX(10px);
    opacity: 0.3;
  }
  100% {
    transform: translateY(0) translateX(0);
    opacity: 0.1;
  }
}

@keyframes subtle-pulse {
  0%, 100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.15;
  }
}

.animate-float {
  animation: float 10s ease-in-out infinite;
}

.animate-subtle-pulse {
  animation: subtle-pulse 4s ease-in-out infinite;
}

.shadow-glow {
  box-shadow: 0 0 15px 2px rgba(var(--color-primary), 0.3);
}

.shadow-glow-intense {
  box-shadow: 0 0 20px 5px rgba(var(--color-primary), 0.5);
}

.shadow-glow-sm {
  box-shadow: 0 0 10px 1px rgba(var(--color-primary), 0.2);
}

.animate-gradient-text {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* You'll need to integrate these CSS classes into your global stylesheet */
`;

export default HeroSection;