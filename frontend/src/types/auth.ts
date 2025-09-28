export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  defenceId: string;
  rank: string;
  unit: string;
  phone: string;
  roles: string[];
  permissions: string[];
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  otp?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  defenceId: string;
  rank: string;
  unit: string;
  phone: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string; data?: any }>;
  logout: () => void;
  requestOTP: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyOTP: (email: string, otp: string) => Promise<{ success: boolean; error?: string; data?: any }>;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
  expiresIn: number;
}

export interface OTPResponse {
  message: string;
  expiresIn: number;
}
