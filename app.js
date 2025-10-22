

import express from 'express';
import { connectDB } from  './src/config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

//connect to DB
connectDB();

app.get('/', (req, res) => {
    res.send('Server is running and DB connected');
});

app.listen(PORT, () => {
    console.log(` server started on http://localhost:${PORT}`);
});