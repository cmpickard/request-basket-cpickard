import express from 'express';
import cors from 'cors';
import { Router } from 'express';
import BasketRouter from './routes/basketRoutes';
import expressWs from 'express-ws';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

export const router = Router();
app.use('/', router);

expressWs(app);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

export default app;
