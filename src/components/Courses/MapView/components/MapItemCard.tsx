
import React from 'react';
import { ViewMode, MapDataItem } from '../types';

interface MapItemCardProps {
  item: MapDataItem;
  viewMode: ViewMode;
}

export const MapItemCard: React.FC<MapItemCardProps> = ({ item, viewMode }) => {
  if (viewMode === 'courses') {
    return (
      <div className="text-center p-3 bg-white/90 border-2 border-gray-300 rounded-lg shadow-sm max-w-[100px]">
        <div className="font-bold leading-tight mb-1 break-anywhere">
          {item.title}
        </div>
        <div className="text-xs font-medium">
          {item.students.toLocaleString()} students
        </div>
        <div className="text-xs opacity-70">
          {item.subject}
        </div>
      </div>
    );
  }

  if (viewMode === 'industry') {
    return (
      <div className="text-center p-3 bg-blue-50/90 border-2 border-blue-300 rounded-lg shadow-sm max-w-[100px]">
        <div className="font-bold leading-tight mb-1 break-anywhere">
          {item.title}
        </div>
        <div className="text-xs font-medium">
          {item.students.toLocaleString()} students
        </div>
        <div className="text-xs opacity-70">
          {item.courseCount} courses
        </div>
      </div>
    );
  }

  if (viewMode === 'subject') {
    return (
      <div className="text-center p-3 bg-purple-50/90 border-2 border-purple-300 rounded-lg shadow-sm max-w-[100px]">
        <div className="font-bold leading-tight mb-1 break-anywhere">
          {item.title}
        </div>
        <div className="text-xs font-medium mb-1">
          {item.industry}
        </div>
        <div className="text-xs font-medium">
          {item.students.toLocaleString()} students
        </div>
        <div className="text-xs opacity-70">
          {item.courseCount} courses
        </div>
      </div>
    );
  }

  if (viewMode === 'tag') {
    return (
      <div className="text-center p-3 bg-green-50/90 border-2 border-green-300 rounded-lg shadow-sm max-w-[100px]">
        <div className="font-bold leading-tight mb-1 break-anywhere">
          {item.title}
        </div>
        <div className="text-xs font-medium mb-1">
          {item.industry} • {item.subject}
        </div>
        <div className="text-xs font-medium">
          {item.students.toLocaleString()} students
        </div>
        <div className="text-xs opacity-70">
          {item.courseCount} courses
        </div>
      </div>
    );
  }

  return null;
};
