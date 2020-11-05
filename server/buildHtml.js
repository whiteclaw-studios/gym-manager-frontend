import { createStore, combineReducers } from 'redux';
import reducer from '../src/reducers';
import Html from './Html';
var fs = require('fs');
const createMockReducers = (reducers) => {
  const keys = Object.keys(reducers);
  const mockReducers = {};
  keys.forEach((key) => {
    mockReducers[key] = reducers[key]();
  });

  return mockReducers;
};
const rootReducer = combineReducers({
  ...createMockReducers(reducer),
});
const store = createStore(rootReducer);
const html = Html({ store });
fs.writeFileSync(`${process.cwd()}/public/index.html`, html);
