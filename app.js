const express = require('express');
const path = require('path');
const hbs = require('hbs');

const indexRouter = require('./app_server/routes/index');

const app = express();
const port = 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

app.use(express.static(__dirname));

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Travlr app is running at http://localhost:${port}`);
});