
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Header } from "@/components/header/Header";
import Index from "./pages/Index";
import CourseView from "@/components/Courses/CourseView";
import Dashboard from "./pages/Dashboard";
import ExpressIntent from "./pages/ExpressIntent";
import Instructors from "./pages/Instructors";
import InstructorDetails from @/components/instructors/InstructorDetails;
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ToolsNavigation from "@/components/menu/ToolsNavigation";
import Courses from "./pages/Courses";

const queryClient = new QueryClient();

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if this is a fresh app load (not a navigation within the app)
    const isAppInitialization = !sessionStorage.getItem('app_initialized');

    if (isAppInitialization) {
      // Mark the app as initialized
      sessionStorage.setItem('app_initialized', 'true');

      // If not already on home page, navigate to home
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
      }
    }
  }, [navigate, location.pathname]);

  return (
    <>
      {/* Outer div - exactly 100vw and 100vh with theme primary background */}
      <div className="fixed inset-0 w-full h-full bg-primary overflow-hidden">
        {/* Header positioned at the top with same background */}
        <Header />

        {/* Inner div - with wavy bezier curve on bottom left */}
        <div
          className="relative overflow-auto !rounded-tl-[48px] !rounded-bl-[20px] bg-background bg-gradient-to-br from-background to-primary/20 dark:from-background dark:to-primary/80 transition-all duration-500"
          style={{
            left: '20px',
            right: '20px',
            width: 'calc(100vw - 40px)',
            height: 'calc(100vh - 132px)',

          }}
        >
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseView />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/express-intent" element={<ExpressIntent />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/instructors/:id" element={<InstructorDetails />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* Bottom Tabs */}
        <ToolsNavigation />
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
