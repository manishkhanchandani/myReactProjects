import React, {Component} from 'react';
import './Caro2.css';
import OwlCarousel from 'react-owl-carousel';
//https://github.com/seal789ie/react-owl-carousel/blob/master/example/style.css
//https://www.contempros.com/netflixdesign3_automatic.html
class LeftSide extends Component {
	render() {
		return (
			<div className="left-element">
				<a className="prev" >&#10094;</a>
			</div>
		);
	}
}


class RightSide extends Component {
	render() {
		return (
			<div className="right-element">
				<a className="next">&#10095;</a>
			</div>
		);
	}
}

class Caro2 extends Component {
	constructor(props) {
        super(props);

        this.state = {
            options: {
                loop: false,
                margin:10,
                nav:true,
				autoHeight: true,
				autoWidth: true,
                responsive:{
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
		const myArray = [
			{
				imgUrl: 'https://img.youtube.com/vi/yUz5uBgJQg0/hqdefault.jpg',
				text: 'first'
			},
			{
				imgUrl: 'https://img.youtube.com/vi/vwCP5W9BT4Y/hqdefault.jpg',
				text: 'second'
			},
			{
				imgUrl: 'https://img.youtube.com/vi/8KQ3HoZNRsg/hqdefault.jpg',
				text: 'third'
			}
		];
		
		return (
			<div className="container f-caro2">
				<LeftSide />
				<OwlCarousel
                    ref={inst => this.slider = inst}
                    className="owl-carousel owl-theme "
                    {...this.state.options}
                >
                    {
							myArray && 
							myArray.map((value, key) => {
								let id = 'song__img' + (key + 1);
								let id2 = 'song_title' + (key + 1);
								return 	<div key={key} className="row__inner">
									<div className="tile">
										<div className="tile__media">
											<img id={id} className="tile__img" src={value.imgUrl} alt=""  />	
										</div>
										<div className="tile__details">
											<div class="tile__title" id={id2}>
												{value.text}
											</div>
										</div>
									</div>
								</div>		 
							})
					}
                </OwlCarousel>
				<div className="center-element">
					<div id="trending_refresh" className="owl-carousel owl-theme">
						{
							myArray && 
							myArray.map((value, key) => {
								let id = 'song__img' + (key + 1);
								return 	<div key={key} className="row__inner">
									<div className="tile">
										<div className="tile__media">
											<img id={id} className="tile__img" src={value.imgUrl} alt=""  />	
										</div>
										<div className="tile__details">
											{value.text}
										</div>
									</div>
								</div>		 
							})
							
						}
					</div>
				</div>
				<RightSide />
			</div>
		);
	}
}

export default Caro2;