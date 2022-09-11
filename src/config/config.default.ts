import { MidwayConfig } from '@midwayjs/core';
import { UserEntity } from '../entity/user.entity';
import { TaskEntity } from '../entity/task.entity';
import { WhisperEntity } from '../entity/whisper.entity';

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
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '2d',
  },
  passport: {
    session: false,
  },
  app: {
    security: {
      prefix: '/api',
      ignore: ['/api/login'],
    },
  },
  swagger: {
    auth: {
      authType: 'bearer',
    },
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: 3306,
        username: 'root',
        password: process.env.MYSQL_PWD,
        database: 'midway',
        synchronize: true,
        entities: [UserEntity, TaskEntity, WhisperEntity],
      },
    },
  },
  redis: {
    client: {
      port: 6379,
      host: process.env.REDIS_HOST,
      // password: process.env.REDIS_PWD,
      db: 0,
    },
  },
  task: {
    redis: {
      port: 6379,
      host: process.env.REDIS_HOST,
      // password: process.env.REDIS_PWD,
    },
    prefix: 'mw',
    defaultJobOptions: {
      repeat: {
        tz: 'Asia/Shanghai',
      },
    },
  },
} as MidwayConfig;
