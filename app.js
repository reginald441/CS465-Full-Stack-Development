const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cors = require('cors');

// Connect to MongoDB
require('./app_server/models/db');

// Routes
const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_server/routes/api');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Static Files
app.use(express.static(__dirname));

// Routes
app.use('/', indexRouter);
app.use('/api', apiRouter);

// Start Server
app.listen(port, () => {
    console.log(`Travlr app is running at http://localhost:${port}`);
});