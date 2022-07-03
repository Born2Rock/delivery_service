const config = require('./.config.js');
global.config = config;
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require("express-session");

/* EXPRESS AND SERVER */
const app = express();
const server = http.createServer(app);

/* MIDDLEWARES */
const sessionMiddleware = session({ secret: "changeit", resave: false, saveUninitialized: false });
app.use(sessionMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ROUTES SECTION */
const routes = require('./routes');
app.use('/api/signup', routes.signup);
app.use('/api/signin', routes.signin);
app.use('/api/advertisements', routes.advertisements);



/* SOCKET IO */
const { Server } = require("socket.io");

const io = new Server(server);
const passportInit = require('./helpers/passportInit');
passportInit(app);

// convert a connect middleware to a Socket.IO middleware
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
const passport = require('passport');
io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
	if (socket.request.user) {
		next();
	} else {
		console.log('io unauthorized');
		next(new Error('unauthorized'))
	}
});

/* логика socketIo так же пришлось его обернуть */
require('./helpers/socketIo')(io);

app.get("/", (req, res) => {
	res.sendFile('index.html', { root: __dirname + '/html' });
});

async function serve() {
	try {
		await mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/`, config.db.credentials);
		server.listen(config.app.port);
		console.log('\x1b[46m', `Express is running on http://localhost:${config.app.port}/`, '\x1b[0m');
	} catch (e) {
		console.log('can not start server: ' + e);
	}
}

serve();
