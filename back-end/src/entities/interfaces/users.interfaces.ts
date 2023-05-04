export interface iUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface iUserLogin {
  email: string;
  password: string;
}

export interface iUserResponse {
  id: string;
  name: string;
  email: string;
}

export interface iContactRequest {
  name: string;
  email: string;
  phone: string;
  client_id: string;
}

export interface iContactResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  client_id: string;
  created_at: Date;
}

export interface iClientRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface iClientResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  user_id: string;
  created_at: Date;
}
