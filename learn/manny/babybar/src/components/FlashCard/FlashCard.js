import React, {Component} from 'react';

import './FlashCard.css';

class FlashCard extends Component {
	constructor() {
		super();
		this.state = {
		  showAnswer: false
		}
	}

	hideError() {
		this.setState({showError: !this.state.showError});
	}

	render() {
		const content = this.state.showAnswer ? this.props.backContent : this.props.frontContent;
		const iconClass = this.state.showAnswer ? 'reply' : 'share';
		const cardClass = this.state.showAnswer ? 'back' : '';
		const contentClass = this.state.showAnswer ? 'back' : 'front';
		const actionClass = this.state.showAnswer ? 'active' : '';
		return (
			<div 
				className={`card ${cardClass}`}
				onClick={() => this.setState({showAnswer: !this.state.showAnswer})}
			  >
				<div 
				  className='card__flip-card'
				  onClick={ () => {
					this.setState({showAnswer: !this.state.showAnswer});
				  }}
				>
		
				  <span className={`fa fa-${iconClass}`}/>
				</div>
				<div className={`card__content--${contentClass}`}>
				  {content}
				</div>
			  </div>
		);
	}
}

export default FlashCard;