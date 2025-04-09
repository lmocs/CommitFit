import userRoutes from "./routes/userRoutes.js";
import express, { json } from "express";
const app = express();

const PORT = 3000;
const HOST = '0.0.0.0';

app.use(json());
app.use('/api/users', userRoutes)

app.listen(PORT, HOST, () => {
	console.log(`Server running on http://${HOST}:${PORT}`);
});
