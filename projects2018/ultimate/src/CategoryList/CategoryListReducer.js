const CategoryListReducer = (state = {
  ipDetails: null
}, action) => {

  switch(action.type) {
    case 'SET_IP_DETAILS':
    case 'SET_IP_DETAILS_FULFILLED':
      state = {
        ...state,
        ipDetails: action.payload
      };
      break;
    default:
      break;
  }

  return state;
};

export default CategoryListReducer;