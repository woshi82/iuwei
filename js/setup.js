/*
 * @Author: zengyanling 
 * @Date: 2017-04-03 21:24:57 
 * @Last Modified by:   zengyanling 
 * @Last Modified time: 2017-04-03 21:24:57 
 */

import React, { Component } from 'react';
import {
  Provider,
} from 'react-redux';
import configureStore from './store/configureStore';
import App from './App';

export default class Root extends Component {
  constructor() {
    super();
    this.state = {
			isLoading: true,
      store: configureStore(() => this.setState({isLoading: false})),
    };
  }
  render() {
		if (this.state.isLoading) {
			return null;
		}
    return (
      <Provider store={this.state.store}>
        <App />
      </Provider>
    );
  }
}
