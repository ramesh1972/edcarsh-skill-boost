import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, TrendingUp, Calendar } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-full">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight text-foreground drop-shadow-lg">My Dashboard</h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium">Track your learning progress and upcoming sessions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <Card className="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 hover:scale-[1.025] transition-transform duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold text-foreground">Enrolled Courses</CardTitle>
              <BookOpen className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-primary">3</div>
              <p className="text-xs text-muted-foreground">Active enrollments</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 hover:scale-[1.025] transition-transform duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold text-foreground">Hours Completed</CardTitle>
              <Clock className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-primary">24</div>
              <p className="text-xs text-muted-foreground">Total learning time</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 hover:scale-[1.025] transition-transform duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold text-foreground">Next Session</CardTitle>
              <Calendar className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-primary">2h</div>
              <p className="text-xs text-muted-foreground">React Course today</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground">Current Courses</CardTitle>
              <CardDescription className="text-muted-foreground">Your active learning paths</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">React Development</span>
                  <span className="text-sm text-primary font-semibold">75%</span>
                </div>
                <Progress value={75} className="h-2 bg-primary/10" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">Python for Data Science</span>
                  <span className="text-sm text-primary font-semibold">30%</span>
                </div>
                <Progress value={30} className="h-2 bg-primary/10" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground">Upcoming Sessions</CardTitle>
              <CardDescription className="text-muted-foreground">Live sessions you're enrolled in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex justify-between items-center p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
                <div>
                  <p className="font-semibold text-foreground">React Advanced Patterns</p>
                  <p className="text-xs text-muted-foreground">Today, 7:00 PM</p>
                </div>
                <Button size="sm" className="rounded-full px-5 font-semibold shadow-md">Join</Button>
              </div>
              <div className="flex justify-between items-center p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
                <div>
                  <p className="font-semibold text-foreground">Python Data Visualization</p>
                  <p className="text-xs text-muted-foreground">Tomorrow, 6:30 PM</p>
                </div>
                <Button size="sm" variant="outline" className="rounded-full px-5 font-semibold">Remind Me</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
