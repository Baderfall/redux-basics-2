import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import todoApp from './reducers';

const thunk = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch);
  } else {
    return next(action);
  }
};

const configureStore = () => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  const store = createStore(
    todoApp,
    applyMiddleware(...middlewares)
  );

  return store;
};

export default configureStore;
