import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { Filter, ArrowUpDown, LayoutGrid, List, Calendar as CalendarIcon, MapPin, ArrowUp, ArrowDown } from 'lucide-react';
import { isAfter, parseISO, isSameDay, set, sub, isBefore } from 'date-fns';

import CourseCard from '@/components/Courses/ListView/CourseCard';
import LongCourseCard from '@/components/Courses/ListView/LongCourseCard';
import CoursesCalendarView from '@/components/Courses/CalendarView/CoursesCalendarView';
import PopularCoursesMapView from '@/components/Courses/MapView/PopularCoursesMapView';
import IndustrySubjectFilter from '../components/filters/IndustrySubjectFilter';
import SortControls from '../components/filters/SortControls';
import OrgFilter from '../components/filters/OrgFilter';
import CoursesSideBar from '@/components/sidebar/CoursesSideBar';
import { getIndustries, getIndustryById, getIndustryByName, getSubjectBySubjectId, getSubjectBySubjectName, getSubjects, getSubjectsByIndustryId, getSubjectsByIndustryName } from '@/adapters/industrySubjectAdpator';
import { getAllCourseSchedules, getCourseInfoDeep, getCourseSchedules, getNextNCourseSchedules, getStatsForCourse } from '@/adapters/coursesDataAdapter';
import { getOrgCourses, getOrgDeepCoursesInfo } from '@/adapters/orgDataAdapter';
import { Course, CourseSchedule, DeepCourseInfo, Industry, Subject } from '@/types';
import TitleComponent from '@/components/common/TitleComponent';
import LevelFilter from '@/components/filters/LevelFilter';
import { orgs } from '@/data/orgData/orgs';
import { KnowledgeGraphView } from '../components/Courses/KnowledgeGraphView';

