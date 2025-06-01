
import React from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { testimonials } from '@/data/testimonials';

const Testimonials = () => {
  const { theme, getIcon, getBackground } = useTheme();

  return (
    <div className={`min-h-screen bg-background ${getBackground()}`}>
      <Header />
      <div className={`container mx-auto px-4 py-8 ${theme.layout === 'compact' ? 'space-y-4' : theme.layout === 'spacious' ? 'space-y-12' : 'space-y-8'}`}>
        <div className="mb-8 text-center animate-slide-in-up">
          <h1 className={`text-4xl font-bold mb-4 flex items-center justify-center gap-3 hover-color-shift ${theme.designSystem === 'material' ? 'font-medium' : theme.designSystem === 'human' ? 'font-semibold' : 'font-bold'}`}>
            <span className="hover-scale">{getIcon('student')}</span> Student Success Stories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-in-up animate-delay-200">
            Hear from professionals who've transformed their careers with our crash courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className={`hover:shadow-lg transition-all duration-300 hover-lift hover-glow hover-border-glow ${
                index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'
              } animate-delay-${(index % 6 + 1) * 100}`}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold hover-scale">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <CardTitle className="text-lg hover-color-shift">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current hover-scale" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Quote className="w-6 h-6 text-primary mb-2 opacity-50 hover-scale" />
                  <p className="text-sm text-muted-foreground mb-3">
                    "{testimonial.text}"
                  </p>
                  <p className="text-xs font-medium text-primary hover-color-shift">
                    Course: {testimonial.course}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-slide-in-up animate-delay-500">
          <Card className={`max-w-4xl mx-auto hover-lift hover-glow ${
            theme.designSystem === 'material' ? 'shadow-md' : 
            theme.designSystem === 'fluent' ? 'border-2' : 
            'hover:shadow-lg'
          } ${
            theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''
          }`}>
            <CardHeader>
              <CardTitle className={`text-2xl hover-color-shift ${theme.designSystem === 'material' ? 'font-medium' : 'font-bold'}`}>
                Join Thousands of Successful Students
              </CardTitle>
              <CardDescription className="text-lg">
                Start your learning journey today with our affordable crash courses
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6">
              {[
                { icon: 'student', value: '5,000+', label: 'Students Enrolled' },
                { icon: 'star', value: '4.9★', label: 'Average Rating' },
                { icon: 'course', value: '95%', label: 'Completion Rate' },
                { icon: 'price', value: '$25', label: 'Average Cost' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center hover-scale ${
                    index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'
                  } animate-delay-${(index + 1) * 100}`}
                >
                  <div className="flex items-center justify-center mb-2">
                    {stat.icon === 'star' ? (
                      <Star className="w-6 h-6 fill-current text-yellow-500 hover-scale" />
                    ) : (
                      <span className="hover-scale">{getIcon(stat.icon)}</span>
                    )}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2 hover-color-shift">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
