import "dotenv/config";
import express from 'express';
import indexRouter from './routes/index.routes.js';
import itemsRouter from './routes/items.routes.js';
import loginRouter from './routes/login.routes.js';
import cors from 'cors';
import { connectDB } from './utils/mongo.js';

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(indexRouter);
app.use(itemsRouter);
app.use(loginRouter);

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
