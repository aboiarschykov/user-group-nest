import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './models/entity/group.entity';
import { Repository } from 'typeorm';
import { generateOptionsInjectionToken } from '@nestjs/common/module-utils/utils';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,
  ) {}

  async getGroupById(id: number) {
    if (!id) {
      return null;
    }

    const group = await this.groupRepo.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException('Group is not found');
    }

    return group;
  }

  async createGroup(name: string) {
    return await this.groupRepo.save(this.groupRepo.create({ name }));
  }
}
