

export interface IAuthState {
  isLoading: boolean;
  isSuccess: boolean;
  error: IErrorResponse | null;
  message: string | null;
}

export interface IUser {
  id: string;
  username: string;
  wins: number;
  draws: number;
  losses: number;
}

export interface IErrorResponse {
  data: null | unknown,
  message: string,
  code: number,
  errorData: null
}