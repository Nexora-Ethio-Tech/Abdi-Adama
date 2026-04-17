export const mockStudents = [
  {
    id: '1',
    name: 'Abebe Bikila',
    grade: '10A',
    status: 'Active',
    parentName: 'Bikila Demissie',
    parentPhone: '+251911111111',
    dob: '2010-05-15',
    gender: 'Male',
    address: 'Addis Ababa, Bole Sub-city',
    bloodGroup: 'A+',
    allergies: 'Peanuts',
    medications: 'None',
    emergencyContact: {
      name: 'Bikila Demissie',
      relation: 'Father',
      phone: '+251911111111'
    },
    riskLevel: 'Low',
    riskFactor: 'Stable performance and attendance.',
    attendanceHistory: [
      { month: 'Sep', rate: 98 },
      { month: 'Oct', rate: 95 },
      { month: 'Nov', rate: 92 },
      { month: 'Dec', rate: 96 },
      { month: 'Jan', rate: 94 },
      { month: 'Feb', rate: 97 },
    ],
    academicHistory: [
      { year: '2014', grade: '8', average: '88%', rank: '5/42' },
      { year: '2015', grade: '9', average: '91%', rank: '2/45' },
    ]
  },
  {
    id: '2',
    name: 'Sara Kebede',
    grade: '9B',
    status: 'Active',
    parentName: 'Kebede Tessema',
    parentPhone: '+251922222222',
    bloodGroup: 'O+',
    allergies: 'None',
    medications: 'None',
    emergencyContact: {
      name: 'Kebede Tessema',
      relation: 'Father',
      phone: '+251922222222'
    },
    riskLevel: 'Medium',
    riskFactor: 'Slight decline in Mathematics scores recently.'
  },
  {
    id: '3',
    name: 'Dawit Lema',
    grade: '11C',
    status: 'Active',
    parentName: 'Lema Hailu',
    parentPhone: '+251933333333',
    bloodGroup: 'B-',
    allergies: 'Dust',
    medications: 'Antihistamines',
    emergencyContact: {
      name: 'Lema Hailu',
      relation: 'Father',
      phone: '+251933333333'
    },
    riskLevel: 'High',
    riskFactor: 'Frequent absenteeism in the last month.'
  },
  { id: '4', name: 'Hanna Yohannes', grade: '12A', status: 'Inactive', parentName: 'Yohannes Ayele', parentPhone: '+251944444444', riskLevel: 'Low' },
  { id: '5', name: 'Mulugeta Tesfaye', grade: '8D', status: 'Active', parentName: 'Tesfaye Belay', parentPhone: '+251955555555', riskLevel: 'Low' },
  { id: '6', name: 'Biniyam Yosef', grade: '10A', status: 'Active', parentName: 'Yosef Kassa', parentPhone: '+251911223344', riskLevel: 'Medium', riskFactor: 'Sudden drop in Physics attendance.' },
  { id: '7', name: 'Tigist Walelign', grade: '9B', status: 'Active', parentName: 'Walelign Tadesse', parentPhone: '+251911556677', riskLevel: 'Low' },
];

export const mockTeachers = [
  { id: 'T1', name: 'Ato Solomon', subjects: ['Math', 'Physics'], branch: 'Main', classes: 2, isInClass: true },
  { id: 'T2', name: 'W/ro Selam', subjects: ['Biology', 'Chemistry'], branch: 'Main', classes: 3, isInClass: false },
  { id: 'T3', name: 'Ato Kebede', subjects: ['History', 'Geography'], branch: 'Bole', classes: 4, isInClass: true },
  { id: 'T4', name: 'W/ro Aster', subjects: ['English', 'Amharic'], branch: 'Megenagna', classes: 2, isInClass: false },
  { id: 'T5', name: 'Ato Tadesse', subjects: ['Physical Education'], branch: 'Adama', classes: 5, isInClass: false },
];

export const mockClasses = [
  { id: 'C1', name: 'Grade 10A', teacher: 'Ato Solomon', students: 45 },
  { id: 'C2', name: 'Grade 9B', teacher: 'W/ro Selam', students: 42 },
];

export const mockFinances = {
  totalRevenue: 1250000,
  pendingFees: 45000,
  recentTransactions: [
    { id: 'TX1', student: 'Abebe Bikila', amount: 5000, type: 'Registration', date: '2026-04-10' },
    { id: 'TX2', student: 'Sara Kebede', amount: 5000, type: 'Registration', date: '2026-04-11' },
  ],
  summaries: [
    { id: 'S1', category: 'Student Fees', description: 'April Student Fee', amount: 450000, count: 1200, type: 'Income', date: '2026-04-01' },
    { id: 'S2', category: 'Staff Payment', description: 'Monthly Salaries', amount: 250000, count: 75, type: 'Expense', date: '2026-04-28' },
    { id: 'S3', category: 'Item Purchase', description: 'Lab Equipment', amount: 35000, count: 12, type: 'Expense', date: '2026-04-15' },
  ]
};

export const mockSchedules = {
  'T1': [
    { day: 'Monday', time: '8:00 AM - 9:30 AM', class: '10A', subject: 'Math' },
    { day: 'Monday', time: '10:00 AM - 11:30 AM', class: '9B', subject: 'Physics' },
    { day: 'Wednesday', time: '8:00 AM - 9:30 AM', class: '10A', subject: 'Math' },
  ],
  'T2': [
    { day: 'Tuesday', time: '9:00 AM - 10:30 AM', class: '11C', subject: 'Biology' },
    { day: 'Thursday', time: '1:00 PM - 2:30 PM', class: '12A', subject: 'Chemistry' },
  ]
};

