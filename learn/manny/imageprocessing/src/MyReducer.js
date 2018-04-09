import {MyConstants} from './MyConstants.js';
const MyReducer = (state = {
  example: null,
  tab: 'upload', //upload, request(s), monitor
}, action) => {

  switch(action.type) {
    case MyConstants.TEST:
      state = {
        ...state,
        example: action.payload
      };
      break;
    case MyConstants.TAB:
      state = {
        ...state,
        tab: action.payload
      };
      break;
    default:
      break;
  }

  return state;
};

export default MyReducer;