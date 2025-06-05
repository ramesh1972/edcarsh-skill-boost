import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ShortCourseCard from '@/components/Courses/ShortCourseCard';
import { Course } from '@/types';

interface FeaturedCoursesSectionProps {
  courses: Course[];
}

const FeaturedCoursesSection = ({ courses }: FeaturedCoursesSectionProps) => {
  const coursesAnimation = useScrollAnimation({ threshold: 0.1 });
  
  // Get the first 6 courses for the upcoming courses section
  const upcomingCourses = courses.slice(0, 6);

  return (
    <section 
      ref={coursesAnimation.ref}
      className={`py-20 round-b-[20px] border-[10px] border-primary transition-all duration-700 ${
        coursesAnimation.isVisible ? 'animate-fade-in-left opacity-100' : 'opacity-0 -translate-x-10'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div 
          className={`flex justify-between items-center mb-12 transition-all duration-700 delay-200 ${
            coursesAnimation.isVisible ? 'animate-fade-in-left opacity-100' : 'opacity-0 -translate-x-10'
          }`}
        >
          <div>
            <h2 className="text-3xl font-bold mb-4">Upcoming Courses</h2>
            <p className="text-xl text-muted-foreground">
              Start your learning journey with these popular courses
            </p>
          </div>
          <Link to="/courses">
            <Button variant="outline" className="gap-2">
              View All Courses
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingCourses.map((course, index) => (
            <div
              key={course.id}
              className={`transition-all duration-700 ${
                coursesAnimation.isVisible 
                  ? `opacity-100 ${
                      index % 3 === 0 ? 'animate-fade-in-left' : 
                      index % 3 === 1 ? 'animate-zoom-in' : 'animate-fade-in-right'
                    }` 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: coursesAnimation.isVisible ? `${400 + index * 150}ms` : '0ms'
              }}
            >
              <ShortCourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
