import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, DollarSign, Globe, Calendar, Target, Users, Star, ArrowRight, CheckCircle, Play, Zap, Award, BookOpen, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { featuredCourses } from '@/data/courses';
import { homeTestimonials } from '@/data/testimonials';
import { usps } from '@/data/usps';
const Index = () => {
  const {
    theme,
    getIcon,
    getPageLayoutClasses
  } = useTheme();
  return <div className={`min-h-full bg-background ${getPageLayoutClasses()}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-blue-600/5 py-20 sm:py-32 rounded-none">
        <div className="container px-4 mx-auto rounded-[20px]">
          <div className="text-center">
            <Badge className="mb-4" variant="secondary">
              🚀 Launch Your Skills in Hours, Not Months
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Master Skills Fast with{' '}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Crash Courses
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Learn new skills with short, practical crash courses. Live sessions, affordable pricing, 
              and industry-focused training - all starting from just $25 per course.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Play className="w-5 h-5" />
                Start Learning Now
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Calendar className="w-5 h-5" />
                View Upcoming Sessions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* USPs Section */}
      <section className="py-20 bg-muted/50 relative overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose EdCrash?</h2>
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
              {usps.map((usp, index) => <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary/50 group relative bg-background/80 backdrop-blur-sm">
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
                </Card>)}
            </div>

            {/* Central connecting element */}
            <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-full opacity-30 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-12">
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
            {featuredCourses.map((course, index) => <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2">
                      {course.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription>by {course.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {getIcon('time')}
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        {getIcon('student')}
                        {course.students.toLocaleString()} students
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{course.price}</span>
                      <div className="text-sm text-muted-foreground">
                        Next: {course.nextSession}
                      </div>
                    </div>
                    <Button className="w-full gap-2">
                      {getIcon('course')}
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-sm opacity-90">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Courses Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-sm opacity-90">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-xl text-muted-foreground">
              Real success stories from our learning community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeTestimonials.map((testimonial, index) => <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">"{testimonial.content}"</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Crash Your Way to Success?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who've accelerated their careers with EdCrash
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="gap-2">
              <Target className="w-5 h-5" />
              Express Your Learning Intent
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-white border-white hover:bg-white hover:text-primary">
              <Calendar className="w-5 h-5" />
              View Course Calendar
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
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
    </div>;
};
export default Index;