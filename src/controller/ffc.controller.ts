import { Context } from '@midwayjs/koa';
import {
  Controller,
  Fields,
  Files,
  Get,
  Inject,
  Post,
  Query,
} from '@midwayjs/decorator';
import { QueueService } from '@midwayjs/task';
import { FFCreatorCenter } from 'ffcreator';
import { FFCService } from '../service/ffc.service';

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

  /**
   *
   * @param files
   *  filename: 文件原名
   *  data: mode 为 file 时为服务器临时文件地址
   *  fieldname: 表单 field 名
   *  mimeType: mime
   * @param fields
   */
  @Post('/upload')
  async upload(@Files() files, @Fields() fields) {
    const { id } = fields;
    console.log('🚀 ~ src/controller/ffc.controller.ts 52 🍪files🍪', files);
    const taskId = FFCreatorCenter.addTaskByTemplate(id, {
      image: files[0].data,
    });
    this.ctx.redirect(`/ffc/progress?taskId=${taskId}`);
    // return { msg: '发送成功，视频加工中...', data: { taskId } };
  }

  @Get('/progress')
  async progress(@Query('taskId') taskId: string) {
    const progress = FFCreatorCenter.getProgress(taskId);
    const state = FFCreatorCenter.getTaskState(taskId);
    if (state === 'complete') {
      const file = FFCreatorCenter.getResultFile(taskId);
      return this.ctx.render('videoShow', { file });
    }
    return {
      msg: `${taskId}进度为${progress}`,
      data: { progress, taskId, state },
    };
  }
}
