
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import KYCVerification from "./pages/KYCVerification";
import Dashboard from "./pages/Dashboard";
import VerificationResult from "./pages/VerificationResult";
import NotFound from "./pages/NotFound";
import Aboutus from "./pages/Aboutus";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kyc-verification" element={<KYCVerification />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<Aboutus/>} />
          <Route path="/verification-result" element={<VerificationResult />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
