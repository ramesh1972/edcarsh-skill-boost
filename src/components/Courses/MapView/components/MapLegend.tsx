
import React from 'react';
import { MapRange } from '../types';

interface MapLegendProps {
  ranges: MapRange[];
}

const COLORS = [
  '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', 
  '#059669', '#0891b2', '#0284c7', '#3b82f6'
];

export const MapLegend: React.FC<MapLegendProps> = ({ ranges }) => {
  if (!ranges || ranges.length === 0) return null;

  return (
    <div className="mb-8 flex flex-wrap gap-4 justify-center text-sm">
      {ranges.map((range, index) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded" 
            style={{ backgroundColor: COLORS[index] || '#6b7280' }}
          ></div>
          <span>
            {range.label} students {index === 0 ? '(center)' : index === ranges.length - 1 ? '(outer)' : ''}
          </span>
        </div>
      ))}
    </div>
  );
};
