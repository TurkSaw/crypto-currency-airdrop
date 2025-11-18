export interface User {
  id: string;
  email: string;
  name: string;
  points: number;
  streak: number;
  subscription: 'free' | 'pro' | 'ultra_pro';
  twoFactorEnabled: boolean;
  createdAt: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  date: string;
  answered?: boolean;
  userAnswer?: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  streak: number;
}

export interface SubscriptionPlan {
  id: 'free' | 'pro' | 'ultra_pro';
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}
