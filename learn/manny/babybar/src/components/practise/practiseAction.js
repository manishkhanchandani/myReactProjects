export const setPractiseQuestionResult = (result) => {
	return {
		type: 'PRACTISE_QUESTION_RESULT',
		payload: result
	};
};

export const clearP = (value) => {
	return value.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "");	
}