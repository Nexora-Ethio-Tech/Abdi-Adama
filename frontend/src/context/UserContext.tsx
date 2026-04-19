
import { createContext, useContext, useState, type ReactNode } from 'react';

export type UserRole = 'super-admin' | 'school-admin' | 'teacher' | 'student' | 'parent' | 'finance-clerk' | 'librarian';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  digitalId: string;
}

interface Branch {
  id: string;
  name: string;
  location: string;
}

interface UserContextType {
  user: User | null;
  role: UserRole | null;
  login: (digitalId: string, password: string) => Promise<boolean>;
  logout: () => void;
  selectedBranch: Branch | null;
  setSelectedBranch: (branch: Branch | null) => void;
  branches: Branch[];
  gradesLocked: boolean;
  setGradesLocked: (locked: boolean) => void;
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

  const login = async (digitalId: string, _password: string): Promise<boolean> => {
    // Mock login logic - in a real app, this would be an API call
    // Using a simple convention for mock login: id starts with 'admin', 'teacher', 'student', etc.
    let role: UserRole = 'student';
    let name = 'Student User';

    if (digitalId.startsWith('SA')) {
      role = 'super-admin';
      name = 'Super Admin';
    } else if (digitalId.startsWith('AD')) {
      role = 'school-admin';
      name = 'School Admin';
    } else if (digitalId.startsWith('TR')) {
      role = 'teacher';
      name = 'Teacher User';
    } else if (digitalId.startsWith('PT')) {
      role = 'parent';
      name = 'Parent User';
    } else if (digitalId.startsWith('FN')) {
      role = 'finance-clerk';
      name = 'Finance Clerk';
    } else if (digitalId.startsWith('LB')) {
      role = 'librarian';
      name = 'Librarian User';
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      role,
      digitalId
    };

    setUser(newUser);
    localStorage.setItem('abdi_adama_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('abdi_adama_user');
  };

  return (
    <UserContext.Provider value={{
      user,
      role: user?.role || null,
      login,
      logout,
      selectedBranch,
      setSelectedBranch,
      branches: mockBranches,
      gradesLocked,
      setGradesLocked
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
