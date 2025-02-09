import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './entity/user.entity';

//TODO Add auto clean for sessions
@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => User, (user) => user.session, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column()
  status: SessionStatus;

  isExpired() {
    return new Date() > this.expiresAt;
  }
}

export enum SessionStatus {
  ACTIVE,
  EXPIRED,
  DEACTIVATED,
}
