import React, {Component} from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
//https://github.com/fritz-c/react-sortable-tree
//https://fritz-c.github.io/react-sortable-tree/storybook/index.html?selectedKind=Basics&selectedStory=Search&full=0&addons=0&stories=1&panelRight=0
//https://github.com/fritz-c/react-sortable-tree/tree/master/examples/storybooks

class CompleteProcess extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			subjects: {
				contracts: {
					name: 'Contracts',
					issues: [
					]
				},
				criminal: {
					name: 'Criminal',
					issues: [
					]
				},
				torts:  {
					name: 'Torts',
					issues: [
						{
							title: 'Intentional Torts',
							children: [
								{
									title: 'Assault'
								},
								{
									title: 'Battery'
								}
							]
						},
						{
							title: 'Negligence'
						},
						{
							title: 'Products Liability'
						},
						{
							title: 'Defamation',
							children: [
								{ title: 'Rule?'},
								{ title: 'False Statement?'}	,
								{ title: 'Statement About Plaintiff?'},
								{ title: 'Publish remarks?'},
								{ title: 'Damaging to Reputation?'},
								{ title: 'Slander or Libel?'},
								{ title: 'Did Plaintiff Suffer Damage (Explain Per Quod / Per Se?'},
								{ title: 'Is False Statement Previliged?'},
								{ title: 'Is Plaintiff a Public Figure?'},
								{ title: 'Can Plaintiff prove ACTUAL MALICE?'}
							]
						},
						{
							title: 'Invasion to Privacy'
						},
						{
							title: 'Nuisance'
						},
						{
							title: 'Miscellaneous'
						}
					],
					essays: [
						{
							title: "Sample Defamation Essay",
							details: "Barbara, the famous TV news lady, was assigned to do a story on former governor, Pat Wilson, to find out why Wilson had become almost a recluse in the years since he left office. Barbara interviewed Wilson at his home. Wilson's speech was slurred, his eyes were bloodshot and he was unsteady. Barbara asked him about his health, and he declined to comment. Barbara knew Wilson had once been an alcoholic, and she suspected he had begun drinking heavily again. But she did not ask him about this because she knew he would deny it. On TV Barbara accurately described Wilson's slurred speech, bloodshot eyes and unsteady gait. Then she stated, \"It appears that someone we once knew and respected has gone back to his old ways.\" She did not state who the \"someone\" was, and she did not explain what she meant by \"his old ways.\" Because of the news broadcast, rumors rapidly spread that Wilson had again developed a drinking habit. Wilson's approval in polls fell dramatically, and he was passed over for the post of State Republican Chair, but he had little chance of being selected for that post. Wilson demanded a retraction and apology, but Barbara refuses. Discuss potential action by Wilson."
						}
					]
				}
			},
			subject: '',
			essay : '',
		  treeData1: [],
		  treeData2: [],
		  shouldCopyOnOutsideDrop: true,
		};
	}
	render() {
		console.log('state is ', this.state);
		const externalNodeType = 'yourNodeType';
    	const { shouldCopyOnOutsideDrop } = this.state;
		return (
			<div>
				<h1>Essay, Issues, Fact Matching
				{
					this.state.subject && 
					<span>
						: {this.state.subjects[this.state.subject].name}
					</span>
				}
				</h1>
				<div className="form-group">
					<select className="form-control" onChange={(e) => {this.setState({subject: e.target.value, treeData2: this.state.subjects[e.target.value].issues})}}>
						<option value="">Choose Subject</option>
						{
							this.state.subjects && 
								Object.keys(this.state.subjects).map((value, key) => {
									let subj = this.state.subjects[value];
									return <option value={value} key={key}>{subj.name}</option>	;					 
								})
						}												
					</select>
				</div>
				{
					this.state.subject && 
					<div>
						<div className="form-group">
							<select className="form-control" onChange={(e) => {
								let data = this.state.subjects[this.state.subject].essays[e.target.value].details;
								
								let arr = data.split('.');
								let arr2 = [];
								for (let i = 0; i < arr.length; i++) {
									if (arr[i] === '') continue;
									let obj = {title: arr[i]};
									arr2.push(obj);
								}
								this.setState({essay: data, treeData1: arr2})}}>
								<option value="">Choose Essay</option>
								{
									this.state.subjects[this.state.subject].essays && 
										this.state.subjects[this.state.subject].essays.map((value, key) => {
											return <option value={key} key={key}>{value.title}</option>	;					 
										})
								}												
							</select>
						</div>
						
						{
							this.state.essay &&
				
								<div className="row">
									<div>
										{this.state.essay}
										<br /><br />
									</div>
									<div
										className="col-md-6"
									  style={{
										height: 400,
										border: 'solid black 1px',
									  }}
									>
									  <SortableTree
										treeData={this.state.treeData1}
										onChange={treeData1 => this.setState({ treeData1 })}
										dndType={externalNodeType}
										shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
									  />
									</div>
							
									<div
										className="col-md-6"
									  style={{
										height: 400,
										border: 'solid black 1px',
									  }}
									>
									  <SortableTree
										treeData={this.state.treeData2}
										onChange={treeData2 => this.setState({ treeData2 })}
										dndType={externalNodeType}
										shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
									  />
									</div>
							
									<div style={{ clear: 'both' }} />
							
									<div>
									  <label htmlFor="should-copy" style={{ fontSize: '0.8rem' }}>
										Enable node copy via <b>shouldCopyOnOutsideDrop</b>:
										<input
										  type="checkbox"
										  id="should-copy"
										  defaultChecked={shouldCopyOnOutsideDrop}
										  value={shouldCopyOnOutsideDrop}
										  onChange={event =>
											this.setState({
											  shouldCopyOnOutsideDrop: event.target.checked,
											})
										  }
										/>
									  </label>
									</div>
								  </div>
						}
					</div>
				}
			</div>
		);
	}
}

export default CompleteProcess;