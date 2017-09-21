import MyConstant from '../constants/MyConstant.js';

export const sample = () => {
	return {
		type: MyConstant.SAMPLE,
		payload: 10
	};
};


export const sample2 = (name) => {
	
	const url = '';

	return {
		type: MyConstant.SAMPLE,
		payload: new Promise((resolve, reject) => {
			fetch(url, {
				method: 'GET'	  
			}).then((response) => {
				return response.json();
			}).then((j) => {
				console.log('j is ', j.get.from.dob);
				resolve(j.get.from.dob);
			}).catch((err) => {
				console.log('err is ', err);
				reject(err);
			})		  
		})
	}
	
};