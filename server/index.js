import config from '../config.js';
import Html from './Html';
import express from 'express';
import path from 'path';
import { createStore, combineReducers } from 'redux';
import reducer from '../src/reducers';
var bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const server = express();
server.use(bodyParser.json({ limit: '256kb' }));
server.use(compression());
server.use(cors());
server.get(
  /^\/[a-zA-Z]+\.[(a-zA-Z0-9).js|js|svg|png|css|ico|json]*[?a-zA-Z]+$/,
  express.static(__dirname.slice(0, -6) + 'public'),
);

server.get('/service-worker.js', (req, res) => {
  res.sendFile(
    path.resolve(__dirname.slice(0, -6), 'public', 'service-worker.js'),
  );
});
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const createMockReducers = (reducers) => {
  const keys = Object.keys(reducers);
  const mockReducers = {};
  keys.forEach((key) => {
    mockReducers[key] = reducers[key]();
  });

  return mockReducers;
};

server.get('*', async (req, res) => {
  try {
    const { url } = req;
    const rootReducer = combineReducers({
      ...createMockReducers(reducer),
    });
    const store = createStore(rootReducer);
    const html = Html({ store, url });
    res.status(200).send(html);
  } catch (err) {
    console.log('error in server side rendering .....', err);
    res.status(500).send('internal server error');
  }
});

server.listen(config.port, () => {
  console.log('Server listening on Port', config.port);
});
