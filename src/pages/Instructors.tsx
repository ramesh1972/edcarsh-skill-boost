import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Users, BookOpen, Award } from 'lucide-react';
import TitleComponent from '@/components/common/TitleComponent';

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
    <div className="min-h-full ">
      <div className="container mx-auto px-4 py-12 space-y-8">
        <TitleComponent
          title="Instructors"
          subtitle="Meet our expert instructors who bring real-world experience to every course."
          iconName="instructor"
        />
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((instructor) => (
              <Card key={instructor.id} className="bg-transparent border-0">
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
            <Card className="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 hover:scale-[1.025] transition-transform duration-200 max-w-2xl mx-auto">
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
