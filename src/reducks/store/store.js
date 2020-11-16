import {
  createStore as reduxCreteStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk'

import {UsersReducer} from '../users/reducers';
import {ProductsReducer} from '../products/reducers';

export default function createStore(history) {
  return reduxCreteStore(
    combineReducers({
      products:ProductsReducer,
      router: connectRouter(history),
      users:UsersReducer,
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  );
}