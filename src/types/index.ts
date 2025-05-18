
// Types for the WEConnect application

// User roles for authorization
export type UserRole = 'admin' | 'message_sender' | 'database_manager' | 'viewer';

// User information
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
  active: boolean;
}

// Client record
export interface Client {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  birthdate?: string; // ISO date string
  anniversary?: string; // ISO date string
  tags: string[];
  notes?: string;
  sendBirthdayWish: boolean;
  sendAnniversaryWish: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

// Message template
export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  type: 'birthday' | 'anniversary' | 'event' | 'announcement' | 'custom';
  language: 'english' | 'hindi';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// Message record
export interface Message {
  id: string;
  templateId?: string;
  content: string;
  recipients: {
    clientId: string;
    clientName: string;
    phoneNumber: string;
    status: 'pending' | 'sent' | 'failed';
  }[];
  type: 'birthday' | 'anniversary' | 'event' | 'announcement' | 'custom';
  scheduled: boolean;
  scheduledDate?: string;
  sentAt?: string;
  sentBy: string;
  language: 'english' | 'hindi';
}

// Activity log entry
export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}

// Notification
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  timestamp: string;
  userId?: string;
}

// Settings for the organization
export interface OrganizationSettings {
  name: string;
  defaultLanguage: 'english' | 'hindi';
  smsProvider: string;
  apiKeys?: {
    [key: string]: string;
  };
}

// Dashboard stats
export interface DashboardStats {
  totalClients: number;
  messagesSent: number;
  upcomingBirthdays: number;
  upcomingAnniversaries: number;
  messagesScheduled: number;
}
