import { MidwayConfig } from '@midwayjs/core';
import { UserEntity } from '../entity/user.entity';
import { TaskEntity } from '../entity/task.entity';
import { WhisperEntity } from '../entity/whisper.entity';

export default {
  koa: {
    port: null,
  },
  typeorm: {
    dataSource: {
      timezone: '+08:00',
      default: {
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: 3306,
        username: 'root',
        password: process.env.MYSQL_PWD,
        database: 'midway',
        synchronize: false,
        entities: [UserEntity, TaskEntity, WhisperEntity],
      },
    },
  },
} as MidwayConfig;
