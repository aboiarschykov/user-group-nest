import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from '../../../group/models/entity/group.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  lastName: string;
  @Column()
  age: number;

  @ManyToMany(() => Group, (group) => group.users)
  @JoinTable()
  groups: Group[];
}
