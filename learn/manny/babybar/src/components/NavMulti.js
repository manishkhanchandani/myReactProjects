import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Auth from './auth/Auth.js';
import './NavMulti.css';
import renderHTML from 'react-render-html';

import Themes from '../Themes.js';
/*
const x1 = [
	{
		name: 'Contracts',
		url: '',
		link: '',
		child: [
			{
				name: 'Quiz',
				url: '',
				link: '/quiz'
			}		
		]
	},
	{
		name: 'Criminal',
		url: '',
		link: ''
	},
	{
		name: 'Torts',
		url: '',
		link: ''
	}
]
*/
var menuStr = '';
/*
function loopMenu(obj, first)
{
	console.log('obj is ', obj);
	for (let i = 0; i < obj.length; i++) {
		let extraString = '';
		let extraString2 = '';
		if (first) {
			if (obj[i].child) {
				extraString = ' className="dropdown-toggle" data-toggle="dropdown"';	
				extraString2 = '<b className="caret"></b>';
			}
		}
		
		let path = '';
		if (obj[i].url) {
			path = '<a href="" ' + extraString + '>' + obj[i].name + extraString2 + '</a>';
		} else if (obj[i].link) {
			path = '<Link to="'+obj[i].link+'" ' + extraString + '>' + obj[i].name + extraString2 + '</Link>';
		} else {
			path = '<a href="" ' + extraString + '>' + obj[i].name + extraString2 + '</a>';	
		}

		menuStr = menuStr + '<li>' + path;
		
		if (obj[i].child) {
			menuStr = menuStr + '<ul className="dropdown-menu multi-level">';
			loopMenu(obj[i].child, false);
			menuStr = menuStr + '</ul>';
		}

		menuStr = menuStr + '</li>';
	}
	
}

loopMenu(x1, true);
console.log('menuStr: ', menuStr);
*/

class NavMulti extends Component {
	
