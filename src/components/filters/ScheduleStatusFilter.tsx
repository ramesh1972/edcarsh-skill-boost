import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';

interface ScheduleStatusFilterProps {
    value: string;
    onChange: (value: string) => void;
}

const options = [
    { value: 'all', label: 'All' },
    { value: 'past', label: 'Past' },
    { value: 'active', label: 'Active Running' },
    { value: 'future', label: 'Future' },
    { value: 'noschedule', label: 'Yet to Schedule' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'draft', label: 'Draft' }
];

const ScheduleStatusFilter: React.FC<ScheduleStatusFilterProps> = ({ value, onChange }) => (
    <div className="flex flex-col gap-4 mb-6 p-4 rounded-lg border relative bg-background">
        <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">Schedule Status</span>
        </div>
        <div className="min-w-[150px]">
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Schedule Status" />
                </SelectTrigger>
                <SelectContent>
                    {options.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    </div>
);

export default ScheduleStatusFilter;
