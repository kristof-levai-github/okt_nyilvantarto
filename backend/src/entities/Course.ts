import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Subject } from './Subject';
import { Student } from './Student';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Subject, (subject) => subject.courses)
  subject!: Subject;

  @ManyToMany(() => Student, (student) => student.courses)
  students!: Student[];
}
