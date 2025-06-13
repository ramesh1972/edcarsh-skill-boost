
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Course, DeepCourseInfo } from '@/types';

import ShortCourseCard from '@/components/Courses/ListView/ShortCourseCard';

interface FeaturedCoursesSectionProps {
  deepCoursesInfo: DeepCourseInfo[];
}

const FeaturedCoursesSection = ({ deepCoursesInfo }: FeaturedCoursesSectionProps) => {
  const coursesAnimation = useScrollAnimation({ threshold: 0.1 });
  
  // Get the first 6 courses for the upcoming courses section
  const upcomingCourses = deepCoursesInfo.slice(0, 6);

  return (
    <section 
      ref={coursesAnimation.ref}
      className={`py-20  bg-primary/20 transition-all duration-700 ${
        coursesAnimation.isVisible ? 'animate-fade-in-left opacity-100' : 'opacity-0 -translate-x-10'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div 
          className={`text-center mb-16 transition-all duration-700 delay-300  ${
            coursesAnimation.isVisible ? 'animate-zoom-in opacity-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="flex items-center justify-center gap-8 mb-4">
            <h2 className="text-3xl font-bold">Upcoming Courses</h2>
          </div>
          <p className=" text-center animate-pulse text-2xl font-bold-800" style={{ fontVariant: 'small-caps' }}>
            Start your learning journey with these popular courses
          </p>

          
          <Link to="/courses">
            <Button variant="outline" className="gap-2 mt-6">
              View All Courses
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingCourses.map((deepCourseInfo, index) => (
            <div
              key={deepCourseInfo.id}
              className={`transition-all duration-700 ${
                coursesAnimation.isVisible 
                  ? `opacity-100 ${
                      index % 3 === 0
                        ? 'animate-fade-in-left'
                        : index % 3 === 1
                        ? 'animate-zoom-in'
                        : 'animate-fade-in-right'
                    }`
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: coursesAnimation.isVisible ? `${400 + index * 150}ms` : '0ms'
              }}
            >
              <ShortCourseCard deepCourseInfo={deepCourseInfo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
