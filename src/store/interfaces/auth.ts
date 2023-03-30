export interface IAuthState {
  isAuth: boolean;
}

export interface IAuthorizeResponse {
  accessToken: string;
  expireHours: number;
  expires: string;
  isLdapUser?: boolean;
  role: string;
}
export interface IAuthChangePasswordResponse {
  message: string;
}

export interface IAuthorizeRequest {
  email: string;
  password: string;
}
export interface IAuthChangePasswordRequest {
  email: string;
}
