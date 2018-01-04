// JavaScript Document

export const updateDate = (newDate) => {
	return {
		type: 'CHANGE_DATE',
		payload: newDate
	}
};

export const changeError = (msg) => {
	return {
		type: 'CHANGE_ERROR',
		payload: msg
	}
};
export const changeData = (key, data) => {
	return {
		type: 'CHANGE_DATA',
		payload: data,
		key: key
	}
};


export const setEditFlag = (key) => {
	return {
		type: 'SET_EDIT_FLAG',
		payload: key
	}
};
export const deleteRec = (key) => {
	return {
		type: 'DELETE_RECORD',
		payload: key
	}
};
export const editRec = (oldKey, key, data) => {
	return {
		type: 'EDIT_RECORD',
		payload: data,
		key: key,
		oldKey: oldKey
	}
};