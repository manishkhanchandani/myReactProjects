import React, {Component} from 'react';

import './View3.css';

class View3 extends Component {

	render() {
		if (!this.props.data) {
			return null;	
		}
		
		console.log('data is ', this.props.data);
		
		let catVideos = null;
		if (this.props.data.categories) {
			catVideos = {};
			for (let x in this.props.data.categories) {
				let cat = this.props.data.categories[x];
				cat._id = x;
				
				catVideos[x] = {};
				
				if (cat.videos) {
					for (let y in cat.videos) {
						catVideos[x][y]	= this.props.data.videos[y];
						catVideos[x][y]._id = y;
					}
				}
				
				if (cat.subcategories) {
					for (let z in cat.subcategories) {
						if (cat.subcategories[z].videos) {
							for (let a in cat.subcategories[z].videos) {
								catVideos[x][a]	= this.props.data.videos[a];
								catVideos[x][a]._id = a;
							}
						}
					}
				}
			}
		}
		
		console.log('catVideos: ', catVideos);
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