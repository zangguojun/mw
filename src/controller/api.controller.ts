import {
  Inject,
  Controller,
  Get,
  Post,
  Query,
  Body,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query('name') name) {
    const user = await this.userService.getUser({ name });
    return { success: true, message: 'OK', data: user };
  }

  @Post('/add_user')
  async addUser(@Body('name') name) {
    const user = await this.userService.addUser({ name });
    return { success: true, message: 'OK', data: user };
  }
}
