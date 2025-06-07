
import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { courses } from '@/data/courses';
import HeroSection from './Home/HeroSection';
import USPsSection from './Home/USPsSection';
import ToolsHighlightSection from './Home/ToolsHighlightSection';
import FeaturedCoursesSection from './Home/FeaturedCoursesSection';
import CourseCalendarSection from './Home/CourseCalendarSection';
import StatsSection from './Home/StatsSection';
import TestimonialsSection from './Home/TestimonialsSection';
import CTASection from './Home/CTASection';
import FooterSection from './Home/FooterSection';

const Home = () => {
  const { getPageLayoutClasses } = useTheme();
  
  // Calendar state
  const [calendarViewMode, setCalendarViewMode] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  return (
    <div className="flex flex-col min-h-full gap-16 justify-center items-center"> 
      <HeroSection />
      <USPsSection />
      <ToolsHighlightSection />
      <FeaturedCoursesSection courses={courses} />
      <CourseCalendarSection 
        courses={courses}
        calendarViewMode={calendarViewMode}
        setCalendarViewMode={setCalendarViewMode}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default Home;
