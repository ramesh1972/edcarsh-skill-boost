import React, { useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import USPsSection from '@/components/home/USPsSection';
import ToolsHighlightSection from '@/components/home/ToolsHighlightSection';
import FeaturedCoursesSection from '@/components/home/FeaturedCoursesSection';
import CourseCalendarSection from '@/components/home/CourseCalendarSection';
import StatsSection from '@/components/home/StatsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import { getCoursesInfo, getOrgCourses, getOrgDeepCoursesInfo } from '@/adapters/orgDataAdapter';

const Home = () => {
  const [calendarViewMode, setCalendarViewMode] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const courses = getOrgDeepCoursesInfo(0);

  return (
    <div className="grid grid-cols-1 min-h-screen gap-16">
      <HeroSection />
      <USPsSection />
      <ToolsHighlightSection />
      <FeaturedCoursesSection deepCoursesInfo={courses} />
      <CourseCalendarSection 
        deepCoursesInfo={courses}
        calendarViewMode={calendarViewMode}
        setCalendarViewMode={setCalendarViewMode}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Home;
