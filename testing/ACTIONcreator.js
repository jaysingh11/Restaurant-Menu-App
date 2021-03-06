import * as ActionTypes from '../redux/ActionTypes';
import { baseUrl } from '../shared/baseUrl';


export const fetchDishes = () => (dispatch) => {
	dispatch(dishesLoading());

	return fetch(baseUrl+'dishes')
		 .then(response=>{
		 	 if(response.ok){return response;}
			 else{
			 	 var error = new Error('Error' + response.status + ': ' + response.statusText);
				 error.response = response;
				 throw error;
			 }
		 }, 
		 error => {
			 var errMess = new Error(error.message)
		 	 throw errMess;
		 })
		 .then(response => response.json())
		 .then(dishes=> dispatch(addDishes(dishes)))
		 .catch(error => dispatch(dishesFailed(error.message)))
}

export const dishesLoading = () => ({
	type: ActionTypes.DISHES_LOADING

});

export const dishesFailed = (errmess) => ({
	type: ActionTypes.DISHES_FAILED,
	payload: errmess
});

export const addDishes = (dishes) => ({
	type: ActionTypes.ADD_DISHES,
	payload: dishes
});
