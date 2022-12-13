export interface IUserOptions {
  name: string;
}

export interface IRst<T> {
  code: number;
  msg: string;
  success: boolean;
  data: T;
}
