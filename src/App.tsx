
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <BrowserRouter>
          {/* Outer div - exactly 100vw and 100vh with theme primary background */}
          <div className="w-screen h-screen bg-primary" style={{ width: '100vw', height: '100vh' }}>
            {/* Header positioned at the top with same background */}
            <Header />
            
            {/* Inner div - absolute positioned with 15px left/right, 63px top/bottom (60px + 3px more) */}
            <div className="absolute overflow-y-auto w-full h-full" style={{ 
              left: '15px', 
              right: '15px', 
              top: '63px', 
              bottom: '60px',
              width: 'calc(100vw - 30px)',
              height: 'calc(100vh - 123px)'
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
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
