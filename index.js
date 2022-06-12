const config = require('./.config.js');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const routes = require('./routes');

app.use(bodyParser.json());
app.use('/api/signup', routes.signup);
app.use('/api/signin', routes.signin);
app.use('/api/advertisements', routes.advertisements);

async function serve() {
  try {
    await mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/`, config.db.credentials);
    server.listen(config.app.port);
    console.log('\x1b[46m', `Express is running on http://localhost:${config.app.port}/`, '\x1b[0m');
  } catch (e) {
    console.log('can not start server: ' + e);
  }
};

serve();
