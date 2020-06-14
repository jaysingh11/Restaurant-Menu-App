import * as ActionTypes from '../redux/ActionTypes';

export const dishes = (state={
	isLoading: true,
	errMess: null,
	dishes: [{name: "jay"}]}, action) => {
		         
				 switch(action.type) {
					case ActionTypes.ADD_DISHES:
						return {...state, isLoading: false, errMess: null, dishes: action.payload};
					case ActionTypes.DISHES_LOADING:
						return {...state, isLoading: true, errMess: null, dishes: [{name: "Loading"}] };
					case ActionTypes.DISHES_FAILED:
						return {...state, isLoading: false, errMess: action.payload, dishes: [{name: "sunil"}]};
					default:
						return state;
				 }
	}