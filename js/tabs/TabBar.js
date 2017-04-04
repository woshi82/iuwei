import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class TabBar extends Component {
  constructor(props) {
		super(props);
		this.tabIcons = [];
	}
  static propTypes =  {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  }

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  }

  setAnimationValue = ({ value, }) => {
    this.tabIcons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  }

  //color between rgb(153,153,153) and rgb(0,139,211)
  iconColor(progress) {
    const red = 0 + (153 - 0) * progress;
    const green = 139 + (153 - 139) * progress;
    const blue = 211 + (153 - 211) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  render() {
    return <View style={[styles.tabs, this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {
        return (
          <TouchableOpacity
            key={tab.icon}
            onPress={() => {this.props.goToPage(i);}}
            activeOpacity={1}
            style={styles.tab}>
            <Icon
              name={tab.icon}
              size={30}
              color={this.props.activeTab === i ? '#008bdd' : '#999'}
              ref={(icon) => { this.tabIcons[i] = icon; }}
            />
            <Text style={[styles.text, {color: this.props.activeTab === i ? '#008bdd' : '#999'}]}>{tab.text}</Text>
          </TouchableOpacity>);
      })}
    </View>;
  }
};

const styles = StyleSheet.create({
  text: {
    color: '#999',
    fontSize: 10,
    paddingBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 55,
    flexDirection: 'row',
    paddingTop: 20,    
    backgroundColor: '#fff',
  },
});
