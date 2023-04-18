import { Producer } from '../../../database/models/producer';
import { MainController } from '../MainController';

class ProducerController extends MainController {
  constructor(model: any) {
    super(model);
  }
}

export default new ProducerController(Producer);
