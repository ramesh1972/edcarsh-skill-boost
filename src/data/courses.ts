
import { Course } from '@/types';

export const courses: Course[] = [
  {
    id: 1,
    title: "React Fundamentals Crash Course",
    description: "Master the fundamentals of React in just 2 hours",
    mediumDescription: "Learn React components, state management, hooks, and modern development practices in this intensive crash course.",
    longDescription: "Master the fundamentals of React including components, state management, hooks, and modern development practices. This comprehensive course covers everything you need to know to build professional React applications from scratch.",
    duration: "2 hours",
    durationHours: 2,
    dailySessionDuration: 2,
    price: "$99",
    students: 45,
    nextSession: "2024-12-15 14:00",
    startDate: "2024-12-15",
    endDate: "2024-12-15",
    startTime: "14:00",
    image: "/placeholder.svg",
    topics: ["JSX", "Components", "State", "Hooks"],
    longTopics: ["JSX Syntax", "Component Architecture", "State & Props", "Event Handling", "Hooks (useState, useEffect)", "Context API", "Router Integration", "Performance Optimization"],
    level: "Beginner",
    subject: "Web Development",
    industry: "Technology",
    mode: "live" as const,
    tools: true,
    instructorId: 1
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    description: "Deep dive into advanced TypeScript concepts",
    mediumDescription: "Master advanced TypeScript patterns, generics, and type system features for building robust applications.",
    longDescription: "Dive deep into advanced TypeScript concepts and design patterns. Learn how to leverage TypeScript's powerful type system to build robust, maintainable applications with confidence.",
    duration: "3 hours",
    durationHours: 3,
    dailySessionDuration: 3,
    price: "$149",
    students: 32,
    nextSession: "2024-12-18 16:00",
    startDate: "2024-12-18",
    endDate: "2024-12-18",
    startTime: "16:00",
    image: "/placeholder.svg",
    topics: ["Generics", "Types", "Patterns", "Advanced"],
    longTopics: ["Generic Types", "Conditional Types", "Mapped Types", "Template Literals", "Decorators", "Advanced Interfaces", "Type Guards", "Utility Types"],
    level: "Advanced",
    subject: "Programming",
    industry: "Technology",
    mode: "live" as const,
    tools: true,
    instructorId: 1
  },
  {
    id: 3,
    title: "Python Data Science Fundamentals",
    description: "Learn data science with Python from scratch",
    mediumDescription: "Master pandas, numpy, matplotlib, and scikit-learn for effective data analysis and visualization.",
    longDescription: "Learn the fundamentals of data science using Python. This course covers pandas, numpy, matplotlib, and scikit-learn to help you analyze and visualize data effectively.",
    duration: "4 hours",
    durationHours: 4,
    dailySessionDuration: 4,
    price: "$199",
    students: 67,
    nextSession: "2024-12-16 10:00",
    startDate: "2024-12-16",
    endDate: "2024-12-16",
    startTime: "10:00",
    image: "/placeholder.svg",
    topics: ["Python", "Pandas", "NumPy", "ML"],
    longTopics: ["Python Basics", "Pandas DataFrames", "NumPy Arrays", "Data Visualization", "Statistical Analysis", "Machine Learning Basics", "Model Evaluation", "Data Cleaning"],
    level: "Beginner",
    subject: "Data Science",
    industry: "Technology",
    mode: "live" as const,
    tools: true,
    instructorId: 2
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    description: "Comprehensive digital marketing course",
    mediumDescription: "Learn social media marketing, content strategy, SEO, and paid advertising to drive business results.",
    longDescription: "Comprehensive digital marketing course covering social media marketing, content strategy, SEO, and paid advertising. Learn how to create effective marketing campaigns that drive results.",
    duration: "3.5 hours",
    durationHours: 3.5,
    dailySessionDuration: 3.5,
    price: "$179",
    students: 89,
    nextSession: "2024-12-17 14:00",
    startDate: "2024-12-17",
    endDate: "2024-12-17",
    startTime: "14:00",
    image: "/placeholder.svg",
    topics: ["SEO", "Social Media", "Ads", "Analytics"],
    longTopics: ["Social Media Strategy", "Content Marketing", "SEO Optimization", "Google Ads", "Facebook Advertising", "Analytics & Tracking", "Email Marketing", "Conversion Optimization"],
    level: "Intermediate",
    subject: "Marketing",
    industry: "Business",
    mode: "offline" as const,
    tools: false,
    instructorId: 3
  }
];

export const getCourseById = (id: number): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getCoursesByInstructorId = (instructorId: number): Course[] => {
  return courses.filter(course => course.instructorId === instructorId);
};
