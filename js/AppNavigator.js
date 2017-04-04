import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
} from 'react-native';
import Main from './common/Main';

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
