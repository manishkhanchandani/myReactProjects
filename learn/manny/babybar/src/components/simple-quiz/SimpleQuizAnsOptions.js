import React, {Component} from 'react';

class SimpleQuizAnsOptions extends Component {
	render() {
		const opts = this.props.opts;
		const optionChoosen = this.props.optionChoosen;
		const handleChooseOption = this.props.handleChooseOption;
		return (
			<div className="ansOptions">
			{
				opts.map((value, key) => {
					return 	<div key={key}><input type="radio" className="ansOption" name="ansOptions" value={key} onClick={(e) => {handleChooseOption(e)}}  checked={optionChoosen === key} /> {value}</div>										   
				})	
			}
			</div>
		);
	}
}

export default SimpleQuizAnsOptions;