import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import TitleComponent from '@/components/TitleComponent';

const About = () => {
  const { theme, getIcon, getBackground } = useTheme();

  const values = [
    {
      iconName: "course",
      title: "Focused Learning",
      description: "Short, intensive courses that get straight to the point"
    },
    {
      iconName: "time",
      title: "Time Efficient",
      description: "Learn valuable skills in hours, not months"
    },
    {
      iconName: "price",
      title: "Affordable Access",
      description: "Quality education at just $25 per course"
    },
    {
      iconName: "instructor",
      title: "Expert Instructors",
      description: "Learn from industry professionals with real experience"
    },
    {
      iconName: "student",
      title: "Global Accessibility",
      description: "Multi-lingual courses available worldwide"
    },
    {
      iconName: "live",
      title: "Live & Interactive",
      description: "Real-time learning with immediate feedback"
    }
  ];

  return (
    <div className="min-h-full ">
      <div className="container mx-auto px-4 py-12 space-y-8">
        <TitleComponent
          title="About Us"
          subtitle="Learn more about our mission, values, and what drives us to deliver the best crash courses for professionals."
          iconName="about"
        />
        <div className={`container mx-auto px-4 py-8 ${theme.layout === 'compact' ? 'space-y-4' : theme.layout === 'spacious' ? 'space-y-12' : 'space-y-8'}`}>
          <div className="mb-12 text-center">
            <h6 className={`text-3xl font-bold mb-4 ${theme.designSystem === 'material' ? 'font-medium' : theme.designSystem === 'human' ? 'font-semibold' : 'font-bold'}`} style={{fontVariant: 'small-caps',  color: 'darkgreen', fontOpticalSizing: 'revert-layer'}} >
              "We're revolutionizing professional education with focused, affordable crash courses
              designed for busy professionals who want to learn new skills quickly and effectively."
            </h6>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className={`bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 hover:scale-[1.025] transition-transform duration-200 ${theme.designSystem === 'material' ? 'shadow-md' :
                theme.designSystem === 'fluent' ? 'border-2' :
                  'hover:shadow-lg'
              } ${theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''
              }`}>
              <CardHeader>
                <CardTitle className={`text-2xl ${theme.designSystem === 'material' ? 'font-medium' : 'font-bold'}`}>Our Mission</CardTitle>
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

            <Card className={`bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 hover:scale-[1.025] transition-transform duration-200 ${theme.designSystem === 'material' ? 'shadow-md' :
                theme.designSystem === 'fluent' ? 'border-2' :
                  'hover:shadow-lg'
              } ${theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''
              }`}>
              <CardHeader>
                <CardTitle className={`text-2xl ${theme.designSystem === 'material' ? 'font-medium' : 'font-bold'}`}>Why Choose EdCrash?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      {getIcon('time')}
                    </div>
                    <span className="text-sm">Courses range from 8-30 hours, not months</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      {getIcon('price')}
                    </div>
                    <span className="text-sm">Affordable at just $25 per course</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      {getIcon('instructor')}
                    </div>
                    <span className="text-sm">Live sessions with expert instructors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      {getIcon('student')}
                    </div>
                    <span className="text-sm">Multi-lingual support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-12">
            <h2 className={`text-3xl font-bold text-center mb-8 ${theme.designSystem === 'material' ? 'font-medium' : 'font-bold'}`}>Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <Card key={index} className={`bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 hover:scale-[1.025] transition-transform duration-200 text-center ${theme.designSystem === 'material' ? 'shadow-md' :
                    theme.designSystem === 'fluent' ? 'border-2' :
                      'hover:shadow-lg'
                  } ${theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''
                  }`}>
                  <CardHeader>
                    <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      {getIcon(value.iconName)}
                    </div>
                    <CardTitle className={`text-lg ${theme.designSystem === 'material' ? 'font-medium' : 'font-bold'}`}>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className={`bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 hover:scale-[1.025] transition-transform duration-200 max-w-4xl mx-auto ${theme.designSystem === 'material' ? 'shadow-md' :
              theme.designSystem === 'fluent' ? 'border-2' :
                'hover:shadow-lg'
            } ${theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''
            }`}>
            <CardHeader className="text-center">
              <CardTitle className={`text-2xl ${theme.designSystem === 'material' ? 'font-medium' : 'font-bold'}`}>Ready to Crash Your Learning Goals?</CardTitle>
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
    </div>
  );
};

export default About;
