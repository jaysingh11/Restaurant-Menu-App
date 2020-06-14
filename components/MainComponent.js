import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent'

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,StyleSheet, Image, platform, ScrollView} from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import {Icon} from 'react-native-elements';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
	return {
	};
}
                //
const mapDispatchToProps = dispatch => ({
	fetchDishes: () => dispatch(fetchDishes()),
	fetchComments: () => dispatch(fetchComments()),
	fetchPromos: () => dispatch(fetchPromos()),
	fetchLeaders: () => dispatch(fetchLeaders())
});

// stack navigator
const MenuNavigator = createStackNavigator({
	Menu: {
			screen: Menu,
			navigationOptions:({navigation}) => ({
				headerLeft: <Icon name = "menu" size = {24} color = 'white' 
				             onPress = {()=>navigation.toggleDrawer()}
							 />
			})
			
	},
	Dishdetail :{screen: Dishdetail}
}, {
	initialRouteName: 'Menu',
	navigationOptions: {
		headerStyle: { backgroundColor: '#510DA8'},
		headerTintColor: '#fff',
		headerTitleStyle: { color: '#fff'}
	}
});

const HomeNavigator = createStackNavigator({
	Home: {
	         screen: Home,
			 navigationOptions: ({navigation})=>({
			 headerLeft: 
					<Icon name = "menu" size = {24} color = 'white' 
					onPress = {()=>navigation.toggleDrawer()}
					/>
			})
	           
	}

}, {
	navigationOptions: {
		headerStyle: { backgroundColor: '#512DA8'},
		headerTintColor: '#fff',
		headerTitleStyle: { color: '#fff'},
		
	}
});



const ContactNavigator = createStackNavigator({
	Contact: {
				screen: Contact,
				navigationOptions: ({navigation})=>({
				 headerLeft: 
						<Icon name = "menu" size = {24} color = 'white' 
						onPress = {()=>navigation.toggleDrawer()}
						/>
				})
	}

}, {

	navigationOptions: {
		headerStyle: { backgroundColor: '#512DA8'},
		headerTintColor: '#fff',
		headerTitleStyle: { color: '#fff'},
	}
});

const AboutNavigator = createStackNavigator({
	About: {
	        screen: About,
			navigationOptions: ({navigation})=>({
			 headerLeft: 
					<Icon name = "menu" size = {24} color = 'white' 
					onPress = {()=>navigation.toggleDrawer()}
					/>
			})
	}
}, {

	navigationOptions: {
		headerStyle: { backgroundColor: '#512DA8'},
		headerTintColor: '#fff',
		headerTitleStyle: { color: '#fff'},
		headerLeft: 
			<Icon name = "menu" size = {24} color = 'white' 
			onPress = {()=>navigation.toggleDrawer()}
			/>
	}
});


const CustomDrawerContentComponent = (props)=>(
	<ScrollView>
		<SafeAreaView style={styles.container}
		     forceInset={{top: 'always', horizontal: 'never'}}>
			 <View style = {styles.drawerHeader}>
				<View style={{flex:1}}>
					<Image source ={require('./images/logo.png')} style={styles.drawerImage}/>
				</View>
				<View style={{flex:2}}>
					<Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
				</View>
			 </View>
			 <DrawerItems {...props}/>
		</SafeAreaView>
	</ScrollView>
);

// Drawer navigator

const MainNavigator = createDrawerNavigator({
	Home:{
		screen: HomeNavigator,
		navigationOptions: {title: 'Home', drawerLabel: 'Home', drawerIcon:({tintColor})=>(
							<Icon name='home' type='font-awesome' size={24} color={tintColor}
							/>
							) }
	},
	Menu: {
		screen: MenuNavigator,
		navigationOptions: {title: 'Menu', drawerLabel: 'Menu', drawerIcon:({tintColor})=>(
							<Icon name='list' type='font-awesome' size={22} color={tintColor}
							/>
							) }
	},
	Contact:{
		screen: ContactNavigator,
		navigationOptions: {title: 'Contact Us', drawerLabel: 'Contact Us', drawerIcon:({tintColor})=>(
							<Icon name='address-card' type='font-awesome' size={22} color={tintColor}
							/>
							) }
	},

	About:{
		screen: AboutNavigator,
		navigationOptions: {title: 'About Us', drawerLabel: 'About Us', drawerIcon:({tintColor})=>(
							<Icon name='info-circle' type='font-awesome' size={24} color={tintColor}
							/>
							) }
	}
},
	{
		drawerBackgroundColor: '#D1C4E9',
		contentComponent:CustomDrawerContentComponent,
		DrawerPosition: 'left',
	}
);

//  add - padding: platform.os//         //
class Main extends Component{
	 
	 componentDidMount() {
	 	 this.props.fetchDishes(),
		 this.props.fetchComments(),
		 this.props.fetchPromos(),
		 this.props.fetchLeaders()
	 }

	 render(){
	 	 return(
		 	 <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
				<MainNavigator/>
			 </View>
		 );
	 }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);



const styles = StyleSheet.create({
	container:{flex:1},
	drawerHeader:{backgroundColor: '#512DAB', height:140, alignItems: 'center',justifyContent: 'center',flex:1,flexDirection:'row'},
	drawerHeaderText:{color:'white',fontSize:24, fontWeight: 'bold'},
	drawerImage:{margin:10, width:80,height:60}
})


