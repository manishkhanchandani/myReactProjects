export const query1 = () => {
    return {
		type: 'QUERY1',
        payload: new Promise((resolve, reject) => {
            var url = 'https://jsonplaceholder.typicode.com/posts';
			fetch(url, {
			method: 'GET'	  
			}).then((response) => {
				return response.json();
			}).then((j) => {
				console.log('j1 is ', j);//very important
				resolve(j);
			}).catch((err) => {
				console.log('error is ', err);	
				reject(err);
			});
        })
	};
};
export const query2 = () => {
    return {
		type: 'QUERY2',
        payload: new Promise((resolve, reject) => {
            var url = 'https://jsonplaceholder.typicode.com/posts/1';
			fetch(url, {
			method: 'GET'	  
			}).then((response) => {
				return response.json();
			}).then((j) => {
				console.log('j2 is ', j);//very important
				resolve(j);
			}).catch((err) => {
				console.log('error is ', err);	
				reject(err);
			});
        })
	};
};