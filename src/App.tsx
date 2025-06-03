

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Header } from "@/components/Header";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import ExpressIntent from "./pages/ExpressIntent";
import Instructors from "./pages/Instructors";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import BottomTabs from "@/components/BottomTabs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <BrowserRouter>
          {/* Outer div - exactly 100vw and 100vh with theme primary background */}
          <div className="fixed inset-0 w-full h-full bg-primary overflow-hidden">
            {/* Header positioned at the top with same background */}
            <Header />
            
            {/* Inner div - absolute positioned with 15px left/right, 60px top, 60px bottom for tabs */}
            <div className="absolute overflow-auto" style={{ 
              left: '15px', 
              right: '15px', 
              top: '60px', 
              bottom: '20px',
              width: 'calc(100vw - 30px)',
              height: 'calc(100vh - 150px)',
              borderTopLeftRadius: '40px',
              borderBottomLeftRadius: '40px'
            }}>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/express-intent" element={<ExpressIntent />} />
                <Route path="/instructors" element={<Instructors />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            
            {/* Bottom Tabs */}
            <BottomTabs />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

