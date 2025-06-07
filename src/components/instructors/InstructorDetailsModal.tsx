
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import InstructorDetails from './InstructorDetails';

interface Instructor {
  id?: number;
  name: string;
  image: string;
  experience: string;
  specialty: string;
  city: string;
  country: string;
  flag: string;
  description: string;
  rating?: number;
  students?: number;
  courses?: number;
  expertise?: string;
}

interface InstructorDetailsModalProps {
  instructor: Instructor | null;
  isOpen: boolean;
  onClose: () => void;
}

const InstructorDetailsModal: React.FC<InstructorDetailsModalProps> = ({
  instructor,
  isOpen,
  onClose
}) => {
  if (!instructor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <InstructorDetails instructor={instructor} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default InstructorDetailsModal;
