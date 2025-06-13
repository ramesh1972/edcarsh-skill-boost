
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Course, DeepCourseInfo } from '@/types';
import CoursesCalendarView from '@/components/Courses/CalendarView/CoursesCalendarView';

interface CourseCalendarSectionProps {
  deepCoursesInfo: DeepCourseInfo[];
  calendarViewMode: string;
  setCalendarViewMode: (mode: string) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

const CourseCalendarSection = ({ 
  deepCoursesInfo, 
  calendarViewMode, 
  setCalendarViewMode, 
  currentDate, 
  setCurrentDate 
}: CourseCalendarSectionProps) => {
  const calendarAnimation = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      ref={calendarAnimation.ref}
      className={`py-20 bg-primary/20 w-full  transition-all duration-700 ${
        calendarAnimation.isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div 
          className={`text-center mb-12 transition-all duration-700 delay-200 ${
            calendarAnimation.isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">Course Calendar</h2>
          <p className="text-xl text-muted-foreground">
            View all upcoming courses in calendar format
          </p>
        </div>
        <div 
          className={`transition-all duration-700 delay-400 w-full ${
            calendarAnimation.isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <CoursesCalendarView
            deepCourseInfos={deepCoursesInfo}
            selectedIndustry={0}
            selectedSubject={0}
            selectedLevel="all"
            calendarViewMode={calendarViewMode}
            setCalendarViewMode={setCalendarViewMode}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        </div>
      </div>
    </section>
  );
};

export default CourseCalendarSection;
