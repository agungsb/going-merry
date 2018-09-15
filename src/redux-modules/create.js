import {
  createStore,
} from 'redux';
import reducers from './init';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(initialState = {}) {

  const store = createStore(reducers, initialState, composeWithDevTools())

  return store;
}