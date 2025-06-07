
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getSubjectColor } from '@/data/masterData';
import { getInstructorById } from '@/data/instructors';
import { MapPin, Users, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { Course } from '@/types';

interface PopularCoursesMapViewProps {
  courses: Course[];
}

const PopularCoursesMapView: React.FC<PopularCoursesMapViewProps> = ({ courses }) => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  
  // Group courses by instructor location
  const coursesByLocation = useMemo(() => {
    const locationMap = new Map();
    
    courses.forEach(course => {
      const instructor = getInstructorById(course.instructorId);
      if (!instructor) return;
      
      const locationKey = `${instructor.city}, ${instructor.country}`;
      
      if (!locationMap.has(locationKey)) {
        locationMap.set(locationKey, {
          city: instructor.city,
          country: instructor.country,
          flag: instructor.flag,
          courses: [],
          totalStudents: 0,
          instructors: new Set()
        });
      }
      
      const location = locationMap.get(locationKey);
      location.courses.push(course);
      location.totalStudents += course.students;
      location.instructors.add(instructor.name);
    });
    
    return Array.from(locationMap.entries()).map(([key, value]) => ({
      location: key,
      ...value,
      instructorCount: value.instructors.size
    }));
  }, [courses]);

  // Get unique countries for filter
  const countries = ['all', ...Array.from(new Set(coursesByLocation.map(loc => loc.country)))];

  const filteredLocations = selectedRegion === 'all' 
    ? coursesByLocation 
    : coursesByLocation.filter(loc => loc.country === selectedRegion);

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
        <MapPin className="h-5 w-5 text-primary" />
        <span className="font-medium">Filter by Region:</span>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {countries.map(country => (
              <SelectItem key={country} value={country}>
                {country === 'all' ? 'All Regions' : country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="ml-auto text-sm text-muted-foreground">
          {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Map View - Visual representation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations
          .sort((a, b) => b.totalStudents - a.totalStudents)
          .map((location, index) => (
            <Card key={location.location} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span>{location.flag}</span>
                    <span>{location.city}</span>
                  </CardTitle>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    #{index + 1}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{location.country}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Location Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>{location.totalStudents} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span>{location.courses.length} courses</span>
                  </div>
                </div>

                {/* Top Courses Preview */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Popular Courses:</h4>
                  <div className="space-y-2">
                    {location.courses
                      .sort((a, b) => b.students - a.students)
                      .slice(0, 3)
                      .map(course => {
                        const instructor = getInstructorById(course.instructorId);
                        return (
                          <div key={course.id} className="p-2 bg-muted/50 rounded text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium truncate flex-1">{course.title}</span>
                              <Badge 
                                customColor={getSubjectColor(course.subject)} 
                                className="text-white text-xs ml-2"
                              >
                                {course.subject}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-muted-foreground">
                              <span>{instructor?.name}</span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {course.students}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    // This could navigate to a filtered view of courses by location
                    console.log(`View all courses in ${location.city}`);
                  }}
                >
                  View All Courses
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>

      {filteredLocations.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No courses found</h3>
          <p>No courses available in the selected region.</p>
        </div>
      )}
    </div>
  );
};

export default PopularCoursesMapView;
