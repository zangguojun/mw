import { Queue } from '@midwayjs/decorator';

@Queue()
export class HelloTask {
  async execute(params) {
    console.log(`hello : ${JSON.stringify(params)}`);
  }
}
