import { Op } from 'sequelize';

export const textSearch: { [key: string]: any } = (
  text: string,
  fields: string[]
) => {
  if (text) {
    return {
      [Op.or]: fields.map((item) => ({
        [item]: {
          [Op.like]: `%${text}%`,
        },
      })),
    };
  }
  return {};
};

export const paginate = ({ page = 1, limit = 50 }) => {
  const offset = (page - 1) * limit;
  return {
    offset: offset,
    limit: limit,
  };
};
