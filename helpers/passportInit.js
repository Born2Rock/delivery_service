/*TODO: Я не понимаю правильно так выносить инициализацию паспорта или нет*/
const session = require("express-session");
const passport = require("passport");
const config = global.config;

const LocalStrategy = require('passport-local');
let RedisStore = require("connect-redis")(session);
const { createClient } = require("redis")
let redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error);

const initPassport = function (router){
  router.use(session({
    store: new RedisStore({client: redisClient}),
    ...config.session,
  }));
  router.use(passport.authenticate('session'));
}

module.exports = initPassport;

