import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import todoApp from './reducers';
import { saveState, loadState } from './localStorage';

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
  const previousState = loadState();
  const store = createStore(todoApp, previousState);

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos
    });
  }, 1000));

  return store;
};

export default configureStore;
