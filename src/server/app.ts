// -------REQUIRES AND IMPORTS-----------

// initialize the dotenv config
import 'dotenv/config';

const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

// socket.io server
const http = require('http');
const server = http.createServer(app);

import passport from 'passport';

// run the database file
const db = require('./db/index');

// --------------ENV------------------

const { SESSION_SECRET, BASE_URL, DEBUG_MODE } = process.env;

// ------INIT GOOGLE STRATEGY--------
// require auth to initialize google strategy
require('./auth');

//----------IMPORT ROUTES-------------

import {
  authRouter,
  nameRandomizerRouter,
  curatorRouter,
  s3UrlRouter,
  gamesRouter,
  artworkRouter,
  ribbonsRouter
} from './routes';
import { User } from './db/schemas/users';

// ----------MIDDLEWARE---------------
// session middleware
app.use(
  session({
    resave: false,
    secret: SESSION_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// path to static files
// make different client paths depending on DEBUG_MODE true or false
const CLIENT = DEBUG_MODE === "true" ? path.resolve(__dirname, '../../dist/client') : path.resolve(__dirname, '../client');
const HTML = path.resolve(CLIENT, './index.html');


// parsing
app.use(bodyParser.json());

//----------SET ROUTES-------------

app.use('/auth/google', authRouter);
app.use('/name-randomizer', nameRandomizerRouter);
app.use('/curator', curatorRouter);
app.use('/s3Url', s3UrlRouter);
app.use('/games', gamesRouter);
app.use('/artworks', artworkRouter);
app.use('/ribbons', ribbonsRouter)

// serve static files from client
app.use(express.static(CLIENT));

app.patch('/api/user/socketId', (req, res) => {
  const { socketId } = req.body;
  if (!socketId) {
    return res.status(400).send('Socket ID is required');
  }
  // Update the user's socket ID in the database
  User.update({ socketId }, { where: { id: req.user.id } })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error('Error updating socket ID:', err);
      res.sendStatus(500);
    });
});

// check if a user is logged in
const isLoggedIn = (req: any, res: any, next: any) => {
  // get a user from the session
  const user = req.session.user;
  if (user === null) {
    res.redirect('/');
  } else {
    next();
  }
};

app.get('/{*any}', (req, res) => {
  res.sendFile(HTML, err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// ---------SERVER LISTEN-------------

// port and listening
const port = 3000;

server.listen(port, () => {
  return console.log(`Express is listening at ${BASE_URL}`);
});

// run the sockets/index.ts file
require('./sockets');
export { app, server };