export const mockGrades = [
  { type: 'Mid-term', weight: '30%', score: 85, total: 100 },
  { type: 'Final Exam', weight: '50%', score: 92, total: 100 },
  { type: 'Assignment', weight: '20%', score: 18, total: 20 },
];

export const studentCurrentCourses = [
  {
    id: 'c1',
    name: 'Mathematics',
    code: 'MATH-10A',
    teacher: 'Dr. Solomon',
    progress: 65,
    grades: {
      quizzes: [{ name: 'Quiz 1', score: 15, total: 20 }, { name: 'Quiz 2', score: null, total: 20 }],
      tests: [{ name: 'Test 1', score: 32, total: 40 }],
      midterm: { name: 'Midterm', score: null, total: 100 },
      assignments: [{ name: 'Assignment 1', score: 18, total: 20 }, { name: 'Assignment 2', score: null, total: 20 }],
      final: { name: 'Final Exam', score: null, total: 100 }
    }
  },
  {
    id: 'c2',
    name: 'Physics',
    code: 'PHYS-10A',
    teacher: 'Dr. Solomon',
    progress: 40,
    grades: {
      quizzes: [{ name: 'Quiz 1', score: 12, total: 20 }],
      tests: [{ name: 'Test 1', score: null, total: 40 }],
      midterm: { name: 'Midterm', score: null, total: 100 },
      assignments: [{ name: 'Assignment 1', score: 15, total: 20 }],
      final: { name: 'Final Exam', score: null, total: 100 }
    }
  },
  {
    id: 'c3',
    name: 'Biology',
    code: 'BIOL-10A',
    teacher: 'W/ro Selam',
    progress: 80,
    grades: {
      quizzes: [{ name: 'Quiz 1', score: 18, total: 20 }, { name: 'Quiz 2', score: 19, total: 20 }],
      tests: [{ name: 'Test 1', score: 38, total: 40 }],
      midterm: { name: 'Midterm', score: 88, total: 100 },
      assignments: [{ name: 'Assignment 1', score: 20, total: 20 }],
      final: { name: 'Final Exam', score: null, total: 100 }
    }
  }
];

export const studentAcademicHistory = [
  {
    year: '2024/2025',
    semester: 'Semester 2',
    gpa: '3.85',
    courses: [
      { name: 'Amharic', grade: 'A', score: 92 },
      { name: 'English', grade: 'A', score: 95 },
      { name: 'Chemistry', grade: 'B+', score: 88 },
      { name: 'Civics', grade: 'A', score: 90 }
    ]
  },
  {
    year: '2024/2025',
    semester: 'Semester 1',
    gpa: '3.72',
    courses: [
      { name: 'Amharic', grade: 'A-', score: 89 },
      { name: 'English', grade: 'A', score: 93 },
      { name: 'General Science', grade: 'B', score: 84 },
      { name: 'Art', grade: 'A+', score: 98 }
    ]
  },
  {
    year: '2023/2024',
    semester: 'Full Year',
    gpa: '3.65',
    courses: [
      { name: 'Grade 9 Mathematics', grade: 'B+', score: 87 },
      { name: 'Grade 9 Physics', grade: 'A-', score: 90 },
      { name: 'Grade 9 Biology', grade: 'A', score: 94 },
      { name: 'Geography', grade: 'B', score: 82 }
    ]
  }
];

export const mockInventory = [
  { id: 'I1', name: 'Microscope', category: 'Lab Equipment', quantity: 15, condition: 'Good', location: 'Science Lab A' },
  { id: 'I2', name: 'Dell Latitude 3420', category: 'IT Assets', quantity: 30, condition: 'New', location: 'Computer Lab 1' },
  { id: 'I3', name: 'Whiteboard Marker (Pack)', category: 'Stationery', quantity: 120, condition: 'Good', location: 'Central Store' },
  { id: 'I4', name: 'Student Desk', category: 'Furniture', quantity: 450, condition: 'Fair', location: 'Main Building' },
];

export const mockLibrary = [
  { id: 'B1', title: 'Calculus: Early Transcendentals', author: 'James Stewart', isbn: '978-0538497909', status: 'Available', shelf: 'Mathematics - Row 1', total: 12, available: 8 },
  { id: 'B2', title: 'Biology: The Core', author: 'Eric Simon', isbn: '978-0134152196', status: 'Borrowed', shelf: 'Science - Row 4', total: 5, available: 0 },
  { id: 'B3', title: 'Principles of Economics', author: 'N. Gregory Mankiw', isbn: '978-1305155915', status: 'Available', shelf: 'Economics - Row 2', total: 8, available: 5 },
  { id: 'B4', title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', isbn: '978-0062316097', status: 'Available', shelf: 'History - Row 3', total: 15, available: 12 },
];

export const mockOverdueLoans = [
  { id: 'L1', studentName: 'Abebe Bikila', bookTitle: 'Calculus: Early Transcendentals', dueDate: '2026-04-05', daysOverdue: 15, studentId: '1' },
  { id: 'L2', studentName: 'Sara Kebede', bookTitle: 'Biology: The Core', dueDate: '2026-04-10', daysOverdue: 10, studentId: '2' },
  { id: 'L3', studentName: 'Biniyam Yosef', bookTitle: 'Principles of Economics', dueDate: '2026-04-12', daysOverdue: 8, studentId: '6' },
];

export const mockEvents = [
  { id: 'E1', title: 'Parent-Teacher Conference', date: '2026-04-15', type: 'Meeting' },
  { id: 'E2', title: 'Annual Sports Day', date: '2026-05-10', type: 'Event' },
  { id: 'E3', title: 'Mid-term Exams Start', date: '2026-05-20', type: 'Academic' },
  { id: 'E4', title: 'Final Graduation Ceremony', date: '2026-06-15', type: 'Ceremony' },
];
