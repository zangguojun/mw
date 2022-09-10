import { close, createApp, createHttpRequest } from '@midwayjs/mock';
import { Application, Framework } from '@midwayjs/koa';

describe('test/controller/home.test.ts', () => {
  let app: Application;
  beforeAll(async () => {
    try {
      app = await createApp<Framework>();
    } catch (err) {
      console.error('test beforeAll error', err);
      throw err;
    }
  });

  afterAll(async () => {
    await close(app);
  });

  it('should GET /hello with success request', async () => {
    const result = await createHttpRequest(app).get('/hello');

    expect(result.status).toBe(200);
    expect(result.text).toBe('hello world');
  });
});
