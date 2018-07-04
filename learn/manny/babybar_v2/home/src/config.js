
let api_path = '';
if (process.env.NODE_ENV === 'development') {
	api_path = 'http://localhost/project2017/api';
} else {
	api_path = 'http://core.mkgalaxy.com/project2017/api';
}

export const config = {
	adminId: 'UbTkJF13oxbLZcwUbw4sbC7Hnfo1',
	api_path: api_path
};