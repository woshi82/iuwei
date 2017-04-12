import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	PixelRatio,
} from 'react-native';
import { connect } from 'react-redux';
import { loginSagasAc } from '../../actions';
import Header from '../../common/Header';
import TabsView from '../../tabs/TabsView';
import formSubscription from '../../common/formSubscription';
import Input from '../../common/Input';
import Error from '../../common/Error';

class Login extends Component {
	componentWillReceiveProps (nextProps) {
    nextProps.userData.isLogin && this.props.navigator.push({
			name: 'TabsView',
			component: TabsView,
      params: {
        iTab: 1,
      }
		});
  }
	loginHandler = () => {
    const { formValidate, loginReq } = this.props;
    const values = formValidate.values;
    loginReq({
      // username: this.username._lastNativeText,
      username: values.username,
      password: values.password
    });
	}
  renderForm = () => {
    return (
			<View>
				<Input
					name="username"
					validations={[
					{
						validator: 'isRequired',
						message: '请输入用户名',
					}, {
						validator: 'isLength',
						arguments: [3, 10],
						message: '用户名为{ARGS[0]}到{ARGS[1]}位字符',
					}]}
					placeholder="请输入用户名"
					returnKeyType="next"
				/>
				<Input
					name="password"
					validations={[
					{
						validator: 'isRequired',
						message: '请输入密码',
					}, {
						validator: 'isLength',
						arguments: [2, 10],
						message: '请输入 {ARGS[0]} 到 {ARGS[1]} 位密码',
					}]}
					placeholder="请输入密码"
					password
					secureTextEntry
					enablesReturnKeyAutomatically  //未输入时键盘的确定按钮不能点
					returnKeyType="done"
					blurOnSubmit   // 点击键盘的确定 收起键盘
					onSubmitEditing={() => {this.customSubmit(this.props.formValidate.values); }}
					/>
			</View>
		);
  }
	render() {
    const { formSubmit, valid, error, setFormState } = this.props;
		return (
			<View style={styles.container}>
        <Image style={styles.bg} />
        <Header navigator={this.props.navigator} />
        <Error
          error={error}
          animateEnd={() => {
            setFormState({
              error: '',
            });
          }}
        />
        <Text style={styles.name}>iuwei.</Text>
        {this.renderForm()}
          <TouchableOpacity style={[styles.btn, !valid && styles.btnInactive]} onPress={() => {formSubmit(this.loginHandler)}}>
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
  btnInactive: {
    backgroundColor: '#999',

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

const connectLogin = connect(
  (state) => {
    return {
      userData: state.account.user,
    };
  },
  (dispatch) => {
    return {
      loginReq: (obj) => {
        dispatch(loginSagasAc.request(obj));
      },
    };
  })(Login);
  export default formSubscription('login')(connectLogin);
