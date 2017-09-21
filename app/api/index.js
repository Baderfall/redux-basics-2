import { v4 } from 'node-uuid';

const fakeDb = {
  todos: [{
    id: v4(),
    text: 'hey',
    completed: true
  }, {
    id: v4(),
    text: 'ho',
    completed: false
  }, {
    id: v4(),
    text: 'let\'s go',
    completed: true
  }]
};

const delay = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = filter =>
  delay(5000).then(() => {
    switch (filter) {
      case 'all':
        return fakeDb.todos;
      case 'active':
        return fakeDb.todos.filter(todo => !todo.completed);
      case 'completed':
        return fakeDb.todos.filter(todo => todo.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });
