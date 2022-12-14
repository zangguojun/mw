import { Context } from '@midwayjs/koa';
import {
  Controller,
  Get,
  Inject,
} from '@midwayjs/decorator';
import * as ReactDOMServer from 'react-dom/server';
import * as React from 'react';
import { QueueService } from '@midwayjs/task';

import Dom from "../template";

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
    return ReactDOMServer.renderToString(React.createElement(Dom, null));
  }
}
