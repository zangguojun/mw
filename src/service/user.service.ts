import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserEmptyDataError } from '../error/user.error';
import { IUserOptions } from '../interface';
import { BaseService } from '../common/base.service';
import { MemoryDataListener } from '../listener/memory.listner';

@Provide()
export class UserService extends BaseService<UserEntity> {
  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;

  @Inject()
  memoryDataListener: MemoryDataListener;

  async getUserHelloData() {
    return this.memoryDataListener.getData();
  }

  getModel(): Repository<UserEntity> {
    return this.userModel;
  }

  async getUser(user: IUserOptions) {
    try {
      const users = await this.userModel.findOne({ where: user });
      return 'hello world' + JSON.stringify(users);
    } catch (error) {
      throw new UserEmptyDataError(error);
    }
  }

  async addUser({ name }: IUserOptions) {
    const u = new UserEntity();
    u.name = name;
    return this.userModel.save(u);
  }
}
