import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTheme } from '@/contexts/ThemeContext';
import { courses } from '@/data/coursesData/courses';
import { getAllIndustries, getSubjectsByIndustry } from '@/data/masterData/industriesSubjects';
import { Filter, ArrowUpDown, LayoutGrid, List, Calendar as CalendarIcon, MapPin, ArrowUp, ArrowDown } from 'lucide-react';
import { isAfter, parseISO, isSameDay } from 'date-fns';
import CourseCard from '@/components/Courses/CourseCard';
import LongCourseCard from '@/components/Courses/LongCourseCard';
import CoursesCalendarView from '@/components/Courses/CoursesCalendarView';
import PopularCoursesMapView from '@/components/Courses/PopularCoursesMapView';
const Courses = () => {
  const {
    theme,
    getIcon,
    getBackground
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
  const industries = ['all', ...getAllIndustries()];
  const availableSubjects = industryFilter === 'all' ? ['all', ...Array.from(new Set(courses.map(course => course.subject)))] : ['all', ...getSubjectsByIndustry(industryFilter).map(subject => subject.name)];

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
      const industryMatch = industryFilter === 'all' || course.industry === industryFilter;
      const subjectMatch = subjectFilter === 'all' || course.subject === subjectFilter;
      const levelMatch = levelFilter === 'all' || course.level === levelFilter;
      return industryMatch && subjectMatch && levelMatch && (isSameDay(courseStartDate, today) || isAfter(courseStartDate, today));
    });
  }, [industryFilter, subjectFilter, levelFilter]);

  // Filter and sort courses for card/list view
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const industryMatch = industryFilter === 'all' || course.industry === industryFilter;
      const subjectMatch = subjectFilter === 'all' || course.subject === subjectFilter;
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
  return <div className={`min-h-full bg-background ${getBackground()}`}>
      <div className={`container mx-auto px-4 py-8 ${theme.layout === 'compact' ? 'space-y-4' : theme.layout === 'spacious' ? 'space-y-12' : 'space-y-8'}`}>
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${theme.designSystem === 'material' ? 'font-medium' : theme.designSystem === 'human' ? 'font-semibold' : 'font-bold'}`}>
            {getIcon('course')} Available Courses
          </h1>
          <p className="text-lg text-muted-foreground">
            Short, practical crash courses designed for busy professionals
          </p>
        </div>

        {/* Filters, Sort Controls and View Mode Toggle */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-card rounded-lg border relative">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filters</span>
          </div>
          
          <div className="flex flex-wrap gap-4 flex-1">
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

            <div className="min-w-[150px] mr-[20px]">
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
          <div className="flex items-center gap-4 ml-auto">
            <span className="font-medium">View:</span>
            <ToggleGroup type="single" value={viewMode} onValueChange={value => value && setViewMode(value)}>
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
        {viewMode === 'card' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCourses.map(course => <CourseCard key={course.id} course={course} />)}
          </div>}

        {/* List View */}
        {viewMode === 'list' && <div className="space-y-4">
            {filteredAndSortedCourses.map(course => <LongCourseCard key={course.id} course={course} />)}
          </div>}

        {/* Calendar View */}
        {viewMode === 'calendar' && <CoursesCalendarView courses={courses} industryFilter={industryFilter} subjectFilter={subjectFilter} levelFilter={levelFilter} calendarViewMode={calendarViewMode} setCalendarViewMode={setCalendarViewMode} currentDate={currentDate} setCurrentDate={setCurrentDate} />}

        {/* Map View */}
        {viewMode === 'map' && <PopularCoursesMapView courses={filteredAndSortedCourses} />}
      </div>
    </div>;
};

export default Courses;