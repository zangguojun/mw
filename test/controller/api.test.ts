import { close, createApp, createHttpRequest } from '@midwayjs/mock';
import { Application, Framework } from '@midwayjs/koa';

describe('test/controller/home.test.ts', () => {
  let app: Application;
  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it('should GET /api/get_user with success request', async () => {
    const result = await createHttpRequest(app)
      .get('/api/get_user')
      .query({ uid: 123 });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('OK');
  });

  it('should GET /api/get_user with fail request', async () => {
    const result = await createHttpRequest(app)
      .get('/api/get_user')
      .query({ uid: 123 });

    expect(result.status).toBe(301);
    expect(result.body.message).toBe('OK');
  });
});
