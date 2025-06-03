
import { MapRange } from '../types';

export const calculateDynamicRanges = (values: number[], rangeCount: number = 9): MapRange[] => {
  if (values.length === 0) return [];
  
  const sortedValues = [...values].sort((a, b) => a - b);
  const min = sortedValues[0];
  const max = sortedValues[sortedValues.length - 1];
  
  if (min === max) {
    return [{ min, max, label: `${min}` }];
  }
  
  const ranges = [];
  const step = (max - min) / rangeCount;
  
  for (let i = 0; i < rangeCount; i++) {
    const rangeMin = Math.floor(min + (step * i));
    const rangeMax = i === rangeCount - 1 ? max : Math.floor(min + (step * (i + 1)) - 1);
    
    let label;
    if (i === rangeCount - 1) {
      label = `${rangeMin}+`;
    } else if (rangeMin === rangeMax) {
      label = `${rangeMin}`;
    } else {
      label = `${rangeMin}-${rangeMax}`;
    }
    
    ranges.push({ min: rangeMin, max: rangeMax, label });
  }
  
  return ranges.reverse(); // Highest first for inside-out positioning
};
