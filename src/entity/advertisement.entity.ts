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

  @ManyToOne(() => Series, series => series.advertisements, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'seriesId' })
  series: Series;

  @Column({ length: 255 })
  cover: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}


