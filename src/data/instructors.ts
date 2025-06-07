
import { Instructor } from '@/types/instructor.types';
import { getCoursesByInstructorId } from './courses';

export const instructors: Instructor[] = [
  {
    id: 1,
    name: "Sarah Chen",
    expertise: "React & Frontend Development",
    rating: 4.9,
    students: 1250,
    courses: 8,
    experience: "5+ years at Google",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    specialty: "React & Frontend Development",
    city: "San Francisco",
    country: "USA",
    flag: "🇺🇸",
    description: "Sarah is a senior frontend developer with extensive experience at Google. She specializes in React, TypeScript, and modern web development practices. Sarah has mentored hundreds of developers and is passionate about teaching clean code principles and scalable architecture patterns.",
    industries: [1], // Software
    subjects: [
      { industryId: 1, subjectIds: [1, 6] } // Frontend, Design
    ]
  },
  {
    id: 2,
    name: "Dr. Marcus Johnson",
    expertise: "Data Science & Python",
    rating: 4.8,
    students: 980,
    courses: 12,
    experience: "PhD in Data Science",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    specialty: "Data Science & Python",
    city: "Boston",
    country: "USA",
    flag: "🇺🇸",
    description: "Dr. Johnson holds a PhD in Data Science from MIT and has over 10 years of experience in machine learning and data analytics. He has worked with Fortune 500 companies to implement AI solutions and is an expert in Python, R, and statistical modeling.",
    industries: [1, 4], // Software, Healthcare
    subjects: [
      { industryId: 1, subjectIds: [4] }, // Data Science
      { industryId: 4, subjectIds: [3] }  // Healthcare IT
    ]
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    expertise: "Digital Marketing",
    rating: 4.9,
    students: 2100,
    courses: 15,
    experience: "Marketing Director at Meta",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    specialty: "Digital Marketing",
    city: "Los Angeles",
    country: "USA",
    flag: "🇺🇸",
    description: "Lisa is a seasoned digital marketing professional who has led marketing initiatives at Meta (Facebook). She specializes in social media marketing, growth hacking, and digital advertising strategies. Lisa has helped numerous startups scale their user acquisition and retention.",
    industries: [2, 3], // Marketing, Business
    subjects: [
      { industryId: 2, subjectIds: [1, 2, 3, 4] }, // All marketing subjects
      { industryId: 3, subjectIds: [1, 3] }         // Management, Strategy
    ]
  },
  {
    id: 4,
    name: "Alex Thompson",
    expertise: "Financial Technology & Trading",
    rating: 4.7,
    students: 890,
    courses: 10,
    experience: "Senior Analyst at Goldman Sachs",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    specialty: "Financial Technology & Trading",
    city: "New York",
    country: "USA",
    flag: "🇺🇸",
    description: "Alex is a financial technology expert with 8 years of experience at Goldman Sachs. He specializes in algorithmic trading, financial modeling, and blockchain technology. Alex has developed trading systems that manage billions in assets and is passionate about democratizing financial education.",
    industries: [5, 1], // Finance, Software
    subjects: [
      { industryId: 5, subjectIds: [1, 2, 3, 4] }, // All finance subjects
      { industryId: 1, subjectIds: [2, 4] }        // Backend, Data Science
    ]
  },
  {
    id: 5,
    name: "Dr. Emily Watson",
    expertise: "Medical Research & Healthcare Innovation",
    rating: 4.8,
    students: 650,
    courses: 8,
    experience: "Medical Director at Johns Hopkins",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    specialty: "Medical Research & Healthcare Innovation",
    city: "Baltimore",
    country: "USA",
    flag: "🇺🇸",
    description: "Dr. Watson is a renowned medical researcher and innovation leader at Johns Hopkins Hospital. She specializes in medical device development, clinical research, and healthcare technology. Emily has published over 50 research papers and holds multiple patents in medical technology.",
    industries: [4], // Healthcare
    subjects: [
      { industryId: 4, subjectIds: [1, 2, 3, 4] } // All healthcare subjects
    ]
  },
  {
    id: 6,
    name: "Miguel Santos",
    expertise: "Sustainable Engineering & Green Technology",
    rating: 4.6,
    students: 780,
    courses: 12,
    experience: "Lead Engineer at Tesla",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    specialty: "Sustainable Engineering & Green Technology",
    city: "Austin",
    country: "USA",
    flag: "🇺🇸",
    description: "Miguel is a mechanical engineer specializing in sustainable technology and renewable energy systems. He has led multiple projects at Tesla focusing on battery technology and sustainable manufacturing processes. Miguel is passionate about creating a more sustainable future through innovative engineering solutions.",
    industries: [6], // Engineering
    subjects: [
      { industryId: 6, subjectIds: [1, 2, 3, 4] } // All engineering subjects
    ]
  }
];

export const getInstructorById = (id: number): Instructor | undefined => {
  return instructors.find(instructor => instructor.id === id);
};

export const getInstructorCourses = (instructorId: number) => {
  return getCoursesByInstructorId(instructorId);
};
