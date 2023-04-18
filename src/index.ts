import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  if (process.env.NODE_ENV === 'development')
    console.log(`Server is running on port ${port}`);
});
