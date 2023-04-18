import { Op } from 'sequelize';
import * as modelHelper from '../model.helper';

describe('ModelHelper', () => {
  describe('#paginate', () => {
    it('should return right offset and limit', () => {
      const response = modelHelper.paginate({
        page: 3,
        limit: 20,
      });
      expect(response).toBeDefined();
      expect(response.offset).toEqual(40);
      expect(response.limit).toEqual(20);
    });

    it('should return default offset and limit', () => {
      const response = modelHelper.paginate({});
      expect(response).toBeDefined();
      expect(response.offset).toEqual(0);
      expect(response.limit).toEqual(50);
    });
  });

  describe('#textSearch', () => {
    it('should return empty object on empty query', () => {
      const response = modelHelper.textSearch('', []);
      expect(Object.keys(response).length).toEqual(0);
    });

    it('should return mapped object of the right length', () => {
      const response = modelHelper.textSearch('luc', [
        'firstName',
        'lastName',
      ]);
      expect(response[Op.or as any].length).toEqual(2);
    });
  });
});
