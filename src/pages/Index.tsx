import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, DollarSign, Globe, Calendar, Target, Users, Star, ArrowRight, CheckCircle, Play, Zap, Award, BookOpen, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { courses } from '@/data/courses';
import { homeTestimonials } from '@/data/testimonials';
import { usps } from '@/data/usps';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ShortCourseCard from '@/components/Courses/ShortCourseCard';
import { parseISO, addDays, format, isAfter, isSameDay, startOfDay } from 'date-fns';

const Index = () => {
  const {
    theme,
    getIcon,
    getPageLayoutClasses
  } = useTheme();

  // Scroll animation hooks for different sections
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const uspsAnimation = useScrollAnimation({ threshold: 0.1 });
  const coursesAnimation = useScrollAnimation({ threshold: 0.1 });
  const calendarAnimation = useScrollAnimation({ threshold: 0.1 });
  const statsAnimation = useScrollAnimation({ threshold: 0.2 });
  const testimonialsAnimation = useScrollAnimation({ threshold: 0.1 });
  const ctaAnimation = useScrollAnimation({ threshold: 0.2 });
  const footerAnimation = useScrollAnimation({ threshold: 0.1 });

  // Get the first 6 courses for the upcoming courses section
  const upcomingCourses = courses.slice(0, 6);

  // Get courses for the next 30 days
  const getNext30DaysCourses = () => {
    const today = startOfDay(new Date());
    const next30Days = addDays(today, 30);
    
    const coursesWithDates = [];
    
    courses.forEach(course => {
      const courseStartDate = parseISO(course.startDate);
      const courseEndDate = parseISO(course.endDate);
      
      // Get all session days for this course
      let currentDay = courseStartDate;
      while (currentDay <= courseEndDate && currentDay <= next30Days) {
        if ((isSameDay(currentDay, today) || isAfter(currentDay, today)) && currentDay <= next30Days) {
          coursesWithDates.push({
            ...course,
            sessionDate: currentDay
          });
        }
        currentDay = addDays(currentDay, 1);
      }
    });
    
    // Sort by date
    return coursesWithDates.sort((a, b) => a.sessionDate.getTime() - b.sessionDate.getTime());
  };

  const next30DaysCourses = getNext30DaysCourses();

  const getCategoryColor = (category: string) => {
    const colors = {
      'Frontend': 'bg-blue-100 text-blue-800',
      'Backend': 'bg-green-100 text-green-800',
      'Data Science': 'bg-purple-100 text-purple-800',
      'Marketing': 'bg-orange-100 text-orange-800',
      'Design': 'bg-pink-100 text-pink-800',
      'Mobile': 'bg-cyan-100 text-cyan-800',
      'DevOps': 'bg-red-100 text-red-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className={`min-h-full bg-background ${getPageLayoutClasses()}`}>
      {/* Hero Section */}
      <section 
        ref={heroAnimation.ref}
        className={`relative overflow-hidden bg-gradient-to-br from-primary/5 to-blue-600/5 py-20 sm:py-32 rounded-t-[20px] transition-all duration-1000 ${
          heroAnimation.isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-10'
        }`} 
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.4) 50%, rgba(155,155,155,0.2) 70%), url('/lovable-uploads/4046cf4d-c9d6-454a-9102-15024ca94163.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container px-4 mx-auto rounded-[20px]">
          <div className="text-center">
            <Badge 
              className={`mb-4 transition-all duration-700 delay-100 ${
                heroAnimation.isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-5'
              }`} 
              variant="secondary" 
              style={{fontSize: '16px'}}
            >
              🚀 Launch Your Skills in Hours, Not Months
            </Badge>
            <h1 
              className={`text-6xl sm:text-8xl font-bold tracking-tight mb-6 text-white transition-all duration-700 delay-300 ${
                heroAnimation.isVisible ? 'animate-zoom-in opacity-100' : 'opacity-0 scale-90'
              }`}
            >
              Master Skills Fast with{' '}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Crash Courses
              </span>
            </h1>
            <p 
              style={{
                color: 'orange',
                fontSize: '30px',
                marginTop: '30px',
              }} 
              className={`mb-8 max-w-3xl mx-auto text-3xl font-semibold text-yellow-200 mt-[20px] transition-all duration-700 delay-500 ${
                heroAnimation.isVisible ? 'animate-fade-in-left opacity-100' : 'opacity-0 -translate-x-10'
              }`}
            >
              Learn new skills with short, practical crash courses. Live sessions, affordable pricing, 
              and industry-focused training - all starting from just $25 per course.
            </p>
            <div 
              className={`flex flex-col sm:flex-row gap-4 justify-center mt-10 transition-all duration-700 delay-700 ${
                heroAnimation.isVisible ? 'animate-fade-in-right opacity-100' : 'opacity-0 translate-x-10'
              }`}
            >
              <Button size="lg" className="gap-2">
                <Play className="w-5 h-5" />
                Start Learning Now
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Calendar className="w-5 h-5" />
                View Upcoming Sessions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* USPs Section */}
      <section 
        ref={uspsAnimation.ref}
        className="py-20 bg-muted/50 relative overflow-hidden"
      >
        <div className="container px-4 mx-auto relative">
          {/* Corner Images */}
          <div 
            className={`absolute top-0 left-0 hidden lg:block transition-all duration-1000 delay-300 ${
              uspsAnimation.isVisible ? 'animate-fade-in-right opacity-100' : 'opacity-0 translate-x-full'
            }`} 
            style={{marginTop: '-90px'}}
          >
            <img src="/lovable-uploads/14c1d102-af1f-4765-be76-42b00c50c8e3.png" alt="100% Quality Badge" className="w-48 h-48 object-contain" />
          </div>
          
          <div 
            className={`absolute top-0 right-0 hidden lg:block transition-all duration-1000 delay-500 ${
              uspsAnimation.isVisible ? 'animate-fade-in-left opacity-100' : 'opacity-0 -translate-x-full'
            }`} 
            style={{marginTop: '-90px'}}
          >
            <img src="/lovable-uploads/7aa0ba35-0c3f-47dc-a574-f6ff47194b94.png" alt="Success Key Illustration" className="w-48 h-48 object-contain" />
          </div>

          <div 
            className={`text-center mb-16 transition-all duration-700 delay-300 ${
              uspsAnimation.isVisible ? 'animate-zoom-in opacity-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="flex items-center justify-center gap-8 mb-4">
              <h2 className="text-3xl font-bold">Why Choose EdCrash?</h2>
            </div>
            <p className="text-xl text-muted-foreground">
              We're revolutionizing online education with our unique approach
            </p>
          </div>
          
          {/* Connected Cards Grid */}
          <div className="relative">
            {/* Connection Lines - Hidden on mobile, visible on larger screens */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
              {/* Horizontal lines */}
              <div className="absolute top-1/3 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary/30 to-blue-500/30"></div>
              <div className="absolute top-2/3 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-green-500/30 to-purple-500/30"></div>
              
              {/* Vertical lines */}
              <div className="absolute left-1/3 top-1/3 w-0.5 h-1/3 bg-gradient-to-b from-yellow-500/30 to-green-500/30"></div>
              <div className="absolute right-1/3 top-1/3 w-0.5 h-1/3 bg-gradient-to-b from-blue-500/30 to-red-500/30"></div>
              
              {/* Diagonal connections */}
              <div className="absolute top-1/3 left-1/3 w-0.5 h-8 bg-primary/20 transform rotate-45 origin-bottom"></div>
              <div className="absolute top-2/3 right-1/3 w-0.5 h-8 bg-primary/20 transform -rotate-45 origin-top"></div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {usps.map((usp, index) => (
                <Card 
                  key={index} 
                  className={`text-center hover:shadow-lg transition-all duration-700 hover:scale-105 hover:border-primary/50 group relative bg-background/80 backdrop-blur-sm ${
                    uspsAnimation.isVisible 
                      ? `opacity-100 ${index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'}` 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: uspsAnimation.isVisible ? `${500 + index * 100}ms` : '0ms'
                  }}
                >
                  {/* Connection dots */}
                  <div className="hidden lg:block absolute -top-2 -left-2 w-4 h-4 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors"></div>
                  <div className="hidden lg:block absolute -top-2 -right-2 w-4 h-4 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors"></div>
                  <div className="hidden lg:block absolute -bottom-2 -left-2 w-4 h-4 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors"></div>
                  <div className="hidden lg:block absolute -bottom-2 -right-2 w-4 h-4 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors"></div>
                  
                  <CardHeader>
                    <div className="mx-auto mb-4 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                      <div className={`relative z-10 ${usp.iconColor}`}>
                        {getIcon(usp.iconName)}
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{usp.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {usp.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Central connecting element */}
            <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-full opacity-30 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section 
        ref={coursesAnimation.ref}
        className="py-20 round-b-[20px] border-[10px] border-secondary" 
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.8)), url('/lovable-uploads/901e6741-eb3f-451a-a824-a3e03780f569.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container px-4 mx-auto round-b-[20px]">
          <div 
            className={`flex justify-between items-center mb-12 transition-all duration-700 delay-200 ${
              coursesAnimation.isVisible ? 'animate-fade-in-left opacity-100' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">Upcoming Courses</h2>
              <p className="text-xl text-muted-foreground">
                Start your learning journey with these popular courses
              </p>
            </div>
            <Link to="/courses">
              <Button variant="outline" className="gap-2">
                View All Courses
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingCourses.map((course, index) => (
              <div
                key={course.id}
                className={`transition-all duration-700 ${
                  coursesAnimation.isVisible 
                    ? `opacity-100 ${
                        index % 3 === 0 ? 'animate-fade-in-left' : 
                        index % 3 === 1 ? 'animate-zoom-in' : 'animate-fade-in-right'
                      }` 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: coursesAnimation.isVisible ? `${400 + index * 150}ms` : '0ms'
                }}
              >
                <ShortCourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next 30 Days Calendar Section */}
      <section 
        ref={calendarAnimation.ref}
        className="py-20 bg-background"
      >
        <div className="container px-4 mx-auto">
          <div 
            className={`flex justify-between items-center mb-12 transition-all duration-700 delay-200 ${
              calendarAnimation.isVisible ? 'animate-fade-in-left opacity-100' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">Next 30 Days Schedule</h2>
              <p className="text-xl text-muted-foreground">
                See what's coming up in your learning journey
              </p>
            </div>
            <Link to="/calendar">
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                View Full Calendar
              </Button>
            </Link>
          </div>

          {next30DaysCourses.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Courses Scheduled</h3>
                <p className="text-muted-foreground mb-4">
                  There are no courses scheduled for the next 30 days.
                </p>
                <Link to="/courses">
                  <Button>Browse All Courses</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {next30DaysCourses.map((courseWithDate, index) => (
                <Card
                  key={`${courseWithDate.id}-${courseWithDate.sessionDate.getTime()}`}
                  className={`transition-all duration-700 hover:shadow-lg ${
                    calendarAnimation.isVisible 
                      ? `opacity-100 ${index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'}` 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: calendarAnimation.isVisible ? `${400 + index * 100}ms` : '0ms'
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-center min-w-[60px]">
                            <div className="text-2xl font-bold text-primary">
                              {format(courseWithDate.sessionDate, 'dd')}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {format(courseWithDate.sessionDate, 'MMM')}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {format(courseWithDate.sessionDate, 'EEE')}
                            </div>
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1">{courseWithDate.title}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {courseWithDate.startTime}
                              </div>
                              <div className="flex items-center gap-1">
                                <span>{courseWithDate.dailySessionDuration}h session</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {courseWithDate.students}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <Badge className={getCategoryColor(courseWithDate.category)}>
                          {courseWithDate.category}
                        </Badge>
                        <Badge variant="outline">{courseWithDate.level}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src={courseWithDate.instructor.image} 
                          alt={courseWithDate.instructor.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm font-medium">{courseWithDate.instructor.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">{courseWithDate.price}</span>
                        <Button size="sm" className="gap-1">
                          <Calendar className="w-3 h-3" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsAnimation.ref}
        className={`py-20 bg-primary text-primary-foreground round-[10px] transition-all duration-700 delay-300 ${
          statsAnimation.isVisible ? 'animate-zoom-in opacity-100' : 'opacity-0 scale-90'
        }`}
      >
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div 
              className={`transition-all duration-700 delay-500 ${
                statsAnimation.isVisible ? 'animate-fade-in-left opacity-100' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-sm opacity-90">Active Students</div>
            </div>
            <div 
              className={`transition-all duration-700 delay-600 ${
                statsAnimation.isVisible ? 'animate-fade-in-right opacity-100' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Courses Available</div>
            </div>
            <div 
              className={`transition-all duration-700 delay-700 ${
                statsAnimation.isVisible ? 'animate-fade-in-left opacity-100' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-sm opacity-90">Success Rate</div>
            </div>
            <div 
              className={`transition-all duration-700 delay-800 ${
                statsAnimation.isVisible ? 'animate-fade-in-right opacity-100' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        ref={testimonialsAnimation.ref}
        className="py-20 bg-muted/50 round-[10px] border-[10px] border-secondary" 
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255,0.4), rgba(255, 255, 255,.8)), url('/lovable-uploads/9c6e854a-b9ee-4453-be78-e8a940f7033d.png')`,
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat-x'
        }}
      >
        <div className="container px-4 mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-700 delay-200 ${
              testimonialsAnimation.isVisible ? 'animate-zoom-in opacity-100' : 'opacity-0 scale-90'
            }`}
          >
            <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-xl text-muted-foreground">
              Real success stories from our learning community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeTestimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className={`transition-all duration-700 ${
                  testimonialsAnimation.isVisible 
                    ? `opacity-100 ${
                        index % 3 === 0 ? 'animate-fade-in-left' : 
                        index % 3 === 1 ? 'animate-zoom-in' : 'animate-fade-in-right'
                      }` 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: testimonialsAnimation.isVisible ? `${400 + index * 200}ms` : '0ms'
                }}
              >
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaAnimation.ref}
        className={`py-20 bg-gradient-to-r from-primary to-blue-600 text-white round-[20px] transition-all duration-700 delay-300 ${
          ctaAnimation.isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container px-4 mx-auto text-center">
          <h2 
            className={`text-3xl font-bold mb-4 transition-all duration-700 delay-500 ${
              ctaAnimation.isVisible ? 'animate-zoom-in opacity-100' : 'opacity-0 scale-90'
            }`}
          >
            Ready to Crash Your Way to Success?
          </h2>
          <p 
            className={`text-xl mb-8 opacity-90 transition-all duration-700 delay-700 ${
              ctaAnimation.isVisible ? 'animate-fade-in-left opacity-90' : 'opacity-0 -translate-x-10'
            }`}
          >
            Join thousands of professionals who've accelerated their careers with EdCrash
          </p>
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-900 ${
              ctaAnimation.isVisible ? 'animate-fade-in-right opacity-100' : 'opacity-0 translate-x-10'
            }`}
          >
            <Button size="lg" variant="secondary" className="gap-2">
              <Target className="w-5 h-5" />
              Express Your Learning Intent
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-white hover:bg-white hover:text-primary">
              <Calendar className="w-5 h-5" />
              View Course Calendar
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        ref={footerAnimation.ref}
        className={`py-12 bg-background border-t transition-all duration-700 delay-500 ${
          footerAnimation.isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary text-primary-foreground rounded-lg p-2">
                  <span className="text-xl font-bold">EC</span>
                </div>
                <span className="text-2xl font-bold">EdCrash</span>
              </div>
              <p className="text-muted-foreground">
                Accelerating careers through focused, practical education.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Courses</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/courses" className="hover:text-foreground">Browse All</Link></li>
                <li><Link to="/express-intent" className="hover:text-foreground">Express Intent</Link></li>
                <li><Link to="/calendar" className="hover:text-foreground">Course Calendar</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/instructors" className="hover:text-foreground">Instructors</Link></li>
                <li><Link to="/testimonials" className="hover:text-foreground">Testimonials</Link></li>
                <li><Link to="/community" className="hover:text-foreground">Discussion</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
                <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 EdCrash. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
