import React from 'react';
import { render } from 'react-dom';

import { fetchTodos } from './api';
import configureStore from './configureStore';
import Root from './components/Root';

fetchTodos('all').then(todos =>
  console.log(todos)
);

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('root')
);
