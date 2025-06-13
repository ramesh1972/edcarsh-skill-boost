import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LevelFilter from './LevelFilter';

interface IndustrySubjectFilterProps {
  selectedIndustryName: string;
  handleIndustryChange: (value: string) => void;
  availableIndustries: { id: number; name: string }[];
  selectedSubjectName: string;
  handleSubjectChange: (value: string) => void;
  availableSubjects: { id: number; name: string }[];
}

const IndustrySubjectFilter: React.FC<IndustrySubjectFilterProps> = ({
  selectedIndustryName,
  handleIndustryChange,
  availableIndustries,
  selectedSubjectName,
  handleSubjectChange,
  availableSubjects
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6 p-4  rounded-lg border relative bg-background">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        <span className="font-medium">Industry & Subject</span>
      </div>
      <div className="flex flex-wrap gap-4 flex-1">
        <div className="min-w-[150px]">
          <Select value={selectedIndustryName} onValueChange={handleIndustryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all" value="all">
                All Industries
              </SelectItem>
              {availableIndustries.map(industry => (
                <SelectItem key={industry.id} value={industry.name}>
                  {industry.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="min-w-[150px] mr-[20px]">
          <Select value={selectedSubjectName} onValueChange={handleSubjectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all" value="all">
                All Subjects
              </SelectItem>
              {availableSubjects.map(subject => (
                <SelectItem key={subject.id} value={subject.name}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
       
      </div>
     
    </div>
  );
};

export default IndustrySubjectFilter;
