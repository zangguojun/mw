import { close, createApp, createHttpRequest } from '@midwayjs/mock';
import { Application, Framework } from '@midwayjs/koa';
import { UserEntity } from '../../src/entity/user.entity';

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

  let o;
  // create
  it('should POST /api/user/create', async () => {
    o = new UserEntity();
    Object.assign(o, {
      name: new Date().getTime().toString() + '_test',
    });
    const result = await createHttpRequest(app)
      .post('/api/user/create')
      .send(o);
    expect(result.status).toBe(200);
    o = result.body.data;
  });

  // findById
  it('should POST /api/user/findById', async () => {
    const result = await createHttpRequest(app)
      .get('/api/user/findById')
      .send({ id: o.id });
    expect(result.status).toBe(200);
  });

  // delete
  it('should POST /api/user/delete', async () => {
    const result = await createHttpRequest(app)
      .post('/api/user/delete')
      .send({ id: o.id });
    expect(result.status).toBe(200);
  });
});
