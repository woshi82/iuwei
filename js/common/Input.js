import React, { Component } from 'react';
import {
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
	Platform,
	Image,
	PixelRatio,
	// Dimensions,
} from 'react-native';
import fieldSubscription from './fieldSubscription';

class Input extends Component {
	render() {
		const { input: { onChange,  ...restInput }, meta: { touched, error, warning, active }, ...restProps } = this.props;
		// 解决android下 ‘AndroidTextInput throws error when color style is set to null’ 错误
		// let styleStatus = {};
		let styleStatus = { color: 'rgba(97, 95, 95,0.7)' };

		if (touched && error) {
			styleStatus = styles.error;
		}
		return (
			<View style={[styles.inputWrap, restProps.viewStyle]} >
				<TextInput
					ref={(node)=>{this.textInput = node}}
					style={[styles.inputText, restProps.inputStyle, styleStatus]}
					onChangeText={onChange}
					{...restProps}
					autoCapitalize="none"
					// placeholderTextColor="#c4c9cc"
					clearButtonMode="while-editing" //ios
					underlineColorAndroid="transparent" // android 去掉文本框的边框
				/>
				{
					Platform.OS === 'android' && active && (<TouchableOpacity onPress={()=>{this.textInput.clear()}}  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} ><Image source={require('./img/close.png')} style={styles.close} resizeMode="cover" ></Image></TouchableOpacity>)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputWrap: {
		height: 50,  // 兼容android
		flexDirection: 'row',
		justifyContent: 'space-between',

		// marginTop: 10,
		// borderColor: '#edeff0',
		borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: 'rgba(97, 95, 95,0.7)',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
	},
	inputText: {
		height: 48,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		fontSize: 12,
		flex: 1,
	},
	close: {
		marginRight: 13,
		marginTop: 18,
	},
	error: {
		color: '#eb5a44',
	},

	eye: {
		marginTop: 16,
		marginRight: 10,
		width: 20,
		height: 11,
	},
});

module.exports = fieldSubscription(Input);





