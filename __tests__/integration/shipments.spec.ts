import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../src/app';
import { User } from '../../src/database/models/user';
import { getJWT, hashString } from '../../src/utils';

describe('/shipments', () => {
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
  describe('POST /shipments', () => {
    it('should create shipment on valid data, and generate shipment id', async () => {
      const res = await request(app)
        .post('/api/v1/shipments')
        .send({
          origin: 'Gishamwana Coffee',
          destination: 'Rwacof, Kigali, Rwanda',
          quantity: 200,
        })
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(201);
      expect(res.body.shipmentId).toBeDefined();
      expect(res.body.status).toEqual('PENDING');
    });

    it('should validate shipment data', async () => {
      const res = await request(app)
        .post('/api/v1/shipments')
        .send({
          origin: 'Gishamwana Coffee',
        })
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(400);
      expect(res.body.message).toEqual('Validation failed');
    });

    it('should only allow authenticated request', async () => {
      const res = await request(app)
        .post('/api/v1/shipments')
        .send({
          origin: 'Gishamwana Coffee',
          destination: 'Rwacof, Kigali, Rwanda',
          quantity: 200,
        });

      expect(res.status).toEqual(401);
    });
  });
});
