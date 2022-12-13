import { Context } from '@midwayjs/koa';
import {
  Controller,
  Get,
  Inject,
} from '@midwayjs/decorator';
import { QueueService } from '@midwayjs/task';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Inject()
  queueService: QueueService;

  @Get('/')
  async home(): Promise<string> {
    return this.ctx.render('welcome', {
      text: 'world',
    });
  }

  @Get('/hello')
  async hello(): Promise<string> {
    return 'hello world';
  }
}
