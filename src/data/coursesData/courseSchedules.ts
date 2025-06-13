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
export const courseSchedules: CourseSchedule[] = [
  {
    scheduleId: 106,
    courseId: 4,
    startDate: "2025-06-06",
    endDate: "2025-06-08",
    nextSession: "2025-06-06 09:00",
    mode: "live",
    price: "249",
    byInstructorId: 2,
    forOrgId: 1,
    learnersEnrolledIds: [
      7
    ],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "09:00",
    daysOfWeek: [
      "Friday",
      "Saturday",
      "Sunday"
    ],
    sessionDays: [
      {
        sessionDate: "2025-06-06",
        actualSessionStartTime: "09:00",
        recordingLink: null,
        actualDuration: 3,
        sessionStatus: "YetToStart",
        numberOfStudentsEnrolled: 0,
        numberOfStudentsAttended: 0,
        attendedStudentIds: [],
        absentStudentIds: []
      },
      {
        sessionDate: "2025-06-07",
        actualSessionStartTime: "09:00",
        recordingLink: null,
        actualDuration: 3,
        sessionStatus: "YetToStart",
        numberOfStudentsEnrolled: 0,
        numberOfStudentsAttended: 0,
        attendedStudentIds: [],
        absentStudentIds: []
      },
      {
        sessionDate: "2025-06-08",
        actualSessionStartTime: "09:00",
        recordingLink: null,
        actualDuration: 3,
        sessionStatus: "YetToStart",
        numberOfStudentsEnrolled: 0,
        numberOfStudentsAttended: 0,
        attendedStudentIds: [],
        absentStudentIds: []
      }
    ]
  },
  {
    scheduleId: 107,
    courseId: 5,
    startDate: "2025-06-06",
    endDate: "2025-06-09",
    nextSession: "2025-06-06 13:00",
    mode: "live",
    price: "299",
    byInstructorId: 2,
    forOrgId: 1,
    learnersEnrolledIds: [
      1,
      8
    ],
    guestLearnersEnrolledIds: [
      1
    ],
    normalSessionStart: "13:00",
    daysOfWeek: [
      "Friday",
      "Saturday",
      "Sunday",
      "Monday"
    ],
    sessionDays: [
      {
        sessionDate: "2025-06-06",
        actualSessionStartTime: "13:00",
        recordingLink: null,
        actualDuration: 3,
        sessionStatus: "YetToStart",
        numberOfStudentsEnrolled: 0,
        numberOfStudentsAttended: 0,
        attendedStudentIds: [],
        absentStudentIds: []
      },
      {
        sessionDate: "2025-06-07",
        actualSessionStartTime: "13:00",
        recordingLink: null,
        actualDuration: 3,
        sessionStatus: "YetToStart",
        numberOfStudentsEnrolled: 0,
        numberOfStudentsAttended: 0,
        attendedStudentIds: [],
        absentStudentIds: []
      },
      {
        sessionDate: "2025-06-08",
        actualSessionStartTime: "13:00",
        recordingLink: null,
        actualDuration: 3,
        sessionStatus: "YetToStart",
        numberOfStudentsEnrolled: 0,
        numberOfStudentsAttended: 0,
        attendedStudentIds: [],
        absentStudentIds: []
      },
      {
        sessionDate: "2025-06-09",
        actualSessionStartTime: "13:00",
        recordingLink: null,
        actualDuration: 3,
        sessionStatus: "YetToStart",
        numberOfStudentsEnrolled: 0,
        numberOfStudentsAttended: 0,
        attendedStudentIds: [],
        absentStudentIds: []
      }
    ]
  },
  {
    scheduleId: 108,
    courseId: 6,
    startDate: "2025-06-06",
    endDate: "2025-06-09",
    nextSession: "2025-06-06 17:00",
    mode: "offline",
    price: "189",
    byInstructorId: 1,
    forOrgId: 1,
    learnersEnrolledIds: [
      5,
      9
    ],
    guestLearnersEnrolledIds: [
      5
    ],
    normalSessionStart: "17:00",
    daysOfWeek: [
      "Friday",
      "Saturday",
      "Sunday"
    ],
    sessionDays: [
      {
        sessionDate: "2025-06-06",
        actualSessionStartTime: "17:00",
        recordingLink: null,
        actualDuration: 3,
        sessionStatus: "YetToStart",
        numberOfStudentsEnrolled: 0,
        numberOfStudentsAttended: 0,
        attendedStudentIds: [],
        absentStudentIds: []
      },
      {
        sessionDate: "2025-06-07",
        actualSessionStartTime: "17:00",
        recordingLink: null,
        actualDuration: 3,
        sessionStatus: "YetToStart",
        numberOfStudentsEnrolled: 0,
        numberOfStudentsAttended: 0,
        attendedStudentIds: [],
        absentStudentIds: []
      },
      {
        sessionDate: "2025-06-08",
        actualSessionStartTime: "17:00",
        recordingLink: null,
        actualDuration: 3,
        sessionStatus: "YetToStart",
        numberOfStudentsEnrolled: 0,
        numberOfStudentsAttended: 0,
        attendedStudentIds: [],
        absentStudentIds: []
      },
      {
        sessionDate: "2025-06-09",
        actualSessionStartTime: "17:00",
        recordingLink: null,
        actualDuration: 3,
        sessionStatus: "YetToStart",
        numberOfStudentsEnrolled: 0,
        numberOfStudentsAttended: 0,
        attendedStudentIds: [],
        absentStudentIds: []
      }
    ]
  },
  {
    scheduleId: 109,
    courseId: 7,
    startDate: "2025-06-07",
    endDate: "2025-06-07",
    nextSession: "2025-06-07 09:00",
    mode: "offline",
    price: "179",
    byInstructorId: 3,
    forOrgId: 1,
    learnersEnrolledIds: [
      2,
      10
    ],
    guestLearnersEnrolledIds: [
      2
    ],
    normalSessionStart: "09:00",
    daysOfWeek: [
      "Saturday"
    ],
    sessionDays: [
      {
        sessionDate: "2025-06-07",
        actualSessionStartTime: "09:00",
        recordingLink: null,
        actualDuration: 1,
        sessionStatus: "YetToStart",
        numberOfStudentsEnrolled: 0,
        numberOfStudentsAttended: 0,
        attendedStudentIds: [],
        absentStudentIds: []
      }
    ]
  },
  {
    scheduleId: 110,
    courseId: 8,
    startDate: "2025-06-07",
    endDate: "2025-06-07",
    nextSession: "2025-06-07 13:00",
    mode: "live",
    price: "149",
    byInstructorId: 3,
    forOrgId: 1,
    learnersEnrolledIds: [
      3,
      10
    ],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "13:00",
    daysOfWeek: [
      "Saturday"
    ],
    sessionDays: [
      {
        sessionDate: "2025-06-07",
        actualSessionStartTime: "13:00",
        recordingLink: null,
        actualDuration: 1,
        sessionStatus: "YetToStart",
        numberOfStudentsEnrolled: 0,
        numberOfStudentsAttended: 0,
        attendedStudentIds: [],
        absentStudentIds: []
      }
    ]
  },
  // --- 15 additional course schedules, some courses repeated, all startDate > 2025-05-09 ---
  {
    scheduleId: 301,
    courseId: 1,
    startDate: "2025-06-10",
    endDate: "2025-06-15",
    nextSession: "2025-06-16 04:00",
    mode: "live",
    price: "105",
    byInstructorId: 1,
    forOrgId: 1,
    learnersEnrolledIds: [1, 2],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "09:00",
    daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    sessionDays: [
      { sessionDate: "2025-06-10", actualSessionStartTime: "04:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 2, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-11", actualSessionStartTime: "04:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 2, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-12", actualSessionStartTime: "04:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 2, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-13", actualSessionStartTime: "04:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 2, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-14", actualSessionStartTime: "04:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 2, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 302,
    courseId: 2,
    startDate: "2025-06-17",
    endDate: "2025-06-19",
    nextSession: "2025-06-17 13:00",
    mode: "live",
    price: "155",
    byInstructorId: 2,
    forOrgId: 1,
    learnersEnrolledIds: [3],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "13:00",
    daysOfWeek: ["Tuesday", "Wednesday", "Thursday"],
    sessionDays: [
      { sessionDate: "2025-06-17", actualSessionStartTime: "13:00", recordingLink: null, actualDuration: 4, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-18", actualSessionStartTime: "13:00", recordingLink: null, actualDuration: 4, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-19", actualSessionStartTime: "13:00", recordingLink: null, actualDuration: 4, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 303,
    courseId: 3,
    startDate: "2025-06-18",
    endDate: "2025-06-19",
    nextSession: "2025-06-18 10:00",
    mode: "offline",
    price: "135",
    byInstructorId: 3,
    forOrgId: 2,
    learnersEnrolledIds: [4],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "10:00",
    daysOfWeek: ["Wednesday", "Thursday"],
    sessionDays: [
      { sessionDate: "2025-06-18", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-19", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 304,
    courseId: 4,
    startDate: "2025-06-18",
    endDate: "2025-06-20",
    nextSession: "2025-06-18 15:00",
    mode: "live",
    price: "129",
    byInstructorId: 4,
    forOrgId: 2,
    learnersEnrolledIds: [5],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "15:00",
    daysOfWeek: ["Wednesday", "Thursday", "Friday"],
    sessionDays: [
      { sessionDate: "2025-06-18", actualSessionStartTime: "15:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      {
        sessionDate: "2025-06-19", actualSessionStartTime: "15:00", recordingLink: null,
        actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: []
      },
      { sessionDate: "2025-06-20", actualSessionStartTime: "15:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 305,
    courseId: 5,
    startDate: "2025-06-19",
    endDate: "2025-06-22",
    nextSession: "2025-06-19 11:00",
    mode: "offline",
    price: "145",
    byInstructorId: 5,
    forOrgId: 3,
    learnersEnrolledIds: [6],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "11:00",
    daysOfWeek: ["Thursday", "Friday", "Saturday", "Sunday"],
    sessionDays: [
      { sessionDate: "2025-06-19", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-20", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-21", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-22", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 306,
    courseId: 6,
    startDate: "2025-06-20",
    endDate: "2025-06-21",
    nextSession: "2025-06-20 14:00",
    mode: "live",
    price: "159",
    byInstructorId: 6,
    forOrgId: 3,
    learnersEnrolledIds: [7],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "14:00",
    daysOfWeek: ["Friday", "Saturday"],
    sessionDays: [
      { sessionDate: "2025-06-20", actualSessionStartTime: "14:00", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-21", actualSessionStartTime: "14:00", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 307,
    courseId: 6,
    startDate: "2025-06-22",
    endDate: "2025-06-24",
    nextSession: "2025-06-21 16:00",
    mode: "live",
    price: "119",
    byInstructorId: 7,
    forOrgId: 4,
    learnersEnrolledIds: [8],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "16:00",
    daysOfWeek: ["Saturday", "Sunday", "Monday"],
    sessionDays: [
      { sessionDate: "2025-06-21", actualSessionStartTime: "16:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-22", actualSessionStartTime: "16:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-23", actualSessionStartTime: "16:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 308,
    courseId: 8,
    startDate: "2025-06-22",
    endDate: "2025-06-23",
    nextSession: "2025-06-22 10:00",
    mode: "live",
    price: "109",
    byInstructorId: 8,
    forOrgId: 4,
    learnersEnrolledIds: [9],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "10:00",
    daysOfWeek: ["Sunday", "Monday"],
    sessionDays: [
      { sessionDate: "2025-06-22", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-23", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 309,
    courseId: 9,
    startDate: "2025-06-23",
    endDate: "2025-06-25",
    nextSession: "2025-06-23 10:00",
    mode: "live",
    price: "120",
    byInstructorId: 2,
    forOrgId: 2,
    learnersEnrolledIds: [4],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "10:00",
    daysOfWeek: ["Monday", "Tuesday", "Wednesday"],
    sessionDays: [
      { sessionDate: "2025-06-23", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-24", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-25", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 310,
    courseId: 10,
    startDate: "2025-06-24",
    endDate: "2025-06-28",
    nextSession: "2025-06-24 11:00",
    mode: "offline",
    price: "130",
    byInstructorId: 3,
    forOrgId: 2,
    learnersEnrolledIds: [5],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "11:00",
    daysOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    sessionDays: [
      { sessionDate: "2025-06-24", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-25", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-26", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-27", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-28", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 311,
    courseId: 11,
    startDate: "2025-06-25",
    endDate: "2025-06-26",
    nextSession: "2025-06-25 09:30",
    mode: "live",
    price: "110",
    byInstructorId: 4,
    forOrgId: 2,
    learnersEnrolledIds: [6],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "09:30",
    daysOfWeek: ["Wednesday", "Thursday"],
    sessionDays: [
      { sessionDate: "2025-06-25", actualSessionStartTime: "09:30", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-26", actualSessionStartTime: "09:30", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 312,
    courseId: 12,
    startDate: "2025-06-26",
    endDate: "2025-06-28",
    nextSession: "2025-06-26 14:00",
    mode: "offline",
    price: "140",
    byInstructorId: 4,
    forOrgId: 2,
    learnersEnrolledIds: [7],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "14:00",
    daysOfWeek: ["Thursday", "Friday", "Saturday"],
    sessionDays: [
      { sessionDate: "2025-06-26", actualSessionStartTime: "14:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-27", actualSessionStartTime: "14:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-28", actualSessionStartTime: "14:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 313,
    courseId: 13,
    startDate: "2025-06-27",
    endDate: "2025-06-30",
    nextSession: "2025-06-27 15:00",
    mode: "live",
    price: "150",
    byInstructorId: 5,
    forOrgId: 3,
    learnersEnrolledIds: [8],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "15:00",
    daysOfWeek: ["Friday", "Saturday", "Sunday", "Monday"],
    sessionDays: [
      { sessionDate: "2025-06-27", actualSessionStartTime: "15:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-28", actualSessionStartTime: "15:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-29", actualSessionStartTime: "15:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-30", actualSessionStartTime: "15:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 314,
    courseId: 14,
    startDate: "2025-06-28",
    endDate: "2025-06-29",
    nextSession: "2025-06-28 16:00",
    mode: "offline",
    price: "160",
    byInstructorId: 5,
    forOrgId: 3,
    learnersEnrolledIds: [9],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "16:00",
    daysOfWeek: ["Saturday", "Sunday"],
    sessionDays: [
      { sessionDate: "2025-06-28", actualSessionStartTime: "16:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-29", actualSessionStartTime: "16:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 315,
    courseId: 15,
    startDate: "2025-06-29",
    endDate: "2025-07-01",
    nextSession: "2025-06-29 17:00",
    mode: "live",
    price: "170",
    byInstructorId: 6,
    forOrgId: 3,
    learnersEnrolledIds: [10],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "17:00",
    daysOfWeek: ["Sunday", "Monday", "Tuesday"],
    sessionDays: [
      { sessionDate: "2025-06-29", actualSessionStartTime: "17:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-30", actualSessionStartTime: "17:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-01", actualSessionStartTime: "17:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 316,
    courseId: 16,
    startDate: "2025-07-02",
    endDate: "2025-07-04",
    nextSession: "2025-07-02 10:00",
    mode: "live",
    price: "180",
    byInstructorId: 7,
    forOrgId: 4,
    learnersEnrolledIds: [2, 3],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "10:00",
    daysOfWeek: ["Wednesday", "Thursday", "Friday"],
    sessionDays: [
      { sessionDate: "2025-07-02", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 2, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-03", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 2, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-04", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 2, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 317,
    courseId: 17,
    startDate: "2025-07-05",
    endDate: "2025-07-07",
    nextSession: "2025-07-05 09:00",
    mode: "offline",
    price: "175",
    byInstructorId: 8,
    forOrgId: 4,
    learnersEnrolledIds: [4],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "09:00",
    daysOfWeek: ["Saturday", "Sunday", "Monday"],
    sessionDays: [
      { sessionDate: "2025-07-05", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-06", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-07", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 318,
    courseId: 9,
    startDate: "2025-07-10",
    endDate: "2025-07-12",
    nextSession: "2025-07-10 14:00",
    mode: "live",
    price: "185",
    byInstructorId: 9,
    forOrgId: 5,
    learnersEnrolledIds: [5, 6],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "14:00",
    daysOfWeek: ["Thursday", "Friday", "Saturday"],
    sessionDays: [
      { sessionDate: "2025-07-10", actualSessionStartTime: "14:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 2, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-11", actualSessionStartTime: "14:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 2, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-12", actualSessionStartTime: "14:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 2, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 319,
    courseId: 19,
    startDate: "2025-07-15",
    endDate: "2025-07-16",
    nextSession: "2025-07-15 11:00",
    mode: "offline",
    price: "195",
    byInstructorId: 10,
    forOrgId: 5,
    learnersEnrolledIds: [7],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "11:00",
    daysOfWeek: ["Tuesday", "Wednesday"],
    sessionDays: [
      { sessionDate: "2025-07-15", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-16", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 320,
    courseId: 20,
    startDate: "2025-07-20",
    endDate: "2025-07-22",
    nextSession: "2025-07-20 15:00",
    mode: "live",
    price: "200",
    byInstructorId: 11,
    forOrgId: 5,
    learnersEnrolledIds: [8, 9],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "15:00",
    daysOfWeek: ["Sunday", "Monday", "Tuesday"],
    sessionDays: [
      { sessionDate: "2025-07-20", actualSessionStartTime: "15:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 2, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-21", actualSessionStartTime: "15:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 2, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-22", actualSessionStartTime: "15:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 2, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 321,
    courseId: 21,
    startDate: "2025-06-12",
    endDate: "2025-06-12",
    nextSession: "2025-06-12 09:00",
    mode: "live",
    price: "110",
    byInstructorId: 1,
    forOrgId: 1,
    learnersEnrolledIds: [1],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "09:00",
    daysOfWeek: ["Thursday"],
    sessionDays: [
      { sessionDate: "2025-06-12", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 322,
    courseId: 22,
    startDate: "2025-06-12",
    endDate: "2025-06-13",
    nextSession: "2025-06-12 13:00",
    mode: "offline",
    price: "120",
    byInstructorId: 2,
    forOrgId: 1,
    learnersEnrolledIds: [2],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "13:00",
    daysOfWeek: ["Thursday", "Friday"],
    sessionDays: [
      { sessionDate: "2025-06-12", actualSessionStartTime: "13:00", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-13", actualSessionStartTime: "13:00", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 323,
    courseId: 23,
    startDate: "2025-06-12",
    endDate: "2025-06-14",
    nextSession: "2025-06-12 15:00",
    mode: "live",
    price: "130",
    byInstructorId: 3,
    forOrgId: 2,
    learnersEnrolledIds: [3],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "15:00",
    daysOfWeek: ["Thursday", "Friday", "Saturday"],
    sessionDays: [
      { sessionDate: "2025-06-12", actualSessionStartTime: "15:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-13", actualSessionStartTime: "15:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-14", actualSessionStartTime: "15:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 324,
    courseId: 24,
    startDate: "2025-06-12",
    endDate: "2025-06-12",
    nextSession: "2025-06-12 17:00",
    mode: "offline",
    price: "140",
    byInstructorId: 4,
    forOrgId: 2,
    learnersEnrolledIds: [4],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "17:00",
    daysOfWeek: ["Thursday"],
    sessionDays: [
      { sessionDate: "2025-06-12", actualSessionStartTime: "17:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 325,
    courseId: 25,
    startDate: "2025-06-12",
    endDate: "2025-06-15",
    nextSession: "2025-06-12 10:00",
    mode: "live",
    price: "150",
    byInstructorId: 5,
    forOrgId: 3,
    learnersEnrolledIds: [5],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "10:00",
    daysOfWeek: ["Thursday", "Friday", "Saturday", "Sunday"],
    sessionDays: [
      { sessionDate: "2025-06-12", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-13", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-14", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-15", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 326,
    courseId: 26,
    startDate: "2025-06-12",
    endDate: "2025-06-13",
    nextSession: "2025-06-12 12:00",
    mode: "offline",
    price: "160",
    byInstructorId: 6,
    forOrgId: 3,
    learnersEnrolledIds: [6],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "12:00",
    daysOfWeek: ["Thursday", "Friday"],
    sessionDays: [
      { sessionDate: "2025-06-12", actualSessionStartTime: "12:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-13", actualSessionStartTime: "12:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 327,
    courseId: 27,
    startDate: "2025-06-12",
    endDate: "2025-06-12",
    nextSession: "2025-06-12 16:00",
    mode: "live",
    price: "170",
    byInstructorId: 7,
    forOrgId: 4,
    learnersEnrolledIds: [7],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "16:00",
    daysOfWeek: ["Thursday"],
    sessionDays: [
      { sessionDate: "2025-06-12", actualSessionStartTime: "16:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 328,
    courseId: 28,
    startDate: "2025-06-12",
    endDate: "2025-06-14",
    nextSession: "2025-06-12 14:00",
    mode: "offline",
    price: "180",
    byInstructorId: 8,
    forOrgId: 4,
    learnersEnrolledIds: [8],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "14:00",
    daysOfWeek: ["Thursday", "Friday", "Saturday"],
    sessionDays: [
      { sessionDate: "2025-06-12", actualSessionStartTime: "14:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-13", actualSessionStartTime: "14:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-14", actualSessionStartTime: "14:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 329,
    courseId: 14,
    startDate: "2025-06-12",
    endDate: "2025-06-13",
    nextSession: "2025-06-12 11:00",
    mode: "live",
    price: "190",
    byInstructorId: 9,
    forOrgId: 5,
    learnersEnrolledIds: [9],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "11:00",
    daysOfWeek: ["Thursday", "Friday"],
    sessionDays: [
      { sessionDate: "2025-06-12", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-13", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 330,
    courseId: 30,
    startDate: "2025-06-12",
    endDate: "2025-06-12",
    nextSession: "2025-06-12 18:00",
    mode: "offline",
    price: "200",
    byInstructorId: 10,
    forOrgId: 5,
    learnersEnrolledIds: [10],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "18:00",
    daysOfWeek: ["Thursday"],
    sessionDays: [
      { sessionDate: "2025-06-12", actualSessionStartTime: "18:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 331,
    courseId: 31,
    startDate: "2025-06-12",
    endDate: "2025-06-12",
    nextSession: "2025-06-12 09:00",
    mode: "live",
    price: "110",
    byInstructorId: 1,
    forOrgId: 1,
    learnersEnrolledIds: [1],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "09:00",
    daysOfWeek: ["Thursday"],
    sessionDays: [
      { sessionDate: "2025-06-12", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 332,
    courseId: 32,
    startDate: "2025-06-12",
    endDate: "2025-06-13",
    nextSession: "2025-06-12 13:00",
    mode: "offline",
    price: "120",
    byInstructorId: 2,
    forOrgId: 1,
    learnersEnrolledIds: [2],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "13:00",
    daysOfWeek: ["Thursday", "Friday"],
    sessionDays: [
      { sessionDate: "2025-06-12", actualSessionStartTime: "13:00", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-13", actualSessionStartTime: "13:00", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 333,
    courseId: 33,
    startDate: "2025-06-12",
    endDate: "2025-06-14",
    nextSession: "2025-06-12 15:00",
    mode: "live",
    price: "130",
    byInstructorId: 3,
    forOrgId: 2,
    learnersEnrolledIds: [3],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "15:00",
    daysOfWeek: ["Thursday", "Friday", "Saturday"],
    sessionDays: [
      { sessionDate: "2025-06-12", actualSessionStartTime: "15:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-13", actualSessionStartTime: "15:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-14", actualSessionStartTime: "15:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 334,
    courseId: 34,
    startDate: "2025-06-12",
    endDate: "2025-06-12",
    nextSession: "2025-06-12 17:00",
    mode: "offline",
    price: "140",
    byInstructorId: 4,
    forOrgId: 2,
    learnersEnrolledIds: [4],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "17:00",
    daysOfWeek: ["Thursday"],
    sessionDays: [
      { sessionDate: "2025-06-12", actualSessionStartTime: "17:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 335,
    courseId: 35,
    startDate: "2025-06-12",
    endDate: "2025-06-15",
    nextSession: "2025-06-12 10:00",
    mode: "live",
    price: "150",
    byInstructorId: 5,
    forOrgId: 3,
    learnersEnrolledIds: [5],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "10:00",
    daysOfWeek: ["Thursday", "Friday", "Saturday", "Sunday"],
    sessionDays: [
      { sessionDate: "2025-06-12", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-13", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-14", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-06-15", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 336,
    courseId: 36,
    startDate: "2025-07-01",
    endDate: "2025-07-03",
    nextSession: "2025-07-01 09:00",
    mode: "live",
    price: "210",
    byInstructorId: 6,
    forOrgId: 3,
    learnersEnrolledIds: [6],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "09:00",
    daysOfWeek: ["Tuesday", "Wednesday", "Thursday"],
    sessionDays: [
      { sessionDate: "2025-07-01", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-02", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-03", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 337,
    courseId: 37,
    startDate: "2025-07-04",
    endDate: "2025-07-06",
    nextSession: "2025-07-04 10:00",
    mode: "offline",
    price: "220",
    byInstructorId: 7,
    forOrgId: 4,
    learnersEnrolledIds: [7],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "10:00",
    daysOfWeek: ["Friday", "Saturday", "Sunday"],
    sessionDays: [
      { sessionDate: "2025-07-04", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-05", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-06", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 3, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 338,
    courseId: 38,
    startDate: "2025-07-07",
    endDate: "2025-07-09",
    nextSession: "2025-07-07 11:00",
    mode: "live",
    price: "230",
    byInstructorId: 8,
    forOrgId: 5,
    learnersEnrolledIds: [8],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "11:00",
    daysOfWeek: ["Monday", "Tuesday", "Wednesday"],
    sessionDays: [
      { sessionDate: "2025-07-07", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-08", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-09", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 339,
    courseId: 39,
    startDate: "2025-07-10",
    endDate: "2025-07-12",
    nextSession: "2025-07-10 14:00",
    mode: "offline",
    price: "240",
    byInstructorId: 9,
    forOrgId: 5,
    learnersEnrolledIds: [9],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "14:00",
    daysOfWeek: ["Thursday", "Friday", "Saturday"],
    sessionDays: [
      { sessionDate: "2025-07-10", actualSessionStartTime: "14:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-11", actualSessionStartTime: "14:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-12", actualSessionStartTime: "14:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 340,
    courseId: 40,
    startDate: "2025-07-13",
    endDate: "2025-07-15",
    nextSession: "2025-07-13 09:00",
    mode: "live",
    price: "250",
    byInstructorId: 10,
    forOrgId: 5,
    learnersEnrolledIds: [10],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "09:00",
    daysOfWeek: ["Sunday", "Monday", "Tuesday"],
    sessionDays: [
      { sessionDate: "2025-07-13", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-14", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-15", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 341,
    courseId: 41,
    startDate: "2025-07-16",
    endDate: "2025-07-18",
    nextSession: "2025-07-16 13:00",
    mode: "offline",
    price: "260",
    byInstructorId: 1,
    forOrgId: 1,
    learnersEnrolledIds: [1],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "13:00",
    daysOfWeek: ["Tuesday", "Wednesday", "Thursday"],
    sessionDays: [
      { sessionDate: "2025-07-16", actualSessionStartTime: "13:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-17", actualSessionStartTime: "13:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-18", actualSessionStartTime: "13:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 342,
    courseId: 42,
    startDate: "2025-07-19",
    endDate: "2025-07-21",
    nextSession: "2025-07-19 09:00",
    mode: "live",
    price: "270",
    byInstructorId: 2,
    forOrgId: 1,
    learnersEnrolledIds: [2],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "09:00",
    daysOfWeek: ["Saturday", "Sunday", "Monday"],
    sessionDays: [
      { sessionDate: "2025-07-19", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-20", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-21", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 343,
    courseId: 43,
    startDate: "2025-07-22",
    endDate: "2025-07-24",
    nextSession: "2025-07-22 10:00",
    mode: "offline",
    price: "280",
    byInstructorId: 3,
    forOrgId: 2,
    learnersEnrolledIds: [3],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "10:00",
    daysOfWeek: ["Tuesday", "Wednesday", "Thursday"],
    sessionDays: [
      { sessionDate: "2025-07-22", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-23", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-24", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 344,
    courseId: 44,
    startDate: "2025-07-25",
    endDate: "2025-07-27",
    nextSession: "2025-07-25 09:00",
    mode: "live",
    price: "290",
    byInstructorId: 4,
    forOrgId: 2,
    learnersEnrolledIds: [4],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "09:00",
    daysOfWeek: ["Friday", "Saturday", "Sunday"],
    sessionDays: [
      { sessionDate: "2025-07-25", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-26", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-27", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 345,
    courseId: 45,
    startDate: "2025-07-28",
    endDate: "2025-07-30",
    nextSession: "2025-07-28 10:00",
    mode: "live",
    price: "300",
    byInstructorId: 5,
    forOrgId: 3,
    learnersEnrolledIds: [5],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "10:00",
    daysOfWeek: ["Monday", "Tuesday", "Wednesday"],
    sessionDays: [
      { sessionDate: "2025-07-28", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-29", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-07-30", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 346,
    courseId: 46,
    startDate: "2025-07-31",
    endDate: "2025-08-02",
    nextSession: "2025-07-31 14:00",
    mode: "offline",
    price: "310",
    byInstructorId: 6,
    forOrgId: 4,
    learnersEnrolledIds: [6],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "14:00",
    daysOfWeek: ["Thursday", "Friday", "Saturday"],
    sessionDays: [
      { sessionDate: "2025-07-31", actualSessionStartTime: "14:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-08-01", actualSessionStartTime: "14:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-08-02", actualSessionStartTime: "14:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 347,
    courseId: 47,
    startDate: "2025-08-03",
    endDate: "2025-08-05",
    nextSession: "2025-08-03 09:00",
    mode: "live",
    price: "320",
    byInstructorId: 7,
    forOrgId: 5,
    learnersEnrolledIds: [7],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "09:00",
    daysOfWeek: ["Sunday", "Monday", "Tuesday"],
    sessionDays: [
      { sessionDate: "2025-08-03", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-08-04", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-08-05", actualSessionStartTime: "09:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 348,
    courseId: 48,
    startDate: "2025-08-06",
    endDate: "2025-08-08",
    nextSession: "2025-08-06 13:00",
    mode: "offline",
    price: "330",
    byInstructorId: 8,
    forOrgId: 5,
    learnersEnrolledIds: [8],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "13:00",
    daysOfWeek: ["Thursday", "Friday", "Saturday"],
    sessionDays: [
      { sessionDate: "2025-08-06", actualSessionStartTime: "13:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-08-07", actualSessionStartTime: "13:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-08-08", actualSessionStartTime: "13:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 349,
    courseId: 14,
    startDate: "2025-08-09",
    endDate: "2025-08-11",
    nextSession: "2025-08-09 10:00",
    mode: "live",
    price: "340",
    byInstructorId: 9,
    forOrgId: 5,
    learnersEnrolledIds: [9],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "10:00",
    daysOfWeek: ["Sunday", "Monday", "Tuesday"],
    sessionDays: [
      { sessionDate: "2025-08-09", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-08-10", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-08-11", actualSessionStartTime: "10:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  },
  {
    scheduleId: 350,
    courseId: 50,
    startDate: "2025-08-12",
    endDate: "2025-08-14",
    nextSession: "2025-08-12 11:00",
    mode: "offline",
    price: "350",
    byInstructorId: 10,
    forOrgId: 5,
    learnersEnrolledIds: [10],
    guestLearnersEnrolledIds: [],
    normalSessionStart: "11:00",
    daysOfWeek: ["Thursday", "Friday", "Saturday"],
    sessionDays: [
      { sessionDate: "2025-08-12", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-08-13", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] },
      { sessionDate: "2025-08-14", actualSessionStartTime: "11:00", recordingLink: null, actualDuration: 2, sessionStatus: "YetToStart", numberOfStudentsEnrolled: 1, numberOfStudentsAttended: 0, attendedStudentIds: [], absentStudentIds: [] }
    ]
  }
];