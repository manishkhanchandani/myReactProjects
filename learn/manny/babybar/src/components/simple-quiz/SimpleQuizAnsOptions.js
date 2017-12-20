import React, {Component} from 'react';

class SimpleQuizAnsOptions extends Component {
	handleChooseOption(e) {
		if (!this.props.handleChooseOption) {
			return false;
		}
		
		this.props.handleChooseOption(e);
	}

	render() {
		const opts = this.props.opts;
		const optionChoosen = this.props.optionChoosen;
		const viewOnly = this.props.viewOnly;
		const id = this.props.id;
		let name = 'ansOptions_' + id;
		return (
			<div className="ansOptions">
			{
				opts.map((value, key) => {
					let optId = 'id_' + id +'_'  +key;
					if (viewOnly) {
						let myClass = this.props.correct === key ? 'active ansOption' : 'ansOption';
						return 	<div key={key} className={myClass}><input type="radio" name={name} id={optId} value={key} defaultChecked={optionChoosen === key} />  {value}  
							{
								this.props.correct === key && 
									<i className="fa fa-check" aria-hidden="true"></i>
							}
						</div>	
					}
					
					return 	<div key={key}><input type="radio" className="ansOption" name={name} id={optId} value={key} onClick={(e) => {this.handleChooseOption(e)}}  checked={optionChoosen === key} /> {value}</div>										   
				})	
			}
			</div>
		);
	}
}

export default SimpleQuizAnsOptions;