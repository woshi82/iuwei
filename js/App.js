/*
 * App 入口文件
 * @Author: zengyanling 
 * @Date: 2017-04-03 21:26:42 
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-03 22:57:58
 */

import React, { Component  } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import networkIndicator from './actions/networkIndicator';
import AppNavigator from './AppNavigator';

class App extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
  }
  render() {
    console.log(111);
    return (
      <View style={styles.container}>
          <StatusBar
            networkActivityIndicatorVisible = {this.props.networkIndicator}
            translucent={true}
            backgroundColor="blue"
	         />
        <AppNavigator />       
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => {
  return {
    networkIndicator: state.networkIndicator
  }
};

module.exports = connect(mapStateToProps)(App);

