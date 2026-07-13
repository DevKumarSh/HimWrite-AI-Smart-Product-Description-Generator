const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'your_google_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your_google_client_secret',
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in our db
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Update googleId and profile image if missing
          if (!user.googleId) {
            user.googleId = profile.id;
            user.profileImage = profile.photos[0].value;
            await user.save();
          }
          done(null, user);
        } else {
          // if not, create a new user
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            profileImage: profile.photos[0].value,
          });
          done(null, user);
        }
      } catch (error) {
        console.error(error);
        done(error, null);
      }
    }
  )
);

// Since we are using JWT, we generally set session: false in the route.
// But passport needs these if session is used somewhere.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
