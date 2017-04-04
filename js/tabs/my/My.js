/*
 * @Author: zengyanling
 * @Date: 2017-04-04 16:13:30
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-04 18:28:34
 */

import React, { Component } from 'react';
import {
	StyleSheet,
  Text,
  View,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { logoutAc } from '../../actions';
import Main from '../../common/Main';


class My extends Component {
  logoutHandler = () => {
		this.props.logoutReq();
	}
  loginHandler = () => {
    console.log(this.props.navigator)
    this.props.navigator.resetTo({
			name: 'Main',
			component: Main,
		});
  }
  render() {
    const { userData } = this.props;
    return (
    	<View style={styles.container}>
        <View style={styles.top}>
          <Image style={styles.avatar} source={userData.isLogin ? require('./img/avatar.jpg') : require('./img/avatar.png')}/>
          <Text style={styles.name}>{userData.info.username}</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={this.logoutHandler}>
          <Text style={styles.btnText}>退出登录</Text>
          <Image source={require('./img/arrow-grey.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={this.loginHandler}>
          <Text style={styles.btnText}>登录</Text>
          <Image source={require('./img/arrow-grey.png')}/>
        </TouchableOpacity>
      </View>
    );
  }
}``

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
	},
  top: {
    alignItems: 'center',
    backgroundColor: '#008bdd',
		...Platform.select({
			ios: {
				height: 260,
				paddingTop: 20,
			},
			android: {  // 19 21
				height: 260 + (Platform.Version <= 19 ? 0 : StatusBar.currentHeight),
				paddingTop: Platform.Version <= 19 ? 0 : StatusBar.currentHeight,
			},
		}),
	},
  avatar: {
    width: 80,
    height: 80,
    marginTop: 60,
    marginBottom: 20,
    borderRadius: 40,
    backgroundColor: '#f1f1f1',

	},
  name: {
    color: '#fff',
	},
  btn: {
    height: 46,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: 'rgba(97, 95, 95,0.7)',
  },
  btnText: {    
    color: 'rgba(0, 0, 0,0.7)',
  },
});
export default connect(
  (state) => {
    return {
      userData: state.account.user,
    };
  },
  (dispatch) => {
    return {
      logoutReq: () => {
        dispatch(logoutAc());
      },
    };
  })(My);
