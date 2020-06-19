import React,{ Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import * as Permissions  from 'expo-permissions';
import { Notifications } from 'expo';


class Reservation extends Component {
	constructor(props){
		super(props);
		this.state= {
			guests:1,
			smoking: false,
			date: '',
			showModal: false
		}
	}

	
	static navigationOptions = { title: 'Reserve Table'}

	async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

	toggleModal(){
		this.setState({showModal: !this.state.showModal})
	}

	handleReservation(){
		//consol.log(JSON.stringify(this.state));
		//this.toggleModal();
		Alert.alert(
                'Your Reservation OK?',
                'Number of guests: '+this.state.guests+'\n'+'Smoking ? '+ this.state.smoking+'\n'+'Date and Time: ' + this.state.date,
                [
                    { 
                        text: 'Cancel', 
                        onPress: () => this.resetForm(),
                        style: ' cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => {this.presentLocalNotification(this.state.date);this.resetForm();}
                    }
                ],
                { cancelable: false }
            );
	}

	resetForm(){
		this.setState({
			guests: 1,
			smoking: false,
			date: '',
			showModal:false
		});
	}

	render(){
		return(
			<ScrollView>
				<Animatable.View animation="zoomInUp" duration={2000}>
				
				<View style = {styles.formRow}>
					<Text style = {styles.formLabel}>Number of Guests</Text>
					<Picker 
						style = {styles.formItem}
						selectedValue = {this.state.guests}
						onValueChange = {(itemValue, itemIndex) => this.setState({guests: itemValue})}
						>
						<Picker.item label = '1' value = '1' />
						<Picker.item label = '2' value = '2' />
						<Picker.item label = '3' value = '3' />
						<Picker.item label = '4' value = '4' />
						<Picker.item label = '5' value = '5' />
						<Picker.item label = '6' value = '6' />
					</Picker>
				</View>

				<View style = {styles.formRow}>
					<Text style = {styles.formLabel}>Smoking/Non-Smoking?</Text>
					<Switch 
						style={styles.formItem}
						value = {this.state.smoking}
						ontrackColor='#512DA8'
						onValueChange = {(value) => this.setState({smoking:value})}
						>
					</Switch>
				</View>

				<View style={styles.formRow}>
					<Text style = {styles.formLabel}>Date and Time</Text>
					<DatePicker
						style = {{flex:2, marginRight: 20}}
						date={this.state.date}
						format=''
						mode='datetime'
						placeholder='select date and time'
						minDate='2017-01-01'
						confirmBtnText='Confirm'
						cancelBtnText='Cancel'
						customStyles = {{dateIcon:{position:'absolute', left:0,top:4,marginLeft:0},
							         dateInput: {marginLeft:36}
							}}
						onDateChange={(date)=> {this.setState({ date:date})}}
						/>
				</View>

				<View style={styles.formRow}>
					<Button
						title='Reserve'
						color='#512DA8'
						onPress = {()=>this.handleReservation()}
						accessibilityLabel='Learn more about this purple button'
						/>
				</View>

				<Modal
					animationType={'slide'}
					transparent={false}
					visible={this.state.showModal}
					onDismiss={()=> {this.toggleModal(); }}
					onRequestClose={ ()=> {this.toggleModal(); } }
					>
					<View style={styles.Modal}>
						<Text style={styles.modalTitle}>Your Reservation</Text>
						<Text style={styles.modalText}>Numbber of Guests: {this.state.guests}</Text>
						<Text style={styles.modalText}>Smoking: {this.state.smoking? "Yes":"No"}</Text>
						<Text style={styles.modalText}>Date and Time: {this.state.date}</Text>
						<Button
							onPress={()=>{this.toggleModal(); this.resetForm()}}
							color='#512DA8'
							title='Close'
							/>
					</View>
				</Modal>
			</Animatable.View>
			</ScrollView>
		);
	}
}
export default Reservation;


const styles = StyleSheet.create({
	formRow: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
		margin: 20
	},
	formLabel:{
		fontSize: 18,
		flex: 2
	},
	formItem:{
		flex: 1
	},
	modal:{
		justifyContent: 'center',
		margin: 20
	},
	modalTitle:{
		fontSize: 24,
		fontWeight:'bold',
		backgroundColor: '#512DA8',
		textAlign: 'center',
		color: 'white',
		marginBottom: 20
	},
	modalText:{
		fontSize: 18,
		margin: 10
	}
});
/*
*/