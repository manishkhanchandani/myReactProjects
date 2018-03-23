import React, {Component} from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import ShowModal from '../MyModal/ShowModal.js';
import renderHTML from 'react-render-html';
//https://github.com/fritz-c/react-sortable-tree
//https://fritz-c.github.io/react-sortable-tree/storybook/index.html?selectedKind=Basics&selectedStory=Search&full=0&addons=0&stories=1&panelRight=0
//https://github.com/fritz-c/react-sortable-tree/tree/master/examples/storybooks
const maxDepth = 5;
const renderDepthTitle = ({ path }) => `Depth: ${path.length}`;
class CompleteProcess extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			modal_show: false,
			modal_title: '',
			modal_body: '',
			modal_footer: '',
			subjects: {
				contracts: {
					name: 'Contracts',
					issues: [
						{
							title: 'Formation of Contracts',
							children: [
								{
									title: 'Intro',
									subtitle: 'valid contract, contract is promise, performance of it is called duty and for breach, law will provide a remedy',
									description: 'The rights and remedies of the parties depend on whether or not there was a<b> valid contract</b>. A contract is a promise or set of promises the <b>performance of which</b> the law will recognize as a <b>duty</b> and for which the law will <b>provide a remedy</b>.'
								},
								{
									title: 'Is UCC?',
									subtitle: 'UCC Article 2, Sale of Goods is UCC, all others are Common Law',
									description: 'UCC Article 2 governs contracts for the <b>sale of GOODS</b>, movable things at the time of identification to the contract. Otherwise, only COMMON LAW governs the contract.<br /><br />Here the contract does not concern a sale of movable things because it is for the "rent" of a "house". <br /><br />Therefore, only COMMON LAW principles govern this contract.'
								},
								{
									title: 'Are the parties MERCHANTS?',
									subtitle: 'Merchant is person who trades in or holds himself out by occupation or knowledge of goods in contract.',
									description: 'Under the UCC a MERCHANT is a person who<b> trades in</b> or otherwise <b>holds himself out</b> by <b>occupation</b> or otherwise as <b>knowledgeable</b> about the goods of the contract.<br /><br /><b>Sample 1:</b><br /><br />Under the UCC MERCHANTS are people who deal in the goods or hold themselves out by occupation as knowledgeable about the goods in a contract.<br /><br />Here Bob deals in tuxedos because he has a clothing store. Al may have "bought a lot of clothes" but there is no evidence he deals in tuxedos or hold himself out by occupation as being particularly knowledgeable about them.<br /><br />Therefore Bob is a merchant and Al is not.<br /><br /><b>Sample 2:</b><br /><br />Under the UCC MERCHANTS are people who deal in the goods or hold themselves out by occupation as knowledgeable about the goods in a contract.<br /><br />Here Sellco is clearly a dealer in these types of goods because it advertises them in its "catalog." Buyco is by occupation knowledgeable concerning "widgets" because of the large quantities it is ordering ($60,000).<br /><br />Therefore, the parties appear to be merchants.'
								},
								{
									title: 'Offer?',
									subtitle: 'Present Contractual Intent, communicated to offeree, such that assent would form a bargain. UCC - parties and quantity, Common Law - Qtips',
									description: 'Under contract law an OFFER is a manifestation of present contractual intent communicated to the offeree such that an objective person would reasonably believe assent would form a bargain. <br /><br />If ONLY common law go on to say,<br /><br />At common law a communication was only deemed sufficient to constitute an offer if it specified the <b>parties, subject matter, quantity, price, and time of performance</b>.<br /><br />If UCC say,<br /><br />The UCC deems a communication sufficient to constitute an offer if it specifies the <b>parties</b> and <b>quantity</b>. The UCC provides "GAP FILLERS" that may be used by the Court to determine any additional terms.'
								},
								{
									title: 'MERCHANT\'S FIRM OFFER?',
									subtitle: 'Ucc 2-205, Merchant, in writing, for a period of time, promises to leave offer open cannot revoke the offer or offeree can accept the offer even if offer is revoked.',
									description: 'Under UCC 2-205 an offer by a merchant that promises to "<b>leave the offer open</b>" for a <b>period of time</b> cannot be revoked by the offeror if it is stated <b>in writing</b>, for the <b>period of time stated</b>, or for a reasonable period of time (given the circumstances) if no time period is stated. However, regardless of the period of time stated by the offeror, the <b>offeror can revoke within 3 months</b> if that is less than the time period stated.<br /><br />If the merchant promises to "leave the offer open" for any period of time, whether more or less than 3 months, that is the "reasonable period of time" in which the<b> offeree can accept the offer even if the offeror could legally revoke the offer sooner</b>.'
								},
								{
									title: 'UNILATERAL CONTRACT?'
								},
								{
									title: 'ACCEPTANCE?'
								},
								{
									title: 'OFFER LAPSED?'
								},
								{
									title: 'EFFECTIVE ACCEPTANCE?'
								},
								{
									title: 'EFFECTIVE REJECTION?'
								},
								{
									title: 'EFFECTIVE REVOCATION?'
								},
								{
									title: 'IMPLIED-IN-FACT CONTRACT?'
								},
								{
									title: 'Is WRITING needed?'
								}
							]
						},
						{
							title: 'Contract Terms'	
						},
						{
							title: 'Defenses'	
						},
						{
							title: 'Third Party Beneficiary'	
						},
						{
							title: 'Breach'	
						},
						{
							title: 'Remedies'	
						}
					],
					essays: [
						{
							title: "Sample Essay - Contract Formation",
							details: "Lucy owned a rent house. She advertised it in the newspaper citing rent of $700 a month.<br /><br />Homer saw the ad and called Lucy at 9:00 am. Homer said, \"I saw your ad and accept your offer! I will be right there to pay you. I have to see the house, but would you consider $550?\"<br /><br />Lucy said, \"It's a deal. I will rent to you for $550. This is a firm offer.\" Homer said he would be there in one hour to see the house.<br /><br />Homer went 100 miles an hour to see the house, sideswiping Victoria. Victoria crashed and died along with her 7-month fetus.<br /><br />At 3:00 pm Homer arrived, five hours late, ran up to Lucy and said, \"I unequivocally accept. Here is my $550.\"<br /><br />Lucy said, \"I have decided not to rent to you.\" Discuss the rights of Homer and Lucy's defenses."
						},
						{
							title: "Sample Essay - UCC & Acceptance Varying Terms",
							details: ""
						},
						{
							title: "Sample Essay - Third Parties in a UCC Setting",
							details: ""
						},
						{
							title: "Sample Essay - Defenses",
							details: ""
						},
						{
							title: "Sample Essay - Common law Modifiction, Breach and Remedy",
							details: ""
						},
						{
							title: "Sample Essay - Common Law Remedies",
							details: ""
						},
						{
							title: "Sample Essay - UCC Formation, Breach and Remedy",
							details: ""
						}
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
							subtitle: 'false statement, published, causing damage to reputation',
							description: 'Under tort law <b>DEFAMATION</b> is a <b>FALSE statement</b> of material fact <b>PUBLISHED</b> to others about the plaintiff <b>CAUSING DAMAGE to REPUTATION</b>. Defamation may be <b>SLANDER</b>, an oral statement, or <b>LIBEL</b>, a written statement. <br /><br />Note: It is usually a mistake to discuss both defamation and false light concerning the same statement because if it is a statement that would damage one\'s reputation the issue is clearly defamation, not false light. If the statement does not damage the plaintiff\'s reputation but only causes embarrassment otherwise, it is not defamation and can only be false light.<br /><br />But many false statements are <b>PRIVILEGED</b> where the defendant speaks to defend a private interest, group interest or the public interest and does so without malice and in a reasonable manner calculated to defend that interest without unnecessarily harming the plaintiff.<br /><br />Injury to reputation will be presumed where there is LIBEL or <b>SLANDER PER SE</b>. <b>SLANDER PER SE</b> is found where the false statement alleges <b>CRIMINAL</b> behavior, <b>LOATHSOME</b> disease, <b>UNCHASTE</b> behavior or improper BUSINESS practices.<br /><br />Under <b>NEW YORK TIMES</b> and its progeny, a <b>PUBLIC FIGURE PLAINTIFF</b> must prove <b>ACTUAL MALICE</b>, that the false statement was made with knowledge or reckless disregard of its falseness, in order to recover in a defamation action. A <b>PUBLIC FIGURE</b> is a person who has acted to put themselves in the public spotlight. Further, where a matter of <b>PUBLIC CONCERN</b> is at issue, or where the plaintiff seeks punitive damages, the plaintiff must at least prove <b>NEGLIGENCE</b>.',
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
							details: "Barbara, the famous TV news lady, was assigned to do a story on former governor, Pat Wilson, to find out why Wilson had become almost a recluse in the years since he left office.<br /><br /> Barbara interviewed Wilson at his home. Wilson's speech was slurred, his eyes were bloodshot and he was unsteady. Barbara asked him about his health, and he declined to comment. Barbara knew Wilson had once been an alcoholic, and she suspected he had begun drinking heavily again. But she did not ask him about this because she knew he would deny it. <br /><br />On TV Barbara accurately described Wilson's slurred speech, bloodshot eyes and unsteady gait. Then she stated, \"It appears that someone we once knew and respected has gone back to his old ways.\" She did not state who the \"someone\" was, and she did not explain what she meant by \"his old ways.\" <br /><br />Because of the news broadcast, rumors rapidly spread that Wilson had again developed a drinking habit. Wilson's approval in polls fell dramatically, and he was passed over for the post of State Republican Chair, but he had little chance of being selected for that post. <br /><br />Wilson demanded a retraction and apology, but Barbara refuses. Discuss potential action by Wilson."
						}
					]
				}
			},
			subject: '',
			essay : '',
		  treeData1: [],
		  treeData2: [],
		  treeData: [
        {
          title: '`title`',
          subtitle: '`subtitle`',
          expanded: true,
          children: [
            {
              title: 'Child Node',
              subtitle: 'Defined in `children` array belonging to parent',
            },
            {
              title: 'Nested structure is rendered virtually',
              subtitle: (
                <span>
                  The tree uses&nbsp;
                  <a href="https://github.com/bvaughn/react-virtualized">
                    react-virtualized
                  </a>
                  &nbsp;and the relationship lines are more of a visual trick.
                </span>
              ),
            },
          ],
        },
        {
          expanded: true,
          title: 'Any node can be the parent or child of any other node',
			subtitle: '`subtitle`',
			description: 'Under tort law DEFAMATION is a FALSE statement of material fact PUBLISHED to others about the plaintiff CAUSING DAMAGE to REPUTATION. Defamation may be SLANDER, an oral statement, or LIBEL, a written statement. <br /><br />Note: It is usually a mistake to discuss both defamation and false light concerning the same statement because if it is a statement that would damage one’s reputation the issue is clearly defamation, not false light. If the statement does not damage the plaintiff’s reputation but only causes embarrassment otherwise, it is not defamation and can only be false light.<br /><br />But many false statements are PRIVILEGED where the defendant speaks to defend a private interest, group interest or the public interest and does so without malice and in a reasonable manner calculated to defend that interest without unnecessarily harming the plaintiff.<br /><br />Injury to reputation will be presumed where there is LIBEL or SLANDER PER SE. SLANDER PER SE is found where the false statement alleges CRIMINAL behavior, LOATHSOME disease, UNCHASTE behavior or improper BUSINESS practices.<br /><br />Under NEW YORK TIMES and its progeny, a PUBLIC FIGURE PLAINTIFF must prove ACTUAL MALICE, that the false statement was made with knowledge or reckless disregard of its falseness, in order to recover in a defamation action. A PUBLIC FIGURE is a person who has acted to put themselves in the public spotlight. Further, where a matter of PUBLIC CONCERN is at issue, or where the plaintiff seeks punitive damages, the plaintiff must at least prove NEGLIGENCE.',
          children: [
            {
              expanded: true,
              title: 'Chicken',
              children: [{ title: 'Egg' }],
            },
          ],
        },
        {
          title: 'Button(s) can be added to the node',
          subtitle:
            'Node info is passed when generating so you can use it in your onClick handler',
        },
        {
          title: 'Show node children by setting `expanded`',
          subtitle: ({ node }) =>
            `expanded: ${node.expanded ? 'true' : 'false'}`,
          children: [
            {
              title: 'Bruce',
              subtitle: ({ node }) =>
                `expanded: ${node.expanded ? 'true' : 'false'}`,
              children: [{ title: 'Bruce Jr.' }, { title: 'Brucette' }],
            },
          ],
        },
        {
          title: 'Advanced',
          subtitle: 'Settings, behavior, etc.',
          children: [
            {
              title: (
                <div>
                  <div
                    style={{
                      backgroundColor: 'gray',
                      display: 'inline-block',
                      borderRadius: 10,
                      color: '#FFF',
                      padding: '0 5px',
                    }}
                  >
                    Any Component
                  </div>
                  &nbsp;can be used for `title`
                </div>
              ),
            },
            {
              expanded: true,
              title: 'Limit nesting with `maxDepth`',
              subtitle: `Its set to ${maxDepth} for this example`,
              children: [
                {
                  expanded: true,
                  title: renderDepthTitle,
                  children: [
                    {
                      expanded: true,
                      title: renderDepthTitle,
                      children: [
                        { title: renderDepthTitle },
                        {
                          title: ({ path }) =>
                            path.length >= maxDepth
                              ? 'This cannot be dragged deeper'
                              : 'This can be dragged deeper',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title:
                'Disable dragging on a per-node basis with the `canDrag` prop',
              subtitle: 'Or set it to false to disable all dragging.',
              noDragging: true,
            },
            {
              title: 'You cannot give this children',
              subtitle:
                'Dropping is prevented via the `canDrop` API using `nextParent`',
              noChildren: true,
            },
            {
              title:
                'When node contents are really long, it will cause a horizontal scrollbar' +
                ' to appear. Deeply nested elements will also trigger the scrollbar.',
            },
          ],
        },
      ],
		  shouldCopyOnOutsideDrop: true,
		};
	}
	
	onClose() {
		this.setState({modal_show: false});	
	}
	
	alertNodeInfo({ node, path, treeIndex }) {
		let title = (node.title) ? node.title : '';
		let description = (node.description) ? node.description : '';
		let subtitle = (node.subtitle) ? node.subtitle : '';
		this.setState({modal_show: true, modal_title: title, modal_body: description, modal_footer: subtitle});
			/*
			console.log('node', node);
			console.log('path', path);
			console.log('treeIndex', treeIndex);
      		const objectString = Object.keys(node)
			.map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
			.join(',\n   ');

		  global.alert(
			'Info passed to the button generator:\n\n' +
			  `node: {\n   ${objectString}\n},\n` +
			  `path: [${path.join(', ')}],\n` +
			  `treeIndex: ${treeIndex}`
		  );*/
		}

	render() {
		console.log('state is ', this.state);
		const externalNodeType = 'yourNodeType';
    	const { shouldCopyOnOutsideDrop } = this.state;
		return (
			<div>
			<ShowModal show={this.state.modal_show} onClose={this.onClose.bind(this)} Title={this.state.modal_title} Body={this.state.modal_body} Footer={this.state.modal_footer} />
			{/*<div style={{ height: 400 }}>
				<SortableTree
				  treeData={this.state.treeData}
				  onChange={treeData => this.setState({ treeData })}
				  generateNodeProps={rowInfo => ({
					buttons: [
					  <button
						style={{
						  verticalAlign: 'middle',
						}}
						onClick={this.alertNodeInfo.bind(this, rowInfo)}
					  >
						Info
					  </button>,
					],
				  })}
				/>
			  </div>*/}
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
								this.setState({essay: data})
								data = data.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ' ');
								let arr = data.split('.');
								let arr2 = [];
								for (let i = 0; i < arr.length; i++) {
									if (arr[i] === '') continue;
									let obj = {title: arr[i]};
									arr2.push(obj);
								}
								this.setState({treeData1: arr2})}}>
								<option value="">Choose Essay</option>
								{
									this.state.subjects[this.state.subject].essays && 
										this.state.subjects[this.state.subject].essays.map((value, key) => {
											return <option value={key} key={key}>{key + 1}. {value.title}</option>	;					 
										})
								}												
							</select>
						</div>
						
						{
							this.state.essay &&
				
								<div className="row">
									<div>
										{renderHTML(this.state.essay)}
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
										generateNodeProps={rowInfo => rowInfo.node.description ? ({
											buttons: [
											  <button
												style={{
												  verticalAlign: 'middle',
												}}
												onClick={this.alertNodeInfo.bind(this, rowInfo)}
											  >
												Info
											  </button>,
											],
										  }) : null}
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