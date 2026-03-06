import express from 'express';
import cors from 'cors';
import BasketRouter from './routes/basketRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use('/', BasketRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

export default app;
