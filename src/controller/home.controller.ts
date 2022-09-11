import { Context } from '@midwayjs/koa';
import { Controller, Get, Inject, Query } from '@midwayjs/decorator';
import { QueueService } from '@midwayjs/task';
import { ProgressTask } from '../task/progress.task';

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

  @Get('/get-queue')
  async getQueue(@Query('id') id: string) {
    return await this.queueService.getClassQueue(ProgressTask).getJob(id);
  }
}
