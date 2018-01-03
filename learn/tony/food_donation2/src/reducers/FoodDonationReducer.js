const FoodDonationReducer = (state = {
	data: null,
	keyword: '',
	location: {
                formatted_address: "",
                administrative_area_level_1: "",
                administrative_area_level_2: "",
                country: "",
                lat: null,
                lng: null,
                locality: ""
                    
            },
	boundary: 'county'
}, action) => {
	switch (action.type) {
		case 'BROWSE':
			state = {
				...state,
				data: action.payload
			};
			break;
		case 'UPDATE_KEYWORD':
			state = {
				...state,
				keyword: action.payload
			}
			break;
		case 'UPDATE_LOCATION':
			state = {
				...state,
				location: action.payload
			}
			break;
		case 'UPDATE_BOUNDARY':
			state = {
				...state,
				boundary: action.payload
			}
			break;
		default:
			break;
	}
	
	return state;
};

export default FoodDonationReducer;