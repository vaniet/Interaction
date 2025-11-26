import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Series } from './series.entity';

@Entity('advertisement')
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seriesId: number;

  @ManyToOne(() => Series, { onDelete: 'CASCADE' })

  @JoinColumn({ name: 'seriesId' })
  series: Series;

  @Column({ length: 255 })
  cover: string;

  @Column({ default: false })
  isListed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // 新增广告信息字段
  @Column({ type: 'text', nullable: true })
  info: string;
}


