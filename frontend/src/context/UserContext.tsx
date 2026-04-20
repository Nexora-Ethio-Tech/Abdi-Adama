
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type UserRole = 'super-admin' | 'school-admin' | 'teacher' | 'student' | 'parent' | 'finance-clerk' | 'librarian' | 'clinic-admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  digitalId?: string;
}

interface Branch {
  id: string;
  name: string;
  location: string;
}

export interface MultilingualText {
  oromic: string;
  amharic: string;
  english: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  role: UserRole | null;
  switchRole: (newRole: UserRole) => void;
  selectedBranch: Branch | null;
  setSelectedBranch: (branch: Branch | null) => void;
  branches: Branch[];
  gradesLocked: boolean;
  setGradesLocked: (locked: boolean) => void;
  schoolName: MultilingualText;
  setSchoolName: (name: MultilingualText) => void;
  schoolMotto: MultilingualText;
  setSchoolMotto: (motto: MultilingualText) => void;
  login: (credentials: { digitalIdOrEmail: string; password?: string; otp?: string }) => Promise<boolean>;
  logout: () => void;
}

const mockBranches: Branch[] = [
  { id: '1', name: 'Main Branch', location: 'Addis Ababa' },
  { id: '2', name: 'Bole Branch', location: 'Bole, AA' },
  { id: '3', name: 'Megenagna Branch', location: 'Megenagna, AA' },
  { id: '4', name: 'Adama Branch', location: 'Adama' },
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('abdi_adama_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [gradesLocked, setGradesLocked] = useState(false);

  const [schoolName, setSchoolName] = useState<MultilingualText>(() => {
    const saved = localStorage.getItem('school_name');
    return saved ? JSON.parse(saved) : {
      oromic: 'Mana Barumsaa Abdii Adaamaa',
      amharic: 'አብዲ አዳማ ትምህርት ቤት',
      english: 'Abdi Adama School'
    };
  });

  const [schoolMotto, setSchoolMotto] = useState<MultilingualText>(() => {
    const saved = localStorage.getItem('school_motto');
    return saved ? JSON.parse(saved) : {
      oromic: 'ijooleen kessaan ijolee kenyaa',
      amharic: 'ልጆቻቹ ልጆቻችን ናቸዉ',
      english: 'Your children are our children'
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('abdi_adama_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('abdi_adama_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('school_name', JSON.stringify(schoolName));
  }, [schoolName]);

  useEffect(() => {
    localStorage.setItem('school_motto', JSON.stringify(schoolMotto));
  }, [schoolMotto]);

  const role = user?.role || null;

  const switchRole = (newRole: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
    }
  };

  const login = async (credentials: { digitalIdOrEmail: string; password?: string; otp?: string }) => {
    // Mock login logic
    const id = credentials.digitalIdOrEmail.toUpperCase();

    // If OTP is provided, check if it's 6 digits
    if (credentials.otp && !/^\d{6}$/.test(credentials.otp)) {
      return false;
    }

    let mockUser: User = {
      id: '1',
      name: 'User',
      email: credentials.digitalIdOrEmail.includes('@') ? credentials.digitalIdOrEmail : 'user@abdiadama.edu',
      role: 'student',
      digitalId: credentials.digitalIdOrEmail.includes('@') ? undefined : credentials.digitalIdOrEmail
    };

    if (id.startsWith('SA')) {
      mockUser.role = 'super-admin';
      mockUser.name = 'Super Admin';
    } else if (id.startsWith('AD')) {
      mockUser.role = 'school-admin';
      mockUser.name = 'Admin';
    } else if (id.startsWith('TR')) {
      mockUser.role = 'teacher';
      mockUser.name = 'Teacher';
    } else if (id.startsWith('LB')) {
      mockUser.role = 'librarian';
      mockUser.name = 'Librarian';
    } else if (id.startsWith('FC')) {
      mockUser.role = 'finance-clerk';
      mockUser.name = 'Finance Clerk';
    } else if (id.startsWith('PR')) {
      mockUser.role = 'parent';
      mockUser.name = 'Parent';
    } else if (id.startsWith('CL')) {
      mockUser.role = 'clinic-admin';
      mockUser.name = 'Clinic Administrator';
    } else {
      mockUser.role = 'student';
      mockUser.name = 'Student';
    }

    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setSelectedBranch(null);
    localStorage.removeItem('abdi_adama_user');
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      role,
      switchRole,
      selectedBranch,
      setSelectedBranch,
      branches: mockBranches,
      gradesLocked,
      setGradesLocked,
      schoolName,
      setSchoolName,
      schoolMotto,
      setSchoolMotto,
      login,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
