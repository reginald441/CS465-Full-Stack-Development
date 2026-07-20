const express = require('express');
const path = require('path');
const hbs = require('hbs');

// Connect to MongoDB
require('./app_server/models/db');

// Routes
const indexRouter = require('./app_server/routes/index');

const app = express();
const port = 3000;

// View Engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Static Files
app.use(express.static(__dirname));

// Routes
app.use('/', indexRouter);

// Start Server
app.listen(port, () => {
    console.log(`Travlr app is running at http://localhost:${port}`);
});