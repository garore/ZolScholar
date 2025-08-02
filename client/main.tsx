import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TranslationProvider } from "./hooks/useTranslation";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import ScholarshipsFullyFunded from "./pages/ScholarshipsFullyFunded";
import ScholarshipsAirfare from "./pages/ScholarshipsAirfare";
import ScholarshipsArab from "./pages/ScholarshipsArab";
import ScholarshipsForeign from "./pages/ScholarshipsForeign";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Recommendations from "./pages/Recommendations";
import ApplicationTracker from "./pages/ApplicationTracker";
import SuccessStories from "./pages/SuccessStories";
import Blog from "./pages/Blog";
import ScholarshipDetails from "./pages/ScholarshipDetails";
import Explore from "./pages/Explore";
import Scholarships from "./pages/Scholarships";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TranslationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/scholarships/fully-funded"
              element={<ScholarshipsFullyFunded />}
            />
            <Route
              path="/scholarships/airfare"
              element={<ScholarshipsAirfare />}
            />
            <Route path="/scholarships/arab" element={<ScholarshipsArab />} />
            <Route
              path="/scholarships/foreign"
              element={<ScholarshipsForeign />}
            />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/tracker" element={<ApplicationTracker />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/scholarship/:id" element={<ScholarshipDetails />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/scholarships" element={<Scholarships />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </TranslationProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
