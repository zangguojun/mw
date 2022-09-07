import { Context } from '@midwayjs/koa';
import { Controller, Get, Inject } from '@midwayjs/decorator';

@Controller('/task')
export class TaskController {
  @Inject()
  ctx: Context;

  @Get('/')
  async task(): Promise<string> {
    return this.ctx.render('welcome', {
      text: 'world',
    });
  }
}
