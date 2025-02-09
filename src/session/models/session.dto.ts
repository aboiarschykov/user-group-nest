import { Expose } from 'class-transformer';

export class SessionDto {
  @Expose()
  id: string;

  @Expose()
  expiresAt: Date;

  @Expose()
  createdAt: Date;
}
