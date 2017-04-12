import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

const formSubscription = formKey => WrappedComponent => {
	class formCommon extends Component {

		constructor(props){
			super(props);
			this.state = {
				error: '',
				// backendError: null,
				// backendRejectValue: null,

			};
		}

		validate = (key) => {
			const { formValidate } = this.props;
			const { syncErrors = {}, fields, active, values } = formValidate;
			var valid = true;
			this.setState({
				error: '',
			});
			// 显示一个错误
			for (let k in syncErrors) {
				if (key){
					if (key === k){
						this.setState({
							error: syncErrors[k],
						});
						valid = false;
						break;
					}
				} else {
					this.setState({
						error: syncErrors[k],
					});
					break;
				}
			}
			return valid;
		}
		/**
		 * 设置后台返回的错误信息
		 */
		setFormState = obj => {
			this.setState(obj);
		}

		submit = (submitFn) => {
			this.validate();
			const { handleSubmit } = this.props;
			// 进行表单验证
			handleSubmit(submitFn)();
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

