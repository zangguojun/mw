import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { DataListener } from '@midwayjs/core';

@Provide()
@Scope(ScopeEnum.Singleton)
export class MemoryDataListener extends DataListener<string> {
  private intervalHandler;

  // 初始化数据
  initData() {
    return 'hello' + Date.now();
  }

  // 更新数据
  onData(setData) {
    this.intervalHandler = setInterval(() => {
      setData('hello dataListener' + Date.now());
    }, 1000);
  }

  // 清理资源
  async destroyListener() {
    // 关闭定时器
    clearInterval(this.intervalHandler);
    // 其他清理, close sdk 等等
  }

}
