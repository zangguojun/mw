import {
  Inject,
  Controller,
  Query,
  Body,
  Get,
  Post,
} from '@midwayjs/decorator';
import { BaseController } from '../common/base.controller';
import { BaseService } from '../common/base.service';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller('/api/user')
export class UserController extends BaseController<UserEntity> {
  @Inject()
  userService: UserService;

  getService(): BaseService<UserEntity> {
    return this.userService;
  }

  @Post('/create', { description: '创建' })
  async create(@Body() user: UserEntity): Promise<UserEntity> {
    Object.assign(user, {
      status: 1,
    });
    return super.create(user);
  }

  @Get('/findById', { description: '通过主键查找' })
  async findById(@Query('id') id: number): Promise<UserEntity> {
    return super.findById(id);
  }

  @Post('/delete', { description: '删除' })
  async delete(@Body('id') id: number): Promise<boolean> {
    return super.delete(id);
  }
}
