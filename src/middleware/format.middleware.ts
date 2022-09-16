import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';
import { BaseCode } from '../common/base.error';
import { IRst } from '../interface';

/**
 * 对接口返回的数据统一包装
 */
@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  static getName(): string {
    return 'API_RESPONSE_FORMAT';
  }

  resolve() {
    return async (ctx: Context, next: NextFunction): Promise<IRst<any>> => {
      const result = await next();
      return { code: BaseCode.OK, msg: 'OK', success: true, data: result };
    };
  }

  match(ctx) {
    return ctx.path.indexOf('/api') === 0;
  }
}
