import { Body, Post, Query } from '@midwayjs/decorator';
import { BaseService } from './base.service';
import { BaseEntity } from './base.entity';

export abstract class BaseController<T extends BaseEntity> {
  abstract getService(): BaseService<T>;

  @Post('/create')
  async create(@Body() body: T): Promise<T> {
    return this.getService().save(body);
  }

  @Post('/delete')
  async delete(@Query('id') id: number): Promise<boolean> {
    const { affected } = await this.getService().delete(id);
    return affected !== 0;
  }

  @Post('/update')
  async update(@Body() body: T): Promise<T> {
    return this.getService().save(body);
  }

  @Post('/findById')
  async findById(@Query('id') id: number): Promise<T> {
    return this.getService().findById(id);
  }

  @Post('/findByIds')
  async findByIds(@Query('ids') ids: number[]): Promise<T[]> {
    return this.getService().findByIds(ids);
  }
}
