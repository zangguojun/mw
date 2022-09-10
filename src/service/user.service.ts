import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserEmptyDataError } from '../error/user.error';
import { IUserOptions } from '../interface';
import { BaseService } from '../common/base.service';

@Provide()
export class UserService extends BaseService<UserEntity> {
  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;

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
