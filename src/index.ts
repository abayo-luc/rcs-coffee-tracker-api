import express, {
  Application,
  Request,
  Response,
} from 'express';

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
