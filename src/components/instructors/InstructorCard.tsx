
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Info } from 'lucide-react';

interface Instructor {
  name: string;
  image: string;
  experience: string;
  specialty: string;
  city: string;
  country: string;
  flag: string;
  description: string;
}

interface InstructorCardProps {
  instructor: Instructor;
  hideDescription?: boolean;
}

const InstructorCard: React.FC<InstructorCardProps> = ({
  instructor,
  hideDescription = false
}) => {
  return (
    <div className="col-span-1 flex flex-col mb-1 p-0">
      <h4 className="text-sm font-medium mb-3">Instructor:</h4>
      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage src={instructor.image} alt={instructor.name} className="rounded-t-full rounded-b-0 object-cover" />
          <AvatarFallback className="rounded-full">
            {instructor.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h5 className="font-medium text-sm">{instructor.name}</h5>
            <span className="text-xs">{instructor.flag}</span>
            <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
              <Info className="h-3 w-3 mr-1" />
              About
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mb-1">{instructor.specialty}</p>
          <p className="text-xs text-muted-foreground">{instructor.experience} • {instructor.city}, {instructor.country}</p>
        </div>
      </div>
      {!hideDescription && (
        <p className="text-xs text-muted-foreground line-clamp-4">{instructor.description}</p>
      )}
    </div>
  );
};

export default InstructorCard;
