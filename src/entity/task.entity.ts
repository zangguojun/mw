import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 系统用户
 */
@Entity('base_sys_task')
export class TaskEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Index({ unique: true })
  @Column({ comment: '姓名', nullable: true })
  name: string;
}
