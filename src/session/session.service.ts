import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Session, SessionStatus } from './models/session.entity';
import { Repository } from 'typeorm';
import { addHours } from 'date-fns';

@Injectable()
export class SessionService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Session) private readonly repo: Repository<Session>,
  ) {}

  async createSession(userId: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new BadRequestException(`User with id ${userId} does not exists`);
    }
    await this.invalidateAllSessionsForUser(userId);

    const expiresAt = addHours(new Date(), 1);
    const session = this.repo.create({
      user,
      expiresAt,
      status: SessionStatus.ACTIVE,
    });

    return this.repo.save(session);
  }

  async isSessionActive(sessionId: string) {
    const session = await this.repo.findOneBy({
      id: sessionId,
      status: SessionStatus.ACTIVE,
    });

    if (!session) return false;

    // Expire session
    if (session.isExpired()) {
      await this.repo.update(sessionId, { status: SessionStatus.EXPIRED });
      return false;
    }

    return true;
  }

  private async invalidateAllSessionsForUser(userId: string) {
    await this.repo
      .find({ where: { user: { id: userId }, status: SessionStatus.ACTIVE } })
      .then((sessions) => {
        const toExpire: string[] = [];
        const toDeactivate: string[] = [];
        sessions.forEach((session) => {
          if (session.isExpired()) {
            toExpire.push(session.id);
          } else {
            toDeactivate.push(session.id);
          }
        });
        return { toExpire, toDeactivate };
      })
      .then((sessionsToInvalidate) => {
        if (sessionsToInvalidate.toDeactivate.length > 0) {
          this.repo.update(sessionsToInvalidate.toDeactivate, {
            status: SessionStatus.DEACTIVATED,
          });
        }

        if (sessionsToInvalidate.toExpire.length > 0) {
          this.repo.update(sessionsToInvalidate.toExpire, {
            status: SessionStatus.EXPIRED,
          });
        }
      });
  }
}
