import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @UpdateDateColumn({ name: 'gmt_modified', type: 'timestamp' })
  gmtModified: Date;

  @CreateDateColumn({ name: 'gmt_create', type: 'timestamp' })
  gmtCreate: Date;
}
