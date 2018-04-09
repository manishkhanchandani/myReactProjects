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