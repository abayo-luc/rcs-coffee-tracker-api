import { Request, Response } from 'express';
import handleAsync from '../../../utils/handleAsync';
import { Shipment } from '../../../database/models/shipment';
import { MainController } from '../MainController';

class ShipmentController extends MainController {
  model: any;
  constructor(model: any) {
    super(model);
  }
}

export default new ShipmentController(Shipment);
