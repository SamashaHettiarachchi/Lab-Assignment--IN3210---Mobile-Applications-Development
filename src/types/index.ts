export interface TransportRoute {
  id: number;
  title: string;
  description: string;
  status: string;
  image: string;
  schedule?: string;
  frequency?: string;
  operatingHours?: string;
}

export interface UserProfile {
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}
