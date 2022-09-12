import { MidwayConfig } from '@midwayjs/core';
import { UserEntity } from '../entity/user.entity';
import { TaskEntity } from '../entity/task.entity';
import { WhisperEntity } from '../entity/whisper.entity';
import { uploadWhiteList } from '@midwayjs/upload';
import { join } from 'path';

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
  staticFile: {
    dirs: {
      default: {
        prefix: '/public',
        dir: 'public',
      },
      another: {
        prefix: '/another',
        dir: 'public',
      },
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
  upload: {
    // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
    mode: 'file',
    // fileSize: string, 最大上传文件大小，默认为 10mb
    fileSize: '10mb',
    // whitelist: string[]，文件扩展名白名单
    whitelist: uploadWhiteList.filter(ext => ext !== '.pdf'),
    // tmpdir: string，上传的文件临时存储路径
    tmpdir: join('public', 'upload'),
    // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
    cleanTimeout: 5 * 60 * 1000,
    // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
    base64: false,
  },
} as MidwayConfig;