const Courses = () => {
  const {
    theme,
    getIcon,
    getBackground
  } = useTheme();

  const [selectedIndustry, setSelectedIndustry] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [selectedIndustryName, setSelectedIndustryName] = useState('all');
  const [selectedSubjectName, setSelectedSubjectName] = useState('all');
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);
  const [availableIndustries, setAvailableIndustries] = useState<Industry[]>(getIndustries());
  const [selectedLevel, setSelectedLevel] = useState('all');

  const [sortBy, setSortBy] = useState('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const [viewMode, setViewMode] = useState('card');
  const [calendarViewMode, setCalendarViewMode] = useState('month');

  const [currentDate, setCurrentDate] = useState(new Date());

  const [deepCourseInfos, setDeepCourseInfos] = useState<DeepCourseInfo[]>(getOrgDeepCoursesInfo(0));
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Add Org filter state
  const [selectedOrgId, setSelectedOrgId] = useState<number | 'all'>('all');
  const orgOptions = [
    { id: 'all' as const, name: 'All Organizations' },
    ...orgs.map(org => ({ id: org.id as number | 'all', name: org.name }))
  ];

  const [scheduleStatus, setScheduleStatus] = useState<string>('all');

  // Add state for knowledge graph view node types
  const [graphNodeTypes, setGraphNodeTypes] = useState({
    industries: true,
    subjects: true,
    courses: true,
    topics: true,
    instructors: false,
    learners: false,
    orgs: false,
  });

  const getAvailableSubjects = (industryid: number) => {
    return industryid === 0
      ? []
      : [...getSubjectsByIndustryId(industryid)];
  }

  // Reset subject filter when industry changes
  const handleIndustryChange = (value: string) => {
    const industryId = value === 'all' ? 0 : getIndustryByName(value).id;
    setSelectedIndustry(industryId);
    setAvailableSubjects(getAvailableSubjects(industryId));
    setSelectedSubject(0); // Reset subject when industry changes
    setSelectedIndustryName(value);
    setSelectedSubjectName('all');
  };

  const handleSubjectChange = (value: string) => {
    const subjectId = value === 'all' ? 0 : getSubjectBySubjectName(value).id;
    setSelectedSubject(subjectId);
    setSelectedSubjectName(value);
  }

  // Update deepCourseInfos when org changes
  useEffect(() => {
    setDeepCourseInfos(
      selectedOrgId === 'all' ? getOrgDeepCoursesInfo(0) : getOrgDeepCoursesInfo(selectedOrgId as number)
    );

    // set availableIndustries based on selected org
    const orgCourses = getOrgCourses(selectedOrgId as number);
    const industryIds = new Set(orgCourses.map(course => course.industryId));
    if (selectedOrgId === 'all') {
      setAvailableIndustries(getIndustries());
    } else {

      setAvailableIndustries(getIndustries().filter(industry => industryIds.has(industry.id)));
    }

    // set availableSubjects based on org and industry
    if (selectedIndustry === 0) {

      setAvailableSubjects([]);
    } else {
      const orgCourses = getOrgCourses(selectedOrgId as number);
      const subjects = getIndustryById(selectedIndustry).subjects;

      setAvailableSubjects(subjects);
    }
  }, [selectedIndustry, selectedOrgId]);

  // Get unique levels for filter options
  const levels = [...Array.from(new Set(deepCourseInfos.map(course => course.level)))];

  // Filter and sort deepCourseInfos for card/list view
  const filteredAndSortedCourses = useMemo(() => {
    let filtered: DeepCourseInfo[] = deepCourseInfos.map(course => {
      course.noSchedules = false;
      const industryMatch = selectedIndustry === 0 || course.industryId === selectedIndustry;
      const subjectMatch = selectedSubject === 0 || course.subjectId === selectedSubject;
      const levelMatch = selectedLevel === 'all' || course.level === selectedLevel;

      // Schedule status filter
      let scheduleMatch = true;
      if (scheduleStatus === 'past') {
        scheduleMatch = course.schedules && course.schedules.length > 0 && course.schedules.some(s => s.isPast);
      } else if (scheduleStatus === 'active') {
        scheduleMatch = course.schedules && course.schedules.length > 0 && course.schedules.some(s => s.isActive);
      } else if (scheduleStatus === 'future') {
        scheduleMatch = !course.schedules || course.schedules.length === 0 || course.schedules.every(s => s.isFuture);
      }


      if (industryMatch && subjectMatch && levelMatch && scheduleMatch) {
        // Only show the most recent schedule (if any)
        if (scheduleStatus === 'noschedule' && course.noSchedules) {
          return { ...course };
        }

        if (course.schedules && course.schedules.length > 0) {
          // Prefer active, then future, then past (by date desc)
          const sorted = [...course.schedules].sort((a, b) => {
            const dateA = new Date(a.startDate ?? a.endDate ?? 0).getTime();
            const dateB = new Date(b.startDate ?? b.endDate ?? 0).getTime();
            return dateB - dateA;
          });


          if (scheduleStatus === 'active') {
            return sorted.find(s => s.isActive && !s.isFuture && !s.isPast) !== undefined ? course : undefined;
          } else if (scheduleStatus === 'future') {
            return sorted.find(s => s.isFuture && !s.isActive && !s.isPast) !== undefined ? course : undefined;
          } else if (scheduleStatus === 'past') {
            const notPast = course.schedules.filter(s => s.isActive || s.isFuture);
            const past = course.schedules.filter(s => s.isPast);
            return past.length > 0 && notPast.length === 0 ? course : undefined;
          } else {
            return course;
          }
        }
        return { ...course };
      }
    }) as DeepCourseInfo[];

    // filter out undefined values
    filtered = filtered.filter(course => course !== undefined);

    // Sort deepCourseInfos
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'students':
          {
            const statsA = getStatsForCourse(a.id);
            const statsB = getStatsForCourse(b.id);
            comparison = statsB.enrollments - statsA.enrollments;
            break;
          }
        case 'duration':
          comparison = a.durationHours - b.durationHours;
          break;
        default:
          comparison = 0;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    }) as DeepCourseInfo[];

    return filtered as DeepCourseInfo[];
  }, [deepCourseInfos, selectedIndustry, selectedSubject, selectedLevel, sortBy, sortDirection, scheduleStatus]);

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return <div className={`min-h-full bg-background ${getBackground()}`}>
    <div className={`container mx-auto px-4 py-8 ${theme.layout === 'compact' ? 'space-y-4' : theme.layout === 'spacious' ? 'space-y-12' : 'space-y-8'}`}>
      <TitleComponent
        title="Available Courses"
        subtitle="Short, practical crash deepCourseInfos designed for busy professionals"
        iconName="course"
      />

      {/* Layout: Sidebar for Filters + Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters (Collapsible) */}
        <CoursesSideBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          selectedOrgId={selectedOrgId}
          setSelectedOrgId={setSelectedOrgId}
          orgOptions={orgOptions}
          selectedIndustryName={selectedIndustryName}
          handleIndustryChange={handleIndustryChange}
          availableIndustries={availableIndustries.map(({ id, name }) => ({ id, name }))}
          selectedSubjectName={selectedSubjectName}
          handleSubjectChange={handleSubjectChange}
          availableSubjects={availableSubjects.map(({ id, name }) => ({ id, name }))}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          levels={levels}
          viewMode={viewMode}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortDirection={sortDirection}
          toggleSortDirection={toggleSortDirection}
          filteredAndSortedCourses={filteredAndSortedCourses}
          scheduleStatus={scheduleStatus}
          setScheduleStatus={setScheduleStatus}
        />
        {/* Main Content */}
        <main className="flex-1">
          <div className="flex items-center bg-primary/70 sticky top-8 justify-between rounded border p-2 shadow-sm z-10 mb-4">
            {/* Sidebar Toggle Button for mobile (always visible at top on mobile) */}
            <div className="flex top-2 z-20 max-w-fit">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSidebarOpen(o => !o)}
                className="flex items-center bg-secondary gap-2 w-full justify-center"
              >
                <Filter className="h-4 w-4" />
                <span>{sidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
              </Button>
            </div>
            {/* View Mode Toggle */}
            <div className="flex gap-2 items-center sticky top-2 z-30 backdrop-blur border-b border-border py-2">
              <span className="text-secondary text-sm font-medium mr-2">View:</span>
              <Button
                variant={viewMode === 'card' ? 'default' : 'outline'}
                aria-label="Card View"
                onClick={() => setViewMode('card')}
                className="flex items-center gap-1 px-3"
              >
                <LayoutGrid className="h-5 w-5" />
                <span className="hidden sm:inline text-xs font-medium">Card</span>
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                aria-label="List View"
                onClick={() => setViewMode('list')}
                className="flex items-center gap-1 px-3"
              >
                <List className="h-5 w-5" />
                <span className="hidden sm:inline text-xs font-medium">List</span>
              </Button>
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'outline'}
                aria-label="Calendar View"
                onClick={() => setViewMode('calendar')}
                className="flex items-center gap-1 px-3"
              >
                <CalendarIcon className="h-5 w-5" />
                <span className="hidden sm:inline text-xs font-medium">Calendar</span>
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                aria-label="Map View"
                onClick={() => setViewMode('map')}
                className="flex items-center gap-1 px-3"
              >
                <MapPin className="h-5 w-5" />
                <span className="hidden sm:inline text-xs font-medium">Map</span>
              </Button>
              <Button
                variant={viewMode === 'graph' ? 'default' : 'outline'}
                aria-label="Knowledge Graph View"
                onClick={() => setViewMode('graph')}
                className="flex items-center gap-1 px-3"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="12" y1="3" x2="12" y2="9" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="15" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/><line x1="3" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2"/><line x1="15" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2"/></svg>
                <span className="hidden sm:inline text-xs font-medium">Graph</span>
              </Button>
            </div>
          </div>
          {/* Card View */}
          {viewMode === 'card' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedCourses.map(course => (
                course !== undefined
                  ? <CourseCard key={course.id} deepCourseInfo={course} />
                  : null
              ))}
            </div>
          )}
          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredAndSortedCourses.map(course => (
                course !== undefined
                  ? <LongCourseCard key={course.id} deepCourseInfo={course} />
                  : null
              ))}
            </div>
          )}
          {/* Calendar View */}
          {viewMode === 'calendar' && (
            <CoursesCalendarView
              deepCourseInfos={filteredAndSortedCourses}
              selectedIndustry={selectedIndustry}
              selectedSubject={selectedSubject}
              selectedLevel={selectedLevel}
              calendarViewMode={calendarViewMode}
              setCalendarViewMode={setCalendarViewMode}
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
            />
          )}
          {/* Map View */}
          {viewMode === 'map' && (
            <PopularCoursesMapView deepCourseInfos={filteredAndSortedCourses} />
          )}
          {/* Knowledge Graph View (reagraph) */}
          {viewMode === 'graph' && (
            <KnowledgeGraphView
              industries={availableIndustries}
              subjects={availableSubjects?.length === 0 ? getSubjects() : availableSubjects}
              courses={filteredAndSortedCourses.length === 0 ? getOrgDeepCoursesInfo(0) : filteredAndSortedCourses}
              topics={[]} // TODO: extract topics from courses
              instructors={[]} // TODO: get instructors for filtered courses
              learners={[]} // TODO: get learners for filtered courses
              orgs={orgs}
              selectedIndustries={selectedIndustry === 0 ? [] : [String(selectedIndustry)]}
              selectedSubjects={selectedSubject === 0 ? [] : [String(selectedSubject)]}
              selectedOrgs={selectedOrgId === 'all' ? [] : [String(selectedOrgId)]}
              selectedLevels={selectedLevel === 'all' ? [] : [selectedLevel]}
              selectedScheduleStatus={scheduleStatus}
              visibleNodeTypes={graphNodeTypes}
              onVisibleNodeTypesChange={setGraphNodeTypes}
            />
          )}
          
        </main>
      </div>
    </div>
  </div>;
};

export default Courses;