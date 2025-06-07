
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getInstructorById } from '@/data/instructors';
import InstructorDetails from '@/components/instructors/InstructorDetails';

const InstructorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <Navigate to="/instructors" replace />;
  }
  
  const instructor = getInstructorById(parseInt(id));
  
  if (!instructor) {
    return <Navigate to="/instructors" replace />;
  }

  return <InstructorDetails instructor={instructor} />;
};

export default InstructorDetailsPage;
