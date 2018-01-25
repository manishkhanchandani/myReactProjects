
export const defaultList = '-L2OQwPD_BFG4iayeVax';

export const changeList = (newList) => {
	return {
		type: 'CHANGE_LIST',
		payload: newList
	};
};