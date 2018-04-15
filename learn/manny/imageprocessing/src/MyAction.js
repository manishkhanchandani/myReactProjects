import {MyConstants} from './MyConstants.js';

export const example = (obj) => {
  return {
    type: MyConstants.TEST,
    payload: obj
  }
};


export const changeTab = (tab) => {
  return {
    type: MyConstants.TAB,
    payload: tab
  }
};

export const changeLearnStatus = (val) => {
	return {
		type: MyConstants.LEARN,
		payload: val
	};
};

export const changeSearchStatus = (val) => {
	return {
		type: MyConstants.SEARCH,
		payload: val
	};
};