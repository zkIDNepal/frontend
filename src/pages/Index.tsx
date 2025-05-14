
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import UseCasesSection from "@/components/landing/UseCasesSection";
import ProblemSolutionSection from "@/components/landing/ProblemSolutionSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <UseCasesSection />
      <ProblemSolutionSection />

      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
