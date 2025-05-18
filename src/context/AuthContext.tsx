import React, { createContext, useContext, useEffect, useState } from "react";
import { User, UserRole } from "@/types";

// Mock data for development - would connect to a backend auth service in production
const mockUsers: User[] = [
  {
    id: "admin-1",
    email: "admin@weconnect.com",
    name: "Admin User",
    role: "admin",
    createdAt: new Date().toISOString(),
    active: true,
  },
  {
    id: "sender-1",
    email: "sender@weconnect.com",
    name: "Message Sender",
    role: "message_sender",
    createdAt: new Date().toISOString(),
    active: true,
  },
  {
    id: "db-1",
    email: "db@weconnect.com",
    name: "Database Manager",
    role: "database_manager",
    createdAt: new Date().toISOString(),
    active: true,
  },
  {
    id: "view-1",
    email: "viewer@weconnect.com",
    name: "Viewer User",
    role: "viewer",
    createdAt: new Date().toISOString(),
    active: true,
  }
];

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  canAccessRoute: (allowedRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved auth token/user in localStorage
    const savedUser = localStorage.getItem("weconnect-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("weconnect-user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to validate credentials
      // For this mock version, we'll check against the mock data
      const matchedUser = mockUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.active
      );

      if (matchedUser) {
        // In a real app, we would store a token, not the user object
        const loggedInUser = {
          ...matchedUser,
          lastLogin: new Date().toISOString(),
        };
        setUser(loggedInUser);
        localStorage.setItem("weconnect-user", JSON.stringify(loggedInUser));
        setLoading(false);
        return true;
      }
      setLoading(false);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("weconnect-user");
  };

  const canAccessRoute = (allowedRoles: UserRole[]) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        canAccessRoute,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
