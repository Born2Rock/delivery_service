const express = require('express');
const router = express.Router();
const {Users} = require("../modules");
const session = require("express-session");
const config = global.config;

const passport = require('passport');
const LocalStrategy = require('passport-local');

let RedisStore = require("connect-redis")(session);
const { createClient } = require("redis")
let redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error);
router.use(session({
  store: new RedisStore({client: redisClient}),
  ...config.session,
}));

router.use(passport.authenticate('session'));

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async function(login, password, done) {
      
      Users.authenticate(login, password)
        .then(result => {
          if (result.status === 'error') return done(result);
          return done(null, result);
      });
      /*
      User.findOne({login: login}, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!verifyPassword(user, password)) { return done(null, false); }
        return done(null, user);
      });
      */
    }
  )
);

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user._id, username: user.name, email: user.email });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/api/signin/success',
    failureRedirect: '/api/signin/error'
  })
);

router.get('/', (req, res) => {
  res.status(200).send('<form method="post" action="/api/signin"><input type="text" name="email" placeholder="email" value="test2@sdfsd.com"><br><input type="text" name="password" placeholder="password" value="test"><br><button>send</button></form>');
});

router.get('/success', (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

router.get('/ws_dummy', (req, res) => {
  const tempTpl = `
    ${req.user}
    <script src="/socket.io/socket.io.js"></script>
    <script>
      const socket = io();
      socket.on("connect", (arg) => {
        console.log('connected');
      });
    </script>`;
  res.status(200).send(tempTpl);
});

router.get('/err', (req, res) => {
});

module.exports = router;