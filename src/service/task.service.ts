import { QueueService } from '@midwayjs/task';
import { FORMAT, Inject, Provide, Task, TaskLocal } from '@midwayjs/decorator';
import { UserService } from './user.service';
import { HelloTask } from '../task/hello.task';

@Provide()
export class TaskService {
  @Inject()
  queueService: QueueService;

  @Inject()
  userService: UserService;

  @TaskLocal('0 */1 * * * *')
  async execute(params = {}) {
    const user = await this.userService.getUser({ name: 'buchiyu' });

    return this.queueService.execute(
      HelloTask,
      { ...params, user },
      {
        delay: 3000,
      }
    );
  }

  @Task({
    repeat: { cron: FORMAT.CRONTAB.EVERY_MINUTE },
  })
  async test() {
    console.log(await this.userService.getUser({ name: 'buchiyu' }));
  }
}
