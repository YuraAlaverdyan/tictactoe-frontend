import { IErrorResponse, IUser } from '../auth/auth.type';

export interface IGameState {
  isLoading: boolean,
  isSuccess: boolean,
  error: IErrorResponse | null
  onlineUsers: IOnlineUser[] | null
  user: IUser
  invitePlayer: IHandleActions
}

export interface IOnlineUser extends IUser{
  _id: string
}

export interface IHandleActions {
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  error: IErrorResponse | null;
}