import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

import {getUsersObj} from '../components/auth/AuthAction.js';

export const distance = (lat1, lon1, lat2, lon2, unit='') => {
      var radlat1 = Math.PI * lat1/180
      var radlat2 = Math.PI * lat2/180
      //var radlon1 = Math.PI * lon1/180
      //var radlon2 = Math.PI * lon2/180
      var theta = lon1-lon2
      var radtheta = Math.PI * theta/180
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist)
      dist = dist * 180/Math.PI
      dist = dist * 60 * 1.1515
      if (unit === "K") { dist = dist * 1.609344 }
      if (unit === "N") { dist = dist * 0.8684 }
      return dist;
};

export const timeAgo = (date) => {
	var seconds = Math.floor((new Date() - date) / 1000);
	
	if (seconds < 0) seconds = 0;
        
	var interval = Math.floor(seconds / 31536000);
	
	if (interval > 1) {
	  return interval + " years ago";
	}
	interval = Math.floor(seconds / 2592000);
	if (interval > 1) {
	  return interval + " months ago";
	}
	interval = Math.floor(seconds / 86400);
	if (interval > 1) {
	  return interval + " days ago";
	}
	interval = Math.floor(seconds / 3600);
	if (interval > 1) {
	  return interval + " hours ago";
	}
	interval = Math.floor(seconds / 60);
	if (interval > 1) {
	  return interval + " minutes ago";
	}
	return Math.floor(seconds) + " seconds ago";
};

export const dynamicSort = (property) => {
	var sortOrder = 1;
	if(property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a,b) {
		var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	}
};

export const processRecords = (recordArray, sortingOrder=null, filterText=null, filterFields=[], maxRows=20, pageNumber=1, onSelectFunc=null, maxButtons=3) => {
	var myArr = JSON.parse(JSON.stringify(recordArray));
	//filter Text
	if (filterText && filterFields.length > 0) {
		myArr = myArr.filter((record) => {
			for (let i = 0; i < filterFields.length; i++) {
				let str = record[filterFields[i]];
				let strResult = str.toLowerCase().indexOf(filterText.toLowerCase());
				if (strResult >= 0) {
					return true;	
				}
			}
			return false;
		});
	}
	
	//sorting
	if (sortingOrder) {
		myArr.sort(dynamicSort(sortingOrder));	
	}

	//pagination
	const pageNum = pageNumber - 1;
	const startRow = pageNum * maxRows;
	const totalRows = myArr.length;
	const totalPages = Math.ceil(totalRows/maxRows);
	const myArrayConverted = myArr.splice(startRow, maxRows);
	
	//pagination component
	const paginationProps = {
	  activePage: pageNumber,
	  items: totalPages,//number of pages
	  onSelect: onSelectFunc,
	  maxButtons: maxButtons, //numer of buttons to display
	  boundaryLinks: true,
	  first: true,
	  last: true,
	  next: true,
	  prev: true
	}
	
	return {myArrayConverted, paginationProps};
};

export const getRandomizer = (bottom, top) => {
    return function() {
        return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
    }
};


export const utubeIDGrabber = (url) => {
	var ID = '';
	url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
	console.log('url is ', url);
	if(url[2] !== undefined) {
		ID = url[2].split(/[^0-9a-z_\-]/i);
		ID = ID[0];
	} else if(url[0] !== undefined) {
		ID = url[0];
	} else {
		ID = url;
	}
	return ID;
};

/*
Converted multiple-choice score= (Total Raw Multiple-Choice Score x 3.5911) + 16.2327
Scaled written score= (Total Raw Written Score x 2.7235) – 446.2849
Your Scaled Score is the sum of the two products above.
*/
export const essayPoints = (score) => {
	return (score * 2.7235) - 446.2849;
}

export const mbePoints = (score) => {
	return (score * 3.5911) + 16.2327;
}

//tracking activity
//activityTracker('Browsing: ' + this.props.match.params.subject + ' / ' + this.props.match.params.issue, this.props.match.url);
export const activityTracker = (page, url) => {
	let usersObj = getUsersObj();
	let obj = {};
	obj.uid = usersObj.uid;
	obj.displayName = usersObj.displayName;
	obj.photoURL = usersObj.photoURL;
	obj.page = page;
	obj.url = url;
	obj.created_dt = firebase.database.ServerValue.TIMESTAMP;
	var url = FirebaseConstant.basePath + '/activities';
	firebaseDatabase.ref(url).push(obj);
}