import React,{Component} from 'react';
import {YellowBox} from 'react-native';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent';
//import { ConfigureStore } from './testing/ConfigStore';
//import C from './file';
//YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
//consol.ignoreWarnings = ['Warning: ReactNative.createElement'];

const { persistor, store } = ConfigureStore();

export default class App extends Component{
	 
	render(){
		return (
			<Provider store = {store}>
				<PersistGate 
					loading={<Loading />}
					persistor={persistor}>
					<Main />
				</PersistGate>
			 </Provider>
		);
	}
}
/**/