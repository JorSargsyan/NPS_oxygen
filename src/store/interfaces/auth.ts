export interface IAuthState {
  isAuth: boolean;
}

export interface IAuthorizeResponse {
  token: string;
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
