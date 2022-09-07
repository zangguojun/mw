import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WhisperEntity } from './whisper.entity';

/**
 * 用户
 */
@Entity('base_sys_shuo')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ comment: '昵称', unique: true })
  name: string;

  @Column({ comment: '头像', nullable: true })
  headImg: string;

  @Column({ comment: '手机', nullable: true, length: 11 })
  phone: string;

  @Column({ comment: '邮箱', nullable: true })
  email: string;

  @Column({ comment: '状态 0:禁用 1：启用', default: 1, type: 'tinyint' })
  status: number;

  @OneToMany(() => WhisperEntity, whisper => whisper.user)
  whispers: WhisperEntity[];
}
