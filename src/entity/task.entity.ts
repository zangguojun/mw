import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

/**
 * 系统用户
 */
@Entity('base_sys_task')
export class TaskEntity extends BaseEntity {
  @Index({ unique: true })
  @Column({ comment: '任务名称', nullable: true })
  name: string;
}
