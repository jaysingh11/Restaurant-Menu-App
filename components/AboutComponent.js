import React, {Component} from 'react';
import {ScrollView, View, Text, FlatList, StyleSheet} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
	return{
		leaders: state.leaders
	}
}

const hist = ['Started in 2010, Ristorante con Fusion quickly established',
				' itself as a culinary icon par excellence in Hong Kong.',
				' With its unique brand of world fusion cuisine that can be',
				' found nowhere else, it enjoys patronage from the A-list clientele',
				' in Hong Kong.  Featuring four of the best three-star Michelin',
				' chefs in the world, you never know what will arrive on your plate',
				' the next time you visit us.',
               'The restaurant traces its humble beginnings to The Frying Pan, a successful',
			   ' chain started by our CEO, Mr. Peter Pan, that featured for the first time the worlds, best cuisines in a pan.']
       
function History(){
    return(
			<View style = {{flex:200}}>
               <Card title = "Our History" >
					<Text style = {styles.txt}>{hist[0]}{hist[1]}{hist[2]}{hist[3]}{hist[4]}{hist[5]}{hist[6]}</Text>
					<Text style = {styles.txt}>{hist[7]}{hist[8]}</Text> 
			   </Card>
			</View>
	);
}

const Separator = ()=>{
			return(
				<View style = {{flex:1}}></View>
			);
};
 
class About extends Component{

	static navigationOptions = { title: 'About Us'};


	render(){

		const { navigate } = this.props.navigation;  //initial it was not 

		const renderLeader = ({item,index}) =>{
				return(
					<ListItem
						key = {index}
						title = {item.name}
						titleStyle = {{fontWeight:"bold"}}
						subtitle = {
						           <View style = {styles.subtitleView}>
										<Text style = {styles.subtitleText}>{item.description}</Text>
								   </View>   
								}
						hideChevron = {true}
						leftAvatar = {{source: {uri: baseUrl+item.image}}}
						/>
				);
		};


			return(
				<ScrollView>
					<History/>
					<Card title = "Corporate Leadership">
						<FlatList
							data = {this.props.leaders.leaders}
							renderItem = {renderLeader}
							keyExtractor = {item=>item.id.toString()}
						/>
					</Card>
				</ScrollView>
			);
	}
} export default connect(mapStateToProps)(About);


const styles = StyleSheet.create({
	txt: {fontSize:10},
	subtitleView: {flex:30},
	subtitleText: {fontSize: 10}
});

