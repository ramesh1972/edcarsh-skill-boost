import { Course } from '../../types/courseTypes/course.type';

export const courses: Course[] = [
  {
    id: 1,
    title: "React Fundamentals Crash Course",
    description: "Master the fundamentals of React in just 2 hours",
    mediumDescription: "Learn React components, state management, hooks, and modern development practices in this intensive crash course.",
    longDescription: "Master the fundamentals of React including components, state management, hooks, and modern development practices. This comprehensive course covers everything you need to know to build professional React applications from scratch.",
    tags: ["JSX", "Components", "State", "Hooks"],
    courseTopics: [
      {
        title: "JSX & Components",
        children: [
          { title: "JSX Syntax" },
          { title: "Component Architecture" },
          { title: "State & Props" },
          { title: "Event Handling" }
        ]
      },
      {
        title: "Hooks & Context",
        children: [
          { title: "Hooks (useState, useEffect)" },
          { title: "Context API" },
          { title: "Custom Hooks" }
        ]
      },
      {
        title: "Routing & Performance",
        children: [
          { title: "Router Integration" },
          { title: "Performance Optimization" },
          { title: "Code Splitting" },
          { title: "React Suspense" }
        ]
      },
      {
        title: "Testing & Type Safety",
        children: [
          { title: "Testing with React Testing Library" },
          { title: "Error Boundaries" },
          { title: "PropTypes & TypeScript Integration" }
        ]
      },
      {
        title: "Advanced & Best Practices",
        children: [
          { title: "Accessibility in React" },
          { title: "React DevTools" },
          { title: "Deployment Best Practices" }
        ]
      }
    ],
    subjectId: 1,
    industryId: 1,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
    createdBy: 1,
    createdOn: "2024-01-10",
    modifiedBy: 1,
    modifiedOn: "2025-05-01",
    ownerOrgId: 0,
    ownedByOrg: false,
    ownerInstructorId: 0,
    durationHours: 10,
    dailySessionDuration: 2,
    level: "Beginner",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: true,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'userIntentAccepted',
        date: '2025-06-01',
        reasonForStatusChange: 'User expressed intent and was accepted',
        statusChangedBy: 1001
      },
      {
        status: 'courseCreationInProgress',
        date: '2025-06-02',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-06-03',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    description: "Deep dive into advanced TypeScript concepts",
    mediumDescription: "Master advanced TypeScript patterns, generics, and type system features for building robust applications.",
    longDescription: "Dive deep into advanced TypeScript concepts and design patterns. Learn how to leverage TypeScript's powerful type system to build robust, maintainable applications with confidence.",
    tags: ["Generics", "Types", "Patterns", "Classes", "Interfaces"],
    courseTopics: [
      {
        title: "Type System",
        children: [
          { title: "Generic Types" },
          { title: "Conditional Types" },
          { title: "Mapped Types" },
          { title: "Template Literals" },
          { title: "Decorators" },
          { title: "Advanced Interfaces" },
          { title: "Type Guards" },
          { title: "Utility Types" },
          { title: "Type Inference" },
          { title: "Type Compatibility" },
          { title: "Discriminated Unions" },
          { title: "Intersection & Union Types" },
          { title: "Type Manipulation" }
        ]
      },
      {
        title: "TypeScript in Practice",
        children: [
          { title: "TypeScript with React" },
          { title: "TypeScript Compiler Options" },
          { title: "Refactoring to TypeScript" },
          { title: "TypeScript Tooling" }
        ]
      }
    ],
    subjectId: 2,
    industryId: 1,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&h=300&fit=crop",
    createdBy: 1,
    createdOn: "2024-01-12",
    modifiedBy: 1,
    modifiedOn: "2025-05-01",
    ownerOrgId: 0,
    ownedByOrg: false,
    ownerInstructorId: 0,
    durationHours: 16,
    dailySessionDuration: 4,
    level: "Advanced",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: false,
    isExpiredCourse: false,
    isActive: false,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 3,
    title: "Python Data Science Fundamentals",
    description: "Learn data science with Python from scratch",
    mediumDescription: "Master pandas, numpy, matplotlib, and scikit-learn for effective data analysis and visualization.",
    longDescription: "Learn the fundamentals of data science using Python. This course covers pandas, numpy, matplotlib, and scikit-learn to help you analyze and visualize data effectively.",
    tags: ["Python", "Pandas", "NumPy", "ML"],
    courseTopics: [
      {
        title: "Python Basics",
        children: [
          { title: "Python Syntax and Semantics" },
          { title: "Data Types and Variables" },
          { title: "Control Structures" },
          { title: "Functions and Modules" }
        ]
      },
      {
        title: "Data Analysis with Pandas",
        children: [
          { title: "Introduction to Pandas" },
          { title: "DataFrames and Series" },
          { title: "Data Cleaning and Preparation" },
          { title: "Exploratory Data Analysis" }
        ]
      },
      {
        title: "Numerical Computing with NumPy",
        children: [
          { title: "NumPy Arrays and Operations" },
          { title: "Linear Algebra with NumPy" },
          { title: "Statistical Functions in NumPy" }
        ]
      },
      {
        title: "Data Visualization",
        children: [
          { title: "Introduction to Matplotlib" },
          { title: "Creating Plots and Charts" },
          { title: "Customizing Visualizations" }
        ]
      },
      {
        title: "Machine Learning Basics",
        children: [
          { title: "Introduction to Machine Learning" },
          { title: "Supervised vs Unsupervised Learning" },
          { title: "Model Evaluation and Selection" }
        ]
      }
    ],
    subjectId: 4,
    industryId: 1,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop",
    createdBy: 2,
    createdOn: "2024-01-15",
    modifiedBy: 2,
    modifiedOn: "2025-05-01",
    ownerOrgId: 0,
    ownedByOrg: false,
    ownerInstructorId: 0,
    durationHours: 8,
    dailySessionDuration: 2,
    level: "Beginner",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 4,
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js",
    mediumDescription: "Learn Express.js, MongoDB, authentication, and API development in this comprehensive backend course.",
    longDescription: "Master backend development with Node.js and Express. Learn to build RESTful APIs, handle authentication, work with databases, and deploy scalable server applications. Master backend development with Node.js and Express. Learn to build RESTful APIs, handle authentication, work with databases, and deploy scalable server applications",
    tags: ["Node.js", "Express", "MongoDB", "APIs"],
    courseTopics: [
      {
        title: "Node.js Fundamentals",
        children: [
          { title: "Introduction to Node.js" },
          { title: "Node.js Modules and NPM" },
          { title: "Asynchronous Programming in Node.js" }
        ]
      },
      {
        title: "Express Framework",
        children: [
          { title: "Getting Started with Express" },
          { title: "Routing and Middleware" },
          { title: "Error Handling in Express" }
        ]
      },
      {
        title: "Database Integration",
        children: [
          { title: "MongoDB Basics" },
          { title: "Mongoose for MongoDB" },
          { title: "Database Relationships" }
        ]
      },
      {
        title: "Authentication & Authorization",
        children: [
          { title: "Authentication Strategies" },
          { title: "Session Management" },
          { title: "JWT and OAuth" }
        ]
      },
      {
        title: "RESTful APIs",
        children: [
          { title: "Designing RESTful APIs" },
          { title: "API Versioning" },
          { title: "Rate Limiting" }
        ]
      }
    ],
    subjectId: 2,
    industryId: 1,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
    createdBy: 2,
    createdOn: "2024-01-20",
    modifiedBy: 2,
    modifiedOn: "2025-05-01",
    ownerOrgId: 0,
    ownedByOrg: false,
    ownerInstructorId: 0,
    durationHours: 24,
    dailySessionDuration: 8,
    level: "Intermediate",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 5,
    title: "Machine Learning with Python",
    description: "Build intelligent applications with ML algorithms",
    mediumDescription: "Learn supervised and unsupervised learning, neural networks, and practical ML implementation techniques.",
    longDescription: "Comprehensive machine learning course covering classification, regression, clustering, and neural networks. Build real-world ML applications using scikit-learn and TensorFlow.",
    tags: ["ML", "Neural Networks", "Python", "AI"],
    courseTopics: [
      {
        title: "Supervised Learning",
        children: [
          { title: "Linear Regression" },
          { title: "Logistic Regression" },
          { title: "Decision Trees" },
          { title: "Model Evaluation Metrics" }
        ]
      },
      {
        title: "Unsupervised Learning",
        children: [
          { title: "K-means Clustering" },
          { title: "Hierarchical Clustering" },
          { title: "DBSCAN" }
        ]
      },
      {
        title: "Neural Networks",
        children: [
          { title: "Introduction to Neural Networks" },
          { title: "Training Neural Networks" },
          { title: "Convolutional Neural Networks" }
        ]
      },
      {
        title: "Feature Engineering",
        children: [
          { title: "Feature Scaling" },
          { title: "Encoding Categorical Variables" },
          { title: "Feature Selection" }
        ]
      },
      {
        title: "Model Deployment",
        children: [
          { title: "Saving and Loading Models" },
          { title: "Model Serialization Formats" },
          { title: "Deploying Models to Production" }
        ]
      }
    ],
    subjectId: 4,
    industryId: 1,
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=500&h=300&fit=crop",
    createdBy: 2,
    createdOn: "2024-01-25",
    modifiedBy: 2,
    modifiedOn: "2025-05-01",
    ownerOrgId: 0,
    ownedByOrg: false,
    ownerInstructorId: 0,
    durationHours: 12,
    dailySessionDuration: 4,
    level: "Advanced",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 6,
    title: "UI/UX Design Principles",
    description: "Create beautiful and functional user interfaces",
    mediumDescription: "Learn design thinking, prototyping, user research, and modern design tools to create exceptional user experiences.",
    longDescription: "Master the art of UI/UX design with hands-on experience in user research, wireframing, prototyping, and visual design. Learn industry-standard tools and methodologies.",
    tags: ["Design", "UX", "Prototyping", "Research"],
    courseTopics: [
      {
        title: "Design Thinking",
        children: [
          { title: "Introduction to Design Thinking" },
          { title: "Empathize: User Research" },
          { title: "Define: Problem Statement" },
          { title: "Ideate: Brainstorming Solutions" }
        ]
      },
      {
        title: "Prototyping",
        children: [
          { title: "Low-Fidelity Prototyping" },
          { title: "High-Fidelity Prototyping" },
          { title: "Prototyping Tools Overview" }
        ]
      },
      {
        title: "User Research",
        children: [
          { title: "Qualitative vs Quantitative Research" },
          { title: "Surveys and Interviews" },
          { title: "Usability Testing" }
        ]
      },
      {
        title: "Visual Design",
        children: [
          { title: "Design Principles" },
          { title: "Color Theory" },
          { title: "Typography" }
        ]
      },
      {
        title: "UI/UX Best Practices",
        children: [
          { title: "Responsive Design" },
          { title: "Mobile-First Design" },
          { title: "Accessibility in Design" }
        ]
      }
    ],
    subjectId: 6,
    industryId: 1,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop",
    createdBy: 1,
    createdOn: "2024-02-01",
    modifiedBy: 1,
    modifiedOn: "2025-05-01",
    ownerOrgId: 0,
    ownedByOrg: false,
    ownerInstructorId: 0,
    durationHours: 8,
    dailySessionDuration: 2,
    level: "Beginner",
    mode: "offline",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },

  // Marketing Courses
  {
    id: 7,
    title: "Digital Marketing Strategy",
    description: "Comprehensive digital marketing course",
    mediumDescription: "Learn social media marketing, content strategy, SEO, and paid advertising to drive business results.",
    longDescription: "Comprehensive digital marketing course covering social media marketing, content strategy, SEO, and paid advertising. Learn how to create effective marketing campaigns that drive results.",
    tags: ["SEO", "Social Media", "Ads", "Analytics"],
    courseTopics: [
      {
        title: "Social Media Strategy",
        children: [
          { title: "Social Media Landscape" },
          { title: "Content Marketing" },
          { title: "SEO Optimization" },
          { title: "Google Ads" }
        ]
      },
      {
        title: "Analytics & Tracking",
        children: [
          { title: "Setting Up Google Analytics" },
          { title: "Tracking Conversions" },
          { title: "Analyzing Traffic Sources" }
        ]
      },
      {
        title: "Email Marketing",
        children: [
          { title: "Building an Email List" },
          { title: "Creating Drip Campaigns" },
          { title: "Email Segmentation" }
        ]
      },
      {
        title: "Conversion Optimization",
        children: [
          { title: "A/B Testing" },
          { title: "Landing Page Optimization" },
          { title: "Sales Funnel Optimization" }
        ]
      },
      {
        title: "Digital Marketing Trends",
        children: [
          { title: "Voice Search Optimization" },
          { title: "Video Marketing" },
          { title: "Influencer Marketing" }
        ]
      }
    ],
    subjectId: 2,
    industryId: 2,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    createdBy: 3,
    createdOn: "2024-02-10",
    modifiedBy: 3,
    modifiedOn: "2025-05-01",
    ownerOrgId: 0,
    ownedByOrg: false,
    ownerInstructorId: 0,
    durationHours: 3.5,
    dailySessionDuration: 3.5,
    level: "Intermediate",
    mode: "offline",
    hasTools: false,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 8,
    title: "Social Media Marketing Mastery",
    description: "Build powerful social media campaigns",
    mediumDescription: "Master Instagram, TikTok, LinkedIn, and Twitter marketing with proven strategies for viral content creation.",
    longDescription: "Learn to create engaging social media content that drives engagement and conversions. Master platform-specific strategies for all major social networks.",
    tags: ["Instagram", "TikTok", "LinkedIn", "Content"],
    courseTopics: [
      {
        title: "Platform Strategies",
        children: [
          { title: "Instagram Marketing" },
          { title: "TikTok Marketing" },
          { title: "LinkedIn Marketing" },
          { title: "Twitter Marketing" }
        ]
      },
      {
        title: "Content Creation",
        children: [
          { title: "Creating Engaging Content" },
          { title: "Visual Storytelling" },
          { title: "User-Generated Content" }
        ]
      },
      {
        title: "Social Media Advertising",
        children: [
          { title: "Facebook Advertising" },
          { title: "Instagram Ads" },
          { title: "LinkedIn Ads" }
        ]
      },
      {
        title: "Analytics and Optimization",
        children: [
          { title: "Social Media Analytics Tools" },
          { title: "Campaign Performance Measurement" },
          { title: "A/B Testing for Ads" }
        ]
      },
      {
        title: "Crisis Management",
        children: [
          { title: "Crisis Communication" },
          { title: "Reputation Management" },
          { title: "Handling Negative Feedback" }
        ]
      }
    ],
    subjectId: 1,
    industryId: 2,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=300&fit=crop",
    createdBy: 3,
    createdOn: "2024-02-15",
    modifiedBy: 3,
    modifiedOn: "2025-05-01",
    ownerOrgId: 8,
    ownedByOrg: true,
    ownerInstructorId: 8,
    durationHours: 3,
    dailySessionDuration: 3,
    level: "Beginner",
    mode: "live",
    hasTools: false,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 9,
    title: "Email Marketing Automation",
    description: "Create automated email sequences that convert",
    mediumDescription: "Learn to build email funnels, segment audiences, and create personalized campaigns that drive sales.",
    longDescription: "Master email marketing automation with hands-on experience in creating drip campaigns, segmentation strategies, and performance optimization techniques.",
    tags: ["Email", "Automation", "Segmentation", "Funnels"],
    courseTopics: [
      {
        title: "Email Strategy",
        children: [
          { title: "Defining Email Goals" },
          { title: "Target Audience Segmentation" },
          { title: "Personalization Techniques" }
        ]
      },
      {
        title: "Automation Workflows",
        children: [
          { title: "Creating Drip Campaigns" },
          { title: "Behavioral Targeting" },
          { title: "Dynamic Content" }
        ]
      },
      {
        title: "Analytics and Optimization",
        children: [
          { title: "Email Marketing Metrics" },
          { title: "Conversion Rate Optimization" },
          { title: "A/B Testing for Emails" }
        ]
      },
      {
        title: "Deliverability and Compliance",
        children: [
          { title: "Improving Email Deliverability" },
          { title: "Spam Compliance" },
          { title: "Email Authentication" }
        ]
      },
      {
        title: "Advanced Email Marketing",
        children: [
          { title: "Integrating AI in Email Marketing" },
          { title: "Predictive Analytics for Email" },
          { title: "Email Marketing in 2025 and Beyond" }
        ]
      }
    ],
    subjectId: 3,
    industryId: 2,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
    createdBy: 3,
    createdOn: "2024-02-20",
    modifiedBy: 3,
    modifiedOn: "2025-05-01",
    ownerOrgId: 8,
    ownedByOrg: true,
    ownerInstructorId: 8,
    durationHours: 2.5,
    dailySessionDuration: 2.5,
    level: "Intermediate",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 10,
    title: "Google Ads Mastery",
    description: "Create profitable Google advertising campaigns",
    mediumDescription: "Learn search ads, display campaigns, shopping ads, and YouTube advertising with budget optimization.",
    longDescription: "Comprehensive Google Ads training covering search, display, shopping, and video campaigns. Learn to optimize for maximum ROI and scale profitable campaigns.",
    tags: ["Google Ads", "PPC", "Keywords", "ROI"],
    courseTopics: [
      {
        title: "Search Campaigns",
        children: [
          { title: "Keyword Research" },
          { title: "Ad Copywriting" },
          { title: "Bid Strategies" }
        ]
      },
      {
        title: "Display Advertising",
        children: [
          { title: "Creating Display Ads" },
          { title: "Targeting and Retargeting" },
          { title: "Ad Extensions" }
        ]
      },
      {
        title: "Shopping Ads",
        children: [
          { title: "Setting Up Google Merchant Center" },
          { title: "Product Feed Optimization" },
          { title: "Shopping Campaigns Management" }
        ]
      },
      {
        title: "YouTube Ads",
        children: [
          { title: "Creating Video Ads" },
          { title: "YouTube Ad Formats" },
          { title: "Measuring Video Ad Performance" }
        ]
      },
      {
        title: "Analytics and Optimization",
        children: [
          { title: "Google Ads Reporting" },
          { title: "Conversion Tracking" },
          { title: "Optimizing Campaigns for ROI" }
        ]
      }
    ],
    subjectId: 4,
    industryId: 2,
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=500&h=300&fit=crop",
    createdBy: 3,
    createdOn: "2024-02-25",
    modifiedBy: 3,
    modifiedOn: "2025-05-01",
    ownerOrgId: 9,
    ownedByOrg: true,
    ownerInstructorId: 9,
    durationHours: 4,
    dailySessionDuration: 4,
    level: "Intermediate",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },

  // Business Courses
  {
    id: 11,
    title: "Project Management Fundamentals",
    description: "Master project management methodologies",
    mediumDescription: "Learn Agile, Scrum, and traditional project management approaches with real-world applications.",
    longDescription: "Comprehensive project management course covering Agile, Scrum, Kanban, and traditional methodologies. Learn to lead teams and deliver projects on time and budget.",
    tags: ["Agile", "Scrum", "Planning", "Leadership"],
    courseTopics: [
      {
        title: "Project Planning",
        children: [
          {
            title: "Defining Project Goals",
            children: [
              { title: "Understanding Project Scope" },
              { title: "Creating a Work Breakdown Structure" },
              { title: "Setting SMART Objectives" }
            ]
          },
          { title: "Creating a Project Charter" },
          { title: "Stakeholder Analysis" }
        ]
      },
      {
        title: "Agile Methodologies",
        children: [
          { title: "Introduction to Agile" },
          { title: "Scrum Framework" },
          { title: "Kanban Method" }
        ]
      },
      {
        title: "Risk Management",
        children: [
          { title: "Identifying Risks" },
          { title: "Risk Assessment" },
          { title: "Risk Mitigation Strategies" }
        ]
      },
      {
        title: "Team Leadership",
        children: [
          { title: "Building High-Performing Teams" },
          { title: "Conflict Resolution" },
          { title: "Effective Communication" }
        ]
      },
      {
        title: "Project Execution and Control",
        children: [
          { title: "Monitoring and Controlling Projects" },
          { title: "Managing Project Changes" },
          { title: "Project Closure" }
        ]
      }
    ],
    subjectId: 1,
    industryId: 3,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
    createdBy: 3,
    createdOn: "2024-03-01",
    modifiedBy: 3,
    modifiedOn: "2025-05-01",
    ownerOrgId: 0,
    ownedByOrg: false,
    ownerInstructorId: 9,
    durationHours: 4,
    dailySessionDuration: 4,
    level: "Intermediate",
    mode: "live",
    hasTools: false,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 12,
    title: "Startup Strategy & Validation",
    description: "Launch and validate your business idea",
    mediumDescription: "Learn lean startup methodology, market validation, and business model design for successful ventures.",
    longDescription: "Master the lean startup approach with hands-on experience in customer discovery, MVP development, and business model validation techniques.",
    tags: ["Lean Startup", "Validation", "MVP", "Strategy"],
    courseTopics: [
      {
        title: "Market Research",
        children: [
          { title: "Identifying Market Opportunities" },
          { title: "Customer Discovery" },
          { title: "Competitor Analysis" }
        ]
      },
      {
        title: "Business Model Canvas",
        children: [
          { title: "Key Partners and Activities" },
          { title: "Value Proposition" },
          { title: "Customer Segments" }
        ]
      },
      {
        title: "MVP Development",
        children: [
          { title: "Defining Your MVP" },
          { title: "Building a Prototype" },
          { title: "User Testing and Feedback" }
        ]
      },
      {
        title: "Funding Strategies",
        children: [
          { title: "Bootstrapping" },
          { title: "Crowdfunding" },
          { title: "Angel Investors and VC" }
        ]
      },
      {
        title: "Growth Hacking",
        children: [
          { title: "Introduction to Growth Hacking" },
          { title: "Viral Marketing" },
          { title: "Leveraging Analytics for Growth" }
        ]
      }
    ],
    subjectId: 2,
    industryId: 3,
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=500&h=300&fit=crop",
    createdBy: 4,
    createdOn: "2024-03-05",
    modifiedBy: 4,
    modifiedOn: "2025-05-01",
    ownerOrgId: 0,
    ownedByOrg: false,
    ownerInstructorId: 8,
    durationHours: 3.5,
    dailySessionDuration: 3.5,
    level: "Beginner",
    mode: "offline",
    hasTools: false,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 13,
    title: "Business Strategy & Planning",
    description: "Develop winning business strategies",
    mediumDescription: "Learn strategic planning, competitive analysis, and business development frameworks for growth.",
    longDescription: "Comprehensive business strategy course covering strategic planning, market analysis, competitive positioning, and execution frameworks for sustainable growth.",
    tags: ["Strategy", "Planning", "Analysis", "Growth"],
    courseTopics: [
      {
        title: "Strategic Planning",
        children: [
          { title: "Vision and Mission Statements" },
          { title: "SWOT Analysis" },
          { title: "Setting Objectives and KPIs" }
        ]
      },
      {
        title: "Market Positioning",
        children: [
          { title: "Identifying Target Markets" },
          { title: "Competitive Analysis" },
          { title: "Value Proposition Development" }
        ]
      },
      {
        title: "Business Development",
        children: [
          { title: "Sales Strategies" },
          { title: "Partnership Development" },
          { title: "Customer Relationship Management" }
        ]
      },
      {
        title: "Performance Metrics",
        children: [
          { title: "Measuring Business Performance" },
          { title: "Financial Ratios and Analysis" },
          { title: "Benchmarking" }
        ]
      },
      {
        title: "Change Management",
        children: [
          { title: "Understanding Change Management" },
          { title: "Managing Organizational Change" },
          { title: "Change Communication Strategies" }
        ]
      }
    ],
    subjectId: 3,
    industryId: 3,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    createdBy: 4,
    createdOn: "2024-03-10",
    modifiedBy: 4,
    modifiedOn: "2025-05-01",
    ownerOrgId: 0,
    ownedByOrg: false,
    ownerInstructorId: 9,
    durationHours: 5,
    dailySessionDuration: 5,
    level: "Advanced",
    mode: "live",
    hasTools: false,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 14,
    title: "Operations Management",
    description: "Optimize business operations for efficiency",
    mediumDescription: "Learn process optimization, supply chain management, and operational excellence methodologies.",
    longDescription: "Master operations management with focus on process improvement, lean manufacturing, supply chain optimization, and quality management systems.",
    tags: ["Operations", "Lean", "Supply Chain", "Quality"],
    courseTopics: [
      {
        title: "Process Optimization",
        children: [
          { title: "Introduction to Process Optimization" },
          { title: "Lean Principles" },
          { title: "Six Sigma Overview" }
        ]
      },
      {
        title: "Supply Chain Management",
        children: [
          { title: "Supply Chain Basics" },
          { title: "Inventory Management" },
          { title: "Logistics and Distribution" }
        ]
      },
      {
        title: "Quality Management",
        children: [
          { title: "Total Quality Management (TQM)" },
          { title: "Statistical Process Control (SPC)" },
          { title: "Continuous Improvement (Kaizen)" }
        ]
      },
      {
        title: "Operational Excellence",
        children: [
          { title: "Defining Operational Excellence" },
          { title: "Performance Metrics" },
          { title: "Process Mapping and Analysis" }
        ]
      },
      {
        title: "Change Management in Operations",
        children: [
          { title: "Managing Change in Organizations" },
          { title: "Change Management Models" },
          { title: "Communication in Change Management" }
        ]
      }
    ],
    subjectId: 4,
    industryId: 3,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
    createdBy: 6,
    createdOn: "2024-03-15",
    modifiedBy: 6,
    modifiedOn: "2025-05-01",
    ownerOrgId: 5,
    ownedByOrg: true,
    ownerInstructorId: null,
    durationHours: 4.5,
    dailySessionDuration: 4.5,
    level: "Intermediate",
    mode: "offline",
    hasTools: false,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },

  // Healthcare Courses
  {
    id: 15,
    title: "Medical Device Innovation",
    description: "Design and develop medical devices",
    mediumDescription: "Learn FDA regulations, design controls, and biomedical engineering principles for medical device development.",
    longDescription: "Comprehensive medical device development course covering regulatory requirements, design controls, risk management, and clinical validation processes.",
    tags: ["Medical Devices", "FDA", "Design", "Innovation"],
    courseTopics: [
      {
        title: "Regulatory Compliance",
        children: [
          { title: "FDA Regulations Overview" },
          { title: "Medical Device Classification" },
          { title: "Premarket Notification [510(k)]" }
        ]
      },
      {
        title: "Design Controls",
        children: [
          { title: "Design Control Procedures" },
          { title: "Design History File (DHF)" },
          { title: "Device Master Record (DMR)" }
        ]
      },
      {
        title: "Risk Management",
        children: [
          { title: "Risk Analysis and Control" },
          { title: "Failure Mode and Effects Analysis (FMEA)" },
          { title: "Risk Management Plan" }
        ]
      },
      {
        title: "Clinical Trials",
        children: [
          { title: "Clinical Trial Phases" },
          { title: "Informed Consent Process" },
          { title: "Data Monitoring and Safety" }
        ]
      },
      {
        title: "Post-market Surveillance",
        children: [
          { title: "Adverse Event Reporting" },
          { title: "Medical Device Reporting (MDR)" },
          { title: "Unique Device Identification (UDI)" }
        ]
      }
    ],
    subjectId: 1,
    industryId: 4,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
    createdBy: 5,
    createdOn: "2024-03-20",
    modifiedBy: 5,
    modifiedOn: "2025-05-01",
    ownerOrgId: 6,
    ownedByOrg: true,
    ownerInstructorId: 136,
    durationHours: 6,
    dailySessionDuration: 6,
    level: "Advanced",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 16,
    title: "Clinical Research Methods",
    description: "Conduct ethical and effective clinical research",
    mediumDescription: "Learn clinical trial design, GCP guidelines, data analysis, and regulatory compliance in medical research.",
    longDescription: "Master clinical research methodology with hands-on experience in study design, protocol development, data collection, and statistical analysis for medical studies.",
    tags: ["Clinical Trials", "Research", "GCP", "Statistics"],
    courseTopics: [
      {
        title: "Study Design",
        children: [
          { title: "Types of Clinical Studies" },
          { title: "Control Groups and Randomization" },
          { title: "Blinding and Bias" }
        ]
      },
      {
        title: "Protocol Development",
        children: [
          { title: "Writing a Clinical Trial Protocol" },
          { title: "Informed Consent Document" },
          { title: "Case Report Forms (CRFs)" }
        ]
      },
      {
        title: "Good Clinical Practice",
        children: [
          { title: "GCP Guidelines Overview" },
          { title: "Roles and Responsibilities in GCP" },
          { title: "GCP Compliance and Inspections" }
        ]
      },
      {
        title: "Data Management",
        children: [
          { title: "Data Collection Methods" },
          { title: "Database Design and Management" },
          { title: "Data Privacy and Security" }
        ]
      },
      {
        title: "Statistical Analysis",
        children: [
          { title: "Descriptive and Inferential Statistics" },
          { title: "Statistical Software for Data Analysis" },
          { title: "Interpreting Clinical Research Results" }
        ]
      }
    ],
    subjectId: 2,
    industryId: 4,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop",
    createdBy: 5,
    createdOn: "2024-03-25",
    modifiedBy: 5,
    modifiedOn: "2025-05-01",
    ownerOrgId: 7,
    ownedByOrg: true,
    ownerInstructorId: 97,
    durationHours: 5,
    dailySessionDuration: 5,
    level: "Advanced",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 17,
    title: "Healthcare IT Systems",
    description: "Implement healthcare technology solutions",
    mediumDescription: "Learn EMR systems, healthcare data standards, and HIPAA compliance for healthcare IT implementation.",
    longDescription: "Comprehensive healthcare IT course covering electronic health records, data interoperability, security compliance, and healthcare technology implementation.",
    tags: ["EMR", "HIPAA", "Healthcare IT", "Data"],
    courseTopics: [
      {
        title: "Electronic Health Records",
        children: [
          { title: "Introduction to EMR Systems" },
          { title: "Benefits and Challenges of EMR" },
          { title: "EMR Implementation Strategies" }
        ]
      },
      {
        title: "Healthcare Data Standards",
        children: [
          { title: "HL7 and FHIR Standards" },
          { title: "Data Interoperability" },
          { title: "Coding Systems (ICD, CPT)" }
        ]
      },
      {
        title: "HIPAA Compliance",
        children: [
          { title: "HIPAA Privacy Rule" },
          { title: "HIPAA Security Rule" },
          { title: "Breach Notification Rule" }
        ]
      },
      {
        title: "Healthcare IT Infrastructure",
        children: [
          { title: "IT Systems in Healthcare" },
          { title: "Network Security in Healthcare" },
          { title: "Disaster Recovery and Business Continuity" }
        ]
      },
      {
        title: "Telemedicine",
        children: [
          { title: "Telemedicine Technologies" },
          { title: "Regulatory and Legal Considerations" },
          { title: "Future of Telemedicine" }
        ]
      }
    ],
    subjectId: 3,
    industryId: 4,
    image: "https://images.unsplash.com/photo-1576669801975-4dc6cca8e6c6?w=500&h=300&fit=crop",
    createdBy: 2,
    createdOn: "2024-03-30",
    modifiedBy: 2,
    modifiedOn: "2025-05-01",
    ownerOrgId: 4,
    ownedByOrg: true,
    ownerInstructorId: 53,
    durationHours: 4,
    dailySessionDuration: 4,
    level: "Intermediate",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 18,
    title: "Public Health Analytics",
    description: "Analyze population health data for insights",
    mediumDescription: "Learn epidemiological methods, health data analysis, and public health surveillance techniques.",
    longDescription: "Master public health analytics with focus on disease surveillance, health outcomes analysis, and evidence-based public health interventions.",
    tags: ["Epidemiology", "Analytics", "Surveillance", "Health"],
    courseTopics: [
      {
        title: "Disease Surveillance",
        children: [
          { title: "Surveillance Systems and Methods" },
          { title: "Data Sources for Public Health" },
          { title: "Program Evaluation" }
        ]
      },
      {
        title: "Epidemiological Methods",
        children: [
          { title: "Study Designs in Epidemiology" },
          { title: "Measures of Association" },
          { title: "Bias and Confounding" }
        ]
      },
      {
        title: "Health Outcomes",
        children: [
          { title: "Defining and Measuring Health Outcomes" },
          { title: "Statistical Analysis of Health Data" },
          { title: "Interpreting Epidemiological Data" }
        ]
      },
      {
        title: "Intervention Design",
        children: [
          { title: "Designing Public Health Interventions" },
          { title: "Implementation Science" },
          { title: "Evaluating Public Health Programs" }
        ]
      },
      {
        title: "Health Policy",
        children: [
          { title: "Policy Analysis and Development" },
          { title: "Stakeholder Engagement" },
          { title: "Public Health Advocacy" }
        ]
      }
    ],
    subjectId: 4,
    industryId: 4,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500&h=300&fit=crop",
    createdBy: 5,
    createdOn: "2024-04-05",
    modifiedBy: 5,
    modifiedOn: "2025-05-01",
    ownerOrgId: 7,
    ownedByOrg: true,
    ownerInstructorId: 108,
    durationHours: 4.5,
    dailySessionDuration: 4.5,
    level: "Advanced",
    mode: "offline",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },

  // Finance Courses
  {
    id: 19,
    title: "Algorithmic Trading Strategies",
    description: "Build automated trading systems",
    mediumDescription: "Learn quantitative analysis, trading algorithms, and risk management for systematic trading strategies.",
    longDescription: "Master algorithmic trading with hands-on experience in strategy development, backtesting, risk management, and automated execution systems.",
    tags: ["Algorithms", "Trading", "Python", "Risk"],
    courseTopics: [
      {
        title: "Quantitative Analysis",
        children: [
          { title: "Statistical Analysis for Trading" },
          { title: "Time Series Analysis" },
          { title: "Risk and Return Metrics" }
        ]
      },
      {
        title: "Strategy Development",
        children: [
          { title: "Mean Reversion Strategies" },
          { title: "Momentum Trading Strategies" },
          { title: "Arbitrage Opportunities" }
        ]
      },
      {
        title: "Backtesting",
        children: [
          { title: "Backtesting Frameworks" },
          { title: "Performance Metrics for Backtesting" },
          { title: "Avoiding Lookahead Bias" }
        ]
      },
    ],
    subjectId: 1,
    industryId: 5,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop",
    createdBy: 4,
    createdOn: "2024-04-10",
    modifiedBy: 4,
    modifiedOn: "2025-05-01",
    ownerOrgId: 1,
    ownedByOrg: true,
    ownerInstructorId: 12,
    durationHours: 6,
    dailySessionDuration: 6,
    level: "Advanced",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 20,
    title: "Investment Analysis & Valuation",
    description: "Master fundamental and technical analysis",
    mediumDescription: "Learn DCF modeling, financial statement analysis, and investment valuation techniques for smart investing.",
    longDescription: "Comprehensive investment analysis course covering fundamental analysis, valuation models, portfolio theory, and investment strategy development.",
    tags: ["Valuation", "DCF", "Analysis", "Investing"],
    courseTopics: [
      {
        title: "Financial Statement Analysis",
        children: [
          { title: "Understanding Income Statements" },
          { title: "Analyzing Balance Sheets" },
          { title: "Cash Flow Statement Analysis" }
        ]
      },
      {
        title: "DCF Modeling",
        children: [
          { title: "Building a DCF Model" },
          { title: "Estimating Discount Rates" },
          { title: "Terminal Value Calculation" }
        ]
      },
      {
        title: "Comparable Analysis",
        children: [
          { title: "Identifying Comparable Companies" },
          { title: "Valuation Multiples" },
          { title: "Market Capitalization" }
        ]
      },
      {
        title: "Portfolio Theory",
        children: [
          { title: "Modern Portfolio Theory" },
          { title: "Efficient Frontier" },
          { title: "Capital Asset Pricing Model (CAPM)" }
        ]
      },
      {
        title: "Investment Strategy",
        children: [
          { title: "Value Investing" },
          { title: "Growth Investing" },
          { title: "Risk Management in Investing" }
        ]
      }
    ],
    subjectId: 2,
    industryId: 5,
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&h=300&fit=crop",
    createdBy: 4,
    createdOn: "2024-04-15",
    modifiedBy: 4,
    modifiedOn: "2025-05-01",
    ownerOrgId: 2,
    ownedByOrg: true,
    ownerInstructorId: null,
    durationHours: 5,
    dailySessionDuration: 5,
    level: "Intermediate",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 21,
    title: "Cryptocurrency & Blockchain Finance",
    description: "Navigate the digital asset ecosystem",
    mediumDescription: "Learn blockchain technology, cryptocurrency trading, DeFi protocols, and digital asset management.",
    longDescription: "Master cryptocurrency and blockchain finance with focus on digital asset analysis, DeFi protocols, smart contracts, and blockchain investment strategies.",
    tags: ["Blockchain", "Crypto", "DeFi", "Smart Contracts"],
    courseTopics: [
      {
        title: "Blockchain Technology",
        children: [
          { title: "Introduction to Blockchain" },
          { title: "How Blockchain Works" },
          { title: "Blockchain Use Cases" }
        ]
      },
      {
        title: "Cryptocurrency Analysis",
        children: [
          { title: "Bitcoin and Cryptocurrency Basics" },
          { title: "Analyzing Cryptocurrency Markets" },
          { title: "Valuing Cryptocurrencies" }
        ]
      },
      {
        title: "DeFi Protocols",
        children: [
          { title: "Introduction to DeFi" },
          { title: "Lending and Borrowing Protocols" },
          { title: "Decentralized Exchanges (DEXs)" }
        ]
      },
      {
        title: "Smart Contracts",
        children: [
          { title: "Introduction to Smart Contracts" },
          { title: "Smart Contract Development" },
          { title: "Auditing and Security of Smart Contracts" }
        ]
      },
      {
        title: "Risk Management",
        children: [
          { title: "Risks in Cryptocurrency Investments" },
          { title: "Mitigating Risks in DeFi" },
          { title: "Regulatory and Compliance Risks" }
        ]
      }
    ],
    subjectId: 3,
    industryId: 5,
    image: "https://images.unsplash.com/photo-1518544866980-aec5e4d23a64?w=500&h=300&fit=crop",
    createdBy: 4,
    createdOn: "2024-04-20",
    modifiedBy: 4,
    modifiedOn: "2025-05-01",
    ownerOrgId: 2,
    ownedByOrg: true,
    ownerInstructorId: null,
    durationHours: 4,
    dailySessionDuration: 4,
    level: "Intermediate",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 22,
    title: "Risk Management & Derivatives",
    description: "Master financial risk management",
    mediumDescription: "Learn options, futures, swaps, and advanced risk management techniques for financial institutions.",
    longDescription: "Comprehensive risk management course covering derivatives pricing, hedging strategies, credit risk, market risk, and regulatory compliance.",
    tags: ["Risk", "Derivatives", "Hedging", "Compliance"],
    courseTopics: [
      {
        title: "Options Pricing",
        children: [
          { title: "Introduction to Options" },
          { title: "Option Pricing Models" },
          { title: "Greeks in Options Trading" }
        ]
      },
      {
        title: "Futures Trading",
        children: [
          { title: "Understanding Futures Contracts" },
          { title: "Margin and Leverage in Futures" },
          { title: "Hedging with Futures" }
        ]
      },
      {
        title: "Swap Contracts",
        children: [
          { title: "Introduction to Swaps" },
          { title: "Interest Rate Swaps" },
          { title: "Currency Swaps" }
        ]
      },
      {
        title: "VaR Models",
        children: [
          { title: "Value at Risk (VaR) Introduction" },
          { title: "Calculating VaR" },
          { title: "VaR Limitations and Challenges" }
        ]
      },
      {
        title: "Credit Risk",
        children: [
          { title: "Understanding Credit Risk" },
          { title: "Credit Risk Models" },
          { title: "Mitigating Credit Risk" }
        ]
      }
    ],
    subjectId: 4,
    industryId: 5,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop",
    createdBy: 4,
    createdOn: "2024-04-25",
    modifiedBy: 4,
    modifiedOn: "2025-05-01",
    ownerOrgId: 1,
    ownedByOrg: true,
    ownerInstructorId: 45,
    durationHours: 5.5,
    dailySessionDuration: 5.5,
    level: "Advanced",
    mode: "offline",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },

  // Engineering Courses
  {
    id: 23,
    title: "Sustainable Energy Systems",
    description: "Design renewable energy solutions",
    mediumDescription: "Learn solar, wind, and battery technologies with hands-on experience in sustainable energy system design.",
    longDescription: "Master sustainable energy systems with focus on renewable energy technologies, energy storage, grid integration, and sustainability analysis.",
    tags: ["Solar", "Wind", "Batteries", "Sustainability"],
    courseTopics: [
      {
        title: "Solar Technology",
        children: [
          { title: "Photovoltaic Systems" },
          { title: "Solar Thermal Systems" },
          { title: "Solar Energy Storage" }
        ]
      },
      {
        title: "Wind Energy",
        children: [
          { title: "Wind Turbine Technology" },
          { title: "Site Assessment and Selection" },
          { title: "Wind Farm Design" }
        ]
      },
      {
        title: "Energy Storage",
        children: [
          { title: "Battery Energy Storage Systems" },
          { title: "Hydrogen Fuel Cells" },
          { title: "Pumped Hydro Storage" }
        ]
      },
      {
        title: "Grid Integration",
        children: [
          { title: "Smart Grids" },
          { title: "Microgrids" },
          { title: "Grid Stability and Reliability" }
        ]
      },
      {
        title: "Sustainability Analysis",
        children: [
          { title: "Life Cycle Assessment" },
          { title: "Environmental Impact Assessment" },
          { title: "Sustainability Reporting" }
        ]
      }
    ],
    subjectId: 1,
    industryId: 6,
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500&h=300&fit=crop",
    createdBy: 6,
    createdOn: "2024-04-30",
    modifiedBy: 6,
    modifiedOn: "2025-05-01",
    ownerOrgId: 6,
    ownedByOrg: true,
    ownerInstructorId: 135,
    durationHours: 6,
    dailySessionDuration: 6,
    level: "Advanced",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 24,
    title: "Mechanical Design & CAD",
    description: "Master mechanical engineering design",
    mediumDescription: "Learn SolidWorks, design principles, and manufacturing considerations for mechanical product development.",
    longDescription: "Comprehensive mechanical design course covering CAD modeling, design for manufacturing, materials selection, and engineering analysis.",
    tags: ["CAD", "SolidWorks", "Design", "Manufacturing"],
    courseTopics: [
      {
        title: "3D Modeling",
        children: [
          { title: "Introduction to 3D Modeling" },
          { title: "SolidWorks Sketching and Features" },
          { title: "Assembly Modeling" }
        ]
      },
      {
        title: "Technical Drawings",
        children: [
          { title: "Creating Technical Drawings" },
          { title: "Dimensioning and Tolerancing" },
          { title: "Geometric Dimensioning and Tolerancing (GD&T)" }
        ]
      },
      {
        title: "Design for Manufacturing",
        children: [
          { title: "DFM Principles" },
          { title: "Design for Assembly (DFA)" },
          { title: "Design for Cost" }
        ]
      },
      {
        title: "Materials Selection",
        children: [
          { title: "Introduction to Materials Science" },
          { title: "Selecting Materials for Design" },
          { title: "Material Properties and Testing" }
        ]
      },
      {
        title: "Finite Element Analysis",
        children: [
          { title: "Introduction to Finite Element Analysis" },
          { title: "Setting Up FEA in SolidWorks" },
          { title: "Interpreting FEA Results" }
        ]
      }
    ],
    subjectId: 2,
    industryId: 6,
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=500&h=300&fit=crop",
    createdBy: 6,
    createdOn: "2024-05-05",
    modifiedBy: 6,
    modifiedOn: "2025-05-01",
    ownerOrgId: 6,
    ownedByOrg: true,
    ownerInstructorId: 136,
    durationHours: 5,
    dailySessionDuration: 5,
    level: "Intermediate",
    mode: "offline",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },

      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 25,
    title: "Electrical Circuit Design",
    description: "Design electronic circuits and systems",
    mediumDescription: "Learn analog and digital circuit design, PCB layout, and electronic system development with practical projects.",
    longDescription: "Master electrical circuit design with hands-on experience in analog circuits, digital systems, PCB design, and electronic product development.",
    tags: ["Circuits", "PCB", "Electronics", "Design"],
    courseTopics: [
      {
        title: "Analog Circuits",
        children: [
          { title: "Op-Amp Circuits" },
          { title: "Filter Design" },
          { title: "Oscillator Design" }
        ]
      },
      {
        title: "Digital Systems",
        children: [
          { title: "Introduction to Digital Logic" },
          { title: "Combinational Logic Circuits" },
          { title: "Sequential Logic Circuits" }
        ]
      },
      {
        title: "PCB Layout",
        children: [
          { title: "PCB Design Software Overview" },
          { title: "Creating PCB Layouts" },
          { title: "PCB Manufacturing Processes" }
        ]
      },
      {
        title: "Circuit Simulation",
        children: [
          { title: "Introduction to Circuit Simulation" },
          { title: "Simulating Analog Circuits" },
          { title: "Simulating Digital Circuits" }
        ]
      },
      {
        title: "Embedded Systems",
        children: [
          { title: "Introduction to Embedded Systems" },
          { title: "Microcontroller Interfacing" },
          { title: "Wireless Communication Basics" }
        ]
      }
    ],
    subjectId: 3,
    industryId: 6,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop",
    createdBy: 6,
    createdOn: "2024-05-10",
    modifiedBy: 6,
    modifiedOn: "2025-05-01",
    ownerOrgId: 6,
    ownedByOrg: true,
    ownerInstructorId: 144,
    durationHours: 4.5,
    dailySessionDuration: 4.5,
    level: "Intermediate",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 26,
    title: "Manufacturing Process Optimization",
    description: "Optimize production systems for efficiency",
    mediumDescription: "Learn lean manufacturing, Six Sigma, and automation technologies for industrial process improvement.",
    longDescription: "Comprehensive manufacturing optimization course covering lean principles, quality management, automation, and continuous improvement methodologies.",
    tags: ["Lean", "Six Sigma", "Automation", "Quality"],
    courseTopics: [
      {
        title: "Lean Manufacturing",
        children: [
          { title: "Principles of Lean Manufacturing" },
          { title: "Value Stream Mapping" },
          { title: "5S System" }
        ]
      },
      {
        title: "Six Sigma",
        children: [
          { title: "Introduction to Six Sigma" },
          { title: "DMAIC Methodology" },
          { title: "Statistical Tools for Six Sigma" }
        ]
      },
      {
        title: "Process Automation",
        children: [
          { title: "Introduction to Process Automation" },
          { title: "Automation Technologies" },
          { title: "Implementing Automation in Manufacturing" }
        ]
      },
      {
        title: "Quality Control",
        children: [
          { title: "Quality Control Tools and Techniques" },
          { title: "Control Charts" },
          { title: "Process Capability Analysis" }
        ]
      },
      {
        title: "Continuous Improvement",
        children: [
          { title: "Kaizen Events" },
          { title: "Root Cause Analysis" },
          { title: "Failure Mode and Effects Analysis (FMEA)" }
        ]
      }
    ],
    subjectId: 4,
    industryId: 6,
    image: "https://images.unsplash.com/photo-1565352285315-aaa8cb35940f?w=500&h=300&fit=crop",
    createdBy: 6,
    createdOn: "2024-05-15",
    modifiedBy: 6,
    modifiedOn: "2025-05-01",
    ownerOrgId: 6,
    ownedByOrg: true,
    ownerInstructorId: null,
    durationHours: 5.5,
    dailySessionDuration: 5.5,
    level: "Advanced",
    mode: "offline",
    hasTools: false,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },

  // Additional Software Development Courses
  {
    id: 27,
    title: "Mobile App Development with Flutter",
    description: "Build cross-platform mobile applications",
    mediumDescription: "Learn Flutter framework, Dart programming, and mobile UI/UX design for iOS and Android development.",
    longDescription: "Master mobile app development with Flutter and Dart. Build beautiful, performant mobile applications for both iOS and Android platforms with a single codebase.",
    tags: ["Flutter", "Dart", "Mobile", "Cross-platform"],
    courseTopics: [
      {
        title: "Flutter Framework",
        children: [
          { title: "Introduction to Flutter" },
          { title: "Flutter Widgets" },
          { title: "State Management in Flutter" }
        ]
      },
      {
        title: "Dart Language",
        children: [
          { title: "Dart Basics" },
          { title: "Asynchronous Programming in Dart" },
          { title: "Dart for Flutter Developers" }
        ]
      },
      {
        title: "Mobile UI/UX Design",
        children: [
          { title: "Material Design Principles" },
          { title: "Cupertino (iOS) Design Guidelines" },
          { title: "Responsive Design in Flutter" }
        ]
      },
      {
        title: "API Integration",
        children: [
          { title: "Consuming RESTful APIs" },
          { title: "Handling API Responses" },
          { title: "Error Handling in API Calls" }
        ]
      },
      {
        title: "App Store Deployment",
        children: [
          { title: "Preparing for App Store Submission" },
          { title: "Publishing to Google Play Store" },
          { title: "App Store Optimization (ASO)" }
        ]
      }
    ],
    subjectId: 1,
    industryId: 1,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop",
    createdBy: 1,
    createdOn: "2024-05-20",
    modifiedBy: 1,
    modifiedOn: "2025-05-01",
    ownerOrgId: 4,
    ownedByOrg: true,
    ownerInstructorId: 53,
    durationHours: 5,
    dailySessionDuration: 5,
    level: "Intermediate",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 28,
    title: "DevOps & Cloud Infrastructure",
    description: "Master modern deployment and infrastructure",
    mediumDescription: "Learn Docker, Kubernetes, AWS, and CI/CD pipelines for scalable application deployment and management.",
    longDescription: "Comprehensive DevOps course covering containerization, orchestration, cloud platforms, and automation for modern software delivery pipelines.",
    tags: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    courseTopics: [
      {
        title: "Containerization",
        children: [
          { title: "Introduction to Docker" },
          { title: "Docker Images and Containers" },
          { title: "Docker Compose" }
        ]
      },
      {
        title: "Container Orchestration",
        children: [
          { title: "Introduction to Kubernetes" },
          { title: "Kubernetes Architecture" },
          { title: "Managing Kubernetes Deployments" }
        ]
      },
      {
        title: "Cloud Computing",
        children: [
          { title: "Introduction to AWS" },
          { title: "AWS EC2 and S3" },
          { title: "AWS Lambda and Serverless" }
        ]
      },
      {
        title: "Infrastructure as Code",
        children: [
          { title: "Introduction to Terraform" },
          { title: "Provisioning Infrastructure with Terraform" },
          { title: "Managing Infrastructure Lifecycle" }
        ]
      },
      {
        title: "Monitoring and Security",
        children: [
          { title: "Monitoring Containerized Applications" },
          { title: "Logging and Monitoring with ELK Stack" },
          { title: "Securing Docker and Kubernetes" }
        ]
      }
    ],
    subjectId: 3,
    industryId: 1,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop",
    createdBy: 2,
    createdOn: "2024-05-25",
    modifiedBy: 2,
    modifiedOn: "2025-05-01",
    ownerOrgId: 1,
    ownedByOrg: true,
    ownerInstructorId: 155,
    durationHours: 6,
    dailySessionDuration: 6,
    level: "Advanced",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 29,
    title: "Cybersecurity Fundamentals",
    description: "Protect systems and data from threats",
    mediumDescription: "Learn ethical hacking, penetration testing, and security best practices for modern applications and networks.",
    longDescription: "Master cybersecurity fundamentals with hands-on experience in threat assessment, vulnerability testing, incident response, and security architecture.",
    tags: ["Security", "Ethical Hacking", "Penetration Testing", "Compliance"],
    courseTopics: [
      {
        title: "Network Security",
        children: [
          { title: "Introduction to Network Security" },
          { title: "Firewalls and VPNs" },
          { title: "Intrusion Detection and Prevention Systems (IDPS)" }
        ]
      },
      {
        title: "Web Application Security",
        children: [
          { title: "OWASP Top Ten Vulnerabilities" },
          { title: "Secure Coding Practices" },
          { title: "Web Application Firewalls (WAF)" }
        ]
      },
      {
        title: "Ethical Hacking",
        children: [
          { title: "Introduction to Ethical Hacking" },
          { title: "Penetration Testing Methodologies" },
          { title: "Reporting and Remediation" }
        ]
      },
      {
        title: "Incident Response",
        children: [
          { title: "Incident Response Planning" },
          { title: "Detecting and Analyzing Incidents" },
          { title: "Containment, Eradication, and Recovery" }
        ]
      },
      {
        title: "Risk Assessment",
        children: [
          { title: "Conducting Risk Assessments" },
          { title: "Risk Mitigation Strategies" },
          { title: "Compliance and Regulatory Requirements" }
        ]
      }
    ],
    subjectId: 5,
    industryId: 1,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=300&fit=crop",
    createdBy: 2,
    createdOn: "2024-06-01",
    modifiedBy: 2,
    modifiedOn: "2025-05-01",
    ownerOrgId: 1,
    ownedByOrg: true,
    ownerInstructorId: null,
    durationHours: 4.5,
    dailySessionDuration: 4.5,
    level: "Intermediate",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  },
  {
    id: 30,
    title: "Artificial Intelligence & Deep Learning",
    description: "Build AI applications with neural networks",
    mediumDescription: "Learn TensorFlow, PyTorch, and neural network architectures for computer vision and natural language processing.",
    longDescription: "Advanced AI course covering deep learning frameworks, neural network architectures, computer vision, natural language processing, and AI application development.",
    tags: ["AI", "Deep Learning", "TensorFlow", "Neural Networks"],
    courseTopics: [
      {
        title: "Neural Networks",
        children: [
          { title: "Introduction to Neural Networks" },
          { title: "Feedforward Neural Networks" },
          { title: "Backpropagation Algorithm" }
        ]
      },
      {
        title: "Convolutional Networks",
        children: [
          { title: "Introduction to CNNs" },
          { title: "CNN Architectures (LeNet, AlexNet, VGG, ResNet)" },
          { title: "Transfer Learning with CNNs" }
        ]
      },
      {
        title: "Recurrent Networks",
        children: [
          { title: "Introduction to RNNs" },
          { title: "LSTM and GRU Networks" },
          { title: "Sequence-to-Sequence Models" }
        ]
      },
      {
        title: "Computer Vision",
        children: [
          { title: "Image Processing Basics" },
          { title: "Object Detection and Recognition" },
          { title: "Image Segmentation" }
        ]
      },
      {
        title: "Natural Language Processing",
        children: [
          { title: "Text Preprocessing" },
          { title: "Sentiment Analysis" },
          { title: "Named Entity Recognition" }
        ]
      }
    ],
    subjectId: 4,
    industryId: 1,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=300&fit=crop",
    createdBy: 2,
    createdOn: "2024-06-05",
    modifiedBy: 2,
    modifiedOn: "2025-05-01",
    ownerOrgId: 1,
    ownedByOrg: true,
    ownerInstructorId: null,
    durationHours: 7,
    dailySessionDuration: 7,
    level: "Advanced",
    mode: "live",
    hasTools: true,
    isNewCourse: false,
    isIntentCourse: false,
    isActiveCourse: true,
    isExpiredCourse: false,
    isActive: true,
    isPublic: true,
    isDeleted: false,
    courseStatusHistory: [
      {
        status: 'courseCreationInProgress',
        date: '2025-05-01',
        reasonForStatusChange: 'Course creation started',
        statusChangedBy: 1
      },
      {
        status: 'couseActive',
        date: '2025-05-10',
        reasonForStatusChange: 'Course published and active',
        statusChangedBy: 1
      },
      {
        status: 'courseUpdationInProgress',
        date: '2025-06-01',
        reasonForStatusChange: 'Course update started',
        statusChangedBy: 1
      }
    ]
  }
];
