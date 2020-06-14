import React,{Component} from 'react'; 
import {connect} from 'react-redux';
import {fetchDishes} from './testing/ACTIONcreator';
import {View,Text, Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
 
const mapStateToProps = state => {
	return {dishes: state.dishes};
}

const mapDispatchToProps = dispatch =>( {
	fetch_dishes: () => dispatch(fetchDishes())               ///jdkffghsdhksdafhefjkhsdjkfledfkwehflehksd
})

class C extends Component{
	
	 componentDidMount() {
		this.props.fetch_dishes()
	 }
	 
	 render(){

	 	 return(
		 	 <View style = {{margin:50}}> 
				<Text style= {styles.a}>  {this.props.dishes[0].name} </Text> 
			 </View>
		 );
	 }
}export default connect(mapStateToProps, mapDispatchToProps)(C);


/*

{this.props.dishes[0].name}
export default class C extends Component{
	state:{
		password:string,
		isPasswordVisible:boolean,
		toggleText:string
	}
	
	constructor(Props){
		super(Props);
		this.state={
			password:"",
			isPasswordVisible:true,
			toggleText:'Show'
		};
	}

	handleToggle=()=>{
		
		const{isPasswordVisible} = this.state;
		if(isPasswordVisible){this.setState({isPasswordVisible:false,toggleText:'Hide'});}
		else {this.setState({isPasswordVisible:true,toggleText:'Show'});}
	};


	render(){
		return (
			<View style = {styles.container}>
				<TextInput secureTextEntry={this.state.isPasswordVisible} placeholder='Password' style = {styles.a}/>
				<TouchableOpacity onPress={this.handleToggle}>
					<Text style={styles.b}> {this.state.toggleText} </Text>
				</TouchableOpacity>
			</View>
		);
	}
}

*/
const styles = StyleSheet.create({

	container : {width:160, height: 60, margin:0, backgroundColor:'green', justifyContent:'center', alignItems: 'center'},

	a : { width: 150, height:100, backgroundColor: 'pink', color:'black', fontSize:20 },
	b : {fontSize: 15, textAlign: 'center'}
});

//<Custom/>
 