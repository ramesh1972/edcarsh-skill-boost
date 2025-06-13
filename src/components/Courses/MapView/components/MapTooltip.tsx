

import React from 'react';
import { ViewMode, MapDataItem } from '../types';

interface MapTooltipProps {
  item: MapDataItem;
  viewMode: ViewMode;
}

export const MapTooltip: React.FC<MapTooltipProps> = ({ item, viewMode }) => {
  const getTooltipContent = () => {
    if (viewMode === 'courses') {
      return (
        <div className="max-w-[200px]">
          {item.title} - {item.students} students
          <div className="text-xs opacity-75">{item.tags?.join(', ')} • {item.subject}</div>
        </div>
      );
    }

    if (viewMode === 'industry') {
      return `${item.title} - ${item.students.toLocaleString()} students across ${item.courseCount} courses`;
    }

    if (viewMode === 'subject') {
      return `${item.title} (${item.industry}) - ${item.students.toLocaleString()} students across ${item.courseCount} courses`;
    }

    if (viewMode === 'tag') {
      return `${item.title} (${item.industry} • ${item.subject}) - ${item.students.toLocaleString()} students across ${item.courseCount} courses`;
    }

    return '';
  };

  return (
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20 max-w-[200px] break-words">
      {getTooltipContent()}
    </div>
  );
};

