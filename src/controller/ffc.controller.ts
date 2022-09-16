import { Context } from '@midwayjs/koa';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
} from '@midwayjs/decorator';
import { QueueService } from '@midwayjs/task';
import { FFCreatorCenter } from 'ffcreator';
import { FFCService } from '../service/ffc.service';
import { IFFCBody, IFFCProgress } from '../interface';

@Controller('/ffc')
export class HomeController {
  @Inject()
  ctx: Context;

  @Inject()
  queueService: QueueService;

  @Inject()
  ffcService: FFCService;

  @Get('/upload')
  async uploadView(): Promise<string> {
    return this.ctx.render('upload', {
      text: 'world',
    });
  }

  @Get('/createTemplate')
  async createTemplate(@Query('id') id: string) {
    const rst = await this.ffcService.createTemplate({ id });
    console.log('🚀 ~ src/controller/ffc.controller.ts 35 🍪rst🍪', rst);
    return 'success';
  }

  @Post('/create')
  async upload(@Body() body: IFFCBody) {
    const { id, images } = body;
    const taskId = FFCreatorCenter.addTaskByTemplate(id, { images });
    return {
      taskId,
      url: `ffc/progress?taskId=${taskId}`,
    };
  }

  @Get('/progress')
  async progress(@Query('taskId') taskId: string) {
    return this.ffcService.progress({ taskId });
  }

  @Get('/getTaskFile')
  async getTaskFile(@Query('taskId') taskId: string) {
    const rst: IFFCProgress = await this.ffcService.progress({ taskId });
    if (rst.state !== 'complete') {
      return rst;
    }
    const file = FFCreatorCenter.getResultFile(taskId);
    return { ...rst, progress: 100, file };
  }
}
