//import CategoryListConstant from './CategoryListConstant.js';
const CategoryListConstant = {
  IPDETAILS: 'IPDETAILS',
  saveData: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  },
  getData: (key) => {
    let obj = localStorage.getItem(key);
    if (obj) {
      obj = JSON.parse(obj);
    }

    return obj;
  }
}

export default CategoryListConstant;
