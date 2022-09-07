import { MidwayError } from '@midwayjs/core';

export class UserEmptyDataError extends MidwayError {
  constructor(err?: Error) {
    super('user data is empty', {
      cause: err,
    });
    if (err?.stack) {
      this.stack = err.stack;
    }
  }
}
