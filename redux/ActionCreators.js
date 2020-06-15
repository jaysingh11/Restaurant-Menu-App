import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


//add new comment
export const postComment = (Id, dishId, rating, author, comment)=>(dispatch) => {
	const d = new Date();
    const date = d.toISOString();

	const newComment = {
				"id": Id,
				"dishId": dishId,
				"rating": rating,
				"comment": comment,
				"author": author,
				"date": date
			};

	fetch(baseUrl+'comments', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newComment)
	 });

	setTimeout(()=>dispatch(addComment(newComment)),2000);
}
// for comments
export const fetchComments = () => (dispatch) => {
	return fetch(baseUrl+'comments')
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
		 .then(comments => dispatch(addComments(comments)))
		 .catch(error => dispatch(commentsFailed(error.message)))
};

export const commentsFailed = (errmess) => ({
	type: ActionTypes.COMMENTS_FAILED,
	payload: errmess
});

export const addComments = (comments) =>({
	type: ActionTypes.ADD_COMMENTS,
	payload: comments
});

export const addComment = (newComment)=>({
	type: ActionTypes.ADD_COMMENT,
	payload: newComment
});

// for dishes
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

export const addDishes = (dishes) =>({
	type: ActionTypes.ADD_DISHES,
	payload: dishes
});



// for promotions
export const fetchPromos = () => (dispatch) => {
	dispatch(promosLoading());

	return fetch(baseUrl+'promotions')
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
		 .then(promos=> dispatch(addPromos(promos)))
		 .catch(error => dispatch(promosFailed(error.message)))
}

export const promosLoading = () => ({
	type: ActionTypes.PROMOS_LOADING

});

export const promosFailed = (errmess) => ({
	type: ActionTypes.PROMOS_FAILED,
	payload: errmess
});

export const addPromos = (promos) =>({
	type: ActionTypes.ADD_PROMOS,
	payload: promos
});




// for leaders
export const fetchLeaders = () => (dispatch) => {
	dispatch(leadersLoading());

	return fetch(baseUrl+'leaders')
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
		 .then(leaders=> dispatch(addLeaders(leaders)))
		 .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => ({
	type: ActionTypes.LEADERS_LOADING

});

export const leadersFailed = (errmess) => ({
	type: ActionTypes.LEADERS_FAILED,
	payload: errmess
});

export const addLeaders = (leaders) =>({
	type: ActionTypes.ADD_LEADERS,
	payload: leaders
});

