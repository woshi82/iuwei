//////////// mid1.png


function n1(store){
		return function(next){
				return function(action) {
						console.log('n1 begin');
						next(action);
						console.log('n1 end');
				};
		};
}
function n2(store){
		return function(next){
				return function(action) {
						console.log('n2 begin');
						next(action);
						console.log('n2 end');
				};
		};
}
function applyMiddlewareSimilar(store, middlewares) {
		middlewares = middlewares.slice();
		middlewares.reverse();

		let dispatch = store.dispatch;
		// 在每一个 middleware 中变换 dispatch 方法。
		middlewares.forEach(middleware =>
				dispatch = middleware(store)(dispatch)
		);
		return Object.assign({}, store, { dispatch })
}
applyMiddlewareSimilar(store, n1, n2)
store.dispatch('EE');
//////////// mid2.png
// action.js
var newsList = ({newsId,url,page})=> {
	return {
		types: [LOAD_NEWS_REQUEST,LOAD_NEWS_SUCCESS, LOAD_NEWS_FAILURE],
		callAPI: () => fetch(`http://www.test.com/${url}&page=${page}`),
		shouldCallAPI: (state) => {
			const datas = state.newsList[newsId];
			if (datas && !!datas.isFetching) return false;
			return true;
		},
		payload: {newsId,page}
	}
}
// request.js
module.exports = ({ dispatch, getState }) => next => action => {
		const {
			types,
			callAPI,
			shouldCallAPI = () => true,
			payload = {}
		} = action;
		if (!types) {
			return next(action);
		}
		if (!shouldCallAPI(getState())) {
			return;
		}
		const [requestType, successType, failureType] = types;
		dispatch([{
			...payload,
			type: requestType
		}, networkIndicator(true)])
		return callAPI().then(
			response => {
				response.json().then(function(response){
					dispatch([{
							...payload,
							type: successType,
							response: response,
							page: payload.page+1
					},networkIndicator(false)]);
				});
			},
			error => {
				dispatch([{
						...payload,
						type: failureType,
						error: error,
						supPayload
				}, networkIndicator(false)]);
			}
		);
}
// //////////react.png
// LoginLayout.js
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
import Header from '../../common/Header';
export default class LoginLayout extends Component {
	loginHandler = () => {}
	render() {
		return (
			<View style={styles.container}>
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
					onSubmitEditing={() => {this.loginHandler(); }}
				/>
				<TouchableOpacity style={styles.btn} onPress={this.loginHandler}>
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
	...
});

////////////////////hoc4.png
// formSubscription
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
const formSubscription = formKey => WrappedComponent => {
	class formCommon extends Component {
		constructor(props){
			super(props);
			this.state = {
				error: '',
			};
		}
		validate = (key) => {
      // 处理 this.state.error
		}
		submit = (submitFn) => {
			if (this.validate()){
				const { handleSubmit } = this.props;
				// 进行表单验证
				handleSubmit(submitFn)();
			}
		}
		render() {
			return (<WrappedComponent
				setFormState={this.setFormState}
				formSubmit={this.submit.bind(this)}
				validateHandler={this.validate}
				{...this.props}
				{...this.state}
			/>);
		}
	}
	const connectForm = connect(
		state => {
			const formValidate = state.form[formKey] || {};
			return {
				formValidate,
			};
},
	)(formCommon);
	return reduxForm({
		form: formKey,
	})(connectForm);
};
export default formSubscription; 