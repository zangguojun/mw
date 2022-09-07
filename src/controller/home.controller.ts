import { Context } from '@midwayjs/koa';
import { Controller, Get, Inject } from '@midwayjs/decorator';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  async home(): Promise<string> {
    return this.ctx.render('welcome', {
      text: 'world',
    });
  }
}
