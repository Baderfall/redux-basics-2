import React from 'react';

const Link = ({onClick, children, isActive}) => {
  if (isActive) {
    return <span>{children}</span>;
  } else {
    return (
      <a href="#"
        onClick={e => {
          e.preventDefault();
          onClick();
        }}
      >{children}</a>
    );
  }
};

export default Link;
