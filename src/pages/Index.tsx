import React from 'react';
import Home from './Home';

import { Card } from '../components/ui/card';
import TitleComponent from '@/components/common/TitleComponent';

const Index = () => {
  return (
    <div className="min-h-full">
      <div className="container mx-auto px-4 py-12 space-y-8 " >
        <TitleComponent
          title="Welcome to Edcarsh Skill Boost"
          subtitle="Accelerate your career with short, practical crash courses for busy professionals."
          iconName="home"
        />
        <Home />
      </div>
    </div>
  );
};

export default Index;
