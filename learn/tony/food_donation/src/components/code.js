manish K@All: saveLocalStorage() {
    //save the information in the localStorage	
    var obj = {};
    obj.boundary = this.props.foodReducer.boundary;
    obj.keyword = this.props.foodReducer.keyword;
    obj.location = this.props.foodReducer.location;
    localStorage.setItem('formSearchData', JSON.stringify(obj));
    
}
manish K@All: this.saveLocalStorage();

manish K@All: //grab the information from local storage
    //and pass to func3, 4 and 5 for keyword, location and boundary respectively
    var str = localStorage.getItem('formSearchData');
    var obj = JSON.parse(str);
    console.log('object is ', obj);
    if (obj) {
        console.log('localstorage in action');
        if (obj.keyword) {
            this.props.func3(obj.keyword);
        }
        
        if (obj.location) {
            this.props.func4(obj.location);
        }
        
        if (obj.boundary) {
            this.props.func5(obj.boundary);
        }
    } else {
        console.log('reducer in action');
        obj = this.props.foodReducer;
    }

manish K@All: getRecordsFromFB()
{
    this.setState({subObjects: {}});
    
    //grab the information from local storage
    //and pass to func3, 4 and 5 for keyword, location and boundary respectively
    var str = localStorage.getItem('formSearchData');
    var obj = JSON.parse(str);
    console.log('object is ', obj);
    if (obj) {
        console.log('localstorage in action');
        if (obj.keyword) {
            this.props.func3(obj.keyword);
        }
        
        if (obj.location) {
            this.props.func4(obj.location);
        }
        
        if (obj.boundary) {
            this.props.func5(obj.boundary);
        }
    } else {
        console.log('reducer in action');
        obj = this.props.foodReducer;
    }
    
    
    
    
    var url = FirebaseConstant.basePath + '/data';
    if (obj.keyword && obj.location.lat && obj.location.lng) {
        //do something
        if (obj.boundary === 'county') {
            url = url + '/tags/' + obj.keyword + '/' + obj.boundary + '/' + obj.location.country + '/' + obj.location.administrative_area_level_1 + '/' + obj.location.administrative_area_level_2;
        } else if (obj.boundary === 'city') {
            url = url + '/tags/' + obj.keyword + '/' + obj.boundary + '/' + obj.location.country + '/' + obj.location.administrative_area_level_1 + '/' + obj.location.administrative_area_level_2 + '/' + obj.location.locality;
        } else if (obj.boundary === 'state') {
            url = url + '/tags/' + obj.keyword + '/' + obj.boundary + '/' + obj.location.country + '/' + obj.location.administrative_area_level_1;
        } else if (obj.boundary === 'country') {
            url = url + '/tags/' + obj.keyword + '/' + obj.boundary + '/' + obj.location.country;
        }
        
    } else if (obj.location.lat && obj.location.lng) {
        //do something
        if (obj.boundary === 'county') {
            url = url + '/' + obj.boundary + '/' + obj.location.country + '/' + obj.location.administrative_area_level_1 + '/' + obj.location.administrative_area_level_2;
        } else if (obj.boundary === 'city') {
            url = url + '/' + obj.boundary + '/' + obj.location.country + '/' + obj.location.administrative_area_level_1 + '/' + obj.location.administrative_area_level_2 + '/' + obj.location.locality;
        } else if (obj.boundary === 'state') {
            url = url + '/' + obj.boundary + '/' + obj.location.country + '/' + obj.location.administrative_area_level_1;
        } else if (obj.boundary === 'country') {
            url = url + '/' + obj.boundary + '/' + obj.location.country;
        }
    } else if (obj.keyword) {
        //do something
        url = url + '/tags/' + obj.keyword + '/all_tag_posts';
    } else {
        //home page will go here
        this.props.func1();
        return;
    }
    
    console.log('url is ', url);
    var ref = firebaseDatabase.ref(url);
    ref.on('value', (snapshot) => {
        var records = snapshot.val();
        if (!records) {
            this.props.func2(this.state.subObjects);
            return null;
        }
        
        for (var key in records) {
            this.processLoop(key);
        }
    });
}
