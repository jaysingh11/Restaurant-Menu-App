import React,{Component} from 'react'; 
import {baseUrl} from './shared/baseUrl';
import {connect} from 'react-redux';
//import {fetchDishes} from './testing/ACTIONcreator';
import {postComment, fetchComments} from './redux/ActionCreators';
import {View,Text, Image, StyleSheet, Button} from 'react-native';



const mapStateToProps = state =>{
	return {comments: state.comments};
};

const mapDispatchToProps = dispatch => ({
	fetchComments: ()=>dispatch(fetchComments()),
	postComment: (newComment) => dispatch(postComment(newComment.dishId, newComment.rating, newComment.author, newComment.comment))
});


class C extends Component{
	
	constructor(Props){
		super(Props);
		this.state = {title: 'add item to JSON', color: 'green'}
	}

	componentDidMount() {
		 this.props.fetchComments()
	}

	toggle(){
		this.setState({title: 'Item added', color:'black'});
		setTimeout(()=>{
			this.setState({title: 'add item to JSON',  color: 'green'});
		}, 2000)
	}

	render(){
		const newComment = {rating: 3, author: "jay", comment: "hi how r u", dishId: 7 };
		const size = this.props.comments.length;
		const array = this.props.comments
		return (
			<View style = {styles.container}>
			<View style = {{margin:50}}></View>
				<Button
					title = {this.state.title}
					color = {this.state.color}
					onPress = {()=>{this.props.postComment(newComment); this.toggle();} }
					/>
				<Text style = {{marginVertical: 20, color: 'black', fontWeight: 'bold'}}> New added Comment </Text>
				<Text style = {{marginVertical: 30}}> {(size==0)? "jay": array[size-1].comment} </Text>
					
			</View>
		);
	}
}export default connect(mapStateToProps, mapDispatchToProps)(C);


const styles = StyleSheet.create({

	container : {flex:1, margin:10, backgroundColor:'pink', alignItems: 'center'},

	a : { width: 150, height:100, backgroundColor: 'pink', color:'black', fontSize:20 },
	b : {fontSize: 15, textAlign: 'center'}
});

//<Custom/>
 