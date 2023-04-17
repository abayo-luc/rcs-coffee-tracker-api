import express, {
  Application,
  Request,
  Response,
} from 'express';
import { errors } from 'celebrate';
import routerV1 from './api/v1';
import { formatValidationError } from './utils';
const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routerV1);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Welcome to RCS Coffee Tracker API');
});

app.use(formatValidationError);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
