import React, {Component} from 'react';
import OwlCarousel from 'react-owl-carousel';
import './Test1Style.css';

class Test1 extends Component {
	constructor(props) {
        super(props);

        this.state = {
            options: {
				dots: false,
                loop: true,
                nav: false,
                margin: 10,
				autoHeight: true,
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
			
			items2: [
                <div className="item2" key={1}><h4>1</h4></div>,
                <div className="item2" key={2}><h4>2</h4></div>,
                <div className="item2" key={3}><h4>3</h4></div>,
                <div className="item2" key={4}><h4>4</h4></div>,
                <div className="item2" key={5}><h4>5</h4></div>,
                <div className="item2" key={6}><h4>6</h4></div>,
                <div className="item2" key={7}><h4>7</h4></div>,
                <div className="item2" key={8}><h4>8</h4></div>,
                <div className="item2" key={9}><h4>9</h4></div>,
                <div className="item2" key={10}><h4>10</h4></div>,
                <div className="item2" key={11}><h4>11</h4></div>,
                <div className="item2" key={12}><h4>12</h4></div>,
            ],

            items: [
				<div className="item row__inner" key={1}><div className="tile"><div className="tile__media"><img id="song__img7" className="tile__img" src="https://img.youtube.com/vi/L9FVsO3mAFs/hqdefault.jpg" alt="" /></div><div className="tile__details"><div className="tile__title" id="song_title7">Seventh</div></div></div></div>,
				<div className="row__inner" key={2}><div className="tile"><div className="tile__media"><img id="song__img7" className="tile__img" src="https://img.youtube.com/vi/6qv53FVGt3s/hqdefault.jpg" alt="" /></div><div className="tile__details"><div className="tile__title" id="song_title7">Sixth</div></div></div></div>,
				<div className="row__inner" key={3}><div className="tile"><div className="tile__media"><img id="song__img7" className="tile__img" src="https://img.youtube.com/vi/AbPhiURfZ-I/hqdefault.jpg" alt="" /></div><div className="tile__details"><div className="tile__title" id="song_title7">Sixth</div></div></div></div>,
				<div className="row__inner" key={4}><div className="tile"><div className="tile__media"><img id="song__img7" className="tile__img" src="https://img.youtube.com/vi/WftbvmBsyb4/hqdefault.jpg" alt="" /></div><div className="tile__details"><div className="tile__title" id="song_title7">Sixth</div></div></div></div>,
				<div className="item row__inner" key={11}><div className="tile"><div className="tile__media"><img id="song__img7" className="tile__img" src="https://img.youtube.com/vi/L9FVsO3mAFs/hqdefault.jpg" alt="" /></div><div className="tile__details"><div className="tile__title" id="song_title7">Seventh</div></div></div></div>,
				<div className="row__inner" key={21}><div className="tile"><div className="tile__media"><img id="song__img7" className="tile__img" src="https://img.youtube.com/vi/6qv53FVGt3s/hqdefault.jpg" alt="" /></div><div className="tile__details"><div className="tile__title" id="song_title7">Sixth</div></div></div></div>,
				<div className="row__inner" key={31}><div className="tile"><div className="tile__media"><img id="song__img7" className="tile__img" src="https://img.youtube.com/vi/AbPhiURfZ-I/hqdefault.jpg" alt="" /></div><div className="tile__details"><div className="tile__title" id="song_title7">Sixth</div></div></div></div>,
				<div className="row__inner" key={41}><div className="tile"><div className="tile__media"><img id="song__img7" className="tile__img" src="https://img.youtube.com/vi/WftbvmBsyb4/hqdefault.jpg" alt="" /></div><div className="tile__details"><div className="tile__title" id="song_title7">Sixth</div></div></div></div>
            ],

        };
    }

	render() {
		return (
			<div>
				<div className="mycontainer ">
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
				<hr />
				
				<div className="mycontainer">
					<div className="left-element"><a className="prev" onClick={(e) => {e.preventDefault(); this.refs.list2.prev(); }}>&#10094;</a></div>
					<div className="center-element">
					<OwlCarousel
						ref="list2"
						className="owl-theme"
						{...this.state.options}
					>
						{this.state.items}
					</OwlCarousel>
					</div>
					<div className="right-element"><a className="next" onClick={(e) => {e.preventDefault(); this.refs.list2.next(); }}>&#10095;</a></div>
				</div>
				<hr />
				
				<div className="mycontainer">
					<div className="left-element"><a className="prev" onClick={(e) => {e.preventDefault(); this.refs.list3.prev(); }}>&#10094;</a></div>
					<div className="center-element">
					<OwlCarousel
						ref="list3"
						className="owl-theme"
						{...this.state.options}
					>
						{this.state.items}
					</OwlCarousel>
					</div>
					<div className="right-element"><a className="next" onClick={(e) => {e.preventDefault(); this.refs.list3.next(); }}>&#10095;</a></div>
				</div>
				
			</div>
		);
	}
}

export default Test1;