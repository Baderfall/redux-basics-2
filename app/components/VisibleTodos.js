import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../actions';
import Todos from './Todos';
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers';
import ErrorMessage from './ErrorMessage';

class VisibleTodos extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter).then(() => { console.log('Loaded!'); });
  }

  render() {
    const { toggleTodo, isFetching, errorMessage, todos } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    if (errorMessage && !todos.length) {
      return (
        <ErrorMessage
          message={errorMessage}
          retry={() => this.fetchData()}
        />
      );
    }
    return <Todos onTodoClick={toggleTodo} todos={todos} />;
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state, filter),
    filter
  };
};
VisibleTodos = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodos));

export default VisibleTodos;
