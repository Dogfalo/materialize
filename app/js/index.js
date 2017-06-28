import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
import { throttle, assign } from 'lodash';
import IS_DEV from 'isdev';
//
import App from './App';
// import reducers from './reducers';

const store = {};

const Root = (props) => (<App store={store} />);

export default Root;
