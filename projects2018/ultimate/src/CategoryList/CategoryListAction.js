import CategoryListConstant from './CategoryListConstant.js';
export const ipDetails = () => {
  const url = 'http://api.mkgalaxy.com/ip.php';
  return {
    type: 'SET_IP_DETAILS',
    payload: new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((j) => {
        CategoryListConstant.saveData(CategoryListConstant.IPDETAILS, j.data.result);
        resolve(j.data.result);
      }).catch((err) => {
        reject(err);
      })
    })
  }
  
};