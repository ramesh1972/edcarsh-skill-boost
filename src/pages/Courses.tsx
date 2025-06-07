
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTheme } from '@/hooks/useTheme';
import { courses } from '@/data/courses';
import { masterData, getIndustryNameById, getSubjectNameById } from '@/data/masterData';
import { Filter, ArrowUpDown, LayoutGrid, List, Calendar as CalendarIcon, MapPin, ArrowUp, ArrowDown } from 'lucide-react';
import { isAfter, parseISO, isSameDay } from 'date-fns';
import CourseCard from '@/components/Courses/CourseCard';
import LongCourseCard from '@/components/Courses/LongCourseCard';
import CoursesCalendarView from '@/components/Courses/CoursesCalendarView';
import PopularCoursesMapView from '@/components/Courses/PopularCoursesMapView';
import TitleComponent from '@/components/common/TitleComponent';

const Courses = () => {
  const {
    theme,
  } = useTheme();
  const [industryFilter, setIndustryFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState('card');
  const [calendarViewMode, setCalendarViewMode] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get industries and subjects from master data
  const industries = ['all', ...masterData.map(industry => industry.name)];
  
  // Get available subjects based on selected industry
  const availableSubjects = useMemo(() => {
    if (industryFilter === 'all') {
      const allSubjects = masterData.flatMap(industry => industry.subjects.map(subject => subject.name));
      return ['all', ...Array.from(new Set(allSubjects))];
    } else {
      const selectedIndustry = masterData.find(industry => industry.name === industryFilter);
      return selectedIndustry ? ['all', ...selectedIndustry.subjects.map(subject => subject.name)] : ['all'];
    }
  }, [industryFilter]);

  // Reset subject filter when industry changes
  const handleIndustryChange = (value: string) => {
    setIndustryFilter(value);
    setSubjectFilter('all'); // Reset subject when industry changes
  };

  // Get unique levels for filter options
  const levels = ['all', ...Array.from(new Set(courses.map(course => course.level)))];

  // Filter courses that are today or in the future for calendar view
  const futureCourses = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return courses.filter(course => {
      const courseStartDate = parseISO(course.startDate);
      const industryMatch = industryFilter === 'all' || getIndustryNameById(course.industryId) === industryFilter;
      const subjectMatch = subjectFilter === 'all' || getSubjectNameById(course.industryId, course.subjectId) === subjectFilter;
      const levelMatch = levelFilter === 'all' || course.level === levelFilter;
      return industryMatch && subjectMatch && levelMatch && (isSameDay(courseStartDate, today) || isAfter(courseStartDate, today));
    });
  }, [industryFilter, subjectFilter, levelFilter]);

  // Filter and sort courses for card/list view
  const filteredAndSortedCourses = useMemo(() => {
    const filtered = courses.filter(course => {
      const industryMatch = industryFilter === 'all' || getIndustryNameById(course.industryId) === industryFilter;
      const subjectMatch = subjectFilter === 'all' || getSubjectNameById(course.industryId, course.subjectId) === subjectFilter;
      const levelMatch = levelFilter === 'all' || course.level === levelFilter;
      return industryMatch && subjectMatch && levelMatch;
    });

    // Sort courses
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'price':
          comparison = parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', ''));
          break;
        case 'students':
          comparison = b.students - a.students;
          break;
        case 'duration':
          comparison = parseInt(a.duration) - parseInt(b.duration);
          break;
        default:
          comparison = 0;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    return filtered;
  }, [industryFilter, subjectFilter, levelFilter, sortBy, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-full ">
      <div className={`container mx-auto px-4 py-12 ${theme.layout === 'compact' ? 'space-y-4' : theme.layout === 'spacious' ? 'space-y-12' : 'space-y-8'}`}>
        <div className="mb-10">
          <TitleComponent
            title="Available Courses"
            subtitle="Short, practical crash courses designed for busy professionals"
            iconName="course"
          />
        </div>

        {/* Filters, Sort Controls and View Mode Toggle */}
        <div className="flex flex-wrap gap-4 mb-8 p-4 bg-primary/10 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 rounded-xl transition-transform duration-200 relative">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filters</span>
          </div>

          <div className="flex flex-wrap gap-4 flex-1 items-center" >
            <div className="min-w-[150px]">
              <Select value={industryFilter} onValueChange={handleIndustryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map(industry => <SelectItem key={industry} value={industry}>
                    {industry === 'all' ? 'All Industries' : industry}
                  </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="min-w-[150px]">
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  {availableSubjects.map(subject => <SelectItem key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="min-w-[150px]">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => <SelectItem key={level} value={level}>
                    {level === 'all' ? 'All Levels' : level}
                  </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              <span className="font-medium">Sort</span>
            </div>

            {viewMode !== 'calendar' && viewMode !== 'map' && <div className="flex items-center gap-2">
              <div className="min-w-[150px]">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="icon" onClick={toggleSortDirection} className="h-10 w-10" title={`Sort ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}>
                {sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              </Button>
            </div>}
          </div>

          {/* View Mode Toggle - aligned to the right */}
          <div className="flex items-center gap-4 ml-auto ">
            <span className="font-medium">View</span>
            <ToggleGroup type="single" value={viewMode} className="gap-3 pr-2 pl-2 p-2" onValueChange={value => value && setViewMode(value)}>
              <ToggleGroupItem value="card" aria-label="Card view" className="gap-1">
                <LayoutGrid className="h-4 w-4" />
                Card
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view" className="gap-1">
                <List className="h-4 w-4" />
                List
              </ToggleGroupItem>
              <ToggleGroupItem value="calendar" aria-label="Calendar view" className="gap-1">
                <CalendarIcon className="h-4 w-4" />
                Calendar
              </ToggleGroupItem>
              <ToggleGroupItem value="map" aria-label="Map view" className="gap-1">
                <MapPin className="h-4 w-4" />
                Map
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Course count */}
          <div className="absolute bottom-2 right-4 text-sm text-muted-foreground my-[-35px]">
            {viewMode === 'calendar' || viewMode === 'map' ? '' : `${filteredAndSortedCourses.length} course${filteredAndSortedCourses.length !== 1 ? 's' : ''} found`}
          </div>
        </div>

        {/* Card View */}
        {viewMode === 'card' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedCourses.map(course => <CourseCard key={course.id} course={course} cardClassName="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 hover:scale-[1.025] transition-transform duration-200" />)}
        </div>}

        {/* List View */}
        {viewMode === 'list' && <div className="space-y-6">
          {filteredAndSortedCourses.map(course => <LongCourseCard key={course.id} course={course} cardClassName="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 hover:scale-[1.025] transition-transform duration-200" />)}
        </div>}

        {/* Calendar View */}
        {viewMode === 'calendar' && <CoursesCalendarView courses={courses} industryFilter={industryFilter} subjectFilter={subjectFilter} levelFilter={levelFilter} calendarViewMode={calendarViewMode} setCalendarViewMode={setCalendarViewMode} currentDate={currentDate} setCurrentDate={setCurrentDate} />}

        {/* Map View - Pass the correct courses array */}
        {viewMode === 'map' && <PopularCoursesMapView courses={filteredAndSortedCourses} />}
      </div>
    </div>
  );
};
export default Courses;
