import { MidwayConfig } from '@midwayjs/core';

export default {
  koa: {
    port: 7001,
  },
  oss: {
    client: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      accessKeySecret: process.env.ACCESS_KEY_SECRET,
      bucket: 'zangguojun',
      endpoint: 'oss-cn-hangzhou.aliyuncs.com',
      timeout: '60s',
    },
  },
} as MidwayConfig;
