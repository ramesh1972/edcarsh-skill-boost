import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Target, Lightbulb, Clock } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import TitleComponent from '@/components/common/TitleComponent';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { set } from 'date-fns';

const ExpressIntent = () => {
  const { theme, getIcon, getBackground } = useTheme();

  // Prompt-based topic suggestion state
  const [prompt, setPrompt] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState('');

  const [expertLevel, setExpertLevel] = useState('Beginner');
  const [duration, setDuration] = useState('1'); // Default to 8-12 hours

  // Simple mock suggestion: split prompt by comma or suggest some topics
  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrompt(value);
  };

  const fetchDummyTopics = (input: string) => {
    return [
      'Python Basics',
      'Data Analysis with Python',
      'Web Development Fundamentals',
      'Automation with Python',
      'Machine Learning Introduction',
      'Advanced Excel Techniques',
      'Web Design Principles'
    ];
  }

  const fetchTopics = () => {
    // Simulate fetching topics based on the prompt
    if (prompt.trim()) {
      const suggestedTopics = fetchDummyTopics(prompt);
      setTopics(suggestedTopics);
    }
  }

  const handleRemoveTopic = (topic: string) => {
    setTopics(topics.filter(t => t !== topic));
  };

  const handleAddTopic = () => {
    if (newTopic.trim() && !topics.includes(newTopic.trim())) {
      setTopics([...topics, newTopic.trim()]);
      setNewTopic('');
    }
  };

  const setExpertiseLevel = () => (value: string) => {
    // Handle expert level selection
    setExpertLevel(value);
  }

  return (
    <div className="min-h-full ">
      <div className="container mx-auto px-4 py-12 space-y-8">
        <TitleComponent
          title="Express Your Learning Intent"
          subtitle="Tell us what you want to learn, and we'll create a custom crash course just for you"
          iconName="course"
        />

        {/* Prompt-based intent input and topic chips */}
        <Card className="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 transition-transform duration-200 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className={`flex items-center  gap-1 ${theme.designSystem === 'material' ? 'text-lg font-medium' : 'text-xl'}`}>
              {getIcon('course')}
              Course Request Form
            </CardTitle>
          </CardHeader>
          <CardContent className="grid space-y-1 gap-3">
            <label className="block text-base font-semibold">Describe your learning intent or goal</label>
            <div className="w-full inline-flex items-center !mt-[-4px]">
              <input
                type="text"
                className="w-full p-2 rounded-lg border border-primary/30 focus:border-primary/60 bg-white/80 dark:bg-black/30"
                placeholder="e.g., I want to learn Python for data analysis"
                value={prompt}
                onChange={handlePromptChange}
              />
              <Button
                type="button"
                className="ml-2 text-primary-foreground hover:text-red-500 focus:outline-none"
                onClick={() => fetchTopics()}
                aria-label="Fetch Topics"
              >
                Fetch Topics
              </Button>
            </div>
            {topics.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {topics.map(topic => (
                  <span key={topic} className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/30">
                    {topic}
                    <Button
                      type="button"
                      className="ml-2 text-primary-foreground hover:text-red-500 focus:outline-none"
                      onClick={() => handleRemoveTopic(topic)}
                      aria-label={`Remove ${topic}`}
                    >
                      ×
                    </Button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                className="flex-1 p-2 rounded border border-primary/20 bg-white/70 dark:bg-black/20"
                placeholder="Add another topic..."
                value={newTopic}
                onChange={e => setNewTopic(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddTopic(); } }}
              />
              <Button
                type="button"
                className="px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/80 transition"
                onClick={handleAddTopic}
              >
                Add
              </Button>
            </div>
            <div className='w-[200px]'>
              <label className="block text-sm font-medium mb-2">Your Expertise Level</label>
              <Select value={expertLevel} onValueChange={setExpertiseLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Set Expertise Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Complete Beginner</SelectItem>
                  <SelectItem value="Experienced">Some Experience</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='w-[200px]'>
              <label className="block text-sm font-medium mb-2">Preferred course duration</label>
              <Select value={duration}>
                <SelectTrigger>
                  <SelectValue placeholder="Set Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">8-12 hours</SelectItem>
                  <SelectItem value="2">12-16 hours</SelectItem>
                  <SelectItem value="3">16-20 hours</SelectItem>
                  <SelectItem value="4">20-30 hours</SelectItem>
                </SelectContent>
              </Select>
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
                  Weekday Mornings
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Weekday Evenings
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Weekday Afternoons
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Weekend
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Any time
                </label>
              </div>
            </div>

            <Button
              className={`w-full ${theme.designSystem === 'material' ? 'rounded-none uppercase text-sm font-medium' :
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

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Card className="text-center 100">
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
  );
};

export default ExpressIntent;
