import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserEmptyDataError } from '../error/user.error';

@Catch(UserEmptyDataError)
export class UserErrorFilter {
  async catch(err: UserEmptyDataError, ctx: Context) {
    ctx.logger.error(err);
    return '<html><body><h1>user data is empty</h1></body></html>';
  }
}
