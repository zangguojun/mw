import { MidwayError } from '@midwayjs/core';

export class BaseCode {
  /**
   * 100000 正常
   */
  static OK = 100000;
  /**
   * 400000-500000 平台异常
   */
  static SYS_ERROR = 400000;
  /**
   * 50000 未知异常
   */
  static UN_ERROR = 500000;
  /**
   * 60000-69999 基本的业务异常
   */
  static BIZ_ERROR = 600000;
}

export class BaseException extends MidwayError {
  code: number;
  msg: string;
  data: any;

  constructor(code: number, msg: string) {
    super(msg, code.toString());
    this.code = code;
    this.msg = msg;
  }
}
