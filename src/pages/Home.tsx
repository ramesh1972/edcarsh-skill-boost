
import React, { useState } from 'react';
import { courses } from '@/data/coursesData/courses';
import HeroSection from '@/components/home/HeroSection';
import USPsSection from '@/components/home/USPsSection';
import ToolsHighlightSection from '@/components/home/ToolsHighlightSection';
import FeaturedCoursesSection from '@/components/home/FeaturedCoursesSection';
import CourseCalendarSection from '@/components/home/CourseCalendarSection';
import StatsSection from '@/components/home/StatsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import FooterSection from '@/components/home/FooterSection';

const Home = () => {
  const [calendarViewMode, setCalendarViewMode] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="min-h-screen">
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
