import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Button, Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

const address_info = [
			'121, Clear Water Bay Road',
			'Clear Water Bay, Kowloon',
			'HONG KONG',
			'Tel: +852 1234 5678',
			'Fax: +852 8765 4321',
			'Email:confusion@food.net'
		]


class Contact extends Component{

	  constructor(props){
	  	  super(props);
	  }

	  static navigationOptions = { title: 'Contact Us'};

	  sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        });
      }
    

	  render(){
		  const { navigate } = this.props.navigation;

	  	  return(
		     <Animatable.View animation="fadeInDown" duration={2000} delay={100}> 
				<Card title = "Contact Information" >

					<Text style = {styles.txt}> {address_info[0]}</Text>
					<Text style = {styles.txt}> {address_info[1]}</Text>
					<Text style = {styles.txt}> {address_info[2]}</Text>
					<Text style = {styles.txt}> {address_info[3]}</Text>
					<Text style = {styles.txt}> {address_info[4]}</Text>
					<Text style = {styles.txt}> {address_info[5]}</Text>
				</Card>
				<Button
                    title="Send Email"
                    buttonStyle={{backgroundColor: "#512DA8"}}
                    icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                    onPress={this.sendMail}
                    />
		      </Animatable.View>
		  );
	  }
}
export default Contact;

const styles = StyleSheet.create({
	txt: {fontSize:15}
});