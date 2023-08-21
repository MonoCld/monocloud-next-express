'use strict';

import express from 'express';
import path from 'node:path';
import dotenv from 'dotenv';
import expressSession from 'express-session';
import passport from 'passport';
import { MonoCloudStrategy } from '@monocloud/passport-js';

dotenv.config({ path: '.env.local' });

const strategy = MonoCloudStrategy.init({
  issuer: process.env.MONOCLOUD_ISSUER,
  client_id: process.env.MONOCLOUD_CLIENT_ID,
  client_secret: process.env.MONOCLOUD_CLIENT_SECRET,
  login_callback_url: 'http://localhost:3000/login/callback',
  post_logout_redirect_url: 'http://localhost:3000/logout/callback',
  scopes: process.env.MONOCLOUD_SCOPES
});

const app = express()
const port = 3000

app.set('views', path.join('views'));
app.set('view engine', 'ejs');

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

passport.use('oidc', strategy);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.render('index'))

app.listen(port, () => console.log(`Example app listening on port ${port}`));