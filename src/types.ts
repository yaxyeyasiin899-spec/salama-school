export type Role = 'Admin' | 'Macalin' | 'Arday';

export interface User {
  id: string;
  username: string;
  role: Role;
  name: string;
}

export interface Student {
  id: number;
  name: string;
  className: string;
  phone: string;
  username: string;
  password?: string;
}

export interface Teacher {
  id: number;
  name: string;
  subject: string;
  phone: string;
  username: string;
  password?: string;
}
