import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';

interface LevelFilterProps {
    selectedLevel: string;
    setSelectedLevel: (value: string) => void;
    levels: string[];
}

const LevelFilter: React.FC<LevelFilterProps> = ({ selectedLevel, setSelectedLevel, levels }) => (
    <div className="flex flex-col gap-4 mb-6 p-4  rounded-lg border relative bg-background">
        <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Expertise</span>
        </div>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger>
                <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem key="all" value="all">
                    All Levels
                </SelectItem>
                {levels.map(level => (
                    <SelectItem key={level} value={level}>
                        {level}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>

);

export default LevelFilter;
