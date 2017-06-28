import ReactDOM from 'react-dom';
import React from 'react';
import Root from './js/index';

const load = () => {
  ReactDOM.render(
    <Root />,
    document.querySelector('#root')
  );
};

if (document.readyState !== 'complete') {
  document.addEventListener('DOMContentLoaded', load);
} else {
  load();
}
