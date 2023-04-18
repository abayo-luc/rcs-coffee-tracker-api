import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../src/app';
import { User } from '../../src/database/models/user';
import { getJWT, hashString } from '../../src/utils';

describe('/users', () => {
  let user: User;
  let token: string;

  beforeAll(async () => {
    user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: await hashString('password'),
    });
    token = getJWT(user);
  });

  describe('POST /users', () => {
    it('should sign up user on valid data', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .send({
          firstName: 'Luc',
          lastName: 'Abayo',
          email: faker.internet.email(),
          password: 'password',
        });

      expect(res.status).toEqual(201);
      expect(res.body.password).not.toBeDefined();
    });

    it('should not sign up user with invalid data', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .send({
          firstName: 'Luc',
          lastName: 'Abayo',
          email: 'fake-email',
        });
      expect(res.status).toEqual(400);
      expect(res.body.message).toEqual('Validation failed');
      expect(res.body.errors[0].message).toEqual(
        '"password" is required'
      );
      expect(res.body.errors[1].message).toEqual(
        '"email" must be a valid email'
      );
    });
  });

  describe('POST /user/login', () => {
    it('should not allow invalid data', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({});

      expect(res.status).toEqual(400);
      expect(res.body.message).toEqual('Validation failed');
    });

    it('should not allow non-existing user', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({
          email: faker.internet.email(),
          password: 'password',
        });

      expect(res.status).toEqual(400);
      expect(res.body.message).toEqual(
        'Invalid email or password'
      );
    });

    it('should allow user to login on valid email and password', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({
          email: user.email,
          password: 'password',
        });

      expect(res.status).toEqual(200);
      expect(res.body.token).toBeDefined();
      expect(res.body.user).toBeDefined();
    });
  });

  describe('GET /users', () => {
    it('should not get user if not authenticated', async () => {
      const res = await request(app).get('/api/v1/users');
      expect(res.status).toEqual(401);
    });

    it('should retrieve user, and omit password', async () => {
      const res = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(200);
      expect(res.body.count).toBeDefined();
      expect(res.body.rows).toBeDefined();
    });
  });

  describe('GET /users/:id', () => {
    it('should not get user if not authenticated', async () => {
      const res = await request(app).get(
        `/api/v1/users/${user.id}`
      );
      expect(res.status).toEqual(401);
    });

    it('should get one by id, if authenticate', async () => {
      const res = await request(app)
        .get(`/api/v1/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(200);
      expect(res.body.password).not.toBeDefined();
    });
  });
});
