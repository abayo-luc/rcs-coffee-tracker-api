import { Request, Response } from 'express';
import { CustomError } from '../../utils/constants';
import { paginate } from '../../utils/model.helper';
import handleAsync from '../../utils/handleAsync';

export class MainController {
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  create = handleAsync(
    async (req: Request, res: Response) => {
      const record = await this.model.create(req.body);
      return res.status(201).json(record);
    }
  );

  findById = handleAsync(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const data = await this._findById(id?.toString());

      return res.status(200).json(data);
    }
  );

  update = handleAsync(
    async (req: Request, res: Response) => {
      const { id } = req.params;

      const record = await this._findById(id.toString());
      const data = await record.save();
      return res.status(202).json(data);
    }
  );

  findAll = handleAsync(
    async (req: Request, res: Response) => {
      const { page = 1, limit = 15 } = req.query;

      const response = await this.model.findAndCountAll({
        order: [['createdAt', 'DESC']],
        ...paginate({
          page: Number(page),
          limit: Number(limit),
        }),
      });
      return res.status(200).json({ response });
    }
  );

  private async _findById(id: string) {
    const data = await this.model.findByPk(id);
    if (!data) {
      throw new CustomError('Record not found', 404);
    }
    return data;
  }
}
