import { CustomError } from './constants';

export const findById = async (id: string, model: any) => {
  const data = await model.findByPk(id);
  if (!data) {
    throw new CustomError('Record not found', 404);
  }
  return data;
};

export const update = async (
  id: string,
  data: { [key: string]: any },
  model: any
) => {
  const record = await findById(id, model);
  record.set(data);
  return record.save();
};
