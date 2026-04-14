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
  { id: '2', name: 'Sara Kebede', grade: '9B', status: 'Active', parentName: 'Kebede Tessema', parentPhone: '+251922222222' },
  { id: '3', name: 'Dawit Lema', grade: '11C', status: 'Active', parentName: 'Lema Hailu', parentPhone: '+251933333333' },
  { id: '4', name: 'Hanna Yohannes', grade: '12A', status: 'Inactive', parentName: 'Yohannes Ayele', parentPhone: '+251944444444' },
  { id: '5', name: 'Mulugeta Tesfaye', grade: '8D', status: 'Active', parentName: 'Tesfaye Belay', parentPhone: '+251955555555' },
  { id: '6', name: 'Biniyam Yosef', grade: '10A', status: 'Active', parentName: 'Yosef Kassa', parentPhone: '+251911223344' },
  { id: '7', name: 'Tigist Walelign', grade: '9B', status: 'Active', parentName: 'Walelign Tadesse', parentPhone: '+251911556677' },
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
