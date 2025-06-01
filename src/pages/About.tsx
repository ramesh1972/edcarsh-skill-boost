
import React from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Clock, DollarSign, Users, Globe, Zap } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Focused Learning",
      description: "Short, intensive courses that get straight to the point"
    },
    {
      icon: Clock,
      title: "Time Efficient",
      description: "Learn valuable skills in hours, not months"
    },
    {
      icon: DollarSign,
      title: "Affordable Access",
      description: "Quality education at just $25 per course"
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals with real experience"
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Multi-lingual courses available worldwide"
    },
    {
      icon: Zap,
      title: "Live & Interactive",
      description: "Real-time learning with immediate feedback"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">About EdCrash</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're revolutionizing professional education with focused, affordable crash courses 
            designed for busy professionals who want to learn new skills quickly and effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                EdCrash exists to make professional skill development accessible to everyone. 
                We believe that learning shouldn't be a months-long commitment or cost thousands of dollars.
              </p>
              <p className="text-muted-foreground">
                Our crash courses are designed to deliver maximum value in minimum time, 
                focusing on practical skills you can apply immediately in your career.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary">Practical Learning</Badge>
                <Badge variant="secondary">Industry-Focused</Badge>
                <Badge variant="secondary">Affordable</Badge>
                <Badge variant="secondary">Live Sessions</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Why Choose EdCrash?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">Courses range from 8-30 hours, not months</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">Affordable at just $25 per course</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">Live sessions with expert instructors</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">Multi-lingual support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Ready to Crash Your Learning Goals?</CardTitle>
            <CardDescription className="text-lg">
              Join thousands of professionals who've accelerated their careers with EdCrash
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <div className="text-2xl font-bold text-primary">5,000+</div>
                <p className="text-sm text-muted-foreground">Students Taught</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">150+</div>
                <p className="text-sm text-muted-foreground">Courses Available</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">50+</div>
                <p className="text-sm text-muted-foreground">Expert Instructors</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">15</div>
                <p className="text-sm text-muted-foreground">Languages Supported</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
