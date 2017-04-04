/*
 * @Author: zengyanling
 * @Date: 2017-04-04 16:13:30
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-04 18:29:55
 */

import React, { Component, PropTypes  } from 'react';
import {
	StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import ScrTabView from 'react-native-scrollable-tab-view';
import TabBar from './TabBar';
import My from './my/My';



export default class MainTabs extends Component {


  onChangeTab = (obj) => {
    // this.onTabSelect(obj.ref.props.tab)
  }
  render() {
    return (
    	<ScrTabView
	      initialPage={this.props.iTab || 0}
	      
	      tabBarPosition="bottom"
	      locked={true}
	      scrollWithoutAnimation={true}
	      onChangeTab={(obj) => {this.onChangeTab(obj)}}
	      renderTabBar={
	      	() => <TabBar />
	      }
	      >
        <View style={styles.container} tabLabel={{icon: 'ios-paper', text: '资讯'}} navigator={this.props.navigator}>
          <Text>news</Text>
        </View>
        <My tabLabel={{icon: 'ios-person', text: '我'}} navigator={this.props.navigator}/>
	      {/*<BiketoNewsView tab="news" subtab="newest"  tabLabel={{icon: 'ios-paper', text: '资讯'}}  navigator={this.props.navigator} />

	      <SubTabs tab="community" subtab="community1" tabLabel={{icon: 'ios-people', text: '社区'}}  />
	      <SubTabs tab="bike" tabLabel={{icon: 'ios-chatboxes', text: '找车'}} />
	      <SubTabs tab="discovery" tabLabel={{icon: 'ios-notifications', text: '发现'}} />
	      <BiketoMineView tab="mine" tabLabel={{icon: 'ios-list', text: '我的'}} />*/}
      </ScrTabView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: '#f1f1f1',
		// position: 'absolute',
		// top: 0,
		// left: 0,
		...Platform.select({
			ios: {
				// height: 64,
				paddingTop: 20,
			},
			android: {  // 19 21
				// height: 44 + (Platform.Version <= 19 ? 0 : StatusBar.currentHeight),
				paddingTop: Platform.Version <= 19 ? 0 : StatusBar.currentHeight,
			},
		}),
	},
});

// function select(store) {
//   return {
//     subtabs: store.navigation.subtabs
//   };
// }


// module.exports = connect(select)(MainTabs);
