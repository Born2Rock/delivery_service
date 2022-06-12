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
    }
};

Object.freeze(cfg);

module.exports = cfg;