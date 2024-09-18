require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const PORT = process.env.DB_PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});
