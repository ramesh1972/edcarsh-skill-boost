import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { testimonials } from '@/data/testimonials';
import TitleComponent from '@/components/common/TitleComponent';

const Testimonials = () => {
  const { theme, getIcon, getBackground } = useTheme();

  return (
    <div className="min-h-full ">
      <div className="container mx-auto px-4 py-12 space-y-8">
        <TitleComponent
          title="Testimonials"
          subtitle="Hear from professionals who have accelerated their careers with our crash courses."
          iconName="testimonial"
        />
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Quote className="w-6 h-6 text-primary mb-2 opacity-50" />
                    <p className="text-sm text-muted-foreground mb-3">
                      "{testimonial.text}"
                    </p>
                    <p className="text-xs font-medium text-primary">
                      Course: {testimonial.course}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Card className={`max-w-4xl mx-auto ${
              theme.designSystem === 'material' ? 'shadow-md' : 
              theme.designSystem === 'fluent' ? 'border-2' : 
              'hover:shadow-lg'
            } ${
              theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''
            }`}>
              <CardHeader>
                <CardTitle className={`text-2xl ${theme.designSystem === 'material' ? 'font-medium' : 'font-bold'}`}>
                  Join Thousands of Successful Students
                </CardTitle>
                <CardDescription className="text-lg">
                  Start your learning journey today with our affordable crash courses
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {getIcon('student')}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
                  <p className="text-sm text-muted-foreground">Students Enrolled</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2 text-yellow-500">
                    <Star className="w-6 h-6 fill-current" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {getIcon('course')}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {getIcon('price')}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">$25</div>
                  <p className="text-sm text-muted-foreground">Average Cost</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
};

export default Testimonials;
