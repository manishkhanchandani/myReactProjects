
export const browseFoodDonation = (params) => {
	return {
		type: 'BROWSE',
		payload: params
	};
};

export const updateKeyword = (keyword) => {
	return {
		type: 'UPDATE_KEYWORD',
		payload: keyword
	}
};


export const updateLocation = (location) => {
	return {
		type: 'UPDATE_LOCATION',
		payload: location
	}
};


export const updateBoundary = (boundary) => {
	return {
		type: 'UPDATE_BOUNDARY',
		payload: boundary
	}
};


