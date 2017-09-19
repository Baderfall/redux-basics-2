import { createStore } from 'redux';

import todoApp from './reducers';

const addLoggingToDispatch = (store) => {
  const originalDispatch = store.dispatch;
  if(!console.group) {
    return originalDispatch;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state:', 'color: gray', store.getState());
    console.log('%c action:', 'color: blue', action);
    const returnValue = originalDispatch(action);
    console.log('%c new state:', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const configureStore = () => {
  const store = createStore(todoApp);

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  return store;
};

export default configureStore;
