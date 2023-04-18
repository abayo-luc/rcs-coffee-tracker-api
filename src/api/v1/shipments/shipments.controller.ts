import { Shipment } from '../../../database/models/shipment';
import { MainController } from '../MainController';

class ShipmentController extends MainController {
  model: any;
  constructor(model: any) {
    super(model);
  }
}

export default new ShipmentController(Shipment);
