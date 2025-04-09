const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");

const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.json());
app.use('/api/users', userRoutes)

app.listen(PORT, HOST, () => {
	console.log(`Server running on http://${HOST}:${PORT}`);
});
