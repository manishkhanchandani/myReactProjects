import CategoryListConstant from './CategoryListConstant.js';
export const ipDetails = () => {
  const url = 'http://api.mkgalaxy.com/ip.php';
  console.log('url is ', url);
  return {
    type: 'SET_IP_DETAILS',
    payload: new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((j) => {
		  console.log(j);
        CategoryListConstant.saveData(CategoryListConstant.IPDETAILS, j.data.result);
        resolve(j.data.result);
      }).catch((err) => {
        console.log('error is ', err);
        reject(err);
      })
    })
  }
  
};