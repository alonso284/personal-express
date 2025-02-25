import express from 'express';
import indexRouter from './routes/index.routes.js';

const app = express();

app.use(indexRouter);

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
