const cfg = {
  app: {
    port: process.env.APP_PORT || 3000
  },
  db: {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || '27017',
    credentials: {
      user: '',
      pass: '',
      dbName: 'delivery',
      authSource: 'admin',
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  session: {
    secret: 'secret$%^134',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, httpOnly: false, maxAge: 1000 * 60 * 10}
  }
};

Object.freeze(cfg);

module.exports = cfg;