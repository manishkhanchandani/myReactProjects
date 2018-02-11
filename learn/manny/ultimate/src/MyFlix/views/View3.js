import React, {Component} from 'react';
import YouTube from 'react-youtube';

import './View3.css';
import {processRecords} from '../../utilities/functions.js';
import Paginator from '../../utilities/Paginator.js';
import OwlCarousel from 'react-owl-carousel';
import {defaultList} from '../MyFlixAction.js';

class Items extends Component {
	constructor(props) {
        super(props);

        this.state = {
            options: {
				dots: false,
                loop: true,
                nav: false,
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
        };
    }
	
	render() {
		if (!this.props.items) {
			return null;
		}
		let items = [];
		for ( let i in this.props.items) {
			let val = this.props.items[i];
			let url = '/'+this.props.list_id+'/detail/' + val._id;
			if (defaultList === this.props.list_id) {
				url = '/detail/' + val._id;
			}
			items.push(<div className="item row__inner" key={i}><a className="tile" href={url} target="_blank"><div className="tile__media"><img className="tile__img" src={val.videoThumbnail} alt="" /></div><div className="tile__details"><div className="tile__title">{val.videoTitle}</div></div></a></div>);
		}
		
		return (
			<div className="mycontainer ">
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

	render() {
		if (!this.props.data) {
			return null;	
		}
		let catVideos = null;
		if (this.props.data.categories) {
			catVideos = {};
			for (let x in this.props.data.categories) {
				catVideos[x] = {};
				
				let cat = this.props.data.categories[x];
				
				if (cat.videos) {
					for (let y in cat.videos) {
						this.props.data.videos[y]._id = y;
						catVideos[x][y] = this.props.data.videos[y];
					}
				}
				
				if (cat.subcategories) {
					for (let z in cat.subcategories) {
						if (cat.subcategories[z].videos) {
							for (let a in cat.subcategories[z].videos) {
								this.props.data.videos[a]._id = a;
								catVideos[x][a] = this.props.data.videos[a];
							}
						}
					}
				}
			}
		}
		
		
		return (
			<div>
				{
					this.props.data.categories && 
						<div>
							{
								Object.keys(this.props.data.categories).map((key) => {
									let value = this.props.data.categories[key];
									return <div key={key}>
										<h3 className="categoryHeading">{value.category}</h3>
										<Items items={catVideos[key]} name={key} {...this.props}/>
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