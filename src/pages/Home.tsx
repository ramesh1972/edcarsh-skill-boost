import React, { useState } from 'react';

import { useTheme } from '@/hooks/useTheme';

import HeroSection from '@/components/Home/HeroSection';
import USPsSection from '@/components/Home/USPsSection';
import ToolsHighlightSection from '@/components/Home/ToolsHighlightSection';
import FeaturedCoursesSection from '@/components/Home/FeaturedCoursesSection';
import CourseCalendarSection from '@/components/Home/CourseCalendarSection';
import StatsSection from '@/components/Home/StatsSection';
import TestimonialsSection from '@/components/Home/TestimonialsSection';
import CTASection from '@/components/Home/CTASection';
import FooterSection from '@/components/Home/FooterSection';

import { courses } from '@/data/courses';

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
