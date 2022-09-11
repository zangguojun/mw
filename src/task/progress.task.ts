import { Queue } from '@midwayjs/decorator';

@Queue()
export class ProgressTask {
  async execute(params, job) {
    let progress = 0;
    for (let i = 0; i < 10; i++) {
      progress += 10;
      job.progress(progress);
      await this.sleep(1000);
    }
    console.log('over');
  }

  async sleep(t) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, t);
    });
  }
}
