import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Subject } from './Subject';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  department!: string;

  @OneToMany(() => Subject, (subject) => subject.teacher)
  subjects!: Subject[];
}