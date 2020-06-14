import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {dishes} from './reducer';
//import {comments} from './comments';
//import {promotions} from './promotions';
//import {leaders} from './leaders';

export const ConfigureStore = () => {
	const store = createStore(dishes,applyMiddleware(thunk,logger));
	setTimeout(()=>{},5000);
	return store;
}