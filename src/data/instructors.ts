
export interface Instructor {
  id: number;
  name: string;
  image: string;
  experience: string;
  specialty: string;
  city: string;
  country: string;
  flag: string;
  description: string;
  rating: number;
  students: number;
  courses: number;
  expertise: string;
}

export const instructors: Instructor[] = [
  {
    id: 1,
    name: "Sarah Chen",
    expertise: "React & Frontend Development",
    rating: 4.9,
    students: 1250,
    courses: 8,
    experience: "5+ years at Google",
    image: "/placeholder.svg",
    specialty: "React & Frontend Development",
    city: "San Francisco",
    country: "USA",
    flag: "🇺🇸",
    description: "Sarah is a senior frontend developer with extensive experience at Google. She specializes in React, TypeScript, and modern web development practices. Sarah has mentored hundreds of developers and is passionate about teaching clean code principles and scalable architecture patterns."
  },
  {
    id: 2,
    name: "Dr. Marcus Johnson",
    expertise: "Data Science & Python",
    rating: 4.8,
    students: 980,
    courses: 12,
    experience: "PhD in Data Science",
    image: "/placeholder.svg",
    specialty: "Data Science & Python",
    city: "Boston",
    country: "USA",
    flag: "🇺🇸",
    description: "Dr. Johnson holds a PhD in Data Science from MIT and has over 10 years of experience in machine learning and data analytics. He has worked with Fortune 500 companies to implement AI solutions and is an expert in Python, R, and statistical modeling."
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    expertise: "Digital Marketing",
    rating: 4.9,
    students: 2100,
    courses: 15,
    experience: "Marketing Director at Meta",
    image: "/placeholder.svg",
    specialty: "Digital Marketing",
    city: "Los Angeles",
    country: "USA",
    flag: "🇺🇸",
    description: "Lisa is a seasoned digital marketing professional who has led marketing initiatives at Meta (Facebook). She specializes in social media marketing, growth hacking, and digital advertising strategies. Lisa has helped numerous startups scale their user acquisition and retention."
  }
];

export const getInstructorById = (id: number): Instructor | undefined => {
  return instructors.find(instructor => instructor.id === id);
};

export const getInstructorCourses = (instructorId: number) => {
  // Mock courses data associated with instructors
  const coursesByInstructor: Record<number, any[]> = {
    1: [ // Sarah Chen
      {
        id: 1,
        title: "React Fundamentals Crash Course",
        longDescription: "Master the fundamentals of React including components, state management, hooks, and modern development practices. This comprehensive course covers everything you need to know to build professional React applications from scratch.",
        duration: "2 hours",
        price: "$99",
        students: 45,
        nextSession: "2024-12-15 14:00",
        image: "/placeholder.svg",
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
        longDescription: "Dive deep into advanced TypeScript concepts and design patterns. Learn how to leverage TypeScript's powerful type system to build robust, maintainable applications with confidence.",
        duration: "3 hours",
        price: "$149",
        students: 32,
        nextSession: "2024-12-18 16:00",
        image: "/placeholder.svg",
        longTopics: ["Generic Types", "Conditional Types", "Mapped Types", "Template Literals", "Decorators", "Advanced Interfaces", "Type Guards", "Utility Types"],
        level: "Advanced",
        subject: "Programming",
        industry: "Technology",
        mode: "live" as const,
        tools: true,
        instructorId: 1
      }
    ],
    2: [ // Dr. Marcus Johnson
      {
        id: 3,
        title: "Python Data Science Fundamentals",
        longDescription: "Learn the fundamentals of data science using Python. This course covers pandas, numpy, matplotlib, and scikit-learn to help you analyze and visualize data effectively.",
        duration: "4 hours",
        price: "$199",
        students: 67,
        nextSession: "2024-12-16 10:00",
        image: "/placeholder.svg",
        longTopics: ["Python Basics", "Pandas DataFrames", "NumPy Arrays", "Data Visualization", "Statistical Analysis", "Machine Learning Basics", "Model Evaluation", "Data Cleaning"],
        level: "Beginner",
        subject: "Data Science",
        industry: "Technology",
        mode: "live" as const,
        tools: true,
        instructorId: 2
      }
    ],
    3: [ // Lisa Rodriguez
      {
        id: 4,
        title: "Digital Marketing Strategy",
        longDescription: "Comprehensive digital marketing course covering social media marketing, content strategy, SEO, and paid advertising. Learn how to create effective marketing campaigns that drive results.",
        duration: "3.5 hours",
        price: "$179",
        students: 89,
        nextSession: "2024-12-17 14:00",
        image: "/placeholder.svg",
        longTopics: ["Social Media Strategy", "Content Marketing", "SEO Optimization", "Google Ads", "Facebook Advertising", "Analytics & Tracking", "Email Marketing", "Conversion Optimization"],
        level: "Intermediate",
        subject: "Marketing",
        industry: "Business",
        mode: "offline" as const,
        tools: false,
        instructorId: 3
      }
    ]
  };

  return coursesByInstructor[instructorId] || [];
};
