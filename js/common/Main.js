import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import LoginLayout from '../modules/account/LoginLayout';
import LoginRedux from '../modules/account/LoginRedux';

export default class Main extends Component {
  pressButton = (name, component, params = {}) => {
		const { navigator } = this.props;
		navigator.push({
			name,
			component,
			params,
		});
	}
	render() {
		return (
			<View
        style={styles.container}
			>
        <TouchableOpacity style={styles.btn} onPress={() => {this.pressButton('LoginLayout', LoginLayout);}}>
          <Text style={styles.btnText}>LoginLayout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => {this.pressButton('LoginRedux', LoginRedux);}}>
          <Text style={styles.btnText}>LoginRedux</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => {this.pressButton('LoginLayout', LoginLayout);}}>
          <Text style={styles.btnText}>LoginSagas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => {this.pressButton('LoginLayout', LoginLayout);}}>
          <Text style={styles.btnText}>LoginVerify</Text>
        </TouchableOpacity>
      </View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
         paddingTop: 20,
      },
    }),
  },
  btn: {
    width: 160,
    overflow: 'hidden',
    borderRadius: 6,
    backgroundColor: '#008bdd',
  },
  btnText: {
    lineHeight: 46,
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
});
