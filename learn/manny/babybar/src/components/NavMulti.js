import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Auth from './auth/Auth.js';
import './NavMulti.css';

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
								<Auth />
							</ul>
							<ul className="nav navbar-nav">
								<li className="active"><Link to="">Home</Link></li>
								<li><Link to="/quiz">Quiz</Link></li>
								{/*<li>
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Exam Simulation<b className="caret"></b></a>
									<ul className="dropdown-menu">
										<li><Link to="/simulation/contracts">2 Contracts</Link></li>
										<li><Link to="/simulation/criminal">2 Criminal</Link></li>
										<li><Link to="/simulation/torts">2 Torts</Link></li>
										
									
									</ul>
								</li>*/}
								
								
								
								
								<li>
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Issue Spotting <b className="caret"></b></a>
									<ul className="dropdown-menu">
										<li><Link to="/essays/issue/spotting/contracts">Contracts</Link></li>
										<li><Link to="/essays/issue/spotting/criminal">Criminal</Link></li>
										<li><Link to="/essays/issue/spotting/torts">Torts</Link></li>
										
									
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
												<li><Link to="/essays/issues/torts/malicious_prosecution">Malicious Prosecution.json</Link></li>
												<li><Link to="/essays/issues/torts/deciet">Fraud</Link></li>
												<li><Link to="/essays/issues/torts/nondisclosure">Nondisclosure</Link></li>
												<li><Link to="/essays/issues/torts/tort_restitution">Tort Restitution.json</Link></li>
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
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Criminal <b className="caret"></b></a>
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