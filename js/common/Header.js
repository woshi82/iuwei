import React, { Component  } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	StatusBar,
	Platform,
	TouchableOpacity,
} from 'react-native';

export default class Header extends Component {
	static propTypes = {
		bgColor: React.PropTypes.string,
		color: React.PropTypes.string,
	}
	static defaultProps={
		bgColor: '#008bdd',
		color: '#fff',
	}
	pressBack = () => {
		const { navigator} = this.props;
		navigator.pop();

	}
	render() {
		const { bgColor } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.headerRow}>
						<TouchableOpacity style={styles.back} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={this.pressBack.bind(this)}>
							<Image source={require('./img/back-white.png')} />
						</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		position: 'absolute',
		top: 0,
		left: 0,
		...Platform.select({
			ios: {
				height: 64,
				paddingTop: 20,
			},
			android: {  // 19 21
				height: 44 + (Platform.Version <= 19 ? 0 : StatusBar.currentHeight),
				paddingTop: Platform.Version <= 19 ? 0 : StatusBar.currentHeight,
			},
		}),
	},
	headerRow: {
		flexDirection: 'row',

		justifyContent: 'center',
		alignItems: 'center',
		height: 44,
	},
	back: {
		position: 'absolute',
		left: 0,
		top: 14,
		paddingLeft: 20,

	},
});

