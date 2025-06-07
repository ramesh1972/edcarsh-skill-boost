
import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { courses } from '@/data/courses';
import HeroSection from '../components/home/HeroSection';
import USPsSection from '../components/home/USPsSection';
import ToolsHighlightSection from '../components/home/ToolsHighlightSection';
import FeaturedCoursesSection from '../components/home/FeaturedCoursesSection';
import CourseCalendarSection from '../components/home/CourseCalendarSection';
import StatsSection from '../components/home/StatsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import FooterSection from '../components/home/FooterSection';

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
