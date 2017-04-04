import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
} from 'react-native';

export default class Main extends Component {
	render() {
		return (
			<View
        style={styles.container}
			>
        <Text>我是APP2221</Text>
        <Text>我是APP222</Text>
        <Text>我是APP2223</Text>
        <Text>我是APP2224111</Text>
      </View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    ...Platform.select({
      ios: {
         paddingTop: 20,
      },
    }),
  },
});
