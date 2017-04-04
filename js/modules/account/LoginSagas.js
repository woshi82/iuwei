import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	PixelRatio,
} from 'react-native';
// import { connect } from 'react-redux';
// import { loginAc } from '../../actions';
// import formSubscription from '../../common/formSubscription';
// import Input from '../../common/Input';
// import GeneralAccountView from './GeneralAccountView';
// import My from '../my/My';
// import RacingContainer from '../racing/RacingContainer';
import TabsView from '../../tabs/TabsView';

export default class Login extends Component {
	goTabsView = () => {
		this.props.navigator.push({
			name: 'TabsView',
			component: TabsView,
      params: {
        iTab: 1,
      }
		});
		// this.props.loginReq({
		// 	user_name: 111111,
		// 	password: 222222,
		// });
	}
	render() {
		return (
			<View style={styles.container}>
        <Image style={styles.bg} />
        <Text style={styles.name}>iuwei.</Text>
        <TextInput
          style={styles.input}
          placeholder="用户名"
          autoFocus
          returnKeyType="next"
          onSubmitEditing={() => {this.password.focus();}}
        />
        <TextInput
          style={styles.input}
          ref={(r) => {this.password = r;}}
          placeholder="密码"
          enablesReturnKeyAutomatically  //未输入时键盘的确定按钮不能点
					returnKeyType="done"
					blurOnSubmit   // 点击键盘的确定 收起键盘
					onSubmitEditing={() => {this.customSubmit(this.props.formValidate.values); }}
        />
        <TouchableOpacity style={styles.btn} onPress={this.goTabsView}>
          <Text style={styles.btnText}>登录</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forget}>忘记密码?</Text>
        </TouchableOpacity>
      </View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 100,
  },
  bg: {
    // flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#008bdd',
  },
  name: {
    paddingBottom: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 56,
    color: '#fff',
  },
  input: {
    height: 46,
    padding: 14,
    // borderColor: 'red',
		// borderWidth: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: 'rgba(97, 95, 95,0.7)',
    fontSize: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    color: 'rgba(97, 95, 95,0.7)',
    // marginTop: 10,
  },
  btn: {
    height: 46,
    marginTop: 10,
    backgroundColor: '#fe4b00',
  },
  btnText: {
    lineHeight: 46,
    textAlign: 'center',
    color: '#fff',
  },
  forget: {
    marginTop: 50,
    color: '#fff',
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => {
	const { login, user } = state.account;
	return {
		loginData: login,
		userInfo: user.info,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		loginReq: (obj) => {
			dispatch(loginAc.request(obj));
		},
	};
};

// const connectLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

// module.exports = formSubscription('login')(connectLogin);
