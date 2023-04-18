import {
  MockRequest,
  MockResponse,
  createRequest,
  createResponse,
} from 'node-mocks-http';
import handleAsync from '../handleAsync';
describe('#handleAsync', () => {
  let req: MockRequest<any>, res: MockResponse<any>;
  beforeEach(() => {
    req = createRequest();
    res = createResponse();
  });

  it('should catch and respond with an error', async () => {
    const callback = jest.fn().mockResolvedValue(true);
    await handleAsync(callback)(req, res);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should cath error and return response', async () => {
    const callback = jest
      .fn()
      .mockRejectedValue('Invalid request payload');
    await handleAsync(callback)(req, res);
    expect(res.statusCode).toEqual(400);
    expect(res._getJSONData()).toBeDefined();
  });
});
