import {MyConstants} from './MyConstants.js';
const MyReducer = (state = {
  example: null,
  tab: 'upload', //upload, request(s), monitor
  list: null,
  images: {},
  learn: 'pending',
  search: 'pending',
  progress_bar: {}
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
	case MyConstants.LEARN:
      state = {
        ...state,
        learn: action.payload
      };
      break;
	case MyConstants.SEARCH:
      state = {
        ...state,
        search: action.payload
      };
      break;
	case 'GET_AWS_LIST_FULFILLED':
		state = {
			...state,
			list: action.payload
		};
		break;
	case 'GET_AWS_IMAGE_FULFILLED':
		let images = state.images;
		images[action.payload.name] = action.payload.data;
		state = {
			...state,
			images: images
		};
		break;
	case 'GET_AWS_PROGRESS_BAR':
		let progress_bar = state.progress_bar;
		progress_bar[action.payload.key] = action.payload.perc;
		state = {
			...state,
			progress_bar: progress_bar
		};
		break;
    default:
      break;
  }

  return state;
};

export default MyReducer;