import { Context } from '@midwayjs/koa';
import {
  Controller,
  Files,
  Get,
  Inject,
  Post,
  Query,
} from '@midwayjs/decorator';
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
    return this.queueService.getClassQueue(ProgressTask).getJob(id);
  }

  /**
   * @param files
   *  filename: 文件原名
   *  data: mode 为 file 时为服务器临时文件地址
   *  fieldname: 表单 field 名
   *  mimeType: mime
   */
  @Post('/upload')
  async upload(@Files() files) {
    const [file] = files;
    const n = file?.data?.split('/');
    file.url = n.slice(n.length - 3).join('/');
    return file;
  }
}
