
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import InstructorDetails from '@/components/instructors/InstructorDetails';
import { getInstructorById } from '@/data/instructors';

const InstructorDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const instructor = getInstructorById(parseInt(id || ''));

  if (!instructor) {
    return <Navigate to="/instructors" replace />;
  }

  return (
    <div className="min-h-full">
      <div className="container mx-auto px-4 py-12">
        <InstructorDetails instructor={instructor} />
      </div>
    </div>
  );
};

export default InstructorDetail;
