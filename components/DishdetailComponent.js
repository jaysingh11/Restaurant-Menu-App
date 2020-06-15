import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList, Modal, Button} from 'react-native';
import {Card, Icon, Rating, Input } from 'react-native-elements';
import {connect} from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import {postComment} from '../redux/ActionCreators';

let isVisible = false;


const mapStateToProps = state =>{
	return {
		dishes: state.dishes,
		comments: state.comments
	};
};

const mapDispatchToProps = dispatch => ({
	postComment: (newComment) => dispatch(postComment(newComment.Id, newComment.dishId, newComment.rating, newComment.author, newComment.comment))
});


function HandleComment(props){

	const newComment = {rating: null, author: null, comment: null, dishId: props.dishId, Id:props.Id };
	
	return (
		<View style = {styles.Modal}>
			<Rating
				style = {styles.rating}
				startingValue = {0}
				type = 'star'
				showRating
				onFinishRating = {(rating)=>{newComment.rating = rating}}
				/>
			<Input  
				style = {styles.input}
				blurOnSubmit
				placeholder = "  Author"
				leftIcon = {{type: 'font-awesome', name: 'user-o', size:20}}
				onChangeText = {(name)=>{newComment.author = name}}
				/>
			<Input 
				style = {styles.input}
				blurOnSubmit
				placeholder = "  Comment"
				leftIcon = {{type: 'font-awesome', name: 'comment-o', size: 20}}
				onChangeText = {(comment)=>{newComment.comment = comment}}
				/>
			<View style = {{marginVertical:30}}>
				<Button
					onPress={() => {props.postComment(newComment); props.toggleCommentModal();}}
					color='#512DA8'
					title='SUBMIT'
					/>
				<View style = {{height:15}}></View>
				<Button
					onPress={()=>{props.toggleCommentModal(); }}
					color='#989898'
					title='CANCEL'
					/>
			</View>
		</View>
	);
}

function RenderDish(props){
	const dish = props.dish;
	if(dish!=null){
		return (
				<Card title = "Recipe"
					featuredTitle = {dish.name}
					image = {{uri: baseUrl+ dish.image}}
				    >
					<Text style = {{margin:10, color:'black'}}>
						{dish.description}
					</Text>
					<View style = {styles.icon}>
						<Icon	
							raised
							reverse
							name ={props.favorite ? 'heart':'heart-o'}
							type='font-awesome'
							color='#f50'
							onPress={()=>props.favorite?consol.log('Already favorite'):props.onPress()}
						   />
						<View style={{width:30}}></View>
						<Icon
							raised
							reverse
							name = {'pencil'}
							type='font-awesome'
							color='#512DA8'
							onPress = {() => props.toggleCommentModal()}
							/>
					</View>
			    </Card>
		      
		);
	}
	else {return (<View ></View>);}
}
//`backgroundColor`
function RenderComments(props){
	const comments = props.comments;
	const renderCommentItem = ({item, index})=>{
		return(
			<View key = {index} style={{margin: 10}}>
				<Text style={{fontSize:14}}>{item.comment}</Text>
				<Text style={{fontSize:12}}>{item.rating} Stars</Text>
				<Text style={{fontSize:12}}>{'-- ' + item.author + ', ' + item.date}</Text>
			</View>
		)
	}
	return(
		<Card title="Comment">
			<FlatList
			    data={comments}
				renderItem={renderCommentItem}
				keyExtractor={item=>item.id.toString()}
				/>
		</Card>
	)

}

class Dishdetail extends Component{
	constructor(props){
		super(props);
		this.state = { favorites:[], isVisible: false };
	};

	toggleCommentModal(){
		this.setState({isVisible: !this.state.isVisible})
	}

	markFavorite(dishId){
		this.setState({favorites: this.state.favorites.concat(dishId)})
	}

	static navigationOptions = { title: 'Dish details'};

	render(){
		const dishId = this.props.navigation.getParam('dishId', '');
		return (
				<ScrollView>
					 <RenderDish dish = {this.props.dishes.dishes[+dishId]}
						favorite = {this.state.favorites.some(el=>el==dishId)}
						toggleCommentModal = {()=>this.toggleCommentModal()}
						onPress = {()=>this.markFavorite(dishId)}
					 />
					 <RenderComments comments={this.props.comments.comments.filter((comment)=>comment.dishId===dishId)}/>

					 <Modal
						animationType = {'slide'}
						transparent = {false}
						visible = {this.state.isVisible}
						onDismiss={()=> {this.toggleCommentModal(); }}
						onRequestClose={ ()=> {this.toggleCommentModal(); } }
						>
				        <HandleComment postComment = {this.props.postComment}
							dishId = {dishId}
							Id = {this.props.comments.comments.length}
							toggleCommentModal = {()=>this.toggleCommentModal()}
							/>
					</Modal>
					
				</ScrollView>
		);
	}
} 
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

//
const styles = StyleSheet.create({
	Modal: {
		justifyContent: 'center',
		margin: 10
	},
	rating:{
		margin:10,
		marginBottom:50
	},
	icon:{
	    justifyContent: 'center',
		flexDirection:'row',
		alignItems:'center'
	},
	input:{
		width: '90%',
		marginVertical: 6,
		paddingVertical: 6,
		paddingHorizontal: 10,
		fontSize: 20
	}
})

/**/