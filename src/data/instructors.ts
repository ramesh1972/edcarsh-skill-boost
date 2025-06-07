
import { Instructor } from '@/types';
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
  }
];

export const getInstructorById = (id: number): Instructor | undefined => {
  return instructors.find(instructor => instructor.id === id);
};

export const getInstructorCourses = (instructorId: number) => {
  return getCoursesByInstructorId(instructorId);
};
