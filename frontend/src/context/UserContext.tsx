
import { createContext, useContext, useState, type ReactNode } from 'react';

export type UserRole = 'super-admin' | 'school-admin' | 'student' | 'parent' | 'finance-clerk';

interface Branch {
  id: string;
  name: string;
  location: string;
}

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  selectedBranch: Branch | null;
  setSelectedBranch: (branch: Branch | null) => void;
  branches: Branch[];
}

const mockBranches: Branch[] = [
  { id: '1', name: 'Main Branch', location: 'Addis Ababa' },
  { id: '2', name: 'Bole Branch', location: 'Bole, AA' },
  { id: '3', name: 'Megenagna Branch', location: 'Megenagna, AA' },
  { id: '4', name: 'Adama Branch', location: 'Adama' },
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>('school-admin');
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  return (
    <UserContext.Provider value={{
      role,
      setRole,
      selectedBranch,
      setSelectedBranch,
      branches: mockBranches
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
