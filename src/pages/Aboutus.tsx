import React from "react";
import { Shield, Lock, Users, Zap, ChevronRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";

const Aboutus = () => {
  // Theme colors
  const colors = {
    darkBlue: "#232288",
    purple: "#8C52FF",
    red: "#FF5757"
  };

  const teamMembers = [
    {
      name: "Suman Adhikari",
      position: "Founder & CEO",
      image: "/girl1.jpeg",
    },
    {
      name: "Anita Sharma",
      position: "CTO",
    image: "/girl1.jpeg",
    },
    {
      name: "Rajesh Thapa",
      position: "Head of Partnerships",
     image: "/girl1.jpeg",
    },
    {
      name: "Priya Shrestha",
      position: "Lead Developer",
      image: "/girl1.jpeg",
    }
  ];

  return (
    <div className="bg-blue text-white">
        <Navbar/>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ 
          background: `radial-gradient(circle at 30% 50%, ${colors.darkBlue}50 0%, transparent 50%), 
                       radial-gradient(circle at 70% 20%, ${colors.purple}40 0%, transparent 30%)`,
          opacity: 0.6
        }}></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">            
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ 
              background: `linear-gradient(90deg, ${colors.purple}, ${colors.red})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Securing Nepal's Digital Future
            </h1>
            
            <p className="text-xl text-gray-300 mb-10">
              zkIDNepal: Private, secure identity verification using zero-knowledge proofs.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do - Simplified */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl" style={{ 
              background: `linear-gradient(145deg, #111, ${colors.darkBlue}10)`,
              border: `1px solid ${colors.purple}20`
            }}>
              <Shield className="h-10 w-10 mb-4" style={{ color: colors.red }} />
              <h3 className="text-2xl font-bold mb-2">Privacy-First</h3>
              <p className="text-gray-300">
                Verify without exposing personal data
              </p>
            </div>
            
            <div className="p-6 rounded-xl" style={{ 
              background: `linear-gradient(145deg, #111, ${colors.darkBlue}10)`,
              border: `1px solid ${colors.purple}20`
            }}>
              <Users className="h-10 w-10 mb-4" style={{ color: colors.purple }} />
              <h3 className="text-2xl font-bold mb-2">Inclusive</h3>
              <p className="text-gray-300">
                Designed for all Nepalese citizens
              </p>
            </div>
            
            <div className="p-6 rounded-xl" style={{ 
              background: `linear-gradient(145deg, #111, ${colors.darkBlue}10)`,
              border: `1px solid ${colors.purple}20`
            }}>
              <Zap className="h-10 w-10 mb-4" style={{ color: colors.darkBlue }} />
              <h3 className="text-2xl font-bold mb-2">Integration-Ready</h3>
              <p className="text-gray-300">
                Works with existing systems
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story - Simplified */}
      <section className="py-16" style={{ background: `linear-gradient(to bottom, #000, ${colors.darkBlue}20, #000)` }}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-xl text-gray-300 mb-6">
              Born from a vision to empower Nepalese citizens with control over their digital identities, zkIDNepal combines cutting-edge blockchain technology with local expertise.
            </p>
            <p className="text-xl text-gray-300">
              We're making it possible to prove who you are without compromising your privacy.
            </p>
          </div>
        </div>
      </section>
      
      {/* Team Section - Simplified */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4" style={{ 
                  boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px ${colors.purple}20`
                }}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-sm text-gray-400">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{ 
          background: `radial-gradient(circle at 70% 50%, ${colors.darkBlue}30 0%, transparent 50%)`,
          opacity: 0.6
        }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's build Nepal's secure digital future together.
            </p>
            
            <button className="px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center mx-auto"
              style={{ 
                background: `linear-gradient(90deg, ${colors.purple}, ${colors.red})`,
                boxShadow: `0 8px 20px ${colors.purple}30`
              }}>
              Get Started
              <ChevronRight className="ml-1 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;