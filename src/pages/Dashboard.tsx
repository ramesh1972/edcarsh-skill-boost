
import React from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, TrendingUp, Calendar } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-slide-in-left">
          <h1 className="text-4xl font-bold mb-4 hover-color-shift">My Dashboard</h1>
          <p className="text-lg text-muted-foreground animate-slide-in-right animate-delay-200">
            Track your learning progress and upcoming sessions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="animate-slide-in-left hover-lift hover-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium hover-color-shift">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground hover-scale" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold hover-color-shift">3</div>
              <p className="text-xs text-muted-foreground">Active enrollments</p>
            </CardContent>
          </Card>

          <Card className="animate-slide-in-up hover-lift hover-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium hover-color-shift">Hours Completed</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground hover-scale" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold hover-color-shift">24</div>
              <p className="text-xs text-muted-foreground">Total learning time</p>
            </CardContent>
          </Card>

          <Card className="animate-slide-in-right hover-lift hover-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium hover-color-shift">Next Session</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground hover-scale" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold hover-color-shift">2h</div>
              <p className="text-xs text-muted-foreground">React Course today</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="animate-slide-in-left animate-delay-300 hover-lift hover-glow">
            <CardHeader>
              <CardTitle className="hover-color-shift">Current Courses</CardTitle>
              <CardDescription>Your active learning paths</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="animate-slide-in-left animate-delay-400">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium hover-color-shift">React Development</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2 hover-glow" />
              </div>
              <div className="animate-slide-in-left animate-delay-500">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium hover-color-shift">Python for Data Science</span>
                  <span className="text-sm text-muted-foreground">30%</span>
                </div>
                <Progress value={30} className="h-2 hover-glow" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-in-right animate-delay-300 hover-lift hover-glow">
            <CardHeader>
              <CardTitle className="hover-color-shift">Upcoming Sessions</CardTitle>
              <CardDescription>Live sessions you're enrolled in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-lg hover-border-glow animate-slide-in-right animate-delay-400">
                <div>
                  <p className="font-medium hover-color-shift">React Advanced Patterns</p>
                  <p className="text-sm text-muted-foreground">Today, 7:00 PM</p>
                </div>
                <Button size="sm" className="hover-lift hover-glow">Join</Button>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg hover-border-glow animate-slide-in-right animate-delay-500">
                <div>
                  <p className="font-medium hover-color-shift">Python Data Visualization</p>
                  <p className="text-sm text-muted-foreground">Tomorrow, 6:30 PM</p>
                </div>
                <Button size="sm" variant="outline" className="hover-border-glow hover-scale-small">Remind Me</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
