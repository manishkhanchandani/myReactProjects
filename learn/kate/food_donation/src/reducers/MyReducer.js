
const MyReducer = (state = {

user: null

}, action) => {  
	
	switch (action.type) {
	
			case 'LOGGEDIN':
			
			state = {
			
			...state,
			
			user: action.payload
			  
			}
			
			break;
			
			case 'LOGGEDOUT':
			
			state = {
			
			...state,
			
			user: null
			
			}
			
			break;
			
			default:
			
			break;
				
				}
				


};



export default MyReducer;