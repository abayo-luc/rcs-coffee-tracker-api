import { Supplier } from '../../../database/models/supplier';
import { MainController } from '../MainController';

class SupplierController extends MainController {
  constructor(model: any) {
    super(model);
  }
}

export default new SupplierController(Supplier);
