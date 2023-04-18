import express, {
  Application,
  NextFunction,
  Request,
  Response,
} from 'express';
import { errors } from 'celebrate';
import routerV1 from './api/v1';
import { formatValidationError } from './utils';
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routerV1);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to RCS Coffee Tracker API',
  });
});

app.use(
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
      message: 'Not Found',
    });
  }
);

app.use(formatValidationError);

export default app;
