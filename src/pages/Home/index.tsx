
import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { courses } from '@/data/courses';
import HeroSection from './components/HeroSection';
import USPsSection from './components/USPsSection';
import FeaturedCoursesSection from './components/FeaturedCoursesSection';
import CourseCalendarSection from './components/CourseCalendarSection';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import FooterSection from './components/FooterSection';

const Home = () => {
  const { getPageLayoutClasses } = useTheme();
  
  // Calendar state
  const [calendarViewMode, setCalendarViewMode] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className={`min-h-full bg-background ${getPageLayoutClasses()}`}>
      <HeroSection />
      <USPsSection />
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
