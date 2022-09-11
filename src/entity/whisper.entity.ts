import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from '../common/base.entity';

/**
 * 用户
 */
@Entity('base_sys_whisper')
export class WhisperEntity extends BaseEntity {
  @Column({ comment: '邮箱', type: 'tinytext' })
  content: string;

  @Column({ comment: '状态 0:禁用 1：启用', default: 1, type: 'tinyint' })
  status: number;

  @ManyToOne(() => UserEntity, user => user.whispers)
  user: UserEntity;
}