	render() {
	
		return (
				<div className="navMulti">
				<div className="navbar navbar-inverse navbar-static-top" role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<Link className="navbar-brand" to="/">California Baby Bar</Link>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav navbar-right">
								<Themes />
								<Auth />
							</ul>
							<ul className="nav navbar-nav">
								<li className="active"><Link to="">Home</Link></li>
								{renderHTML(menuStr)}
								{/*<li>
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Exam Simulation<b className="caret"></b></a>
									<ul className="dropdown-menu">
										<li><Link to="/simulation/contracts">2 Contracts</Link></li>
										<li><Link to="/simulation/criminal">2 Criminal</Link></li>
										<li><Link to="/simulation/torts">2 Torts</Link></li>
										
									
									</ul>
								</li>*/}
								<li>
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Baby Bar<b className="caret"></b></a>
									<ul className="dropdown-menu multi-level">
										<li><Link to="/quiz">Quiz</Link></li>
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Issue Spotting</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issue/spotting/contracts">Contracts</Link></li>
												<li><Link to="/essays/issue/spotting/criminal">Criminal</Link></li>
												<li><Link to="/essays/issue/spotting/torts">Torts</Link></li>
											</ul>
										</li>
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">MBE</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/mbe/prep">Preparation</Link></li>
											</ul>
										</li>
										
									</ul>
								</li>
								
								<li>
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Torts <b className="caret"></b></a>
									<ul className="dropdown-menu multi-level">
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Intentional Torts</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/torts/assault">Assault</Link></li>
												<li><Link to="/essays/issues/torts/battery">Battery</Link></li>
												<li><Link to="/essays/issues/torts/transferred_intent">Transferred Intent</Link></li>
												<li><Link to="/essays/issues/torts/conversion">Conversion</Link></li>
												<li><Link to="/essays/issues/torts/false_imprisonment">False Imprisonment</Link></li>
												<li><Link to="/essays/issues/torts/iied">Intentional Infliction of Emotional Distress</Link></li>
												<li><Link to="/essays/issues/torts/trespass_to_land">Trespass to Land</Link></li>
												<li><Link to="/essays/issues/torts/trespass_to_chattels">Trespass to Chattel</Link></li>
											</ul>
										</li><li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Defenses</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/torts/tort_damages">Tort Damages</Link></li>
												<li><Link to="/essays/issues/torts/self_defense">Self Defense</Link></li>
												<li><Link to="/essays/issues/torts/defense_of_necessity">Defense of Necessity</Link></li>
												<li><Link to="/essays/issues/torts/defense_of_recapture">Defense of Recapture</Link></li>
												<li><Link to="/essays/issues/torts/defense_of_discipline">Defense of Discipline</Link></li>
												<li><Link to="/essays/issues/torts/defense_of_authority_of_law">Defense of Authority of Law</Link></li>
												<li><Link to="/essays/issues/torts/defense_of_consent">Defense of Consent</Link></li>
												<li><Link to="/essays/issues/torts/defense_of_property">Defense of Property</Link></li>
												<li><Link to="/essays/issues/torts/defense_of_others">Defense of Others</Link></li>
												<li><Link to="/essays/issues/torts/defense_of_infancy_insanity">Defense of Insanity / Infancy</Link></li>
											</ul>
										</li>
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Negligence</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/torts/negligence">Negligence</Link></li>
												<li><Link to="/essays/issues/torts/negligence_duty">Duty</Link></li>
												<li><Link to="/essays/issues/torts/negligence_per_se">Negligence Per Se</Link></li>
												<li><Link to="/essays/issues/torts/negligence_duty_peril">Duty Based on Peril</Link></li>
												<li><Link to="/essays/issues/torts/negligence_duty_premises">Duty Based on Premises</Link></li>
												<li><Link to="/essays/issues/torts/negligence_attractive_nuisance">Attractive Nuisance</Link></li>
												<li><Link to="/essays/issues/torts/strict_liability">Strict Liability</Link></li>
												<li><Link to="/essays/issues/torts/negligence_rescuer_doctrine">Rescuer Doctrine</Link></li>
												<li><Link to="/essays/issues/torts/respondent_superior">Respondent Superior</Link></li>
												<li><Link to="/essays/issues/torts/vicarious_liability">Vicarious Liability for Joint Enterprise</Link></li>
												<li><Link to="/essays/issues/torts/independent_contractor_liability">Independent Contractor</Link></li>
												<li><Link to="/essays/issues/torts/negligence_breach">Breach</Link></li>
												<li><Link to="/essays/issues/torts/negligence_breach_res_ipsa_loquitur">Breach Res Ipsa Loquitor</Link></li>
												<li><Link to="/essays/issues/torts/negligence_breach_negligent_entrustment">Breach Negligent Entrustment</Link></li>
												<li><Link to="/essays/issues/torts/negligence_actual_cause">Actual Cause</Link></li>
												<li><Link to="/essays/issues/torts/negligence_proximate_cause">Proximate Cause</Link></li>
												<li><Link to="/essays/issues/torts/negligence_egg_shell_plaintiff">Egg Shell Plaintiff</Link></li>
												<li><Link to="/essays/issues/torts/negligence_general_damages">General Damages</Link></li>
												<li><Link to="/essays/issues/torts/negligence_special_damages">Special Damages</Link></li>
												<li><Link to="/essays/issues/torts/negligence_contributory">Contributory Negligence</Link></li>
												<li><Link to="/essays/issues/torts/negligence_last_clear_chance">Last Clear Chance</Link></li>
												<li><Link to="/essays/issues/torts/negligence_comparative">Comparative Negligence</Link></li>
												<li><Link to="/essays/issues/torts/negligence_assumption_of_risks">Assumption of Risks</Link></li>
												<li><Link to="/essays/issues/torts/negligence_nied">NIED</Link></li>
											</ul>
										</li>
										
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Products Liability</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/torts/products_liability">Products Liability</Link></li>
												<li><Link to="/essays/issues/torts/pl_breach_exp_warranty">Breach of Express Warranty</Link></li>
												<li><Link to="/essays/issues/torts/pl_breach_imp_warranty">Breach of Implied Warranty</Link></li>
												<li><Link to="/essays/issues/torts/pl_negligence">Negligence</Link></li>
												<li><Link to="/essays/issues/torts/pl_strict_liability">Strict Liability in Tort</Link></li>
											</ul>
										</li>
										<li><Link to="/essays/issues/torts/defamation">Defamation</Link></li>
										
										
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Invasion of Privacy</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/torts/false_light">False Light</Link></li>
												<li><Link to="/essays/issues/torts/appropriation_of_likeness">Appropriation of Likeness</Link></li>
												<li><Link to="/essays/issues/torts/intrusion_into_solitude">Intrusion Into Solitude</Link></li>
												<li><Link to="/essays/issues/torts/public_disclosure_private_facts">Public Disclosure of Private Facts</Link></li>
											</ul>
										</li>
										
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Nuisance</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/torts/private_nuisance">Private Nuisance</Link></li>
												<li><Link to="/essays/issues/torts/public_nuisance">Public Nuisance</Link></li>
											</ul>
										</li>
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Misc</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/torts/abuse_of_process">Abuse of Process</Link></li>
												<li><Link to="/essays/issues/torts/illegal_interference">Illegal Interference</Link></li>
												<li><Link to="/essays/issues/torts/malicious_prosecution">Malicious Prosecution</Link></li>
												<li><Link to="/essays/issues/torts/deciet">Fraud</Link></li>
												<li><Link to="/essays/issues/torts/nondisclosure">Nondisclosure</Link></li>
												<li><Link to="/essays/issues/torts/tort_restitution">Tort Restitution</Link></li>
											</ul>
										</li>
										
									
									
									</ul>
								</li>
								
								<li>
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Contracts <b className="caret"></b></a>
									<ul className="dropdown-menu multi-level">
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Formation of Contracts</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/contracts/ucc">Governing Law</Link></li>
												<li><Link to="/essays/issues/contracts/parties_merchant">Merchant Parties</Link></li>
												<li><Link to="/essays/issues/contracts/offer">Offer</Link></li>
												<li><Link to="/essays/issues/contracts/mutual_assent">Mutual Assent</Link></li>
												<li><Link to="/essays/issues/contracts/merchants_firm_offer">Merchant Firm Offer</Link></li>
												<li><Link to="/essays/issues/contracts/unilateral_contract">Unilateral Contract</Link></li>
												<li><Link to="/essays/issues/contracts/acceptance">Acceptance</Link></li>
												<li><Link to="/essays/issues/contracts/consideration">Consideration</Link></li>
												<li><Link to="/essays/issues/contracts/varying_terms">Varying Terms</Link></li>
												<li><Link to="/essays/issues/contracts/offer_lapsed">Offer Lapse</Link></li>
												<li><Link to="/essays/issues/contracts/effective_acceptance">Effective Acceptance</Link></li>
												<li><Link to="/essays/issues/contracts/effective_rejection">Effective Rejection</Link></li>
												<li><Link to="/essays/issues/contracts/effective_revocation">Effective Revocation</Link></li>
												<li><Link to="/essays/issues/contracts/implied_in_fact">Implied In Fact Contract</Link></li>
												<li><Link to="/essays/issues/contracts/writing_needed">Statute of Frauds</Link></li>
											</ul>
										</li>
										
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Contract Terms</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/contracts/contract_terms">Basic Contract Terms</Link></li>
												<li><Link to="/essays/issues/contracts/timely_performance">Time is Essence</Link></li>
												<li><Link to="/essays/issues/contracts/buyer_satisfaction">Buyer Satisfaction</Link></li>
												<li><Link to="/essays/issues/contracts/parol_evidence_rule">Parol Evidence Rule</Link></li>
												<li><Link to="/essays/issues/contracts/express_condition_precedent">Express Condition Precedent</Link></li>
												<li><Link to="/essays/issues/contracts/requirement_contracts">Requirement Contracts</Link></li>
											</ul>
										</li>
										
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Defenses</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/contracts/defense_lack_of_intent">Lack of Intent</Link></li>
												<li><Link to="/essays/issues/contracts/defense_lack_of_consideration">Lack of Consideration</Link></li>
												<li><Link to="/essays/issues/contracts/defense_contract_modify">Contract Modification</Link></li>
												<li><Link to="/essays/issues/contracts/defense_unconsionable">Unconsionable</Link></li>
												<li><Link to="/essays/issues/contracts/defense_duress">Duress</Link></li>
												<li><Link to="/essays/issues/contracts/defense_fraud">Fraud</Link></li>
												<li><Link to="/essays/issues/contracts/defense_incapacity">Incapacity</Link></li>
												<li><Link to="/essays/issues/contracts/defense_illegality">Illegality</Link></li>
												<li><Link to="/essays/issues/contracts/defense_impossibility">Impossibility</Link></li>
												<li><Link to="/essays/issues/contracts/defense_impracticability">Commercial Impracticability</Link></li>
												<li><Link to="/essays/issues/contracts/defense_frustration_of_purpose">Frustration of Purpose</Link></li>
												<li><Link to="/essays/issues/contracts/defense_mutual_mistake">Mutual Mistake</Link></li>
												<li><Link to="/essays/issues/contracts/defense_unilateral_mistake">Unilateral Mistake</Link></li>
											</ul>
										</li>
										
										
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Breach</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/contracts/anticipatory_breach">Anticipatory Breach</Link></li>
												<li><Link to="/essays/issues/contracts/waiver_breach">Waiver of Breach</Link></li>
												<li><Link to="/essays/issues/contracts/breach_implied_covenant">Breach of Implied Covenant</Link></li>
												<li><Link to="/essays/issues/contracts/breach">Breach, Major or Minor?</Link></li>
												<li><Link to="/essays/issues/contracts/breach_divisible_contract">Effect of Breach on Divisible Contract</Link></li>
												<li><Link to="/essays/issues/contracts/waiver_condition">Waiver of Condition</Link></li>
												<li><Link to="/essays/issues/contracts/accord_satisfaction">Accord & Satisfaction</Link></li>
											</ul>
										</li>
										
										
										
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Third Party Contracts</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/contracts/third_party_beneficiary">Third Party Beneficiary</Link></li>
												<li><Link to="/essays/issues/contracts/assignment">Assignment</Link></li>
												<li><Link to="/essays/issues/contracts/delegation">Delegation</Link></li>
											</ul>
										</li>
										
										
										
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Remedies</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/contracts/remedy_non_breaching_party">Remedy for Non Breaching Party</Link></li>
												<li><Link to="/essays/issues/contracts/reliance_damages">Reliance Damages?</Link></li>
												<li><Link to="/essays/issues/contracts/expected_damages">Expected Damages?</Link></li>
												<li><Link to="/essays/issues/contracts/incidental_damages">Incidental Damages?</Link></li>
												<li><Link to="/essays/issues/contracts/consequential_damages">Consequential Damages?</Link></li>
												<li><Link to="/essays/issues/contracts/remedy_breaching_party">Remedy of Breaching Party</Link></li>
												<li><Link to="/essays/issues/contracts/ucc_remedy_non_breaching_buyer">UCC Remedy For Non Breaching Buyer</Link></li>
												<li><Link to="/essays/issues/contracts/ucc_remedy_non_breaching_seller">UCC Remedy For Non Breaching Seller</Link></li>
												<li><Link to="/essays/issues/contracts/ucc_remedy_for_breaching_seller">UCC Remedy for Breaching Seller</Link></li>
												<li><Link to="/essays/issues/contracts/liquidated_damages">Liquidated Damages</Link></li>
												<li><Link to="/essays/issues/contracts/unilateral_contract_saving_doctrine">Saving Doctrine for Unilateral Contract</Link></li>
												<li><Link to="/essays/issues/contracts/implied_in_law">Implied In Law Contract</Link></li>
												<li><Link to="/essays/issues/contracts/promissory_estoppel">Promissory Estoppel</Link></li>
												<li><Link to="/essays/issues/contracts/detrimental_reliance">Detrimental Reliance</Link></li>
												<li><Link to="/essays/issues/contracts/equitable_restitution">Equitable Restitution</Link></li>
												<li><Link to="/essays/issues/contracts/specific_performance">Specific Performance</Link></li>
											</ul>
										</li>
										
										
									</ul>
								</li>
								<li>
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Criminal <b className="caret"></b></a>
									<ul className="dropdown-menu multi-level">
										<li><Link to="/essays/issues/criminal/actus_mens_rea">Actus reus & Mens Rea</Link></li>
										<li><Link to="/essays/issues/criminal/intent">Specific Intent & General Intent Crimes</Link></li>
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Inchoate Offenses</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/criminal/attempted">Attempted</Link></li>
												<li><Link to="/essays/issues/criminal/conspiracy">Conspiracy</Link></li>
												<li><Link to="/essays/issues/criminal/solicitation">Solicitation</Link></li>
											</ul>
										</li>
										
										
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Crimes Against Persons</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/criminal/criminal_assault">Criminal Assault</Link></li>
												<li><Link to="/essays/issues/criminal/criminal_battery">Criminal Battery</Link></li>
												<li><Link to="/essays/issues/criminal/mayhem">Mayhem</Link></li>
												<li><Link to="/essays/issues/criminal/rape">Rape</Link></li>
												<li><Link to="/essays/issues/criminal/false_imprisonment">False Imprisonment</Link></li>
												<li><Link to="/essays/issues/criminal/kidnapping">Kidnapping</Link></li>
											</ul>
										</li>
										
										
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Crimes Against the Home</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/criminal/burglary">Burglary</Link></li>
												<li><Link to="/essays/issues/criminal/arson">Arson</Link></li>
											</ul>
										</li>
										
										
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Crimes Against Property</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/criminal/larceny">Larceny</Link></li>
												<li><Link to="/essays/issues/criminal/embezzlement">Embezzlement</Link></li>
												<li><Link to="/essays/issues/criminal/false_pretenses">False Pretenses</Link></li>
												<li><Link to="/essays/issues/criminal/robbery">Robbery</Link></li>
												<li><Link to="/essays/issues/criminal/extortion">Extortion</Link></li>
												<li><Link to="/essays/issues/criminal/receiving_stolen_property">Receiving Stolen Property</Link></li>
											</ul>
										</li>
										
										
										
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Murder</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/criminal/murder">Murder</Link></li>
												<li><Link to="/essays/issues/criminal/mitigating_factors">Mitigating Factors</Link></li>
												<li><Link to="/essays/issues/criminal/voluntary_manslaughter">Voluntary Manslaughter</Link></li>
												<li><Link to="/essays/issues/criminal/involuntary_manslaughter">Involuntary Manslaughter</Link></li>
												<li><Link to="/essays/issues/criminal/redline_rule">Redline Rule</Link></li>
											</ul>
										</li>
										
										
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Defenses</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/criminal/defense_infancy">Infancy</Link></li>
												<li><Link to="/essays/issues/criminal/defense_insanity">Insanity</Link></li>
												<li><Link to="/essays/issues/criminal/voluntary_intoxication">Intoxication</Link></li>
												<li><Link to="/essays/issues/criminal/defense_mistake_of_fact">Mistake of Fact</Link></li>
												<li><Link to="/essays/issues/criminal/defense_mistake_of_law">Mistake of Law</Link></li>
												<li><Link to="/essays/issues/criminal/defense_necessity">Necessity</Link></li>
												<li><Link to="/essays/issues/criminal/defense_duress">Duress</Link></li>
												<li><Link to="/essays/issues/criminal/defense_entrapment">Entrapment</Link></li>
												<li><Link to="/essays/issues/criminal/defense_consent">Consent</Link></li>
												<li><Link to="/essays/issues/criminal/defense_self_defense">Self Defense</Link></li>
												<li><Link to="/essays/issues/criminal/defense_of_others">Defense of Others</Link></li>
												<li><Link to="/essays/issues/criminal/defense_of_property">Property</Link></li>
												<li><Link to="/essays/issues/criminal/defense_legal_impossibility">Legal Impossibility</Link></li>
												<li><Link to="/essays/issues/criminal/defense_factual_impossibility">Factual Impossibility</Link></li>
												<li><Link to="/essays/issues/criminal/defense_withdrawal">Withdrawal</Link></li>
												<li><Link to="/essays/issues/criminal/defense_prevention_crime">Prevention of Crime</Link></li>
											</ul>
										</li>
										
										
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Misc</a>
											<ul className="dropdown-menu">
												<li><Link to="/essays/issues/criminal/misprison">Misprison</Link></li>
												<li><Link to="/essays/issues/criminal/compounding">Compounding</Link></li>
												<li><Link to="/essays/issues/criminal/accomplice_liability">Accomplice Liability</Link></li>
											</ul>
										</li>
										
										
									</ul>
									
								</li>
								{/*<li>
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Menu 1 <b className="caret"></b></a>
									<ul className="dropdown-menu multi-level">
										<li><a href="">Action</a></li>
										<li><a href="">Another action</a></li>
										<li><a href="">Something else here</a></li>
										<li className="divider"></li>
										<li><a href="">Separated link</a></li>
										<li className="divider"></li>
										<li><a href="">One more separated link</a></li>
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Dropdown</a>
											<ul className="dropdown-menu">
												<li><a href="">Action</a></li>
												<li className="dropdown-submenu">
													<a href="" className="dropdown-toggle" data-toggle="dropdown">Dropdown</a>
													<ul className="dropdown-menu">
														<li className="dropdown-submenu">
															<a href="" className="dropdown-toggle" data-toggle="dropdown">Dropdown</a>
															<ul className="dropdown-menu">
																<li><a href="">Action</a></li>
																<li><a href="">Another action</a></li>
																<li><a href="">Something else here</a></li>
																<li className="divider"></li>
																<li><a href="">Separated link</a></li>
																<li className="divider"></li>
																<li><a href="">One more separated link</a></li>
															</ul>
														</li>
													</ul>
												</li>
											</ul>
										</li>
									</ul>
								</li>
								<li>
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Menu 2 <b className="caret"></b></a>
									<ul className="dropdown-menu">
										<li><a href="">Action</a></li>
										<li><a href="">Another action</a></li>
										<li><a href="">Something else here</a></li>
										<li className="divider"></li>
										<li><a href="">Separated link</a></li>
										<li className="divider"></li>
										<li><a href="">One more separated link</a></li>
										<li className="dropdown-submenu">
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Dropdown</a>
											<ul className="dropdown-menu">
												<li><a href="">Action</a></li>
												<li><a href="">Another action</a></li>
												<li><a href="">Something else here</a></li>
												<li className="divider"></li>
												<li><a href="">Separated link</a></li>
												<li className="divider"></li>
												<li className="dropdown-submenu">
													<a href="" className="dropdown-toggle" data-toggle="dropdown">Dropdown</a>
													<ul className="dropdown-menu">
														<li className="dropdown-submenu">
															<a href="" className="dropdown-toggle" data-toggle="dropdown">Dropdown</a>
															<ul className="dropdown-menu">
																<li><a href="">Action</a></li>
																<li><a href="">Another action</a></li>
																<li><a href="">Something else here</a></li>
																<li className="divider"></li>
																<li><a href="">Separated link</a></li>
																<li className="divider"></li>
																<li><a href="">One more separated link</a></li>
															</ul>
														</li>
													</ul>
												</li>
											</ul>
										</li>
									</ul>
								</li>*/}
							</ul>
						</div>
					</div>
				</div>
				
				</div>
		);
	}
}

export default NavMulti;