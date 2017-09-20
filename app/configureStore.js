import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import logger from 'redux-logger';
import todoApp from './reducers';

const configureStore = () => {
  const middlewares = [];

  middlewares.push(promise);
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
