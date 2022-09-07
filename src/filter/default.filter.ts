import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserEmptyDataError } from '../error/user.error';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context) {
    // 所有的未分类错误会到这里
    return {
      success: false,
      message: err.message,
    };
  }
}

@Catch(UserEmptyDataError)
export class UserErrorFilter {
  async catch(err: UserEmptyDataError, ctx: Context) {
    ctx.logger.error(err);
    return '<html><body><h1>user data is empty</h1></body></html>';
  }
}
