import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '../ui/button';

interface SortControlsProps {
    sortBy: string;
    setSortBy: (value: string) => void;
    sortDirection: 'asc' | 'desc';
    toggleSortDirection: () => void;
}

const SortControls: React.FC<SortControlsProps> = ({ sortBy, setSortBy, sortDirection, toggleSortDirection }) => (
    <div className="flex flex-col gap-4 mb-6 p-4  rounded-lg border relative bg-background">
        <div className="items-center gap-2 flex">
            <ArrowUpDown className="h-4 w-4" />
            <span className="font-medium">Sort</span>
        </div>
        <div className="flex flex-row items-center gap-2 flex-grow">
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
        </div>
    </div>
);

export default SortControls;
