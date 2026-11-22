export interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

export interface AuthResponse {
  data: User;
  token: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}