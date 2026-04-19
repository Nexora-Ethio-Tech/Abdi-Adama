
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type UserRole = 'super-admin' | 'school-admin' | 'teacher' | 'student' | 'parent' | 'finance-clerk' | 'librarian';

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

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  role: UserRole | null;
  selectedBranch: Branch | null;
  setSelectedBranch: (branch: Branch | null) => void;
  branches: Branch[];
  gradesLocked: boolean;
  setGradesLocked: (locked: boolean) => void;
  login: (credentials: { digitalIdOrEmail: string; password: string }) => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [gradesLocked, setGradesLocked] = useState(false);

  const role = user?.role || null;

  const login = async (credentials: { digitalIdOrEmail: string; password: string }) => {
    // Mock login logic
    console.log('Logging in with:', credentials);

    // Default mock user for testing
    let mockUser: User = {
      id: '1',
      name: 'Test User',
      email: credentials.digitalIdOrEmail.includes('@') ? credentials.digitalIdOrEmail : 'test@example.com',
      role: 'student',
      digitalId: !credentials.digitalIdOrEmail.includes('@') ? credentials.digitalIdOrEmail : '123456789'
    };

    // Simple role routing for mock login
    if (credentials.digitalIdOrEmail === 'admin') mockUser.role = 'super-admin';
    if (credentials.digitalIdOrEmail === 'teacher') mockUser.role = 'teacher';
    if (credentials.digitalIdOrEmail === 'parent') mockUser.role = 'parent';
    if (credentials.digitalIdOrEmail === 'librarian') mockUser.role = 'librarian';
    if (credentials.digitalIdOrEmail === 'finance') mockUser.role = 'finance-clerk';

    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
    setSelectedBranch(null);
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      role,
      selectedBranch,
      setSelectedBranch,
      branches: mockBranches,
      gradesLocked,
      setGradesLocked,
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
