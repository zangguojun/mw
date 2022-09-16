export interface IUserOptions {
  name: string;
}

export interface IFFCOptions {
  id: string;
}

export interface IFFCProgress {
  taskId: string;
  progress: number;
  state: string;
}

export interface IFFCParams {
  taskId: string;
}

export interface IFFCBody {
  id: string;
  images: string[];
}

export interface IRst<T> {
  code: number;
  msg: string;
  success: boolean;
  data: T;
}
