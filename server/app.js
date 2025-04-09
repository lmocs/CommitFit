import express from "express";
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes)

app.listen(PORT, HOST, () => {
	console.log(`Server running on http://${HOST}:${PORT}`);
});
