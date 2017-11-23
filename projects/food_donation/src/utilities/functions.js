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
