import React, {Component} from 'react';
import OwlCarousel from 'react-owl-carousel';
import './Test1.css';

class Test1 extends Component {
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
			},
			items: [
				<div className="item row__inner" key={1}><div className="tile"><div className="tile__media"><img className="tile__img" src="https://img.youtube.com/vi/L9FVsO3mAFs/hqdefault.jpg" alt="" /></div><div className="tile__details"><div className="tile__title">Seventh</div></div></div></div>,
				<div className="row__inner" key={2}><div className="tile"><div className="tile__media"><img className="tile__img" src="https://img.youtube.com/vi/6qv53FVGt3s/hqdefault.jpg" alt="" /></div><div className="tile__details"><div className="tile__title">Sixth</div></div></div></div>,
				<div className="row__inner" key={3}><div className="tile"><div className="tile__media"><img className="tile__img" src="https://img.youtube.com/vi/AbPhiURfZ-I/hqdefault.jpg" alt="" /></div><div className="tile__details"><div className="tile__title">Sixth</div></div></div></div>,
				<div className="row__inner" key={4}><div className="tile"><div className="tile__media"><img className="tile__img" src="https://img.youtube.com/vi/WftbvmBsyb4/hqdefault.jpg" alt="" /></div><div className="tile__details"><div className="tile__title">Sixth</div></div></div></div>,
				<div className="item row__inner" key={11}><div className="tile"><div className="tile__media"><img className="tile__img" src="https://img.youtube.com/vi/L9FVsO3mAFs/hqdefault.jpg" alt="" /></div><div className="tile__details"><div className="tile__title">Seventh</div></div></div></div>,
				<div className="row__inner" key={21}><div className="tile"><div className="tile__media"><img className="tile__img" src="https://img.youtube.com/vi/6qv53FVGt3s/hqdefault.jpg" alt="" /></div><div className="tile__details"><div className="tile__title" id="song_title7">Sixth</div></div></div></div>,
				<div className="row__inner" key={31}><div className="tile"><div className="tile__media"><img className="tile__img" src="https://img.youtube.com/vi/AbPhiURfZ-I/hqdefault.jpg" alt="" /></div><div className="tile__details"><div className="tile__title">Sixth</div></div></div></div>,
				<div className="row__inner" key={41}><div className="tile"><div className="tile__media"><img className="tile__img" src="https://img.youtube.com/vi/WftbvmBsyb4/hqdefault.jpg" alt="" /></div><div className="tile__details"><div className="tile__title">Sixth</div></div></div></div>
      
			]
		};
	}
	render() {
		return (
			<div>
				<div className="mycontainer">
					<div className="left-element"><a className="prev" onClick={(e) => {e.preventDefault(); this.refs.list1.prev(); }}>&#10094;</a></div>
					<div className="center-element">
						<OwlCarousel
							ref="list1"
							className="owl-theme"
							{...this.state.options}
						>
							{this.state.items}
						</OwlCarousel>
					</div>
					<div className="right-element"><a className="next" onClick={(e) => {e.preventDefault(); this.refs.list1.next(); }}>&#10095;</a></div>
				</div>
			</div>
		);
	}
}

export default Test1;