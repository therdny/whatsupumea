import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux'

// reducers
import posts from './reducer.js'

let initialState = {};

let store = createStore(
  combineReducers({
    posts,
    }),
  initialState,
  // apply thunk middleware
  applyMiddleware(thunk)
);

export default store;