
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Instructor } from '@/types';
import InstructorDetails from './InstructorDetails';

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
