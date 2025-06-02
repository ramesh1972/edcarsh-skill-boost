
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
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
        <div className="h-screen w-full bg-primary flex items-center justify-center overflow-auto">
          <div className="h-[95%] w-[95%] bg-background overflow-auto flex flex-col">
            <div className="h-[15.79%] w-full bg-background border-b">
              {/* Top section - 15% of outer div height (15/95 = 15.79%) */}
            </div>
            <div className="flex-1 w-full overflow-auto">
              <Toaster />
              <Sonner />
              <BrowserRouter>
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
              </BrowserRouter>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
