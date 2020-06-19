import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList, Modal, Button, Alert, PanResponder, Share} from 'react-native';
import {Card, Icon, Rating, Input } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postComment, postFavorite } from '../redux/ActionCreators';


const mapStateToProps = state =>{
	return {
		dishes: state.dishes,
		comments: state.comments,
		favorites: state.favorites
	};
};

const mapDispatchToProps = dispatch => ({
	postFavorite: (dishId) => dispatch(postFavorite(dishId)),
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

	handleViewRef = ref => this.view = ref;

	const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    };

	const recognizeComment = ({ moveX, moveY, dx, dy })=>{
		if ( dx > 200 )
            return true;
        else
            return false;
	};

    const panResponder = PanResponder.create({

        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },

		onPanResponderGrant: () => {this.view.rubberBand(1000)
		.then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
		},

        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
			else if(recognizeComment(gestureState))
				props.toggleCommentModal();

            return true;
        }
    })

	const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }

	if(dish!=null){
		return (
			<Animatable.View animation="fadeInDown" duration={2000} delay={1000}
			    ref={this.handleViewRef} 
				{...panResponder.panHandlers}
				> 

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
							onPress={()=>props.favorite?Alert.alert('Already favorite'):props.onPress()}
						   />
						<Icon
							raised
							reverse
							name = {'pencil'}
							type='font-awesome'
							color='#512DA8'
							onPress = {() => props.toggleCommentModal()}
							/>
						<Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            style={styles.cardItem}
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} 
							/>
					</View>
			    </Card>
		     </Animatable.View>
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
	  <Animatable.View animation="fadeInUp" duration={2000} delay={1000}> 
		<Card title="Comment">
			<FlatList
			    data={comments}
				renderItem={renderCommentItem}
				keyExtractor={item=>item.id.toString()}
				/>
		</Card>
	  </Animatable.View>
	)

}

class Dishdetail extends Component{
	constructor(props){
		super(props);
		this.state = { isVisible: false };
	};

	toggleCommentModal(){
		this.setState({isVisible: !this.state.isVisible})
	}

	markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

	static navigationOptions = { title: 'Dish details'};

	render(){
		const dishId = this.props.navigation.getParam('dishId', '');
		return (
				<ScrollView>
					 <RenderDish dish = {this.props.dishes.dishes[+dishId]}
						favorite = {this.props.favorites.some(el=>el==dishId)}
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