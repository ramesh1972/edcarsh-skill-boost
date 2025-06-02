import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Target, Lightbulb, Clock } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ExpressIntent = () => {
  const { theme, getIcon, getBackground } = useTheme();

  return (
    <div className={`min-h-screen bg-background ${getBackground()}`}>
      <div className={`container mx-auto px-4 py-8 ${theme.layout === 'compact' ? 'space-y-4' : theme.layout === 'spacious' ? 'space-y-12' : 'space-y-8'}`}>
        <div className="mb-8 text-center">
          <h1 className={`text-4xl font-bold mb-4 flex items-center justify-center gap-3 ${theme.designSystem === 'material' ? 'font-medium' : theme.designSystem === 'human' ? 'font-semibold' : 'font-bold'}`}>
            {getIcon('course')} Express Your Learning Intent
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us what you want to learn, and we'll create a custom crash course just for you
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className={`${
            theme.designSystem === 'material' ? 'shadow-md' : 
            theme.designSystem === 'fluent' ? 'border-2' : 
            'hover:shadow-lg'
          } ${
            theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${theme.designSystem === 'material' ? 'text-lg font-medium' : 'text-xl'}`}>
                {getIcon('course')}
                Course Request Form
              </CardTitle>
              <CardDescription>
                Describe your learning goals and we'll design a focused crash course
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">What do you want to learn?</label>
                <Input placeholder="e.g., Machine Learning for Beginners, Advanced Excel, Web Design..." />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your current skill level</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Complete Beginner</option>
                  <option>Some Experience</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred course duration</label>
                <select className="w-full p-2 border rounded-md">
                  <option>8-12 hours</option>
                  <option>12-16 hours</option>
                  <option>16-20 hours</option>
                  <option>20-30 hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Specific goals or projects</label>
                <Textarea 
                  placeholder="Describe what you want to achieve after completing this course..."
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred time slots</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Weekday Evenings
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Weekend Mornings
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Weekend Afternoons
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Any time
                  </label>
                </div>
              </div>

              <Button 
                className={`w-full ${
                  theme.designSystem === 'material' ? 'rounded-none uppercase text-sm font-medium' :
                  theme.designSystem === 'human' ? 'rounded-lg' :
                  theme.designSystem === 'fluent' ? 'rounded-sm' :
                  ''
                }`} 
                size="lg"
              >
                <span className="mr-2">{getIcon('course')}</span>
                Submit Course Request
              </Button>
            </CardContent>
          </Card>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-8 h-8 mx-auto mb-2 text-primary flex items-center justify-center">
                  {getIcon('time')}
                </div>
                <h3 className="font-semibold mb-1">Quick Response</h3>
                <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-8 h-8 mx-auto mb-2 text-primary flex items-center justify-center">
                  {getIcon('course')}
                </div>
                <h3 className="font-semibold mb-1">Custom Designed</h3>
                <p className="text-sm text-muted-foreground">Tailored to your specific needs</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-8 h-8 mx-auto mb-2 text-primary flex items-center justify-center">
                  {getIcon('instructor')}
                </div>
                <h3 className="font-semibold mb-1">Expert Instructors</h3>
                <p className="text-sm text-muted-foreground">Industry professionals teach</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpressIntent;
