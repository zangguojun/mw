import { MidwayConfig } from '@midwayjs/core';

export default {
  jdyun: {
    match: /\/he\//,
    host: 'https://way.jd.com',
  },
  cors: {
    credentials: false,
  },
} as MidwayConfig;
