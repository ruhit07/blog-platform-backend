import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { RequestContextDto } from '@common/dtos/request-context.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async getUser(ctx: RequestContextDto, id: string): Promise<UserEntity> {
    this.logger.log(`${this.getUser.name}Service Called`);

    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User of id ${id} not found`);
    }
    return user;
  }

  async findUser(id: string): Promise<any> {
    this.logger.log(`${this.getUser.name}Service Called`);

    return this.userRepo.findOne({ where: { id } });
  }

  findUserByUsername(username: string): Promise<UserEntity> {
    return this.userRepo.findOne({ where: { username } });
  }

  async createUser(ctx: RequestContextDto, createUserDto: CreateUserDto): Promise<UserEntity> {
    this.logger.log(`${this.createUser.name}Service Called`);

    const hashPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepo.create({ ...createUserDto, password: hashPassword });
    await this.userRepo.save(user);

    delete user.password;
    return user;
  }

  validateUser(user: UserEntity, password: string): Promise<boolean> {
    this.logger.log(`${this.validateUser.name} Called`);
    return bcrypt.compare(password, user.password);
  }
}
