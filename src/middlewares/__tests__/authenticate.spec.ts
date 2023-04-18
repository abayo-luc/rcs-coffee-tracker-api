import {
  createRequest,
  createResponse,
} from 'node-mocks-http';
import jwt from 'jsonwebtoken';
import { User } from '../../database/models/user';
import authenticate from '../authenticate';
const dummyUser = {
  id: '489b091f-81bb-4566-aebd-49b44ddb5900',
  firstName: 'Luc',
  lastName: 'Abayo',
  email: 'luc.bayo@gmail.com',
  role: 'USER',
  createdAt: '2023-04-17T15:21:09.711Z',
  updatedAt: '2023-04-17T15:21:09.711Z',
};
describe('Authenticate', () => {
  let req,
    res,
    mockNexFunction: jest.Mock<any>,
    spayOnVerify: jest.SpyInstance,
    spayOnFindUser: jest.SpyInstance;
  beforeEach(() => {
    req = createRequest();
    res = createResponse();
    mockNexFunction = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockNexFunction.mockClear();
    spayOnVerify?.mockClear();
    spayOnFindUser?.mockClear();
  });
  it('should not authenticate if no token provided', async () => {
    await authenticate(req, res, mockNexFunction);

    expect(mockNexFunction).not.toHaveBeenCalled();
    expect(res.statusCode).toEqual(401);
  });

  it('should not authenticate if the strategy is not bear', async () => {
    req = createRequest({
      headers: {
        authorization: `JWT ${process.env.APP_SECRETE}`,
      },
    });
    await authenticate(req, res, mockNexFunction);

    expect(mockNexFunction).not.toHaveBeenCalled();
    expect(res.statusCode).toEqual(401);
  });

  it('should not authenticate if the strategy is bear but no token', async () => {
    req = createRequest({
      headers: {
        authorization: `Bearer`,
      },
    });
    await authenticate(req, res, mockNexFunction);

    expect(mockNexFunction).not.toHaveBeenCalled();
    expect(res.statusCode).toEqual(401);
  });

  it('should not authenticate if jwt is invalid', async () => {
    req = createRequest({
      headers: {
        authorization: `Bearer ${process.env.APP_SECRETE}`,
      },
    });
    await authenticate(req, res, mockNexFunction);

    expect(mockNexFunction).not.toHaveBeenCalled();
    expect(res.statusCode).toEqual(401);
  });

  it('should not authenticate if coded data are wrong', async () => {
    spayOnVerify = jest
      .spyOn(jwt, 'verify')
      .mockReturnValueOnce({
        provider: 'rcs-coffee-tracker-api',
        id: 'user-id',
        role: 'USER',
      } as any);
    spayOnFindUser = jest
      .spyOn(User, 'findByPk')
      .mockResolvedValueOnce(null);
    req = createRequest({
      headers: {
        authorization: `Bearer ${process.env.APP_SECRETE}`,
      },
    });
    await authenticate(req, res, mockNexFunction);
    expect(res.statusCode).toEqual(401);
    expect(spayOnVerify).toHaveBeenCalled();
    expect(spayOnFindUser).toHaveBeenCalled();
  });

  it('should authenticate on the right strategy and valid token', async () => {
    spayOnVerify = jest
      .spyOn(jwt, 'verify')
      .mockReturnValueOnce({
        provider: 'rcs-coffee-tracker-api',
        id: dummyUser.id,
        role: dummyUser.role,
      } as any);
    spayOnFindUser = jest
      .spyOn(User, 'findByPk')
      .mockResolvedValueOnce(dummyUser as any);
    req = createRequest({
      headers: {
        authorization: `Bearer ${process.env.APP_SECRETE}`,
      },
    });
    await authenticate(req, res, mockNexFunction);
    expect(spayOnVerify).toHaveBeenCalled();
    expect(spayOnFindUser).toHaveBeenCalled();
    expect(mockNexFunction).toHaveBeenCalled();
  });
});
