import React from 'react';

import AddTodo from './AddTodo';
import VisibleTodos from './VisibleTodos';
import Filters from './Filters';

const App = ({ params }) => (
  <div>
    <AddTodo />
    <VisibleTodos filter={params.filter || 'all'} />
    <Filters />
  </div>
);

export default App;
