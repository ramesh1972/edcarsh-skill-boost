
import React from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Users, BookOpen, Award } from 'lucide-react';

const Instructors = () => {
  const instructors = [
    {
      id: 1,
      name: "Sarah Chen",
      expertise: "React & Frontend Development",
      rating: 4.9,
      students: 1250,
      courses: 8,
      experience: "5+ years at Google",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Dr. Marcus Johnson",
      expertise: "Data Science & Python",
      rating: 4.8,
      students: 980,
      courses: 12,
      experience: "PhD in Data Science",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      expertise: "Digital Marketing",
      rating: 4.9,
      students: 2100,
      courses: 15,
      experience: "Marketing Director at Meta",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Expert Instructors</h1>
          <p className="text-lg text-muted-foreground">
            Learn from industry professionals with real-world experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((instructor) => (
            <Card key={instructor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {instructor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <CardTitle className="text-xl">{instructor.name}</CardTitle>
                <CardDescription>{instructor.expertise}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium">{instructor.rating}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <Users className="w-3 h-3" />
                    </div>
                    <p className="font-medium">{instructor.students}</p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <BookOpen className="w-3 h-3" />
                    </div>
                    <p className="font-medium">{instructor.courses}</p>
                    <p className="text-xs text-muted-foreground">Courses</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <Award className="w-3 h-3" />
                    </div>
                    <p className="font-medium text-xs">{instructor.experience}</p>
                  </div>
                </div>

                <Button className="w-full" variant="outline">View Profile</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Want to Become an Instructor?</CardTitle>
              <CardDescription>
                Share your expertise and earn up to $100/hour teaching crash courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg">Apply to Teach</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Instructors;
