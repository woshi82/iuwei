/*
 * @Author: zengyanling
 * @Date: 2017-04-04 14:42:08
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-04 16:54:37
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
} from 'react-native';
import Main from './common/Main';
// import LoginLayout from './modules/account/LoginLayout';

export default class AppNavigator extends Component {
	render() {
		return (
			<Navigator
        style={styles.container}
        configureScene={(route) => {
        	return Navigator.SceneConfigs.PushFromRight;
        }}
        initialRoute={{
        	 name: 'Main',
        	 component: Main,
        }}
        renderScene={(route, navigator) => {
        	var Component = route.component;
          return (
            <Component {...route.params} navigator={navigator} />
          );
        }} />
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
