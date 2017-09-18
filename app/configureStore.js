import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import todoApp from './reducers';
import { saveState, loadState } from './localStorage';

const configureStore = () => {
  const previousState = loadState();
  const store = createStore(todoApp, previousState);

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos
    });
  }, 1000));

  return store;
};

export default configureStore;
