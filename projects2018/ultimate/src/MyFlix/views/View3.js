import React, {Component} from 'react';
import OwlCarousel from 'react-owl-carousel';
import './View3.css';
import {defaultList} from '../MyFlixAction.js';
import {Link} from 'react-router-dom'; 

class Items extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			options: {
				dots: false,
				nav: false,
				loop: true,
				margin: 10,
				autoWidth: true,
				responsive: {
                  0: {
                    items: 1
                  },
                  600: {
                    items: 3
                  },
                  960: {
                    items: 4
                  },
                  1200: {
                    items: 6
                  }
                }
			}
		}
	}
			
	render() {
		if (!this.props.items) {
			return null;	
		}
		
		let items = [];
		for (let i in this.props.items) {
			let val = this.props.items[i];
			let url = '/' + this.props.list_id + '/detail/' + val._id;
			if (defaultList === this.props.list_id) {
				url = '/detail/' + val._id;
			}
			items.push(<div className="item row__inner" key={i}><Link className="tile" to={url}><div className="tile__media"><img className="tile__img" src={val.videoThumbnail} alt={val.videoTitle} /></div><div className="tile__details"><div className="tile__title">{val.videoTitle}</div></div></Link></div>);
		}
		
		return (
			<div className="mycontainer">
				<div className="left-element"><a className="prev" onClick={(e) => {e.preventDefault(); this.refs[this.props.name].prev(); }}>&#10094;</a></div>
				<div className="center-element">
					<OwlCarousel
						ref={this.props.name}
						className="owl-theme"
						{...this.state.options}
					>
						{items}
					</OwlCarousel>
				</div>
				<div className="right-element"><a className="next" onClick={(e) => {e.preventDefault(); this.refs[this.props.name].next(); }}>&#10095;</a></div>
			</div>
		);
	}
}

class View3 extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			filterTerm: ''
		}
	}

	render() {
		if (!this.props.data) {
			return null;	
		}
		
		let catVideos = null;
		if (this.props.data.categories) {
			catVideos = {};
			for (let x in this.props.data.categories) {
				let cat = this.props.data.categories[x];
				cat._id = x;
				
				catVideos[x] = [];
				
				if (cat.videos) {
					for (let y in cat.videos) {
						let a1 = this.props.data.videos[y];
						a1._id = y;
						catVideos[x].push(a1);
					}
				}
				
				if (cat.subcategories) {
					for (let z in cat.subcategories) {
						if (cat.subcategories[z].videos) {
							for (let a in cat.subcategories[z].videos) {
								let a2 = this.props.data.videos[a];
								a2._id = a;
								catVideos[x].push(a2);
							}
						}
					}
				}
			}
		}
		
		if (this.state.filterTerm && catVideos) {
			catVideos = {
				...catVideos	
			};
			
			var filterFields = ['videoTitle', 'categories', 'videoDescription'];
			var filterText = this.state.filterTerm;
			for (var x in catVideos) {
				let arr = catVideos[x].filter((record) => {
					//let results = false;
					for (let i = 0; i < filterFields.length; i++) {
						let str = record[filterFields[i]];
						if (!str) {
							continue;	
						}
						let strResult = str.toLowerCase().indexOf(filterText.toLowerCase());
						if (strResult >= 0) {
							return true;	
						}
					}
					return false;								
				});
				catVideos[x] = arr;
			}
		}
		return (
			<div>
				<div className="filterContainer"><input type="text" placeholder="Filter" className="form-control filterItem" onChange={(e) => {this.setState({filterTerm: e.target.value});}} /></div>
				{
					this.props.data.categories && 
					<div>
						{
							Object.keys(this.props.data.categories).map((key) => {
								let value = this.props.data.categories[key];
								if (Object.keys(catVideos[key]).length === 0) {
									return null;	
								}
								return <div key={key}>
									<h3 className="categoryHeading">{value.category}</h3>
									<Items items={catVideos[key]} name={key} {...this.props} />
								</div>
							})
						}
					</div>
				}
			</div>
		);
	}
}

export default View3;