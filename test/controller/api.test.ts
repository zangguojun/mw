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

  it('should GET /api/get_user with success request', async () => {
    const result = await createHttpRequest(app)
      .get('/api/get_user')
      .query({ name: 'buchiyu' });
    expect(result.status).toBe(200);
    expect(result.body.message).toBe('OK');
  });

  it('should GET /api/get_user with fail request', async () => {
    const result = await createHttpRequest(app)
      .get('/api/get_user')
      .query({ name: 123 });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('OK');
    expect(result.body.data).toBe('hello worldnull');
  });

  it('should POST /api/add_user with same key error', async () => {
    const result = await createHttpRequest(app)
      .post('/api/add_user')
      .send({ name: 'buchiyu' });
    expect(result.status).toBe(500);
  });
});
