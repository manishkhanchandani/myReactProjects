import {MyConstants} from './MyConstants.js';
import { toast } from 'react-toastify';

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

export const notify = (msg, secs) => {
	toast(msg, {
		position: toast.POSITION.BOTTOM_RIGHT,
		className: 'dark-toast',
		progressClassName: 'transparent-progress',
		bodyClassName: 'dark-toast-body',
		autoClose: (secs * 1000)
	});
};

export const setImage = (status) => {
	return {
		type: 'SET_IMAGE',
		payload: status
	}
}


export const setBandwidth = (num) => {
	return {
		type: 'SET_BANDWIDTH',
		payload: num
	}
}


export const setCpu = (num) => {
	return {
		type: 'SET_CPU',
		payload: num
	}
}



export const setDisk = (num) => {
	return {
		type: 'SET_DISK',
		payload: num
	}
}


export const setMemory = (num) => {
	return {
		type: 'SET_MEMORY',
		payload: num
	}
}


export const setLogs = (status) => {
	return {
		type: 'SET_LOGS',
		payload: status
	}
}


