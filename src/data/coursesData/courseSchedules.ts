import { CourseSchedule } from '../../types/courseTypes/courseSchedule.type';

// Helper to get day of week from date string (0=Sunday, 1=Monday, ...)
function getDayOfWeek(dateStr: string): number {
  return new Date(dateStr).getDay();
}

// Map day names to numbers for daysOfWeek
const dayNameToNum: Record<string, number> = {
  'Sunday': 0,
  'Monday': 1,
  'Tuesday': 2,
  'Wednesday': 3,
  'Thursday': 4,
  'Friday': 5,
  'Saturday': 6,
};

// Course schedules (multiple per course, past and future)
export const courseSchedules: CourseSchedule[] =[
  {
    "scheduleId": 101,
    "courseId": 1,
    "startDate": "2025-06-05",
    "endDate": "2025-06-09",
    "nextSession": "2025-06-05 09:00",
    "mode": "live",
    "price": "$99",
    "byInstructorId": 1,
    "forOrgId": 1,
    "learnersEnrolledIds": [
      3
    ],
    "guestLearnersEnrolledIds": [],
    "normalSessionStart": "09:00",
    "daysOfWeek": [
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Monday"
    ],
    "sessionDays": [
      {
        "sessionDate": "2025-06-05",
        "actualSessionStartTime": "09:00",
        "recordingLink": null,
        "actualDuration": 2,
        "sessionStatus": "Completed",
        "numberOfStudentsEnrolled": 1,
        "numberOfStudentsAttended": 1,
        "attendedStudentIds": [
          3
        ],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-06-06",
        "actualSessionStartTime": "09:00",
        "recordingLink": null,
        "actualDuration": 2,
        "sessionStatus": "Completed",
        "numberOfStudentsEnrolled": 1,
        "numberOfStudentsAttended": 1,
        "attendedStudentIds": [
          3
        ],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-06-07",
        "actualSessionStartTime": "09:00",
        "recordingLink": null,
        "actualDuration": 2,
        "sessionStatus": "Completed",
        "numberOfStudentsEnrolled": 1,
        "numberOfStudentsAttended": 1,
        "attendedStudentIds": [
          3
        ],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-06-08",
        "actualSessionStartTime": "09:00",
        "recordingLink": null,
        "actualDuration": 2,
        "sessionStatus": "Completed",
        "numberOfStudentsEnrolled": 1,
        "numberOfStudentsAttended": 1,
        "attendedStudentIds": [
          3
        ],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-06-09",
        "actualSessionStartTime": "09:00",
        "recordingLink": null,
        "actualDuration": 2,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 1,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      }
    ]
  },
  {
    "scheduleId": 102,
    "courseId": 1,
    "startDate": "2025-03-10",
    "endDate": "2025-03-14",
    "nextSession": "2025-03-10 09:00",
    "mode": "live",
    "price": "$89",
    "byInstructorId": 1,
    "forOrgId": 1,
    "learnersEnrolledIds": [
      3
    ],
    "guestLearnersEnrolledIds": [],
    "normalSessionStart": "09:00",
    "daysOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "sessionDays": [
      {
        "sessionDate": "2025-03-10",
        "actualSessionStartTime": "09:00",
        "recordingLink": null,
        "sessionStatus": "Completed",
        "actualDuration": 2,
        "numberOfStudentsEnrolled": 1,
        "numberOfStudentsAttended": 1,
        "attendedStudentIds": [
          3
        ],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-03-11",
        "actualSessionStartTime": "09:00",
        "recordingLink": null,
        "sessionStatus": "Completed",
        "actualDuration": 2,
        "numberOfStudentsEnrolled": 1,
        "numberOfStudentsAttended": 1,
        "attendedStudentIds": [
          3
        ],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-03-12",
        "actualSessionStartTime": "09:00",
        "recordingLink": null,
        "sessionStatus": "Completed",
        "actualDuration": 2,
        "numberOfStudentsEnrolled": 1,
        "numberOfStudentsAttended": 1,
        "attendedStudentIds": [
          3
        ],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-03-13",
        "actualSessionStartTime": "09:00",
        "recordingLink": null,
        "sessionStatus": "Completed",
        "actualDuration": 2,
        "numberOfStudentsEnrolled": 1,
        "numberOfStudentsAttended": 1,
        "attendedStudentIds": [
          3
        ],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-03-14",
        "actualSessionStartTime": "09:00",
        "recordingLink": null,
        "sessionStatus": "Completed",
        "actualDuration": 2,
        "numberOfStudentsEnrolled": 1,
        "numberOfStudentsAttended": 1,
        "attendedStudentIds": [
          3
        ],
        "absentStudentIds": []
      }
    ]
  },
  {
    "scheduleId": 103,
    "courseId": 2,
    "startDate": "2025-06-05",
    "endDate": "2025-06-08",
    "nextSession": "2025-06-05 13:00",
    "mode": "live",
    "price": "$149",
    "byInstructorId": 1,
    "forOrgId": 1,
    "learnersEnrolledIds": [
      2
    ],
    "guestLearnersEnrolledIds": [],
    "normalSessionStart": "13:00",
    "daysOfWeek": [
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "sessionDays": [
      {
        "sessionDate": "2025-06-05",
        "actualSessionStartTime": "13:00",
        "recordingLink": null,
        "actualDuration": 4,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 1,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": [
          2
        ]
      },
      {
        "sessionDate": "2025-06-06",
        "actualSessionStartTime": "13:00",
        "recordingLink": null,
        "actualDuration": 4,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 1,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": [
          2
        ]
      },
      {
        "sessionDate": "2025-06-07",
        "actualSessionStartTime": "13:00",
        "recordingLink": null,
        "actualDuration": 4,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 1,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": [
          2
        ]
      },
      {
        "sessionDate": "2025-06-08",
        "actualSessionStartTime": "13:00",
        "recordingLink": null,
        "actualDuration": 4,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 1,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": [
          2
        ]
      }
    ]
  },
  {
    "scheduleId": 104,
    "courseId": 2,
    "startDate": "2025-04-15",
    "endDate": "2025-04-18",
    "nextSession": "2025-04-15 13:00",
    "mode": "live",
    "price": "$139",
    "byInstructorId": 1,
    "forOrgId": 1,
    "learnersEnrolledIds": [],
    "guestLearnersEnrolledIds": [],
    "normalSessionStart": "13:00",
    "daysOfWeek": [
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "sessionDays": [
      {
        "sessionDate": "2025-04-15",
        "actualSessionStartTime": "13:00",
        "recordingLink": null,
        "sessionStatus": "Completed",
        "actualDuration": 4,
        "numberOfStudentsEnrolled": 8,
        "numberOfStudentsAttended": 5,
        "attendedStudentIds": [
          1,
          2,
          4,
          5,
          6
        ],
        "absentStudentIds": [
          7,
          8
        ]
      },
      {
        "sessionDate": "2025-04-16",
        "actualSessionStartTime": "13:00",
        "recordingLink": null,
        "sessionStatus": "Completed",
        "actualDuration": 4,
        "numberOfStudentsEnrolled": 8,
        "numberOfStudentsAttended": 6,
        "attendedStudentIds": [
          1,
          2,
          4,
          5,
          6,
          7
        ],
        "absentStudentIds": [
          3,
          8
        ]
      },
      {
        "sessionDate": "2025-04-17",
        "actualSessionStartTime": "13:00",
        "recordingLink": null,
        "sessionStatus": "Completed",
        "actualDuration": 4,
        "numberOfStudentsEnrolled": 8,
        "numberOfStudentsAttended": 8,
        "attendedStudentIds": [
          1,
          2,
          4,
          5,
          6,
          7,
          8
        ],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-04-18",
        "actualSessionStartTime": "13:00",
        "recordingLink": null,
        "sessionStatus": "Completed",
        "actualDuration": 4,
        "numberOfStudentsEnrolled": 8,
        "numberOfStudentsAttended": 7,
        "attendedStudentIds": [
          1,
          2,
          4,
          5,
          6,
          7,
          8
        ],
        "absentStudentIds": [
          3
        ]
      }
    ]
  },
  {
    "scheduleId": 105,
    "courseId": 3,
    "startDate": "2025-06-05",
    "endDate": "2025-06-08",
    "nextSession": "2025-06-05 19:42",
    "mode": "live",
    "price": "$199",
    "byInstructorId": 2,
    "forOrgId": 1,
    "learnersEnrolledIds": [
      1,
      6
    ],
    "guestLearnersEnrolledIds": [
      1
    ],
    "normalSessionStart": "19:42",
    "daysOfWeek": [
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "sessionDays": [
      {
        "sessionDate": "2025-06-05",
        "actualSessionStartTime": "19:42",
        "recordingLink": null,
        "actualDuration": 3,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 0,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-06-06",
        "actualSessionStartTime": "19:42",
        "recordingLink": null,
        "actualDuration": 3,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 0,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-06-07",
        "actualSessionStartTime": "19:42",
        "recordingLink": null,
        "actualDuration": 3,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 0,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-06-08",
        "actualSessionStartTime": "19:42",
        "recordingLink": null,
        "actualDuration": 3,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 0,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      }
    ]
  },
  {
    "scheduleId": 106,
    "courseId": 4,
    "startDate": "2025-06-06",
    "endDate": "2025-06-08",
    "nextSession": "2025-06-06 09:00",
    "mode": "live",
    "price": "$249",
    "byInstructorId": 2,
    "forOrgId": 1,
    "learnersEnrolledIds": [
      7
    ],
    "guestLearnersEnrolledIds": [],
    "normalSessionStart": "09:00",
    "daysOfWeek": [
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "sessionDays": [
      {
        "sessionDate": "2025-06-06",
        "actualSessionStartTime": "09:00",
        "recordingLink": null,
        "actualDuration": 3,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 0,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-06-07",
        "actualSessionStartTime": "09:00",
        "recordingLink": null,
        "actualDuration": 3,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 0,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-06-08",
        "actualSessionStartTime": "09:00",
        "recordingLink": null,
        "actualDuration": 3,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 0,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      }
    ]
  },
  {
    "scheduleId": 107,
    "courseId": 5,
    "startDate": "2025-06-06",
    "endDate": "2025-06-09",
    "nextSession": "2025-06-06 13:00",
    "mode": "live",
    "price": "$299",
    "byInstructorId": 2,
    "forOrgId": 1,
    "learnersEnrolledIds": [
      1,
      8
    ],
    "guestLearnersEnrolledIds": [
      1
    ],
    "normalSessionStart": "13:00",
    "daysOfWeek": [
      "Friday",
      "Saturday",
      "Sunday",
      "Monday"
    ],
    "sessionDays": [
      {
        "sessionDate": "2025-06-06",
        "actualSessionStartTime": "13:00",
        "recordingLink": null,
        "actualDuration": 3,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 0,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-06-07",
        "actualSessionStartTime": "13:00",
        "recordingLink": null,
        "actualDuration": 3,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 0,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-06-08",
        "actualSessionStartTime": "13:00",
        "recordingLink": null,
        "actualDuration": 3,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 0,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-06-09",
        "actualSessionStartTime": "13:00",
        "recordingLink": null,
        "actualDuration": 3,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 0,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      }
    ]
  },
  {
    "scheduleId": 108,
    "courseId": 6,
    "startDate": "2025-06-06",
    "endDate": "2025-06-09",
    "nextSession": "2025-06-06 17:00",
    "mode": "offline",
    "price": "$189",
    "byInstructorId": 1,
    "forOrgId": 1,
    "learnersEnrolledIds": [
      5,
      9
    ],
    "guestLearnersEnrolledIds": [
      5
    ],
    "normalSessionStart": "17:00",
    "daysOfWeek": [
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "sessionDays": [
      {
        "sessionDate": "2025-06-06",
        "actualSessionStartTime": "17:00",
        "recordingLink": null,
        "actualDuration": 3,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 0,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-06-07",
        "actualSessionStartTime": "17:00",
        "recordingLink": null,
        "actualDuration": 3,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 0,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-06-08",
        "actualSessionStartTime": "17:00",
        "recordingLink": null,
        "actualDuration": 3,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 0,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      },
      {
        "sessionDate": "2025-06-09",
        "actualSessionStartTime": "17:00",
        "recordingLink": null,
        "actualDuration": 3,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 0,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      }
    ]
  },
  {
    "scheduleId": 109,
    "courseId": 7,
    "startDate": "2025-06-07",
    "endDate": "2025-06-07",
    "nextSession": "2025-06-07 09:00",
    "mode": "offline",
    "price": "$179",
    "byInstructorId": 3,
    "forOrgId": 1,
    "learnersEnrolledIds": [
      2,
      10
    ],
    "guestLearnersEnrolledIds": [
      2
    ],
    "normalSessionStart": "09:00",
    "daysOfWeek": [
      "Saturday"
    ],
    "sessionDays": [
      {
        "sessionDate": "2025-06-07",
        "actualSessionStartTime": "09:00",
        "recordingLink": null,
        "actualDuration": 1,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 0,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      }
    ]
  },
  {
    "scheduleId": 110,
    "courseId": 8,
    "startDate": "2025-06-07",
    "endDate": "2025-06-07",
    "nextSession": "2025-06-07 13:00",
    "mode": "live",
    "price": "$149",
    "byInstructorId": 3,
    "forOrgId": 1,
    "learnersEnrolledIds": [
      3,
      10
    ],
    "guestLearnersEnrolledIds": [],
    "normalSessionStart": "13:00",
    "daysOfWeek": [
      "Saturday"
    ],
    "sessionDays": [
      {
        "sessionDate": "2025-06-07",
        "actualSessionStartTime": "13:00",
        "recordingLink": null,
        "actualDuration": 1,
        "sessionStatus": "YetToStart",
        "numberOfStudentsEnrolled": 0,
        "numberOfStudentsAttended": 0,
        "attendedStudentIds": [],
        "absentStudentIds": []
      }
    ]
  }
];