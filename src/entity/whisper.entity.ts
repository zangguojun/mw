import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

/**
 * 用户
 */
@Entity('base_sys_whisper')
export class WhisperEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ comment: '邮箱', type: 'tinytext' })
  content: string;

  @Column({ comment: '状态 0:禁用 1：启用', default: 1, type: 'tinyint' })
  status: number;

  @ManyToOne(() => UserEntity, user => user.whispers)
  user: UserEntity;
}
