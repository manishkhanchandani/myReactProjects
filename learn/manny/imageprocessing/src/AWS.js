import AWS from 'aws-sdk';

AWS.config.update({
        accessKeyId : 'AKIAJHDTHNHJWE43OXWQ',
        secretAccessKey : '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'
    });
AWS.config.region = 'us-east-1';

const mimes = {
	jpeg: 'data:image/jpeg;base64,',
	png: 'data:image/png;base64,',
	gif: 'data:image/gif;base64,'
};

const bucket = new AWS.S3({params: {Bucket: 'aws-rek-images'}});


const encode = (data) => {
  let str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
  return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
};

const getUrlByFileName = (fileName, mimeType) => {
	return {
		type: 'GET_AWS_IMAGE',
		payload: new Promise((resolve, reject) => {
			bucket.getObject({Key: fileName}, function (err, file) {
			  let result =  mimeType + encode(file.Body);
			  let data = {
					name: fileName,
					data: result
				};
			  resolve(data);
		  });
		})
	};
};


export const getUrlByFileNameSelf = (fileName) => {
	let mimeType = '';
	let subs = fileName.substr(-3);
	let subs2 = fileName.substr(-4);
	if (subs === 'png') {
		mimeType = mimes.png;
	} else if (subs === 'gif') {
		mimeType = mimes.gif;
	} else if (subs === 'jpg' || subs2 === 'jpeg') {
		mimeType = mimes.jpeg;
	}
	return {
		type: 'GET_AWS_IMAGE',
		payload: new Promise((resolve, reject) => {
			bucket.getObject({Key: fileName}, function (err, file) {
			  let result =  mimeType + encode(file.Body);
			  let data = {
					name: fileName,
					data: result
				};
			  resolve(data);
		  });
		})
	};
};
/*
const openInNewTab = (url) => {
	let redirectWindow = window.open(url, '_blank');
    redirectWindow.location;
};*/

export const getList = (dispatch) => {
	return {
		type: 'GET_AWS_LIST',
		payload: new Promise((resolve, reject) => {
			
			bucket.listObjects(function (err, data) {
				let result = data.Contents;
				if (result.length > 0) {
					for (let i = 0; i < result.length; i++) {
						let subs = result[i].Key.substr(-3);
						let subs2 = result[i].Key.substr(-4);
						if (subs === 'png') {
							dispatch(getUrlByFileName(result[i].Key, mimes.png));
						} else if (subs === 'gif') {
							dispatch(getUrlByFileName(result[i].Key, mimes.gif));
						} else if (subs === 'jpg' || subs2 === 'jpeg') {
							dispatch(getUrlByFileName(result[i].Key, mimes.jpeg));
						}
					}
				}
				if (err) {
				  reject(err);
				} else {
				  resolve(data.Contents);
				}
			});
		})
	};
};


export const getOnlyList = (dispatch) => {
	return {
		type: 'GET_AWS_LIST',
		payload: new Promise((resolve, reject) => {
			
			bucket.listObjects(function (err, data) {
				if (err) {
				  reject(err);
				} else {
				  resolve(data.Contents);
				}
			});
		})
	};
};
//https://github.com/react-component/progress
export const progressBar = (perc, key) => {
	return {
		type: 'GET_AWS_PROGRESS_BAR',
		payload: {perc: perc, key: key}
	};
};

export const uploadFile = (dispatch, file, key) => {
	return {
		type: 'GET_AWS_UPLOAD_FILE',
		payload: new Promise((resolve, reject) => {
			let params = {Key: file.name, ContentType: file.type, Body: file};
			/*bucket.upload(params, (err, data) => {
				if (err) reject(err);
				else resolve(data);
			});*/
			
			bucket.upload(params).on('httpUploadProgress', (evt) => {
				console.log("Uploaded :: " + file.name + " / " + parseInt((evt.loaded * 100) / evt.total, 10)+'%');
				dispatch(progressBar(parseInt((evt.loaded * 100) / evt.total, 10), key));
			}).send((err, data) => {
				if (err) reject(err);
				else resolve(data);
			});
		})
	};
}

export const uploadFiles = (dispatch, files) => {
	return {
		type: 'GET_AWS_UPLOAD',
		payload: new Promise((resolve, reject) => {
			if (!files.length) {
				return;
			}
			
			for (let i = 0; i < files.length; i++) {
				var file = files[i];
				uploadFile(dispatch, file, i);
			}
		})
	};
};