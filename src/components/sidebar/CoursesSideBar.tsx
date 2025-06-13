import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import OrgFilter from '@/components/filters/OrgFilter';
import IndustrySubjectFilter from '@/components/filters/IndustrySubjectFilter';
import LevelFilter from '@/components/filters/LevelFilter';
import SortControls from '@/components/filters/SortControls';
import ScheduleStatusFilter from '@/components/filters/ScheduleStatusFilter';
import { DeepCourseInfo } from '@/types/courseTypes/courseInfo.type';

interface CoursesSideBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;

  selectedOrgId: number | 'all';
  setSelectedOrgId: (id: number | 'all') => void;
  orgOptions: { id: number | 'all'; name: string }[];
  
  selectedIndustryName: string;
  handleIndustryChange: (value: string) => void;
  availableIndustries: { id: number; name: string }[];
  selectedSubjectName: string;
  handleSubjectChange: (value: string) => void;
  availableSubjects: { id: number; name: string }[];
  
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  levels: string[];
  
  viewMode: string;
  
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortDirection: 'asc' | 'desc';
  toggleSortDirection: () => void;
  
  filteredAndSortedCourses: DeepCourseInfo[];
  scheduleStatus: string;
  setScheduleStatus: (status: string) => void;
}

const CoursesSideBar: React.FC<CoursesSideBarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  selectedOrgId,
  setSelectedOrgId,
  orgOptions,
  selectedIndustryName,
  handleIndustryChange,
  availableIndustries,
  selectedSubjectName,
  handleSubjectChange,
  availableSubjects,
  selectedLevel,
  setSelectedLevel,
  levels,
  viewMode,
  sortBy,
  setSortBy,
  sortDirection,
  toggleSortDirection,
  filteredAndSortedCourses,
  scheduleStatus,
  setScheduleStatus,
}) => (
  <aside className={`w-full lg:w-[330px] flex-shrink-0 mb-6 lg:mb-0 transition-all duration-300 ${sidebarOpen ? 'max-w-[330px] opacity-100' : 'max-w-0 opacity-0 pointer-events-none'}`}>
    <div className="sticky top-8">
      <div className="bg-card border rounded-lg p-4 shadow-sm">
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-semibold flex-1">Filters</h2>
          {/* Course count */}
          <div className="text-sm text-muted-foreground flex-grow-1 mr-2">
            {`${filteredAndSortedCourses.length} course${filteredAndSortedCourses.length !== 1 ? 's' : ''} found`}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 "
            aria-label={sidebarOpen ? 'Hide Filters' : 'Show Filters'}
            onClick={() => setSidebarOpen(o => !o)}
          >
            <span className="sr-only  max-w-fit">Toggle Filters</span>
            {sidebarOpen ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <Filter className="h-5 w-5" />
            )}
          </Button>
        </div>
        {sidebarOpen && (
          <>
            <OrgFilter
              selectedOrgId={selectedOrgId}
              setSelectedOrgId={setSelectedOrgId}
              orgOptions={orgOptions}
            />
            <ScheduleStatusFilter value={scheduleStatus} onChange={setScheduleStatus} />
            <IndustrySubjectFilter
              selectedIndustryName={selectedIndustryName}
              handleIndustryChange={handleIndustryChange}
              availableIndustries={availableIndustries}
              selectedSubjectName={selectedSubjectName}
              handleSubjectChange={handleSubjectChange}
              availableSubjects={availableSubjects}
            />
            <LevelFilter
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              levels={levels}
            />
            {viewMode !== 'calendar' && viewMode !== 'map' && (
              <div className="mt-6">
                <SortControls
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  sortDirection={sortDirection}
                  toggleSortDirection={toggleSortDirection}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  </aside>
);

export default CoursesSideBar;
