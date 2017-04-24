import React, { Component  } from 'react';
import {
	StyleSheet,
	Text,
	StatusBar,
	Platform,
	Animated,
} from 'react-native';

export default class Error extends Component {
	static propTypes = {
		error: React.PropTypes.string.isRequired,
		animateEnd: React.PropTypes.func.isRequired,
	}
	static defaultProps={
	}
	constructor(props) {
		super(props);
		this.state = {
			fadeAnim: new Animated.Value(0),
			hasErrorAnimate: false,
		};
	}
	componentWillReceiveProps(nextProps) {
		// 连续多次触发
		!!nextProps.error && !this.state.hasErrorAnimate && this.errorAnimate();
	}
	/**
	 * 错误提示显示动画
	 */
	errorAnimate = () => {
		const { animateEnd } = this.props;
		// this._error.setNativeProps({ style: { opacity: this.state.fadeAnim } });
		// prop 变化不一定会激活多次
		this.setState({
			hasErrorAnimate: true,
		});
		var timing = Animated.timing;
		Animated.sequence([
			timing(
				this.state.fadeAnim,
				{	toValue: 1,
					duration: 350,
				},
			),
			Animated.delay(800),
			timing(
				this.state.fadeAnim,
				{	toValue: 0,
					duration: 350,
				},
			),
		]).start();
		this.state.fadeAnim.addListener((obj) => {
			// console.log(obj.value)
			// this._error.setNativeProps({ style: { opacity: obj.value } });
			if (obj.value <= 0) {
				// console.log('jiesujiesu')
				this.setState({
					hasErrorAnimate: false,
				});
				animateEnd && animateEnd();

				this.state.fadeAnim.removeListener();
			}
		});
	}
	render() {
		const { error } = this.props;
		if (error) {
			return (
				<Animated.View
					ref={component => this._error = component}
					style={[styles.error, { opacity: this.state.fadeAnim }]}
				>
					<Text style={styles.errorText}>{error}</Text>
				</Animated.View>
			);
		}
		return null;
	}
}

const styles = StyleSheet.create({
	error: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: '#fe4b00',
		...Platform.select({
			ios: {
				height: 64,
				paddingTop: 20,
			},
			android: {
				height: 44 + (Platform.Version <= 19 ? 0 : StatusBar.currentHeight),
				paddingTop: Platform.Version <= 19 ? 0 : StatusBar.currentHeight,
			},
		}),
	},
	errorText: {
		height: 44,
		paddingTop: 15,
		textAlign: 'center',
		color: '#fff',
	},
});
