import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Teacher } from './Teacher';
import { Course } from './Course';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.subjects)
  teacher!: Teacher;

  @OneToMany(() => Course, (course) => course.subject)
  courses!: Course[];
}
