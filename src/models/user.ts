export interface NewUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  status: 'Seeker' | 'Volunteer' | null;
  isBusiness: boolean;
}

export interface User extends NewUser {
  id: number;
  created_at: string;
  strikes: number;
}
