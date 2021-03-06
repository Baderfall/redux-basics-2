import React from 'react';

const ErrorMessage = ({message, retry}) => (
  <div>
    <p>{message}</p>
    <button
      onClick={retry}
    >Retry</button>
  </div>
);

export default ErrorMessage;
