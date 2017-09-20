import { createStore } from 'redux';

import todoApp from './reducers';

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.forEach((middleware) => {
    store.dispatch = middleware(store)(store.dispatch);
  });
};

const logger = store => next => {
  if(!console.group) {
    return next;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state:', 'color: gray', store.getState());
    console.log('%c action:', 'color: blue', action);
    const returnValue = next(action);
    console.log('%c new state:', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const promise = () => next => action => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next;
};

const configureStore = () => {
  const store = createStore(todoApp);
  const middlewares = [];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }
  middlewares.push(promise);

  wrapDispatchWithMiddlewares(store, middlewares);
  return store;
};

export default configureStore;
