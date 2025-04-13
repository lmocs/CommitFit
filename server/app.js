import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import pactRouter from './routes/pactRoutes.js';
import gymRouter from './routes/gymRoutes.js';

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/users', userRouter);
app.use('/api/pacts', pactRouter);
app.use('/api/gyms', gymRouter);

app.listen(PORT, HOST, () => {
	console.log(`Server running on http://${HOST}:${PORT}`);
});
