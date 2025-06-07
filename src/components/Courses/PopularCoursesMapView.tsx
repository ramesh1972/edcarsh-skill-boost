
import React, { useState, useMemo } from 'react';
import { Course } from '@/types';
import { ViewModeSelector } from './MapView/components/ViewModeSelector';
import { ViewMode } from './MapView/types';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getIndustryNameById, getSubjectNameById } from '@/data/masterData';

interface PopularCoursesMapViewProps {
  courses: Course[];
}

const COLORS = [
  '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', 
  '#059669', '#0891b2', '#0284c7', '#3b82f6', '#7c3aed',
  '#be185d', '#374151', '#1f2937', '#0f172a'
];

const PopularCoursesMapView: React.FC<PopularCoursesMapViewProps> = ({ courses }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('industry');

  const sunburstData = useMemo(() => {
    if (!courses.length) return [];

    if (viewMode === 'industry') {
      const industryMap = new Map();
      
      courses.forEach(course => {
        const industryName = getIndustryNameById(course.industryId);
        if (!industryMap.has(industryName)) {
          industryMap.set(industryName, 0);
        }
        industryMap.set(industryName, industryMap.get(industryName) + course.students);
      });

      return Array.from(industryMap.entries()).map(([name, students], index) => ({
        name,
        value: students,
        fill: COLORS[index % COLORS.length]
      }));
    }

    if (viewMode === 'subject') {
      const subjectMap = new Map();
      
      courses.forEach(course => {
        const subjectName = getSubjectNameById(course.industryId, course.subjectId);
        const industryName = getIndustryNameById(course.industryId);
        const fullName = `${subjectName} (${industryName})`;
        
        if (!subjectMap.has(fullName)) {
          subjectMap.set(fullName, 0);
        }
        subjectMap.set(fullName, subjectMap.get(fullName) + course.students);
      });

      return Array.from(subjectMap.entries()).map(([name, students], index) => ({
        name,
        value: students,
        fill: COLORS[index % COLORS.length]
      }));
    }

    if (viewMode === 'topic') {
      const topicMap = new Map();
      
      courses.forEach(course => {
        course.topics?.forEach(topic => {
          if (!topicMap.has(topic)) {
            topicMap.set(topic, 0);
          }
          topicMap.set(topic, topicMap.get(topic) + course.students);
        });
      });

      return Array.from(topicMap.entries()).map(([name, students], index) => ({
        name,
        value: students,
        fill: COLORS[index % COLORS.length]
      }));
    }

    if (viewMode === 'courses') {
      return courses.map((course, index) => ({
        name: course.title,
        value: course.students,
        fill: COLORS[index % COLORS.length]
      }));
    }

    return [];
  }, [courses, viewMode]);

  const chartConfig = useMemo(() => {
    const config: any = {};
    sunburstData.forEach((item, index) => {
      config[item.name] = {
        label: item.name,
        color: item.fill
      };
    });
    return config;
  }, [sunburstData]);

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const renderCustomLabel = (entry: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, name, value } = entry;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    // Only show label if the slice is large enough
    const percentage = (value / sunburstData.reduce((sum, item) => sum + item.value, 0)) * 100;
    if (percentage < 5) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {name.length > 15 ? `${name.substring(0, 12)}...` : name}
      </text>
    );
  };

  return (
    <div className="w-full space-y-6">
      <ViewModeSelector viewMode={viewMode} onViewModeChange={handleViewModeChange} />
      
      <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden border">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sunburstData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={250}
                innerRadius={80}
                fill="#8884d8"
                dataKey="value"
                stroke="#ffffff"
                strokeWidth={2}
              >
                {sunburstData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border">
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {data.value.toLocaleString()} students
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="text-sm text-muted-foreground text-center">
        {sunburstData.length} {viewMode === 'courses' ? 'courses' : viewMode === 'industry' ? 'industries' : viewMode === 'subject' ? 'subjects' : 'topics'} displayed
      </div>
    </div>
  );
};

export default PopularCoursesMapView;
