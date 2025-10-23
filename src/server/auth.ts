import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('./db/schemas/users');

type userTypes = {
  id: number;
  googleId: string;
  username: string;
  email: string;
  profilePic?: string;
};

require('dotenv').config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

// implement new google strategy: updates/creates user upon login
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${BASE_URL}/auth/google/callback`
    },
    function (_accessToken, _refreshToken, profile, cb) {
      // access users schema with findOrCreate
      User.findOrCreate({
        where: { googleId: profile.id },
        defaults: {
          username: 'randomUser',
          email: profile.emails[0].value
        }
      })
        .then(results => {
          const user = results[0].dataValues;
          return cb(null, user);
        })
        .catch((err: () => void) => {
          console.log('failed to find or create user', err);
          return cb(err, null);
        });
    }
  )
);

passport.serializeUser(async function (user: userTypes, cb) {
  process.nextTick(function () {
    return cb(null, user.googleId);
  });
});

passport.deserializeUser(async function (userId, cb) {
  try {
    const user = await User.findOne({ where: { googleId: userId } });
    cb(null, user.dataValues);
  } catch (err) {
    console.error('Error deserializing user', err);
    cb(err, null);
  }
});
