
import React from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, DollarSign, Calendar } from 'lucide-react';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "React Development Crash Course",
      description: "Master React in just 16 hours with hands-on projects",
      duration: "16 hours",
      price: "$25",
      students: 250,
      nextSession: "Dec 15, 2024"
    },
    {
      id: 2,
      title: "Python for Data Science",
      description: "Learn Python data analysis tools and techniques",
      duration: "20 hours",
      price: "$25",
      students: 180,
      nextSession: "Dec 18, 2024"
    },
    {
      id: 3,
      title: "Digital Marketing Essentials",
      description: "Complete digital marketing strategy in 12 hours",
      duration: "12 hours",
      price: "$25",
      students: 320,
      nextSession: "Dec 20, 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Available Courses</h1>
          <p className="text-lg text-muted-foreground">
            Short, practical crash courses designed for busy professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students} enrolled
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    {course.price}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {course.nextSession}
                  </div>
                </div>
                <Button className="w-full">Enroll Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
