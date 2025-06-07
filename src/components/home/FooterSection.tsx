import { Link } from 'react-router-dom';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const FooterSection = () => {
  const footerAnimation = useScrollAnimation({ threshold: 0.1 });

  return (
    <footer 
      ref={footerAnimation.ref}
      className={`py-12 bg-background border-t rounded-b-[40px] transition-all duration-700 ${
        footerAnimation.isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary text-primary-foreground rounded-lg p-2">
                <span className="text-xl font-bold">EC</span>
              </div>
              <span className="text-2xl font-bold">EdCrash</span>
            </div>
            <p className="text-muted-foreground">
              Accelerating careers through focused, practical education.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Courses</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/courses" className="hover:text-foreground">Browse All</Link></li>
              <li><Link to="/express-intent" className="hover:text-foreground">Express Intent</Link></li>
              <li><Link to="/calendar" className="hover:text-foreground">Course Calendar</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/instructors" className="hover:text-foreground">Instructors</Link></li>
              <li><Link to="/testimonials" className="hover:text-foreground">Testimonials</Link></li>
              <li><Link to="/community" className="hover:text-foreground">Discussion</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 EdCrash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
