/* eslint-disable import/no-extraneous-dependencies */
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET_KEY,
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email'],
  }),
);
