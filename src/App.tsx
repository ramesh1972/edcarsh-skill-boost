
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Courses from '@/pages/Courses';
import Instructors from '@/pages/Instructors';
import Contact from '@/pages/Contact';
import FAQ from '@/pages/FAQ';
import Testimonials from '@/pages/Testimonials';
import ExpressIntent from '@/pages/ExpressIntent';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground font-modern tailwind-design layout-default">
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/instructors" element={<Instructors />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/express-intent" element={<ExpressIntent />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
