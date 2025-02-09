import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from '../session.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @OneToOne(() => Session, (session) => session.user, {onDelete: 'CASCADE'})
  session: Session;
}
