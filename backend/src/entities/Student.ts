import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Group } from './Group';
import { Course } from './Course';
import { Grade } from './Grade';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Group, (group) => group.students)
  group!: Group;

  @ManyToMany(() => Course, (course) => course.students)
  @JoinTable()
  courses!: Course[];

  @OneToMany(() => Grade, (grade) => grade.student)
  grades!: Grade[];
}
