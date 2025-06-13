import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';
import React from 'react';

interface OrgFilterProps {
    selectedOrgId: number | 'all';
    setSelectedOrgId: (id: number | 'all') => void;
    orgOptions: { id: number | 'all'; name: string }[];
}

const OrgFilter: React.FC<OrgFilterProps> = ({ selectedOrgId, setSelectedOrgId, orgOptions }) => (
    <div className="flex flex-col gap-4 mb-6 p-4 rounded-lg border relative bg-background">
        <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Organization</span>
        </div>
        <div className="min-w-[150px]">
            <Select value={String(selectedOrgId)} onValueChange={val => setSelectedOrgId(val === 'all' ? 'all' : Number(val))}>
                <SelectTrigger>
                    <SelectValue placeholder="Organization" />
                </SelectTrigger>
                <SelectContent>
                    {orgOptions.map(org => (
                        <SelectItem key={org.id} value={String(org.id)}>
                            {org.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    </div>
);

export default OrgFilter;
