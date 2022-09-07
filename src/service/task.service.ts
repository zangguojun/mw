import { QueueService } from '@midwayjs/task';
import { Inject, Provide } from '@midwayjs/decorator';
import { HelloTask } from '../task/hello.task';

@Provide()
export class TaskService {
  @Inject()
  queueService: QueueService;

  async execute(params = {}) {
    return this.queueService.execute(HelloTask, params, {
      delay: 3000,
    });
  }
}
