import { App, Configuration } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as staticFile from '@midwayjs/static-file';
import * as orm from '@midwayjs/typeorm';
import * as view from '@midwayjs/view-ejs';
import * as proxy from '@midwayjs/http-proxy';
import * as crossDomain from '@midwayjs/cross-domain';
import * as swagger from '@midwayjs/swagger';
import * as task from '@midwayjs/task';
import * as redis from '@midwayjs/redis';
import * as axios from '@midwayjs/axios';
import * as dotenv from 'dotenv';
import * as lodash from 'lodash';
import * as jwt from '@midwayjs/jwt';
import * as passport from '@midwayjs/passport';
import { IMidwayContainer } from '@midwayjs/core';
import { join } from 'path';

import { ReportMiddleware } from './middleware/report.middleware';
import { FormatMiddleware } from './middleware/format.middleware';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { UserEmptyDataError } from './filter/user.filter';
// import { NotFoundFilter } from './filter/notfound.filter';

dotenv.config();

@Configuration({
  imports: [
    koa,
    validate,
    orm,
    staticFile,
    view,
    proxy,
    crossDomain,
    swagger,
    task,
    redis,
    axios,
    jwt,
    passport,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onConfigLoad() {}

  async onReady(container: IMidwayContainer) {
    container.registerObject('lodash', lodash);

    this.app.useMiddleware([FormatMiddleware, ReportMiddleware]);
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter, UserEmptyDataError]);

    // default axios interceptors
    const httpService = await container.getAsync(axios.HttpService);
    httpService.interceptors.request.use(
      config => config,
      error => Promise.reject(error)
    );

    // other axios interceptors
    const httpServiceFactory = await container.getAsync(
      axios.HttpServiceFactory
    );
    const customAxios = httpServiceFactory.get('customAxios');
    customAxios.interceptors.request.use(
      config => config,
      error => Promise.reject(error)
    );
  }
}
