import React, { Component } from 'react';
import { Field } from 'redux-form';
import validatorjs from 'validator';

const fieldSubscription = WrappedComponent => {
	return class commonField extends Component {
		constructor(props) {
			super(props);

		}
		validate = (value='') => {
			// console.log(validatorjs.isEmpty(value));
			const { validations } = this.props;
			if (!validations) return;
			for (let i = 0, len = validations.length; i < len; i++) {
				let k = validations[i].validator;
				if (k === 'undefined') { continue; }
				let args = validations[i].arguments || [];
				args = !Array.isArray(args) ? [ args ] : args;
				let clonedArgs = args.slice(0);
				clonedArgs.unshift(value);
				if (typeof k === 'function') {
					isValid = k.apply(null, clonedArgs);
				} else {
					if (k === 'isRequired'){
						k = 'isEmpty';
						isValid = !validatorjs[k].apply(null, clonedArgs);
					} else if (k === 'isMobile'){
						k = 'isMobilePhone';
						clonedArgs.push('zh-CN');
						isValid = validatorjs[k].apply(null, clonedArgs);
					} else {
						if (typeof validatorjs[k] === 'undefined') {
							console.warn('FormError: Validator is not correct for: '+ k);
							continue;
						}
						if (k === 'isLength') {
							if (typeof clonedArgs[0] === 'string') {
								clonedArgs[0] = clonedArgs[0].trim();
							}
						}
						isValid = validatorjs[k].apply(null, clonedArgs);
					}
				}
				if (!isValid) {
					return (validations[i].message || '').replace(/{ARGS\[(\d+)\]}/g, function (replace, argIndex) {
						const val = args[argIndex];
						return val !== undefined ? val : '';
					});
				}
			}
		}
		componentDidMount() {
			// console.log(this.wrappedComponent)
			this.textInput = this.wrappedComponent.textInput;
		}
		// FIXME: ref={this.customRef} 此处有bug 需要优化
		renderInput = ({ ...params }) => {
			return <WrappedComponent {...params} ref={(node) => { this.wrappedComponent = node;}} />;
		}
		// clear() {
		// 	this.WrappedComponent.clear();
		// }
		render() {
			return (
				<Field component={this.renderInput} validate={this.validate} {...this.props} />
			);
		}
	};
};
export default fieldSubscription;
