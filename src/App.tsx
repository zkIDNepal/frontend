import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import KYCVerification from "./pages/KYCVerification";
import Dashboard from "./pages/Dashboard";
import VerificationResult from "./pages/VerificationResult";
import VerifyProof from "./pages/VerifyProof";
import NotFound from "./pages/NotFound";
import Aboutus from "./pages/Aboutus";
import AuthCallback from "./pages/AuthCallback";
import { AuthProvider } from "./lib/auth-context";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { WalletContextProvider } from "./components/WalletContextProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <WalletContextProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<Aboutus />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route
                path="/kyc-verification"
                element={
                  <ProtectedRoute>
                    <KYCVerification />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requireKyc requireWallet>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/verification-result"
                element={
                  <ProtectedRoute requireWallet>
                    <VerificationResult />
                  </ProtectedRoute>
                }
              />
              <Route path="/verify/:hash" element={<VerifyProof />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </WalletContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
