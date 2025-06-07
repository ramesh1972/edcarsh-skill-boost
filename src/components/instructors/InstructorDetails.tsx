
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, Users, BookOpen, Award, MapPin, Mail, Phone, Globe } from 'lucide-react';

interface Instructor {
  id?: number;
  name: string;
  image: string;
  experience: string;
  specialty: string;
  city: string;
  country: string;
  flag: string;
  description: string;
  rating?: number;
  students?: number;
  courses?: number;
  expertise?: string;
}

interface InstructorDetailsProps {
  instructor: Instructor;
  onClose?: () => void;
}

const InstructorDetails: React.FC<InstructorDetailsProps> = ({ instructor, onClose }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0">
        <CardHeader className="text-center pb-6">
          <Avatar className="w-32 h-32 mx-auto mb-4">
            <AvatarImage src={instructor.image} alt={instructor.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white text-4xl font-bold">
              {instructor.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl">{instructor.name}</CardTitle>
          <p className="text-xl text-muted-foreground">{instructor.specialty || instructor.expertise}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{instructor.city}, {instructor.country} {instructor.flag}</span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Stats Section */}
          {(instructor.rating || instructor.students || instructor.courses) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-primary/10 rounded-lg">
              {instructor.rating && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
                    <Star className="w-6 h-6 fill-current" />
                    <span className="text-2xl font-bold">{instructor.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
              )}
              {instructor.students && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-6 h-6 text-primary" />
                    <span className="text-2xl font-bold">{instructor.students}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Students</p>
                </div>
              )}
              {instructor.courses && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                    <span className="text-2xl font-bold">{instructor.courses}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Courses</p>
                </div>
              )}
            </div>
          )}

          {/* Experience Badge */}
          <div className="flex justify-center">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Award className="w-4 h-4 mr-2" />
              {instructor.experience}
            </Badge>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About {instructor.name}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {instructor.description}
            </p>
          </div>

          {/* Contact Section */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Send Message
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Schedule Call
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                View Profile
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-6">
            <Button size="lg">
              View Courses
            </Button>
            {onClose && (
              <Button variant="outline" size="lg" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorDetails;
