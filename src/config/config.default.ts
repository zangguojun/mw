import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1657112722492_9601',
  koa: {
    port: 7000,
  },
  view: {
    defaultExtension: '.ejs',
    mapping: {
      '.ejs': 'ejs',
    },
  },
  axios: {
    default: {},
    clients: {
      default: {
        baseURL: 'https://api.example.com',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        timeout: 1000,
      },
      customAxios: {
        baseURL: 'https://api2.example.com',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        timeout: 2000,
      },
    },
  },
} as MidwayConfig;
