import React, {Component} from 'react';

class SimpleQuizAnsOptions extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			showResult: false,
			lastQuestionId: -1
		};
	}

	handleChooseOption(value, e) {
		if (!this.props.handleChooseOption) {
			return false;
		}
		
		const res = e.target.value;
		this.setState({showResult: true, lastQuestionId: value.id}, () => {
			this.props.handleChooseOption(res);														
		});
		
	}
	
	componentWillReceiveProps(nextProps) {
		if (this.state.lastQuestionId !== -1 && nextProps.id !== this.state.lastQuestionId) {
			this.setState({showResult: false});
		} else if (nextProps.id === this.state.lastQuestionId && this.state.showResult === false) {
			this.setState({showResult: true});
		}
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
					let myCurrentClass = '';
					let readOnlyVal = false;
					if (this.state.showResult) {
						if (this.props.details.correct === key) {
							myCurrentClass =  'active';
						}
						
						readOnlyVal = true;
					}
					if (viewOnly) {
						let myClass = this.props.correct === key ? 'active ansOption' : 'ansOption';
						return 	<div key={key} className={myClass}><input type="radio" name={name} id={optId} value={key} defaultChecked={optionChoosen === key} />  {value}  
							{
								this.props.correct === key && 
									<i className="fa fa-check" aria-hidden="true"></i>
							}
						</div>	
					}
					
					return 	<div key={key} className={myCurrentClass}><input type="radio" className="ansOption" name={name} id={optId} value={key} onClick={(e) => {this.handleChooseOption(this.props.details, e)}}  checked={optionChoosen === key} disabled={readOnlyVal} /> {value}
							{
								(this.state.showResult && this.props.details.correct === key) && 
									<i className="fa fa-check" aria-hidden="true"></i>
							}
					</div>										   
				})	
			}
			</div>
		);
	}
}

export default SimpleQuizAnsOptions;