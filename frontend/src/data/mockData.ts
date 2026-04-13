export const mockStudents = [
  { id: '1', name: 'Abebe Bikila', grade: '10A', status: 'Active', parentName: 'Bikila Demissie', parentPhone: '+251911111111' },
  { id: '2', name: 'Sara Kebede', grade: '9B', status: 'Active', parentName: 'Kebede Tessema', parentPhone: '+251922222222' },
  { id: '3', name: 'Dawit Lema', grade: '11C', status: 'Active', parentName: 'Lema Hailu', parentPhone: '+251933333333' },
  { id: '4', name: 'Hanna Yohannes', grade: '12A', status: 'Inactive', parentName: 'Yohannes Ayele', parentPhone: '+251944444444' },
  { id: '5', name: 'Mulugeta Tesfaye', grade: '8D', status: 'Active', parentName: 'Tesfaye Belay', parentPhone: '+251955555555' },
];

export const mockTeachers = [
  { id: 'T1', name: 'Ato Solomon', subjects: ['Math', 'Physics'], branch: 'Main' },
  { id: 'T2', name: 'W/ro Selam', subjects: ['Biology', 'Chemistry'], branch: 'Main' },
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
  ]
};
