import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SimpleObject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: any;

  @Column()
  timestamp: number;
}
