import request from 'supertest';
import app from '../../src/app';

describe('app', () => {
  test('should return the welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.body).toMatchInlineSnapshot(`
      {
        "message": "Welcome to RCS Coffee Tracker API",
      }
    `);
  });

  test('should return page not found', async () => {
    const res: any = await request(app)
      .get('/no-page')
      .set('Accept', 'application/json');

    expect(res.status).toBe(404);
    expect(res.body.message).toEqual('Not Found');
  });
});
