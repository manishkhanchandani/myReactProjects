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


export const dynamicSort = (property) => {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return (a,b) => {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
/*
example
var People = [
    {Name: "Name", Surname: "Surname"},
    {Name:"AAA", Surname:"ZZZ"},
    {Name: "Name", Surname: "AAA"}
];

People.sort(dynamicSort("Name"));
People.sort(dynamicSort("Surname"));
People.sort(dynamicSort("-Surname"));

*/

export const dynamicSortMultiple = () => {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    var props = arguments;
    return (obj1, obj2) => {
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

/*

example

People.sort(dynamicSortMultiple("Name", "-Surname"));

*/