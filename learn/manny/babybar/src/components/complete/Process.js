import React, {Component} from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import ShowModal from '../MyModal/ShowModal.js';
import renderHTML from 'react-render-html';
import {Button} from 'react-bootstrap';
import * as data from './Data.js';

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
						{
							title: 'Solicitation',
							subtitle: 'Urging another person to commit a crime',
							description: 'Under <b>CRIMINAL LAW</b> a <b>SOLICITATION</b> is the crime of <b>urging another person</b> to <b>commit a crime</b>. <br /><br />The crime of <b>SOLICITATION</b> is complete as soon as the urging takes place, whether the person urged commits the crime urged or not. But if the urged crime is committed the <b>SOLICITATION MERGES</b> into the criminal result and the person committing the solicitation becomes an<b> ACCESSORY BEFORE THE FACT</b> and <b>VICARIOUSLY LIABLE </b>for the crime based on accomplice theory.',
							children: [
								{
									title: 'Urged another person to commit some act'
								},
								{
									title: 'Act urged would have been crime if committed'	
								}
							]
						},
						{
							title: 'Legal Impossibility',
							subtitle: 'Act urged in solicitation should be crime else it is Legal Impossibility.',
							description: 'For the crime of solicitation to actually be committed, the act urged by the defendant must be a crime for the person urged to actually do. If the act urged would not be a crime, urging it is not a crime. This is called a Legal Impossibility. <br /><br />Whether the act is crime or not is determined by Law. ',
							children: [
								{
									title: 'Act urged is not a crime.'
								}
							]
						},
						{
							title: 'Conspiracy',
							subtitle: 'Conspiracy is two or more people agree to work on illegal goal.',
							description: 'Under <b>COMMON LAW</b> the crime of <b>CONSPIRACY</b> was an <b>agreement between two or more people</b> to work toward an <b>illegal goal</b>. <b>MODERNLY</b> an <b>OVERT ACT</b> in furtherance of the conspiracy goal is often required in many Courts.<br /><br />Further, under the <b>PINKERTON RULE</b>, a member of a conspiracy is <b>VICARIOUSLY LIABLE</b> for the criminal acts of co-conspirators done <b>WITHIN THE SCOPE</b> of the conspiracy goal. This means crimes that were 1) <b>foreseeable</b> and 2) in <b>furtherance of the conspiracy goal</b>.<br /><br />Even if the illegal goal of the conspiracy is attained, the <b>CONSPIRACY DOES NOT MERGE</b> into the criminal result, so each member can be convicted of both conspiracy and the other crimes committed during and within the scope of the conspiracy.<br /><br />And under the <b>WHARTON RULE</b> a conspiracy requires the participation of more people than the minimum number necessary to commit the criminal act.<br /><br />If a defendant joins a conspiracy in progress most Courts hold they are not liable for previous crimes of the co-conspirators unless the joining defendant seeks to profit from those prior crimes.<br /><br />A conspiracy ends when the conspiracy goal is <b>ATTAINED</b> or <b>ABANDONED</b>, and vicarious liability will no longer attach based on conspiracy theory. But it may still attach based on accomplice theory.',
							children: [
								{
									title: 'Actual Agreement is Needed'
								},
								{
									title: 'Two or more People Required'
								},
								{
									title: 'To work towards an illegal goal'
								},
								{
									title: 'Overt Act is required modernly'
								},
								{
									title: 'Wharton Rule'
								},
								{
									title: 'Vicarious Liable under conspiracy theory'
								},
								{
									title: 'Comparison of Conspiracy and Accomplice Theory'
								},
								{
									title: 'Defense of Withdrawal'
								}
							]
						},
						{
							title: 'Conspiracy - Pinkerton\'s Rule',
							subtitle: 'Member of conspiracy is vicariously liable for all the crimes committed by co-consiprators.',
							description: 'Under the <b>PINKERTON RULE</b>, a member of a conspiracy is <b>VICARIOUSLY LIABLE</b> for the criminal acts of co-conspirators done <b>WITHIN THE SCOPE</b> of the conspiracy goal. This means crimes that were 1) <b>foreseeable</b> and 2) in <b>furtherance of the conspiracy goal</b>.<br /><br />If a defendant joins a conspiracy in progress most Courts hold they are not liable for previous crimes of the co-conspirators unless the joining defendant seeks to profit from those prior crimes.<br /><br />A conspiracy ends when the conspiracy goal is <b>ATTAINED</b> or <b>ABANDONED</b>, and vicarious liability will no longer attach based on conspiracy theory. But it may still attach based on accomplice theory.',
							children: [
								{
									title: 'All members of conspiracy are vicariously liable for the acts of co-conspirators.'
								},
								{
									title: 'Within the scope of conspiracy goal.'
								},
								{
									title: 'Conspiracy goal is ATTAINED or ABANDONED',
									subtitle: 'No vicarious liability after that, only charges based on accomplice liability.'
								}
							]
						},
						{
							title: 'Criminal Assault',
							subtitle: '',
							description: 'Under CRIMINAL LAW an ASSAULT is the crime of acting with the intention of causing a battery or else to cause apprehension of a battery. The victim of the attempted battery does not have to be aware of the danger. ',
							children: [
								{
									title: ''
								}
							]
						},
						{
							title: 'Criminal Battery',
							subtitle: '',
							description: 'Under CRIMINAL LAW a BATTERY is the crime of acting with the intention of causing a touching of a victim�s person and causing a harmful or offensive touching .',
							children: [
								{
									title: ''
								}
							]
						},
						{
							title: 'Rape',
							subtitle: 'Rape is sexual intercourse with female without consent.',
							description: 'Under common law RAPE was an intentional act to have sexual intercourse with a female without consent causing actual penetration, no matter how slight.<br /><br />Perhaps the single most important fact pattern for you to watch out for on an exam question is the following:<br /><br />For example: Abe and Bob agree to kidnap Vickie for ransom. Abe knows Bob is a registered sex offender so he has Bob swear he will not try to have sex with Vickie. Bob swears he will not. After Vickie is kidnapped Abe goes out and Bob has sex with Vickie by promising he will let her go if she does. After having sex with Vickie, Bob laughs at her, calls her stupid and tells her she won\'t be freed until the ransom is paid. Vickie commits suicide in humiliation. Is Abe liable for first degree murder, and if so why?<br /><br />1) Abe participated in the kidnapping, so he is <b>directly liable</b> for that crime.<br />2) <b>Bob raped Vickie</b> because her consent was the product of duress.<br />3) <b>Abe is not liable for Vickie\'s rape as a conspirator</b> because it was contrary to the conspiracy agreement between Abe and Bob.<br />4) Instead, Abe is <b>vicariously liable</b> for the rape as an <b>accomplice</b> because the rape was a foreseeable crime, actually and proximately caused by the kidnapping.<br />5) The rape caused the suicide, so the <b>suicide was a homicide</b> actually and proximately caused by Bob\'s act of raping Vickie.<br />6) Rape is one of the <b>inherently dangerous felonies</b>, so any death caused by rape qualifies as a murder under the <b>Felony-Murder Rule</b>.<br />7) The events form a <b>foreseeable and unbroken chain of causality</b>, and Abe is <b>vicariously liable</b> for the rape and murder of Vickie as an <b>accomplice</b>.<br />8) Murder caused by a rape is almost always one of the "<b>enumerated felonies</b>" for <b>first- degree murder</b>, so Abe liable for first degree murder.',
							children: [
								{
									title: 'Sexual Intercourse with female'
								},
								{
									title: 'Without Consent'
								},
								{
									title: 'General Intent Crime',
									subtitle: 'This means the prosecution must prove that defendant intentionally acted to have sexual intercourse and it was done without consent. The prosecution does not have to prove that defendant acted with the specific intent of having non-consensual sexual intercourse.'
								},
								{
									title: 'Inherent Dangerous Felony',
									subtitle: 'Therefore death caused by rape may be charged as murder with Felony Murder Rule and murder caused by rape is generally first degree murder.'
								},
								{
									title: 'Fraud in Factum',
									subtitle: 'Victim does not knowingly consent to sexual intercourse with the defendant.'
								},
								{
									title: 'Fraud in Inducement',
									subtitle: 'Consent is effective if it is misrepresentation of the benefit the victim will enjoy because she is knowingly consenting to sexual intercourse with the defendant.'
								},
								{
									title: 'Mistake of Fact',
									subtitle: 'Is no defense in general intent crime unless the mistake is reasonable given the circumstances.',
									description: 'Involuntary Intoxiation can be considered as defense, Voluntary Intoxication can be considered defense if reasonable sobar person could have made the same mistake.'
								},
								{
									title: 'Statutory Rape',
									subtitle: 'Sexual intercourse with the person below the statutory age of consent.',
									description: 'Any person who does this is generally strictly liable because consent is legally impossible.',
									children: [
										{
											title: 'Mistake of Fact',
											subtitle: 'Is no defense regardless of whether it is reasonable or not.'
										}  
									]
								},
								{
									title: 'Attempted Rape',
									subtitle: 'Attempting to have sexual intercourse with a person knowing that they do not consent.',
									description: 'Attempting Rape is a crime of attempting to have sexual intercourse with a person knowing that they do not consent.',
									children: [
										{
											title: 'Specific Intent Crime',
											subtitle: 'The defendant must act in an effort to have sexual intercourse with a person with knowledge that person does not consent to have sexual intercourse.'
										},
										{
											title: 'Factual Impossibility',
											subtitle: 'Is not a defense to attempted rape unless it is totally impossible to rape in a manner attempted.'
										},
										{
											title: 'Mistake of fact',
											subtitle: 'Is not a defense to attempted rape unless it negates the implication the defendant acted with criminal intent.'
										},
										{
											title: 'Legal Impossibility',
											subtitle: 'Is a defense if the act attempted or intended by the defendant would not have been the rape, even if it is completed.'
										}     
									]
								}
							]
						},
						{
							title: 'Arson',
							subtitle: '',
							description: 'Under common law ARSON was the malicious burning of the dwelling of another. MODERNLY arson is extended by statute to the burning of other structures. Malice for arson means that the burning must be done with wrongful intent.',
							children: [
								{
									title: 'Malicious Burning',
									subtitle: 'Burning must be done with wrongful intent. This generally means they deliberately acted to harm others or knowing others would be harmed.',
									children: [
										{
											title: 'Negligence or Criminal Negligence - not a malice'	
										}
									]
								},
								{
									title: 'Dwelling of another'
								},
								{
									title: 'Modernly, Any structure'
								},
								{
									title: 'General Intent Crime',
									subtitle: 'This means the prosecution has to prove that defendant deliberately and maliciously started a fire that burned property protected by statute. The prosecution does not have to prove the defendant acted with the specific intent of burning the property that was actually burned.'
								},
								{
									title: 'Inherent Dangerous Felony',
									subtitle: 'Therefore death caused by arson may be charged as murder with Felony Murder Rule and murder caused by arson is generally first degree murder.'
								},
								{
									title: 'Attempted Arson',
									subtitle: 'Is a crime of attempting to burn protected property.',
									description: 'Attempting Rape is a crime of attempting to have sexual intercourse with a person knowing that they do not consent.',
									children: [
										{
											title: 'Specific Intent Crime',
											subtitle: 'This means defendant must start the fire or attempt to start a fire for the specific purpose of burning the protected property.'
										},
										{
											title: 'Mistake of fact',
											subtitle: 'Is not a defense to attempted arson unless it negates the implication the defendant acted with criminal intent.'
										},
										{
											title: 'Legal Impossibility',
											subtitle: 'Is only a defense if the act attempted by the defendant would not have been arson if completed.'
										}     
									]
								}
							]
						},
						{
							title: 'Larceny',
							subtitle: '',
							description: 'Under common law <b>LARCENY</b> was the <b>trespassory</b> <b>taking and carrying away</b> of the <b>personal property</b> of another with <b>intent to permanently deprive</b>. Where the possession was gained by <b>misrepresentation</b> it was called <b>LARCENY BY TRICK</b>.<br /><br />Theft of property from a master or employer by a manager or high-level employee was generally embezzlement and not a larceny, unless the defendant got possession by misrepresentation, a larceny by trick. But theft of the same property by a servant or low-level employee was generally larceny, not embezzlement, unless the defendant took possession from a third party before deciding to steal it, and in that case it was embezzlement.<br /><br />Under the <b>RELATION BACK DOCTRINE </b>some common law courts held that a theft of �lost� property by a person who initially intended to return it to the lawful owner was a larceny because a later decision to steal RELATED BACK to make the original taking unlawful. But other courts held this was embezzlement on the theory the original taking formed a �constructive trust.�',
							children: [
								{
									title: 'Trespassory',
									subtitle: '',
									description: 'Trespassory taking means the defendant either 1) took possession without consent from the lawful possessor OR 2) took possession with the intention of stealing it. Therefore, the prosecution generally must either prove the defendant took possession of goods without consent from the owner or with the intention of stealing at the time goods were taken into possession.'
								},
								{
									title: 'Taking and carrying away'
								},
								{
									title: 'Of personal property'
								},
								{
									title: 'With intent to permanently deprive'
								},
								{
									title: 'Specific Intent Crime',
									subtitle: '',
									description: 'The prosecution must prove the defendant specifically intended to permanently deprive the lawful possessors of property in their possession. A lawful possessor is anyone with possession of the property before the defendant takes it. It does not necessarily have to be the �owner� of the property.'
								},
								{
									title: 'Attempted Larceny',
									subtitle: 'Attempted larceny is the crime of attempting to take and carry away the property of another with intent to permanently deprive.',
									children: [
										{
											title: 'Specific Intent Crime',
											subtitle: 'This means that the defendant must act with the specific intent of permanently depriving another of property.',
										}		   
									]
								}
							]
						},
						{
							title: 'False Pretenses',
							subtitle: '',
							description: 'Under common law FALSE PRETENSES was the a <b>MISREPRESENTATION of FACT</b> to <b>obtain TITLE</b> to the property of another with <b>intent to permanently deprive</b>.<br /><br />The actus reus for false pretenses is obtaining title to property by means of false representations, and the mens rea is the intent to defraud.',
							children: [
								{
									title: 'Transfer of Tite'
								},
								{
									title: 'Misrepresentation of the fact (false representation)'
								},
								{
									title: 'Actual Reliance'
								},
								{
									title: 'With intent to permanently deprive'
								},
								{
									title: 'Specific Intent Crime',
									subtitle: '',
									description: 'False pretenses is a specific intent crime, meaning that the prosecution has to prove the defendant acted with a specific intent to obtain title to the victim\'s property by fraud. '
								},
								{
									title: 'Attempted Larceny',
									subtitle: '',
									description: 'Attempted false pretenses is the crime of attempting to defraud a victim of property by using a false representation of fact. Modernly it might be charged as "attempted fraud."'
								}
							]
						},
						{
							title: 'Embezzlement',
							subtitle: '',
							description: 'Under common law EMBEZZLEMENT was the crime of <b>TRESPASSORY CONVERSION</b> of the <b>property of another </b>by one <b>entrusted with lawful possession</b> with <b>intent to permanently deprive</b> or causing substantial risk of loss.<br /><br /><b>Def 2:</b> Embezzlement is the crime of <b>trespassorily</b> converting <b>personal property</b> that has been <b>entrusted to the defendant</b> by another to <b>their personal use</b>.<br /><br />Further, the COMMON CARRIER DOCTRINE held that a common carrier such as a taxicab, bus or ship is entrusted with possession of passenger\'s property, including lost property, so a theft of passenger property by an employee of a common carrier was more often held to be EMBEZZLEMENT than larceny, even if the property was "lost".<br /><br />The actus reus for embezzlement is the trespassory conversion of property to personal use by the defendant bailee, and the mens rea is the intent to misuse the property of the bailor.<br /><br />Embezzlement applies and larceny does not apply if 1) there was an <b>entrustment</b> of property into the care of the defendant, 2) the defendant received the property <b>without intent to steal</b>, and 3) the defendant later <b>converted the property to personal use.</b>',
							children: [
								{
									title: 'Trespassory',
									subtitle: '',
									description: 'Trespassory taking means the defendant either 1) took possession without consent from the lawful possessor OR 2) took possession with the intention of stealing it. Therefore, the prosecution generally must either prove the defendant took possession of goods without consent from the owner or with the intention of stealing at the time goods were taken into possession.'
								},
								{
									title: 'Conversion of Personal Property'
								},
								{
									title: 'Entrusted'
								},
								{
									title: 'With intent to permanently deprive'
								},
								{
									title: 'Specific Intent Crime',
									subtitle: '',
									description: 'Embezzlement is a specific intent crime and the prosecution must prove the defendant specifically intended to misuse the bailor�s property.'
								}
							]
						},
						{
							title: 'Robbery',
							subtitle: '',
							description: 'Under CRIMINAL LAW a ROBBERY is a larceny from a person by use of force or fear to overcome the will of the victim to resist.',
							children: [
								{
									title: 'Larceny from a person'
								},
								{
									title: 'By use of Force or fear to overcome the will of victim to resist'
								},
								{
									title: 'Specific Intent Crime',
									subtitle: '',
									description: 'The prosecution must prove the defendant acted intentionally to use force and fear to overcome the will or ability of others to commit a larceny.'
								},
								{
									title: 'Attempted Robbery',
									subtitle: 'It is the crime of attempting to commit a larceny from the person of a victim by use of force or fear.',
									children: [
										{
											title: 'Specific Intent Crime',
											subtitle: 'This means that the defendant must act in a specific effort to rob the victim.'
										},
										{
											title: 'Mistake of Fact - No Defense',
											subtitle: '',
											description: 'As with any other crime, mistake of fact is not a defense to attempted robbery unless it negates a finding of implied criminal intent based on the defendant�s actions. Mistake of fact is a claim the act done or attempted was done because of an innocent mistake, so the finder of fact should not find that the acts done by the defendant imply criminal intent.'
										},
										{
											title: 'Legal Impossibility - Defense',
											subtitle: '',
											description: 'Legal impossibility is a defense if the act attempted or intended by the defendant would not have been robbery, even if it had been completed. Legal impossibility is a claim the act done or attempted would not constitute the crime charged even if it had been completed.'
										}
										
									]
								}
							]
						},
						{
							title: 'Burglary',
							subtitle: '',
							description: '<b>Remember:</b> BEDONI, Breaking, Entering, Dwelling, Of Others, Night, Intent. <b>Under COMMON LAW</b> a <b>BURGLARY</b> was the <b>breaking</b> and <b>entering</b> of the <b>dwelling</b> of <b>another</b> in the <b>night</b> with <b>intent</b> to commit a felony. The entry of a structure within the CURTILAGE of the dwelling also constituted a burglary.<br /><br />A physical breaking was generally required, but a CONSTRUCTIVE BREAKING would be found if entry was the result of TRICK, VIOLENT THREATS, or CONSPIRACY.<br /><br />MODERNLY burglary has been extended by statute to all times of the day and all types of structures. Intent to commit a larceny is generally still sufficient to support a burglary charge, even if the larceny is no longer a felony. Further, the �breaking� element will generally be satisfied if there is a TRESPASSORY ENTRY, an entry without consent, express or implied.',
							children: [
								{
									title: 'Breaking'
								},
								{
									title: 'Constructive Breaking Common Law',
									children: [
										{
											title: 'Entry by threat'	
										},
										{
											title: 'Entry by trick'	
										},
										{
											title: 'Entry by aid of conspirator'	
										}
									]
								},
								{
									title: 'Constructive Breaking Modern Law',
									children: [
										{
											title: 'Any Tresspassory Entry',
											subtitle: 'Entry without permission. Some part of defendant entered into the structure else it is only attempted burglary. Or impropert time. Or Improper Means.'
										}
									]
								},
								{
									title: 'Entering'
								},
								{
									title: 'Dwelling of Another'
								},
								{
									title: 'Any Structure of Another, Modernly'
								},
								{
									title: 'In the Night time'
								},
								{
									title: 'All times, Modernly'
								},
								{
									title: 'With Intent to Commit Felony or Larceny',
									subtitle: '(murder, rape, manslaughter, robbery, sodomy, larceny, arson, mayhem, burlgary) - Mneominc: Mr Mrs Lamb'
								},
								{
									title: 'Attempted Burglary',
									subtitle: 'The defendant goes near the structure to commit the felony.'
								}
							]
						},
						{
							title: 'Receiving Stolen Property',
							subtitle: '',
							description: 'Under CRIMINAL LAW <b>RECEIVING STOLEN PROPERTY</b> is the crime of <b>taking possession</b> or control over <b>stolen personal property</b> while <b>knowing it has been stolen</b> with <b>intent to permanently deprive</b> the lawful owner.<br /><br />The aspects of the crime most tested on exams are 1) the application of the <b>Wharton Rule</b> for conspiracy, and 2) the application of <b>legal impossibility</b> as a defense when goods that are believed to be stolen are conveyed between defendants but the goods are not actually �stolen� because the police have let the goods be taken in order to track them from the �thief� to a �fence�.<br /><br /><b>For example:</b> Dan steals the Mona Lisa, tells Art, and asks him to look from someone who will buy it. Dan has committed the crime of <b>soliciting to receive stolen goods</b> because he has asked Art to commit that crime. Art asks Col if he would like to buy the painting. Art has <b>solicited</b> Col to receive stolen property IF Col knows the painting is stolen. Art has also helped Dan and has not �received� any stolen goods. So Art is an <b>accomplice</b> as an <b>accessory after the fact</b> and NOT a �receiver� of stolen goods. Col agrees. If Col knows the painting has been stolen he agreeing to receive stolen property. Col is receiving to help himself, NOT to help Dan and Art. So he is a <b>�receiver�</b>, NOT an accomplice. Under the <b>Wharton Rule</b> there must be more than two people involved in an agreement to receive stolen property for their agreement to comprise a <b>conspiracy</b>. Art <b>impliedly agreed</b> to help Dan when he sought out Col, and Col <b>agreed to receive</b> the stolen goods. So three people, Dan, Art and Col, are <b>all in agreement</b> commit the crime of receiving, and they can be charged with <b>conspiracy</b>. If Col receives the stolen goods all three can be charged with the crime of <b>receiving stolen property</b>. If they are convicted of that crime the solicitation of Art by Dan, and the solicitation of Col by Art will both �merge� into that crime and those two defendants cannot be convicted of the solicitations as separate crimes. If something prevents Col from receiving the painting while it is still �stolen� all three can still be charged with <b>attempted receipt of stolen property</b>, and the solicitations still merge into that crime.',
							children: [
								{
									title: 'Taking possession or control'
								},
								{
									title: 'Over stolen personal property'
								},
								{
									title: 'Knowing it has been stolen'
								},
								{
									title: 'With intent to permanently deprive'
								},
								{
									title: 'Attempted Reciept of Stolen Property'
								},
								{
									title: 'Wharton Rule',
									subtitle: 'The Wharton Rule prevents prosecution of only two people for the crime of �conspiracy to commit receiving of stolen property�.',
									description: 'For three people to commit the crime of conspiracy to receive stolen property there must be at least three people, and all three of them must be parties to a single agreement.<br /><br /><b>For example:</b> Tom asks Dick to help him steal a truckload of whiskey from the docks for $1,000. Dick agrees. Tom tells Dick to take the whiskey to a warehouse and leave it. Tom asks Harry if he will buy the stolen whiskey for $5,000. Harry agrees. Dick steals the whiskey at the docks, drives the truck to the warehouse and leaves it. Tom and Dick were in a <b>conspiracy to commit larceny</b> of the whiskey because Dick agreed to help Tom commit that crime. But Dick was NOT in any agreement that the whiskey would be delivered to a �receiver�. He did not know who Bob was, and Bob did not know who Dick was. Dick did not get a share of Tom�s profit; he just got a set payment. There was no communication from Dick to Bob, directly or through Tom. So <b>conspiracy to receive stolen property</b> CANNOT be charged, and Dick did not commit receiving stolen property. Likewise, Bob did not help steal the whiskey, and he cannot be charged with larceny or conspiracy to commit larceny.'
								},
								{
									title: 'Legal Impossibillity',
									subtitle: '',
									description: 'The application of <b>legal impossibility</b> as a defense when goods that are believed to be stolen are conveyed between defendants but the goods are not actually �stolen� because the police have let the goods be taken in order to track them from the �thief� to a �fence�.'
								}
							]
						},
						{
							title: 'Attempted',
							subtitle: '',
							description: 'Under CRIMINAL LAW an ATTEMPTED CRIME is a SUBSTANTIAL STEP taken toward committing an INTENDED CRIME.<br /><br />Nice Analysis of <b>Attempted Arson?</b><br /><br />Under criminal law, an attempted arson is a SUBSTANTIAL STEP taken with INTENT to commit arson. A substantial step is an ACT that brings the defendant DANGEROUSLY CLOSE to committing the intended crime.<br /><br />Under common law, ARSON was the MALICIOUS BURNING of the DWELLING of ANOTHER. Malice for burning means wrongful intent. But modernly arson has been broadly extended to the malicious burning of almost any STRUCTURE.<br /><br />Here A acted with INTENT to commit arson because he decided to "set fire" to the athletic equipment shed". That was not a dwelling, so he was not trying to commit common law arson. But it is a STRUCTURE because it is a "shed". And he was acting with MALICIOUS INTENT because he had no legal right to do this. So this would have been arson under the modern law.<br /><br />And A made a SUBSTANTIAL STEP toward committing his intended crime because he came DANGEROUSLY CLOSE because he had "matches" and made "severe tries" to set the shed on fire.<br /><br />Therefore A could be charged with attempted arson.',
							children: [
								{
									title: 'Specific Intent',
									subtitle: '',
									description: 'This means the prosecution has to prove the defendant took a substantial step intending to commit the specific crime that he or she is being accusing of attempting.'
								},
								{
									title: 'Substantial Step',
									subtitle: 'The defendant takes the first substantial step toward commission of the intended crime',
									description: '',
									children: [
										{
											title: 'Preparation is Not Substantial Step',
											subtitle: 'Typically steps taken in preparation would include obtaining weapons, preparing disguises, advance surveillance and planning.'
										},
										{
											title: 'Steps Close to Completion are Substantial',
											subtitle: 'The defendant\'s acts brought them dangerously close to completion of the crime.'
										},
										{
											title: 'Mistake of Fact',
											subtitle: 'Valid defense, but never a defense if there is criminal intent'
										},
										{
											title: 'Factual Impossibility',
											subtitle: 'Factual impossibility is only a valid defense to an attempted crime charge. Substantial steps will not result in crime.',
											description: 'Factual impossibility is a passive defense that the acts of the defendant were not substantial steps because commission of the crime allegedly attempted would be factually impossible to commit by the means attempted in any event. Factual impossibility is only a valid defense to an attempted crime charge. Factual impossibility is never a valid defense if the acts done by the defendant could have succeeded but for some flaw in execution or fortuitous turn of events.'
										},
										{
											title: 'Legal Impossibility',
											subtitle: 'None of acts would result in crime.',
											description: 'Legal impossibility is a passive defense that none of the acts of the defendant were substantial steps because commission of the crime allegedly attempted would be legally impossible to commit at the time of each act done.'
										},
										{
											title: 'Mistake of Law',
											subtitle: 'Knowledge of law is required, so this is never a defense.'
										}
									]
								}
							]
						},
						{
							title: 'Murder',
							subtitle: '',
							description: 'Under criminal law MURDER is an unlawful HOMICIDE, the killing of one human being by another, with MALICE aforethought. Malice for murder can be 1) express intent to kill or implied by 2) intent to cause great bodily injury, 3) intent to commit an inherently dangerous felony, the FELONY MURDER RULE or 4) intent to act with awareness of and conscious disregard for an unreasonably high risk to human life, the DEPRAVED HEART theory. <br /><br />Under common law there were no degrees of murder, but modernly FIRST DEGREE murder is 1) willful, deliberate and premeditated, 2) murder by enumerated means or 3) murder during enumerated dangerous felonies. All other murder is second degree. <br /><br />The felony-murder rule applies to deaths caused by acts done during the RES GESTAE of an inherently dangerous felony, the events beginning with the first substantial step toward commission of the crime and ending when the defendants leave the scene of the crime and reach a place of relative safety.',
							children: [
								{
									title: 'Unlawful Homicide',
									subtitle: '',
									description: 'In every murder action the prosecution must prove there was an unlawful homicide. Homicide is the killing of one human being by another. So don�t obsess over the �unlawful� aspect of homicide and instead focus on whether there was any homicide at all. Modernly some statutes may define �fetal murder� as the crime of murdering a fetus. ',
									children: [
										{
											title: 'Death of a Human Being'	
										},
										{
											title: 'A Killing of Another Human Being'	
										},
										{
											title: 'Homicide by suicide',
											description: 'Suicide is the killing of a person by their own action, and not a killing of a human being by another person, UNLESS the suicide is caused by another person. If a suicide iscaused by another person, it is a �homicide by suicide�.'
										},
										{
											title: 'Homicide by instrumentality',
											description: 'Clearly one person kills another when a knife or gun are used as the murder instrument. And the defendant can use another person to kill the victim by means of a hired killer or adupe. But any instrumentality can be the cause of murder if the defendant set events into motion that resulted in the death of the victim. In particular, a murder may be accomplished by forced suicide as explained immediately above or else by putting the victim at the peril of natural or even legal and administrative forces.'
										},
										{
											title: 'Year and Day Rule',
											description: 'Under common law proximate cause for a homicide was terminated a year and a day after the date of the defendant\'s act. Modernly this time period has been extended by statute because of medical advances. Still, proximate causality becomes more difficult to prove beyond a reasonable doubt as the time between cause and effect lengthens.'
										},
										{
											title: 'Pre-existing coditions do not cause Death',
											description: 'Pre-existing conditions are not intervening forces that terminate causality.'
										},
										{
											title: 'Failure to Intervene does not Cause Death',
											description: 'Failure of other parties to intervene is not an intervening force that terminates causality, even if the party that fails to act deliberately breaches a duty to act. It is a possibility that exists before the defendant acts, and the defendant acts subject to that possibility. For example: Dan throws Vick in a lake and he drowns because bystanders make no effort to rescue him. Dan is not relieved from liability because nobody else rescued Vick.'
										},
										{
											title: 'Intended Results Doctrine',
											description: 'Even when a series of unforeseeable events, including independent intervening events, break the chain of causation in an unexpected manner, the defendant may still be liable for a homicide if 1) the defendant acted with intent to cause a homicide and 2) the intended homicide results. This may be called the Intended Results Doctrine.'
										}
									]
								},
								{
									title: 'Homicide with Malice Aforethought',
									children: [
										{
											title: 'Express intent to kill'
										},
										{
											title: 'Implied intent to cause great bodily injury'	
										},
										{
											title: 'Felony Murder Rule, Intent to commit dangerous Felony (BARRKSS)',
											description: 'Murder may be charged under the FELONY-MURDER RULE if a death is caused by the commission of an inherently dangerous felony, but only if the death is caused by acts done during the RES GESTAE of the underlying felony. The RES GESTAE of a crime is the sequence of events from the first substantial step to committing the crime and ending when the defendants leave the scene of the crime and reach a place of a relative safety.'
										},
										{
											title: 'Depraved Heart Theory',
											subtitle: 'Intent to act with awareness of and conscious disregard for an unreasonably high risk to human life, the DEPRAVED HEART theory. Here there is awareness and disregard of the risks where as in involuntary manslaughter, awareness and disregard is not requried.'
										}			   
									]
								},
								{
									title: 'Causation',
									children: [
										{
											title: 'Actual Cause',
											subtitle: 'Actual Cause is used by "but for" test. But for the act of the defendant, the result would have not occured.'
										},
										{
											title: 'Proximate Cause',
											subtitle: 'Proximate cause is the direct and natural result of the act of defendant.'
										}
									]
								},
								{
									title: 'Redline Rule',
									subtitle: 'Killing of criminal by any innocent party',
									description: 'Under the REDLINE RULE the killing of a criminal accomplice by any party other than another criminal accomplice during the commisison of an inherently dangerous felony cannot be used as basis for charging murder under the FELONY-MURDER RULE.'
								},
								{
									title: 'First Degree Murder',
									children: [
										{
											title: 'willful, deliberate and premeditated'	
										},	
										{
											title: 'murder by enumerated means, like poison, torture'	
										},	
										{
											title: 'murder during enumerated dangerous felonies.'	
										}		   
									]
								},
								{
									title: 'Second Degree Murder'
								}
							]
						},
						{
							title: 'Mitigating Factors',
							subtitle: '',
							description: 'Under CRIMINAL LAW, MITIGATING FACTORS are factual considerations that do not serve as complete defenses but may be weighed by the jury in determining whether murder should be found in the first or second degree, or whether a murder charge should be reduced to a finding of manslaughter.'
						},
						{
							title: 'Voluntary Manslaughter',
							subtitle: 'Provocation or honest but unreasonable belief that deadly force is justified, causing homicide, without malice aforethought.',
							description: 'Under criminal law VOLUNTARY MANSLAUGHTER  is an unlawful, intentional homicide without malice aforethought because of adequate provocation sufficient to raise a resonable person to a fit of rage which could and actually did cause the homicide.<br /><br />ADEQUATE PROVOCATION is provocation sufficient to raise a reasonable person to a murderous rage, which did raise the defendant to such a rage, and which was the actual cause of the homicide. <br /><br />But ADEQUATE PROVOCATION CANNOT BE FOUND if the defendant had enough time before the killing that a reasonable person would have COOLED DOWN and no longer would have been in a murderous rage.',
							children: [
								{
									title: 'Intentional Homicide'
								},
								{
									title: 'Without Malice'
								},
								{
									title: 'Adequate Provocation'
								},
								{
									title: 'Belief that Deadly force is Justified',
									children: [
										{
											title: 'Deadly force in self defense'	
										},
										{
											title: 'Deadly force to defend other who is aggressor'	
										},
										{
											title: 'Deadly force to defend property'	
										},
										{
											title: 'Deadly force against fleeing criminal'	
										},
										{
											title: 'Deadly force because of unreasonable mistake'	
										}		   
									]
								}
							]
						},
						{
							title: 'Involuntary Manslaughter',
							subtitle: '',
							description: 'Involuntary manslaughter is an unintentional homicide resulting from GROSS NEGLIGENCE, RECKLESSNESS or the commission of a MALUM IN SE crime insufficient to support the felony murder rule.<br /><br />GROSS (CRIMINAL) NEGLIGENCE is the deliberate breach of a pre-existing duty to protect others from extreme risks, and RECKLESSNESS is the deliberate creation of extreme risks to others.<br /><br />The actus reus for involuntary manslaughter is the unlawful homicide.',
							children: [
								{
									title: 'GROSS NEGLIGENCE',
									subtitle: 'GROSS (CRIMINAL) NEGLIGENCE is the deliberate breach of a pre-existing duty to protect others from extreme risks'
								},
								{
									title: 'RECKLESSNESS',
									subtitle: 'RECKLESSNESS is the deliberate creation of extreme risks to others'
								},
								{
									title: 'MALUM IN SE crime',
									subtitle: 'Commission of a MALUM IN SE crime insufficient to support the felony murder rule'
								}
							]
						},
						{
							title: 'Kidnapping',
							subtitle: '',
							description: 'Under criminal law, a KIDNAPPING is the unlawful taking or confining of a person against their will.',
							children: [
								{
									title: 'Confining a person'
								},
								{
									title: 'Against their will'
								}
							]
						},
						{
							title: 'Misprison',
							subtitle: '',
							description: 'Under the common law MISPRISION was the crime of knowingly failing to report felonies by others to the police. ',
							children: [
								{
									title: 'Failing to report'
								},
								{
									title: 'Felonies by others to police'
								}
							]
						},
						{
							title: 'Compounding',
							subtitle: '',
							description: 'Under criminal law COMPOUNDING is the crime of taking money or something of value in exchange for a promise to not report crimes committed by others.',
							children: [
								{
									title: 'Taking money or something of value'
								},
								{
									title: 'In Exchnage for promise to not report crimes committed by others'
								}
							]
						},
						{
							title: 'Forgery',
							subtitle: 'Making of a written document such that it proves legal rights or obligations',
							description: 'Forgery is the <b>fraudulent making or alteration</b> of a written document in a manner that makes it appear to establish or <b>prove legal rights</b> or obligations. Forgery of an altered document must change its appearance to change its legal significance.<br /><br />Forgery is a <b>specific intent crime</b>, and the prosecution must prove the defendant changed the document with intent to defraud others or make some other wrongful use of the document.<br /><br />The <b>crime is complete as soon as the document is created or altered</b> with the <b>fraudulent intent</b>. At common law forgery was a <b>misdemeanor</b>, but it is generally a <b>felony</b> by statute.',
							children: [
								{
									title: 'Fraudulent making or altering'
								},
								{
									title: 'Of a written document'
								},
								{
									title: 'Prove legal rights or obligations'
								}
							]
						},
						{
							title: 'Uttering',
							subtitle: 'Presenting forged instrument as being genuine knowingly it is false.',
							description: 'Uttering is the crime of presenting or offering a counterfeit or forged instrument as being genuine while knowing it to be false. It was a common law misdemeanor but may be a felony modernly. It is often combined in statute with forgery.',
							children: [
								{
									title: 'Presenting forged Instrument'
								},
								{
									title: 'As being genuine'
								},
								{
									title: 'Knowingly that it is false'
								}
							]
						},
						{
							title: 'Fraud',
							subtitle: 'Misrepresenting material facts',
							description: '<b>Criminal fraud</b> is the act of intentionally and knowingly <b>misrepresenting</b> or concealing <b>material facts</b> to obtain services from or permanently deprive others of property.<br /><br />False pretenses, larceny by trick, forgery, uttering and counterfeiting are specific types of fraud recognized by the common law, but modernly other criminally fraudulent acts such as �<b>insurance fraud</b>� and �<b>false advertising</b>� are often recognized.<br /><br />To prove �<b>fraud</b>� of this type the prosecution generally must prove the defendants deliberately misrepresented or concealed or failed to reveal important facts that they had a duty to reveal. Mere expressions of opinion or �touting� the benefits others would receive from some commercial transaction are not �fraud�.<br /><br />For example: Swifty sells Bonnie a car by telling her it is �reliable�, has �good tires� and �low mileage�. All of those statements are mere �sales pitches� and do not constitute �criminal fraud�, even if Swifty knows the car is less reliable, has tires more worn, and has higher mileage than some other cars. BUT if Swifty says these things knowing the car�s odometer has been turned back or that the car has been salvaged from flood waters, the same statements become misrepresentations of material fact and he is guilty of fraud.',
							children: [
								{
									title: 'Knowingly Mistrepresenting or concealing'
								},
								{
									title: 'Material Facts'
								},
								{
									title: 'To obtain services or deprive others of property'
								}
							]
						},
						{
							title: 'Accomplice Liability',
							subtitle: '',
							description: '',
							children: [
								{
									title: 'An accomplice to a crime may be charged with all subsequent crimes committed by other accomplices if they were foreseeable as the direct and natural results of their own criminal acts.'
								}
							]
						},
						{
							title: 'Defenses',
							subtitle: '',
							description: '',
							children: [
								{
									title: 'Defense of Infancy',
									subtitle: '',
									description: 'Under the COMMON LAW there as a CONCLUSIVE PRESUMPTION that a child under the age of seven was unable to form CRIMINAL INTENT. There was a REBUTTABLE PRESUMPTION that a child between 7 and 14 could not form criminal intent, and a child over the age of 14 was believed to be able to form criminal intent. ',
									children: [
										{
											title: 'Under 7 years, no Criminal Intent',
											subtitle: 'Conclusive Presumption'
										},
										{
											title: 'Age between 7 - 14 years, no Criminal Intent',
											subtitle: 'Rebuttable Presumption'
										},
										{
											title: 'Age above 14 years, Criminal Intent'
										}
									]
								},
								{
									title: 'Defense of Mistake of Fact',
									subtitle: '',
									description: 'Under CRIMINAL LAW a MISTAKE OF FACT is a complete defense if it negates implied criminal intent. For GENERAL INTENT crimes only a REASONABLE mistake can negate criminal intent. For SPECIFIC INTENT crimes ANY MISTAKE OF FACT may negate criminal intent whether reasonable or not. Battery, rape, arson, involuntary manslaughter and murders that are not willful and deliberate are general intent crimes. All other crimes are SPECIFIC INTENT crimes.<br /><br />A REASONABLE MISTAKE OF FACT is one that a reasonable person would have made in the same situation. VOLUNTARY INTOXICATION never makes an otherwise unreasonable mistake reasonable.<br /><br />A MISTAKE OF FACT is no defense to a charge of ATTEMPT if criminal intent is proven and the mistake merely prevented an otherwise criminal act.',
									children: [
										{
											title: 'If it Negates Criminal Intent'
										}
									]
								},
								{
									title: 'Defense of Legal Impossibility',
									subtitle: '',
									description: 'Under CRIMINAL LAW, LEGAL IMPOSSIBILITY means that an attempted act is not an attempted crime, even if there was criminal intent, when the attempted crime is a legal impossibility at the time of the first substantial step.',
									children: [
										{
											title: 'Attempted act is not crime'
										},
										{
											title: 'At time of First substantial step'
										}
									]
								},
								{
									title: 'Defense of Mistake of Law',
									subtitle: '',
									description: 'Under CRIMINAL LAW, A MISTAKE OF LAW about the legality of an act does not alter the legality of the act. If the defendant commits a criminal act believing it is legal, it is still an illegal act. Likewise, if the defendant commits a legal act believing it is illegal, it is still a legal act. ',
									children: [
										{
											title: 'Criminal act believing it is legal',
											subtitle: 'not a defense'
										}
									]
								},
								{
									title: 'Defense of Factual Impossibility',
									subtitle: '',
									description: 'Under CRIMINAL LAW, FACTUAL IMPOSSIBILITY is a defense that the act actually done by the defendant was NOT A SUBSTANTIAL STEP toward commission of any crime, despite criminal intent, because the act taken could never produce a criminal result. ',
									children: [
										{
											title: 'Act is not a substantial Step'
										},
										{
											title: 'Act could never produce a criminal result'
										},
										{
											title: 'Criminal Intent'
										}
									]
								},
								{
									title: 'Defense of Withdrawal',
									subtitle: '',
									description: 'Under CRIMINAL LAW, WITHDRAWAL is a defense that defendants who were members of a CONSPIRACY are not liable for crimes committed by co-conspirators AFTER the defendants 1) give the other co-conspirators NOTICE that they are abandoning the conspiracy and 2) the defendants TRY TO STOP the co-conspirators from continuing pursuing the conspiracy goal.',
									children: [
										{
											title: 'Members of conspiracy'
										},
										{
											title: 'Notice that they are abondaoning the conspiracy'
										},
										{
											title: 'Trying to stop co-conspirators from crime'
										}
									]
								},
								{
									title: 'Defense of Insanity',
									subtitle: '',
									description: 'Under criminal law INSANITY is a defense that negates criminal intent. Under the M\'NAUGHTEN RULE  person is insane if a disease of the mind so impairs their reasoning that they are unable to appreciate the nature and quality of their acts or to know that they were wrong. Under the IRRESISTIBILE IMPULSE theory a person may raise the defense of insanity if they are unable to control their acts, even if they know the act is wrong',
									children: [
										{
											title: 'M Naughten Rule',
											subtitle: 'Disease of mind, impairs reasoning, they are unable to appreciate the nature and quality of their acts or to know they were wrong.'
										},
										{
											title: 'Irresistible impulse theory',
											subtitle: 'They are unable to control their acts, even if they know the act is wrong.'
										}
									]
								},
								{
									title: 'Defense of Consent',
									subtitle: '',
									description: 'Under CRIMINAL LAW consent is a defense to some crimes.[rape, larceny, battery � consent to a touching] The consent must be informed, voluntary and given by one with legal capacity. Further, consent is not a defense to an act that causes great bodily harm.',
									children: [
										{
											title: 'Voluntary consent'
										}
									]
								},
								{
									title: 'Defense of Entrapment',
									subtitle: '',
									description: 'Under CRIMINAL LAW entrapment is a defense if criminal intent was the product of improper police behavior. <br /><br />Under the majority view entrapment is no defense if the defendant was predisposed to commit the crime. Under another minority view entrapment is a defense if police conduct was outrageous and instigated the crime, even though the defendant was predisposed.',
									children: [
										{
											title: 'Criminal Intent'
										},
										{
											title: 'Product of Improper Police Behavior'
										}
									]
								},
								{
									title: 'Defense of Duress',
									subtitle: '',
									description: 'Under CRIMINAL LAW a defense may be raised to crimes, EXCEPT MURDER, that the criminal act was the result of DURESS.',
									children: [
										{
											title: 'Crime due to duress, not a murder crime'
										}
									]
								},
								{
									title: 'Defense of Necessity',
									subtitle: '',
									description: 'Under CRIMINAL LAW a defense of NECESSITY may be raised to certain crimes. This defense is really nothing more than self-defense, defense of others, or defense of property.',
									children: [
										{
											title: 'Defense of self-defense, or defense of others, or defense of property'
										}
									]
								},
								{
									title: 'Prevention of Crime (Authority of Law)',
									subtitle: '',
									description: 'Under CRIMINAL LAW a defendant is privileged to act with reasonable force to PREVENT SERIOUS CRIMES being committed in their presence.',
									children: [
										{
											title: ''
										}
									]
								},
								{
									title: 'Self Defense',
									subtitle: '',
									description: 'Under criminal law a defendant is privileged to use reasonable force as necessary for SELF-DEFENSE.',
									children: [
										{
											title: ''
										}
									]
								},
								{
									title: 'Defense of Others',
									subtitle: '',
									description: 'Under CRIMINAL LAW a defendant is privileged to act with reasonable force to protect others from an aggressor. Courts are split when a defendant mistakenly aids an aggressor. Some Courts say the defendant who mistakenly aids an aggressor STEPS-INTO-THE-SHOES of the aggressor and cannot claim any defense. Other Courts hold that a defendant can claim this defense if they acted on REASONABLE APPEARANCES.',
									children: [
										{
											title: ''
										}
									]
								},
								{
									title: 'Defense of Property',
									subtitle: '',
									description: 'Under CRIMINAL LAW a defendant is privileged to use reasonable, non-deadly force to protect his own property or the property of others from harm.',
									children: [
										{
											title: ''
										}
									]
								},
								{
									title: 'Defense of Voluntary Intoxication',
									subtitle: '',
									description: '',
									children: [
										{
											title: ''
										}
									]
								},
								{
									title: 'Defense of Involuntary Intoxication',
									subtitle: '',
									description: '',
									children: [
										{
											title: ''
										}
									]
								}
							]
						},
						{
							title: 'Malicious Mischief',
							subtitle: '',
							description: '',
							children: [
								{
									title: ''
								}
							]
						}
					],
					essays: [
						{
							title: 'Sample Essay 1: Attempt, Homicide, Res Gestae, Depraved Heart',
							details: 'Tom and Dick burst into the 7-11 store in Sacramento through the open door with their guns drawn at midnight. They wanted to rob the store the first night it opened.<br /><br />"Stick \'em up," yelled Tom.<br /><br />Unfortunately, the store was empty because they made a big mistake. No one was there. There was no merchandise. The store wasn\'t going to open until the next week.<br /><br />They were so mad they ripped the security camera off the wall and threw it in the river.<br /><br />The next morning Tom and Dick saw themselves on the Dumb Crook Show on TV. The store security camera had filled them trying to rob the empty store. They were afraid they would be caught. So to escape Tom drove real fast to San Francisco with Dick as his passenger.<br /><br />One the freeway going 75 mph, Tom was distracted and accidentally bumped Victoria\'s car. She was only going 70 mph, the posted limit. She spun out of control and crashed. She survived, but went into labor, and her full-term, viable baby was born dead.<br /><br />Tom then got off the freeway and drove down the crowded city surface streets of San Francisco at 80 mph. Dick was silent. The posted limit was 25 miles per hour. The car ran over homeless person Victor. He died instantly.<br /><br />Discuss the possible charges against Tom and Dick.',
							solutions: [
								data.convertBr(data.Essays.Criminal.Sample1)
							]
						},
						{
							title: 'Sample Essay 2: Accomplice and Conspiracy Liability',
							details: 'Huey and Louie agreed to kidnap Frank\'s daughter, Millie, and hold her for ransom. Frank was an old movie star with lots of money.<br /><br />Huey knew that Louie was a convicted rapist, so he said, "Louie! I want you to swear that you won\'t touch this girl. Because we are just in this for the ransom. Nothing else. And if you do anything bad to her, that is going to hurt our chances to get the ransom. So, do you swear?"<br /><br />Louie said, "Huey, I swear on a stack of bibles I won\'t touch the dame."<br /><br />So Huey and Louie kidnapped Millie and held her for ransom in a rundown motel.<br /><br />Huey went to the store for smokes and when he came back he discovered Louie had sex with Millie by telling her he would let her go in exchange. He was furious and afraid. He said, "Louie, I quit. I ain\'t having nothing to do with this no more!"<br /><br />Huey left and went to a bar where he got very drunk. That night Millie became so despondent over allowing Louie to have intercourse with her she hung herself in the bathroom of the motel room while Louie was snoring in the bed.<br /><br />Police discovered where Louie was and surrounded the motel room the next morning. Louie vowed not to be taken alive and was gunned down by the cops.<br /><br />Huey woke up at noon. Unaware of what happened to Millie and Louie, he decided to turn himself in. So he went to the police that morning and told them everything he knew in an effort to help rescue Millie.<br /><br />What crimes can Huey be charged with?',
							solutions: [
								data.convertBr(data.Essays.Criminal.Sample2)
							]
						},
						{
							title: 'Sample Essay 3: Murder, Mistake of Law, Self Defense, Insanity',
							details: 'Tom and his lover Dick made frequent trips to Mexico. Dick was getting a little impotent, so on one trip they bought some Viagra with the intent of smuggling it into the United States. They thought this was a felony, but they were wrong. It was not a crime at all.<br /><br />Officer Oscar tried to pull them over solely because they looked gay, and Oscar hated gays. He intended to harass them. If he was lucky, he thought, maybe he could beat them up. Oscar had some issues to resolve, but he did not have probable cause to stop the car.<br /><br />Tom was afraid. He felt Oscar must somehow know he was smuggling Viagra. He thought he would be strip searched, and he had an overwhelming phobia of body cavity searches. He thought he would be put in prison and treated very badly.<br /><br />Tom was scared to death and could not bring himself to stop the car. He knew it was wrong, but he could not help himself. He was in a daze.<br /><br />Tom continued to drive carefully at 55 mph and Oscar continued to follow him. Oscar was furious. Then Oscar shot at the car several times and Dick was killed.<br /><br />Tom is charged with the murder of Dick.<br /><br />Discuss Tom\'s liability for murder and lessor included offenses, and his applicable defenses.',
							solutions: [
								data.convertBr(data.Essays.Criminal.Sample3)
							]
						},
						{
							title: 'Sample Essay 4: Arson, Larceny, Embezzlement',
							details: 'Jim was sweet on Sue, a cute little red-haired girl in his Senior class, but she was more interested in a big, dumb, old football player named Chester.<br /><br />Jim thought that Sue would dump Chester for him if he was a hero. So Jim set fire to the wastepaper basket in old-lady Smith\'s classroom during the class break intending to report it and be a hero. He didn\'t intend any harm to the building, and he honestly believed the fire would not hurt the school at all. Unfortunately, the fire slightly singed the wall, and some other boys poured water on it before Jim could report it.<br /><br />In the confusion Sue dropped her wallet. Jim picked it up and hid it. He planned on giving it back to her that night. Then she would see he is a hero, and she would have to go to homecoming with him.<br /><br />Jim called Sue\'s house several times that night to tell her he had her wallet. But Sue\'s mother kept saying she was out with Chester. Jim did not tell Sue\'s mother about the wallet.<br /><br />This went on all night and Jim got so depressed he went to the river, pocketed Sue\'s money and threw Sue\'s wallet as far out into the current as he could throw.<br /><br />The next day Chester came up to Jim in first period and asked him a favor. Chester said the football team had to assemble for a yearbook picture, so Chester asked Jim to buy him two homecoming tickets in fifth period for Sue and him to go to the dance. Jim intended to do Chester a favor and took his $10.<br /><br />Jim got mad and decided he would just keep Chester\'s money. Then after second period Chester offered Jim $20 more so Sue and him could have their pictures taken at the dance. Jim agreed and took the money with every intention of stealing it.<br /><br />Jim used all of Chester\'s money to buy cigarettes and Playboy magazines. Discuss Jim\'s crimes.',
							solutions: [
								data.convertBr(data.Essays.Criminal.Sample4)
							]
						},
						{
							title: 'Sample Essay 5: Attempt, Mistake of Fact, Mistake of Law',
							details: 'Yang rode his bicycle down Rodeo Drive looking for a victim. He saw a "Hot Tomato" ready to cross the street, and as he coasted past her he deftly lifted her wallet right out of her purse without her knowing.<br /><br />At the next street he snatched another purse when an "Old Lady" wasn\'t even looking. But she was holding tight and fell over into the street. As she hit the pavement she lost her grip and Yang rode away with another prize.<br /><br />Yang was having a good day.<br /><br />At the next corner Yang reached out to snag another purse. But at the last second as he reached out he realized the "Young Chick" was not carrying a purse.<br /><br />Disappointed, Yang called it a day. He decided to score some dope with his earnings. Seeing a dude near an alley, he entered into some negotiations. The dude said he could sell him a baggy of "grass" for $10. Yang agreed and handed over $10. Suddenly cops came out of nowhere and jumped on them before Yang got possession. It turned out the "grass" really was grass -- lawn clippings from the dude\'s back yard.<br /><br />What crimes can Yang be charged with and what defenses might be raised?',
							solutions: [
								data.convertBr(data.Essays.Criminal.Sample5)
							]
						},
						{
							title: 'Sample Essay 6: Murder, Murder, Murder',
							details: 'Karen was furious because her lover Billy ran off with Mary. Karen decided to kill Mary and looked for some dynamite to blow Mary straight to Hell.<br /><br />Karen went to a "Dynamite R Us Store", but the owner Marvin refused to sell her any dynamite. Karen pulled a gun and demanded quality service like it said on the sign in the window. Marvin said, "Yes, Ma\'am!" and handed over 12 sticks of dynamite. Karen was happy with the service. But as she was putting away the gun, it accidentally went off and shot Marvin between the eyes. Karen felt real bad about it.<br /><br />As Karen approached Mary\'s mobile home she was stopped by Ruby. Ruby gave her a hard look. Ruby "dissed" her. Ruby challenged her to a spelling bee and criticized her choice of attire. That was all more than Karen could take, because she always had a short fuse. So she smoked Ruby above the ear with a round from the \'38.<br /><br />Karen proceeded to put the dynamite under Mary\'s double-wide "Jerry Springer" brand mobile home. She realized that the blast would probably kill Billy too, and she felt real bad about it. Billy was the reason she was acting out, her love for him and all. But the way she figured, a girl\'s got to do what a girl\'s got to do. So she washed that man right out of her hair.<br /><br />That night the blast killed both Mary and Billy.<br /><br />Discuss the potential first degree murder charges Karen might face along with lesser included offenses and her potential defenses.',
							solutions: [
								data.convertBr(data.Essays.Criminal.Sample6)
							]
						}
						
					]
				},
				torts:  {
					name: 'Torts',
					issues: [
						{
							title: 'Intentional Torts',
							children: [
								{
									title: 'Intentional Act',
									subtitle: 'An act done for purpose with knowledge that result will occur.',
									description: 'An act is intentional if it is for the purpose or with knowledge with reasonable certainty a result will occur. '
								},
								{
									title: 'Assault',
									subtitle: 'Reasonable apprehension of a battery',
									description: 'Under tort law ASSAULT is an intentional act done to cause and that does cause reasonable apprehension of a battery, a harmful or offensive touching of the person.',
									children: [
										{ title: 'Intentional Act?'},
										{ title: 'Reasonable Apprehension?'}	,
										{ title: 'Of harmful or offensive touching?'}
									]
								},
								{
									title: 'Battery',
									subtitle: 'Act done to cause harmful or offensive touching',
									description: 'Under tort law a battery is an intentional act done to cause a harmful or offensive touching.',
									children: [
										{ title: 'Intentional Act?'},
										{ title: 'Harmful Touching?'}	,
										{ title: 'or Offensive Touching?'}
									]
								},
								{
									title: 'Conversion',
									subtitle: 'Interference with chattel resulting in deprivation of possession, forced purchase is remedy.',
									description: 'Under tort law CONVERSION is an intentional act to cause and that does cause interference with the chattel of the plaintiff resulting in substantial deprivation of possession. The prescribed legal remedy is forced purchase by the defendant, but the plaintiff may "waive the tort" and seek restitution instead.',
									children: [
										{ title: 'Intentional Act?'},
										{ title: 'Inteference with chattel?'}	,
										{ title: 'Substantial Deprivation of possession?'},
										{ title: 'Remedy is Forced Sale?'}
									]
								},
								{
									title: 'False Imprisonment',
									subtitle: 'Confined to defined space, no exit, plaintiff aware of confinement.',
									description: 'Under tort law a false imprisonment is an intentional act causing the plaintiff to be confined to a defined space against their will with no reasonably apparent means of reasonable exit. The plaintiff must be aware of the confinement. ',
									children: [
										{ title: 'Intentional Act?'},
										{ title: 'Confined to defined Space?'}	,
										{ title: 'No Reasonable Exit?'},
										{ title: 'Plaintiff aware of confinement?'}
									]
								},
								{
									title: 'Intentional Infliction of Emotional Distress',
									subtitle: 'Outrageous act to cause severe emotional distress.',
									description: 'Under tort law intentional infliction is an intentional, outrageous act causing the plaintiff severe emotional distress. Generally emotional distress will not be assumed, and the plaintiff must present evidence showing that they did, in fact, suffer severe emotional distress. Evidence of mere humiliation and embarrassment is generally not enough. ',
									children: [
										{ title: 'Intentional Act?'},
										{ title: 'Outrageous Act?'}	,
										{ title: 'Causing Severe Emotional Distress?'}
									]
								},
								{
									title: 'Trespass to Land',
									subtitle: 'Unauthorized entry into land of others',
									description: 'Under tort law a trespass to land is an intentional act causing <b>unauthorized entry</b> onto, under or over the <b>land of another</b>. The entry may be by the defendant personally or by some person or object directed or placed on the land by the defendant. When an object is placed on the land it constitutes a "continuing trespass." <b>No damage is necessary</b>, but the defendant is liable for all damage actually caused. And if malice can be shown the defendant may be liable for punitive damages. ',
									children: [
										{ title: 'Intentional Act?'},
										{ title: 'Unauthorized entry?'},
										{ title: 'Onto, under or over?'},
										{ title: 'The land of another?'}
									]
								},
								{
									title: 'Trespass to Chattel',
									subtitle: 'Unauthorized interference with chattel of another',
									description: 'Under tort law <b>TRESPASS TO CHATTEL</b> is an intentional act by the defendant causing <b>unauthorized interference</b> with or <b>damage to</b> the <b>chattel of the plaintiff</b>.',
									children: [
										{ title: 'Intentional Act?'},
										{ title: 'Unauthorized interference with or damage to?'},
										{ title: 'The Chattel of another?'}
									]
								},
								{
									title: 'Transferred Intent',
									subtitle: 'Intent to commit tort on anyone is liable for injury inflicted to everyone',
									description: 'Under tort law <b>transferred intent</b> means that a defendant that acts with <b>intent to commit any tort</b> injury on anyone <b>will be liable</b> for <b>every injury</b> inflicted <b>on everyone</b>, even if the person injured or the injury suffered is <b>not what was originally intended</b>. <br /><br />An exception is that Courts generally will not find IIED based on transferred intent, and Courts may find only negligence and not an intentional tort by transferred intent if the original intent of the defendant was not malicious.',
									children: [
										{ title: 'Intent to commit any tort on a person?'},
										{ title: 'Injury to other person as a result?'},
										{ title: 'Liable for the result?'}
									]
								},
								{
									title: 'Damages in Torts',
									subtitle: 'Special Damages like monetory loss, General Damages like pain and suffering, Punitive Damage for gross negligence, P can waive the tort and demand restitution.',
									description: 'Every defendant that commits any tort is liable for all actual damages actually and proximately caused. Damages consist of <b>SPECIAL DAMAGES</b>, compensation for <b>monetary</b> losses, and <b>GENERAL DAMAGES</b>, compensation for <b>pain, suffering</b>, anxiety, emotional distress, inconvenience, etc. Defendants who commit intentional torts, including <b>gross negligence</b> (deliberate breach of duty) and recklessness (deliberate creation of unreasonable risks) may also be liable for <b>PUNITIVE DAMAGES</b> if the Court finds they acted with FRAUD, OPPRESSION or MALICE, an evil or wrongful intent to cause harm. Defendants who commit accidentally negligent torts are not liable for punitive damages. Tort plaintiffs have a right to <b>"waive the tort"</b> and <b>demand RESTITUTION</b> instead of compensation for damages.',
									children: [
										{ title: 'Special Damage like monetory loss?'},
										{ title: 'General Damages like pain, suffering, anxiety, emotional distress, inconvenience, etc.?'},
										{ title: 'Punitive Damages for gross negligence?'},
										{ title: 'Waive the tort and demand Restitution?'}
									]
								}
							]
						},
						{
							title: 'Defenses',
							children: [
								{
									title: 'Defense of Discipline',
									subtitle: 'Person with authority can act reasonably which otherwise may be battery or false imprisonment.',
									description: 'Under tort law a person with <b>recognized authority</b> (schoolteacher, bus driver, airplane pilot, policeman, parent, etc.) is <b>privileged</b> to <b>act reasonably</b> given the circumstances in a manner that otherwise might constitute a battery or false imprisonment.',
									children: [
										{ title: 'Person with recognized authority'},
										{ title: 'Person is Privileged'},
										{ title: 'To act reasonably?'},
										{ title: 'For act which otherwise is Battery or FI?'}
									]
								},
								{
									title: 'Defense of Authority of Law (Prevention of Crime)',
									subtitle: 'Person is privileged to act reasonably to stop crime.',
									description: 'Under tort law a person is <b>privileged</b> to <b>act reasonably</b> to <b>prevent or stop a FELONY</b> or DISTURBANCE OF THE PEACE from being committed in their presence.',
									children: [
										{ title: 'Person is Privileged'},
										{ title: 'To act reasonably?'},
										{ title: 'To prevent crime or disturbance of peace?'}
									]
								},
								{
									title: 'Defense of Recapture',
									subtitle: 'Priviliged to use reasonable force to recapture own chattel if asked for and refused, in fresh pursuit, lost because of no fault of their own.',
									description: 'Under tort law a person has a qualified privilege to use <b>reasonable force</b> to <b>RECAPTURE</b> their <b>own chattel</b> if 1) they have a<b>sked for and have been refused</b> return of the chattel, and 2) they are in <b>fresh pursuit</b> of wrongfully taken chattel, or 3) they <b>lost possession of the chattel</b> through <b>no fault of their own</b>.',
									children: [
										{ title: 'Use reasonable force'},
										{ title: 'To recapture chattel?'},
										{ title: 'If he asked for and have been refused?'},
										{ title: 'Fresh pursuit?'},
										{ title: 'Lost possession through no fault of their own?'}
									]
								},
								{
									title: 'Defense of Necessity',
									subtitle: 'Priviliged to use reasonable force to protect their own safety, safety of others, and safety of property.',
									description: 'Under tort law a person is privileged to <b>act reasonably</b> as <b>NECESSARY</b> to <b>protect</b> their <b>own safety</b>, the <b>safety of others</b>, and the <b>safety of property</b>. For defense of property to be "reasonable" the value of the property being protected must exceed the damages caused by the efforts to protect it. Reasonable acts done to protect the property of others is a PUBLIC NECESSITY and absolutely privileged. Reasonable acts done to protect the defendant\'s own property are a PRIVATE NECESSITY and only a qualified privilege. The defendant remains liable for actual damages to the plaintiff.',
									children: [
										{ title: 'Use reasonable force'},
										{ title: 'To protect self?'},
										{ title: 'To protect others?'},
										{ title: 'To protect property?'}
									]
								},
								{
									title: 'Defense of Consent',
									subtitle: 'Fully informed consent with legal capacity is defense to most intentional torts except battery.',
									description: 'Under tort law <b>FULLY INFORMED CONSENT</b> from a person with <b>legal capacity</b> is a defense to most intentional torts, but is <b>not a defense to a battery</b> that causes foreseeable great bodily injury.',
									children: [
										{ title: 'Fully informed consent'},
										{ title: 'With legal capacity?'},
										{ title: 'Except for battery?'}
									]
								},
								{
									title: 'Defense of Others',
									subtitle: 'Fully informed consent with legal capacity is defense to most intentional torts except battery.',
									description: 'Under tort law a person is privileged to <b>act reasonably</b> as necessary to <b>defend others</b> who are <b>NOT AGGRESSORS</b> from harm. Aggressors are people who have unreasonably created or increased dangers to others. Courts are split when a defendant unknowingly acts to defend an AGGRESSOR. Under one view the defendant STEPS INTO THE SHOES of the aggressor and has no privilege because the aggressor could not claim self-defense. In other Courts the defendant is privileged to defend the aggressor in a fracas if they act with a REASONABLE BELIEF they are acting to defend an innocent victim of aggression.',
									children: [
										{ title: 'Use reasonable force'},
										{ title: 'To protect others?'},
										{ title: 'Who are not aggressors?'}
									]
								},
								{
									title: 'Defense of Property',
									subtitle: 'Reasonabl force to protect the property.',
									description: 'Under tort law defendants are privileged to use <b>reasonable force</b> to <b>protect their property</b> or the <b>property of others</b>. The use of deadly force to protect property is never reasonable or legal. <br /><br />Under the <b>SHOPKEEPER\'S PRIVILEGE</b> a defendant may use <b>reasonable force</b> to detain a plaintiff for a <b>reasonable period of time</b> to <b>investigate</b> a reasonable <b>suspicion</b> that the <b>plaintiff has stolen goods</b> or services from the defendant.<br /><br />To protect litigation rights defendants may use reasonable force to as necessary to detain plaintiffs for a reasonable period of time to investigate events that have caused them damages.',
									children: [
										{ title: 'Use reasonable force'},
										{ title: 'To protect own property?'},
										{ title: 'To protect others property?'},
										{ title: 'Shopkeeper rule?'},
										{ title: 'Investigate a reasonable suspicion?'},
										{ title: 'That plaintiff has stolen goods or services?'}
									]
								},
								{
									title: 'Self Defense',
									subtitle: 'Reasonabl force to protect the self.',
									description: 'Under tort law a person who is <b>NOT AN AGGRESSOR</b> may <b>act reasonably</b> if <b>NECESSARY</b> to <b>protect</b> their <b>own safety</b>. Modernly the person can "hold her ground" and has is no duty to retreat in most jurisdictions. Aggressors are people who have unreasonably created or increased dangers to others.',
									children: [
										{ title: 'Use reasonable force'},
										{ title: 'To protect self?'},
										{ title: 'Provided the person is not aggressor?'}
									]
								},
								{
									title: 'Defense of Infancy, Insanity or Incompetence',
									subtitle: 'No defense to Infancy, Insanity or Incompetence.',
									description: 'INFANCY, INSANITY and INCOMPETENCE are not defenses for intentional torts.'
								}
							]
						},
						{
							title: 'Negligence',
							subtitle: 'Failure to exercise degree of care which reasonable person would use.',
							description: 'Under tort law <b>NEGLIGENCE</b> is the <b>failure to exercise</b> that <b>degree of care</b> that a <b>reasonably prudent person</b> would use in the <b>same circumstances</b>. To establish a prima facie case Plaintiff must generally prove <b>DUTY</b>, <b>BREACH</b>, <b>ACTUAL AND PROXIMATE CAUSATION</b> and <b>DAMAGES</b>. ',
							children: [
								{
									title: 'Strict Liability in Negligence?',
									subtitle: '',
									description: 'Under tort law a defendant that engages in any of three activities is STRICTLY LIABLE to any person who is actually and proximately caused injury. These three activities are: 1) keeping a KNOWN, DANGEROUS ANIMAL, 2) keeping an EXOTIC ANIMAL of a type that is not commonly domesticated, or 3) engaging in ULTRA-HAZARDOUS ACTIVITIES that are unusual, pose extreme risks to others, and are usually subject to strict safety regulations.',
									children: [
									]
								},
								{
									title: 'Duty?',
									subtitle: '',
									description: 'Under tort law NEGLIGENCE is the failure to exercise that degree of care that a reasonably prudent person would use in the same circumstances. To establish a prima facie case Plaintiff must generally prove DUTY, BREACH, ACTUAL AND PROXIMATE CAUSATION and DAMAGES.',
									children: [
									]
								},
								{
									title: 'Negligence Per Se?',
									subtitle: '',
									description: 'If a STATUTE creates a duty, violating the statute may constitute NEGLIGENCE PER SE if the purpose of the statute was to protect the CLASS OF PEOPLE to which the plaintiff belongs, and the violation of the statute caused the plaintiff to suffer the TYPE OF INJURY the statute was intended to prevent. ',
									children: [
									]
								},
								{
									title: 'Duty based on Peril?',
									subtitle: '',
									description: 'Under tort law defendants that create reasonably foreseeable dangers to others have a DUTY based on PERIL to act reasonably to protect others from those dangers. <br /><br />Under PALSGRAF, Cardozo said that a duty is only owed to those who are in the zone of danger caused by the defendant\'s acts. The Zone of Danger is the area where the defendant\'s acts create reasonably foreseeable peril to others. <br /><br />Andrews held that if the defendant owes a duty to anyone and breaches it, he should be liable for all injury actually and proximately caused by that breach. ',
									children: [
									]
								},
								{
									title: 'Duty based on Premises Liability',
									subtitle: '',
									description: 'Under tort law OCCUPIERS OF LAND have a duty to both those who come onto the land and to those off the land. This is a form of duty based on RELATIONSHIP.<br /><br />Under the common law occupiers of land had no duty to UNKNOWN TRESPASSERS.<br /><br />The occupiers had a duty to warn and protect KNOWN TRESPASSERS and LICENSEES from known, hidden dangers and artificial conditions. Licensees are people allowed onto the land but not for the occupiers\' benefit.<br /><br />The occupiers had a duty to reasonably inspect the land and warn and protect INVITEES from known, hidden dangers and artificial conditions. Invitees are people invited or allowed onto the land for the occupiers\' benefit.<br /><br />Finally the occupiers of land had a duty to conduct and control activities on the land with due care to prevent injury to PEOPLE OFF THE LAND.<br /><br />Modernly these rigid rules by classification have often been modified by both statute and Court decision to create a balancing test under which occupiers of land have a duty of due care to ALL PEOPLE to act as reasonable people would in inspecting, maintaining and using their property so that it does not pose known dangers to others.',
									children: [
									]
								},
								{
									title: 'Attractive Nuisance Doctrine',
									subtitle: '',
									description: 'Under the ATTRACTIVE NUISANCE DOCTRINE an OCCUPIER OF LAND who knows that children have or may in the future trespassed onto her land has a strict duty to inspect for and eliminate any condition posing dangers the children might not fully appreciate because of their young age.<br /><br />This is a duty based on RELATIONSHIP which poses almost strict liability. The only defense the landowner may raise is assumption of the risk.',
									children: [
									]
								},
								{
									title: 'Liability based on Rescuer Doctrine / Firemans Rule',
									subtitle: '',
									description: 'Under the RESCUER DOCTRINE defendants may be liable to rescuers who are injured attempting to rescue people injured.<br /><br />But under the FIREMAN\'S RULE defendants are generally not liable to professional rescue workers because they have ASSUMED THE RISKS associated with their professions.',
									children: [
									]
								},
								{
									title: 'Breach of Duty',
									subtitle: '',
									description: 'Under tort law a BREACH is the failure to exercise DUE CARE. The standard of due care is that level of caution a reasonably prudent person would use in the same circumstance.',
									children: [
									]
								},
								{
									title: 'Breach based on Res Ipsa Loquitur',
									subtitle: '',
									description: 'Under the doctrine of RES IPSA LOQUITUR an INFERENCE OF BREACH exists if 1) negligence by someone is implied by the facts, 2) the defendant had control of the event or instrument that caused injury, and 3) the plaintiff had no control over the event or instrument causing injury.',
									children: [
									]
								},
								{
									title: 'Breach based on Negligent Entrustment',
									subtitle: '',
									description: 'Under tort law defendants who NEGLIGENTLY ENTRUST third parties with resources or authority are directly liable for injuries actually and proximately caused as a result. ',
									children: [
									]
								},
								{
									title: 'Respondeat Superior',
									subtitle: '',
									description: 'Under the doctrine of RESPONDEAT SUPERIOR an employer, master or principal is vicariously liable for all torts committed by an employee, servant or agent, respectively, if the tort is committed within the scope of the employment or agency relationship. <br /><br />Respondeat superior does not apply to independent contractors.',
									children: [
									]
								},
								{
									title: 'Vicarious Liability for Joint Enterprise',
									subtitle: '',
									description: 'Under tort law each member of a JOINT ENTERPRISE is vicariously liable for all torts committed by other members within the scope of the enterprise relationship. A joint enterprise is one in which two or more parties agree to work together for mutual benefit and each shares equal rights of control over assets and activities.',
									children: [
									]
								},
								{
									title: 'Liability for acts of an Independent Contractor',
									subtitle: '',
									description: 'Under tort law prople who hire INDEPENDENT CONTRACTORS to perform duties that are not "non-delegable" by law are NOT vicariously liable for torts committed by the contractors and can only be directly liable because of negligent selection or negligent entrustment of the contractors. An independent contractor is a person selected to provide labor services without close and regular supervision [e.g. gardeners, housekeepers, house painters and babysitters that are not employed on an exclusive and continuous basis.]',
									children: [
									]
								},
								{
									title: 'The Actual Cause or Substantial Factor causing Injury',
									subtitle: '',
									description: 'Under tort law the defendant is the ACTUAL CAUSE of injury if the plaintiff would not have been injured BUT FOR the acts of the defendant.<br /><br />If two or more defendants acted negligently, the plaintiff would not have been injured if neither had acted, and the plaintiff cannot reasonably prove she would not have been injured but for the acts of each alone, then each defendant is a SUBSTANTIAL FACTOR causing injury.',
									children: [
									]
								},
								{
									title: 'Proximate Cause',
									subtitle: '',
									description: 'Under tort law PROXIMATE CAUSE means that the injury suffered by the plaintiff was so DIRECT, NATURAL and FORESEEABLE, so close in time and place, resulting from a CHAIN OF CAUSATION begun by the defendant\'s acts, unbroken by UNFORESEEABLE INTERVENING EVENTS that the law will impose liability for the result.<br /><br />Generally if two or more events are actual causes of the plaintiff\'s injury, the last event will be an UNFORESEEABLE INTERVENING EVENT cutting off the liability of all defendants who acted earlier. However, it is a matter of settled law that negligent acts by others are FORESEEABLE so they can never be intervening events. Acts of nature [e.g. tornados] and criminal or intentionally tortious acts by third parties [e.g. thefts, batteries] are presumed to be UNFORESEEABLE and will terminate defendants\' liability unless extrinsic evidence shows defendants were aware the subsequent events were likely to occur.',
									children: [
									]
								},
								{
									title: 'Egg Shell Plaintiff',
									subtitle: '',
									description: 'Under the EGG-SHELL PLAINTIFF concept, defendants are liable for all damages they actually cause plaintiffs, even if the plaintiffs , through no fault of their own, have pre-existing conditions that make them especially vulnerable to injury. The doctrine of the law is that "defendants must take plaintiffs as they find them." <br /><br />What if the injury suffered by the plaintiff is different and/or more severe than the defendant ever could have foreseen?<br /><br />The phrase "egg-shell plaintiff" means the plaintiff had peculiar characteristics that cause the damage resulting from a defendant\'s ACT to be far worse than could be expected.<br /><br />It is SETTLED LAW that the defendant is LIABLE no matter how unforeseeable the injury of the plaintiff is.<br /><br />It is said that the defendant, "takes his plaintiff as he finds him."',
									children: [
									]
								},
								{
									title: 'Special Damages in Negligence',
									subtitle: '',
									description: 'Under tort law DAMAGES are SPECIAL (out of pocket expense)',
									children: [
									]
								},
								{
									title: 'General Damages in Negligence',
									subtitle: '',
									description: 'Under tort law DAMAGES are GENERAL (pain and suffering)',
									children: [
									]
								},
								{
									title: 'Contributory Negligence',
									subtitle: '',
									description: 'Under tort law CONTRIBUTORY NEGLIGENCE is a complete bar to recovery if the plaintiff was responsible in any manner for their injury. It is a MINORITY VIEW rule.',
									children: [
									]
								},
								{
									title: 'Comparative Negligence',
									subtitle: '',
									description: 'The MAJORITY approach is COMPARATIVE NEGLIGENCE which just reduces the plaintiff\'s recovery based on the degree of fault of the plaintiff. In some states a plaintiff that is over 50% at fault for her own injuries is completely barred from recovery. ',
									children: [
									]
								},
								{
									title: 'Assumption of the Risk',
									subtitle: '',
									description: 'Under tort law ASSUMPTION OF THE RISK is a complete defense when plaintiffs 1) put themselves at risk, 2) with a full awareness of the risks, and 3) a conscious acceptance of the risks.',
									children: [
									]
								},
								{
									title: 'Last Clear Chance',
									subtitle: '',
									description: '',
									children: [
									]
								},
								{
									title: 'Negligent Infliction of Emotional Distress (NIED)',
									subtitle: '',
									description: 'Under tort law, a BYSTANDER to an event may bring an action for NEGLIGENT INFLICTION if they suffer severe emotional distress and there is a nexus between the negligent act and the injury based on a PROXIMITY IN TIME, PLACE and RELATIONSHIP. In some jurisdictions a physical manifestation of emotional distress must be shown. <br /><br />Do not discuss NIED unless the plaintiff is a BYSTANDER who only witnesses or hears about some accident that injures another person. If the plaintiff is actually, physically involved in an event they have an action for NEGLIGENCE and can recover for their "emotional distress" as special damages.',
									children: [
									]
								}
							]
						},
						{
							title: 'Products Liability',
							subtitle: 'A person who places unreasonably dangerous product into the stream of commerce is liable for the injury it causes.',
							description: 'Under PRODUCT LIABILITY LAW a person who places an unreasonably dangerous product into the steam of commerce may be liable for the injury it causes. There are four basic theories on which a product liability action may be brought: Breach of Express Warranty, Breach of Implied Warranty, Negligence and Strict Liability.',
							children: [
								{
									title: 'Unreasonably Dangerous',
									subtitle: 'Product is unreasonably dangerous if it poses serious / likely dangers, could be reduced / eliminated easily, without damaging product utility or product utility does not justify the dangers posed.',
									description: 'A product is unreasonably dangerous if it 1) poses serious and likely dangers, that 2) could be reduced or eliminated easily, 3) without damaging product utility, or else 4) the product utility does not justify the dangers posed. <br /><br /><b>Example 1:</b><br /><br />Here the product presented serious and likely dangers because it could burst into flame under normal use, and those dangers could have been eliminated or reduced easily by putting a warning on the saw.<br /><br />Therefore this was an unreasonably dangerous product at the time of sale. <br /><br /><b>Example 2:</b><br /><br />Here, the facts state that K manufactured the ATV and the steering system. Because Charlie was riding the ATV in his yard, K would have to release the ATV into the stream of commerce so that it could be obtained by a consumer such as Charlie. The steering wheel stuck, demonstrating that the ATV was defective, and an unsteerable ATV is unreasonably dangerous as shown by the fact that Charlie could not control it and it rolled into the street in front of Paul\'s car. Finally, the ATV caused injury because it rolled directly in front of Paul\'s car while he was driving, and the facts says the accident caused Paul serious personal injuries as well as vehicle damage.<br /><br />K may argue that the ATV did not cause the damage, Paul texting did, btu this issue will be discussed below under "Products liability (Negligence.)"<br /><br />Thus, it appears that Paul may be able to prevail in a products liability case against K.'
								},
								{
									title: 'Breach of Express Warranty',
									subtitle: 'Product is sold with express representation, buyer relies on it, representations were incorrect, causing injury.',
									description: 'Def 1: Under tort law there is a <b>BREACH OF EXPRESS WARRANTY</b>, the plaintiff must show the defendant <b>sold goods with express representations</b> (express warranty) which <b>made them unreasonably dangerous</b>, and that it was the actual and proximate cause of injury to the plaintiff. <br /><br />Def 2: Under tort law there is a <b>BREACH OF EXPRESS WARRANTY </b>if a product is sold with 1) <b>express representations</b> that the buyer 2) <b>relies on</b> and 3) the <b>representations are incorrect</b> and 4) it <b>causes the purchaser injury</b>. The seller is liable to foreseeable plaintiffs, those with privity of contract or their family.<br /><br /><b>Example 1:</b><br /><br />Here Sam made express representations to Tom because he said the saw "would cut 36in trees" and Tom relied because he "bought" the saw. This was incorrect because the saw would only cut "18in trees" and this caused injury because Tom was "burned" when the saw caught on fire. And Tom had privity of contract because he was a "purchaser". <br /><br />Therefore, Tom can recover under a breach of warranty theory. <br /><br /><b>Example 2:</b><br /><br />Here Dick cannot recover under breach of express warranty because Sam only said he was an "expert" and "recommended" the saw. These are not express misrepresentations. <br /><br /><b>Example 3:</b><br /><br />Here Harry did not buy the saw from Sam so there is no privity of contract between them and Harry was not a foreseeable plaintiff to Sam. Further, Sam made no express or implied representations to Harry. <br /><br />Therefore, Harry cannot recover based on breach of warranty. '
								},
								{
									title: 'Breach of Implied Warranty',
									subtitle: 'Product is unsafe for ordinary use and buyer relies on the expertise of seller and got injured as a result.',
									description: '<b>Def 1:</b> Under tort law there is a <b>BREACH OF IMPLIED WARRANTY</b> theory, the plaintiff must show the <b>defendant sold goods</b> by <b>representing</b> they were <b>safe for ordinary use</b> or knowing the buyer\'s specific intended use (implied warranty), the goods <b>were unreasonably dangerous for that use</b>, and that it was the actual and proximate cause of injury to the plaintiff. <br /><br /><b>Def 2:</b> Under tort law there is a <b>BREACH OF IMPLIED WARRANTY</b> if a <b>product is unsafe</b> for <b>ordinary use</b> or for the <b>buyer\'s known intended use</b>, the buyer <b>relies on</b> the expertise of the seller, and the <b>buyer is injured</b> as a result. The seller is liable to foreseeable plaintiffs, those with privity of contract or their family. <br /><br /><b>Example 1:</b><br /><br />Here Tom would argue he bought the saw for ordinary use, relied on Sam\'s expertise, and was injured as a result. Sam might argue that he did not know what Tom\'s intended use was, and there was no evidence Tom relied on his expertise.<br /><br />Therefore, Tom can pursue recovery on a breach of implied warranty theory. <br /><br /><b>Example 2:</b><br /><br />Here Dick relied on Sam\'s expertise because Dick said he "didn\'t know" about saws and Sam said he was an "expert". And Sam knew Dick\'s intended use of the saw because he said he wanted to cut "24inc trees". Further, the saw was not safe because it could only cut 18inch logs, and this caused injury because the saw "caught fire" and Dick was "burned".<br /><br />Therefore, Dick can recover under breach of implied warranty. <br /><br /><b>Example 3:</b><br /><br />Here Harry did not buy the saw from Sam so there is no privity of contract between them and Harry was not a foreseeable plaintiff to Sam. Further, Sam made no express or implied representations to Harry. <br /><br />Therefore, Harry cannot recover based on breach of warranty. <br /><br /><b>Example 4:</b><br /><br />Liability can be imposed against the manufacturer or seller of a product based upon the buyer\'s reliance upon express and / or implied warranties that the goods are of merchantable quality and are fit for their intended purpose.<br /><br />Here, there would be an implied warranty by K that the ATV was safe for riding, since riding would be its intended purpose. As discussed supra, the ATV\'s steering mechanism malfunctioned, which meant it was unsafe to ride. <br /><br />Therefore, K can be held liable under a theory of Breach of Implied Warranty.'
								},
								{
									title: 'Negligence',
									subtitle: 'Defendant has duty to not place unreasonably dangerous goods into stream of commerce. It is failure to use the care which a reasonable person would do in same circumstances. To prevail, he has to prove duty, breach, causation, damages.',
									description: '<b>Def 1:</b> Under a Negligence theory the defendant has a <b>duty</b> <b>not</b> to place unreasonably <b>dangerous goods</b> into the <b>stream of the commerce</b>. The <b>plaintiff</b> must be a <b>foreseeable plaintiff</b> proximately <b>caused injury</b> by the negligent acts of the defendant.<br /><br />  <b>Def 2:</b> Negligence is a <b>failure to use the care</b> a <b>reasonable person</b> would in the same circumstance. To prevail the plaintiff must prove <b>duty, breach, actual cause, proximate cause and damages</b>.<br /><br />  <b>Example 1:</b><br /><br />  <b>DUTY?</b><br /><br />  Under tort law a person has a <b>duty to not put an unreasonably dangerous product into the stream of commerce</b>. Further, a person who makes express representations about a product assumes a duty of due care to make sure they are accurate and will not create peril.<br /><br />  Here Sam owed a DUTY because he was the seller of a product that posed foreseeable harm.<br /><br /> <b>BREACH?</b><br /><br /> Sam <b>BREACHED</b> his duty because he "never read the owner\'s manual" and misrepresented the saw.<br /><br /> <b>CAUSATION?</b><br /><br /> That was the <b>ACTUAL CAUSE</b> of his injury because he would not have been hurt if he did not buy the saw. This was also the <b>PROXIMATE CAUSE</b> of injury because it was the <b>direct and foreseeable result</b>.<br /><br />  <b>DAMAGES?</b><br /><br />  Tom had INJURY because he was "burned".<br /><br /> Therefore, Tom could recover on a negligence Theory. <br /><br />  <b>Example 2:</b><br /><br /> Dick\'s rights under negligence is same as example 1.<br /><br /> <b>Example 3:</b><br /><br />It is not clear that Sam was the PROXIMATE CAUSE of the injury to Harry because Moe\'s act of throwing the saw in the garbage appears to be an interceding event that breaks the cahin of causation.<br /><br /> Therefore, Harray\'s injury might be too remote in place and causation for recovery on a negligence theory. <br /><br />  <b>Example 4:</b><br /><br /> In order for a plaintiff to recover under a negligence theory of products liability, the plaintiff will have to prove duty, breach, causation, and damages.<br /><br />Here, K had a duty to make a safe ATV, which would include a steering system that works properly. Since Charlie\'s ATV had a malfunction, that is sufficient (at least under the doctrine of res ipsa loquitur) to show that K breached his duty to make a safe ATV.<br /><br /> K may argue that its duty extends to Charlie, not to Paul, but privity is not required to hold a manufacturer liable for injuries caused by a defective product, even including those who are bystanders.<br /><br /> "But for" the ATV\'s steering malfunction, Charlie would not have panicked, the ATV would not have gone into the street, and Paul would not have hit it.<br /><br /> K will argue that Paul\'s texting and resulting failure to see the ATV was an intervening act which led to the damage, and will also argue that Charlie\'s failure to use the brakes or turn off the motor caused the accident. However, Charlie\'s failure to brake is dependent intervening act because he wouldn\'t have panicked if the steering hadn\'t failed. Further, it is foreseeable that if an ATV\'s steering malfunctions, the rider (especially one who is only 12 years old) might panic and jump off. Regarding Paul\'s texting, this is an independent intervening act since Paul would have been texting even if the ATV\'s steering had not malfunctioned. But the result of the malfunction is highly foreseeable since an ATV which is unsteerable is very likely to cause an accident. Thus, these events will probably not be enough to break the chain of causation.<br /><br /> Damages to Paul were discussed supra.<br /><br />  Therefore, since K had a duty to make a safe ATV and breached that duty, which was the actual and proximate cause of Paul\'s damages, K will be held liable under a negligence theory of products liability.'
								},
								{
									title: 'Strict Product Liability',
									subtitle: 'Commercial seller of product is strictly liable for the injury if the product is unreasonably dangerous at the time it left the defendant\'s control.',
									description: '<b>Def 1:</b> Under a Strict Liability theory, the plaintiff must show the <b>seller was COMMERCIAL SUPPLIER</b>, the product was <b>unreasonably dangerous</b> at the <b>time it left the defendant\'s control</b>, and defendant is only liable for <b>non-economic damages</b>. <br /><br />  <b>Def 2:</b> Under tort law a <b>commercial seller</b> of a product is strictly liable for <b>personal injury</b> or property damage if the <b>product is unreasonably dangerous</b> at the time it <b>leaves the seller</b>. The seller is liable to any person who is injured as a result. <br /><br />  <b>Example 1:</b> <br /><br />  Here Sam was a commercial seller because he had a store, the "Bargain Center", selling the product. And the product was unreasonably dangerous because it "burst into flames" in normal use and had "no warnings on the saw". This caused Tom injury because he was "burned". <br /><br />  Therefore, Tom can recover under strict liability.  <br /><br />  <b>Example 2:</b> <br /><br />  Dick\'s rights under strict liability is same as example 1.  <br /><br />  <b>Example 3:</b> <br /><br />  Here Sam would argue that even though he originally put the saw into the stream of commerce, it was TAKEN OUT OF THE STREAM OF COMMERCE because Moe threw it in "garbage". Further, he would argue that Harry ASSUMED THE RISKS the saw as defective when he took it out of the garbage. <br /><br />  Therefore, Harry might not be able to recover under strict product liability.  <br /><br />  <b>Example 4:</b> <br /><br />  Strict liability may be imposed against a manufacturer or seller of a product which is defective and therefore unsafe for its anticipated use, or for failure to warn the consumer of an inherent danger involved in the use of the product when put to an intended or foreseeable use. <br /><br />  Here, the ATV was defective and thus unsafe for riding, which would be its anticipated use. Further, although Charlie was only 12, the ATV was small and manufactured by a company named "Kiddie Rides-R-Us," which implies they make products for "Kiddies" to "ride." It seems not only reasonable for Charlie to have been riding it, but also that he was probably a targeted market for K\'s ATV sales. Additionally, if this product was not safe for 12-year-olds to ride, K should have warned of that, and no such warning is given in the facts. <br /><br />  Thus, K can be held liable under a theory of Strict Liability in Tort.'
								},
								{
									title: 'Intentional Theory',
									subtitle: 'Supplier knew product would cause harm.',
									description: 'In order for the plaintiff to recover on a theory of intent (battery), the plaintiff must prove that the manufacturer, distributor or supplier knew the product would cause harm.'
								},
								{
									title: 'MacPherson v. Buick',
									subtitle: 'Duty is owned to not only to consumer of products but to all persons who are likely to get endangered.',
									description: 'In this landmark case, Justice Cardozo dispensed with the previously applied requirement of privity of contract in products liability cases and extended the manufacturer\'s duty of care to include the ultimate consumer of the product, whether or not the consumer was the actual purchaser of the product. Later cases extended the duty to include not just the purchaser or the ultimate consumer, but to include all persons and property likely to be endangered by the product\'s probable use, such as the consumer\'s family or guests, or even near bystanders.'
								},
								{
									title: 'Defect Types',
									subtitle: 'Design defect, product designed as intended but dangerous to consumers, Manufacturing defect, where product not made as intended and one of the products is different from others, Warning defect where dangers are not apparent to customers.',
									description: 'In order to recover, it must be proved that the product is defective in:<br /><br /><b>Design</b> (product designed as intended, but creates an unreasonable danger to consumers) - but beware of state of the art as a defense; if it\'s unavoidably unsafe and its benefits outweighs its dangers, there may be no liability.<br /><br /><b>Manufacture</b> (product is not made as intended) - look for product to be different from the rest due to bad assembly, materials, or pa> rts.<br /><br /><b>Warning</b(dangers not apparent to customers).<br /><br /><b>Example 1:</b><br /><br />In order to recover, it must be proved that the product is defective in 1) design, 2) manufacturing, or 3) warning<br /><br />Here, the facts state that the steering wheel stuck "because of malfunction in the steering system." There is nothing in the facts to suggest that Charlie or anyone else changed the steering system after K sold i, so it can be assumed this defect existed when the ATV left K\'s manufacturing plant. If all similar ATV\'s of this model had the same defect, then it would be a design defect. However, since the facts don\'t say this, it seems most likely that other similar ATV\'s were okay, so this was most likely a manufacturing defect, which occurs when one product was not made as intended.<br /><br />Because the facts state there was a malfunction," the ATV had a defect.',
									chldren: [
										{
											title: 'Design Defect',
											subtitle: 'Product designed as intended, but creates an unreasonable danger to consumers',
											description: '(product designed as intended, but creates an unreasonable danger to consumers) - but beware of state of the art as a defense; if it\'s unavoidably unsafe and its benefits outweighs its dangers, there may be no liability.'
										},
										{
											title: 'Manufacturing Defect',
											subtitle: 'Product is not made as intended',
											description: '(product is not made as intended) - look for product to be different from the rest due to bad assembly, materials, or parts.'
										},
										{
											title: 'Warning Defect',
											subtitle: 'Dangers not apparent to customers',
											description: '(dangers not apparent to customers).'
										},	  
									]
								}		   
							]
						},
						{
							title: 'Defamation',
							subtitle: 'false statement, published, causing damage to reputation',
							description: 'Under tort law <b>DEFAMATION</b> is a <b>FALSE statement</b> of material fact <b>PUBLISHED</b> to others about the plaintiff <b>CAUSING DAMAGE to REPUTATION</b>. Defamation may be <b>SLANDER</b>, an oral statement, or <b>LIBEL</b>, a written statement. <br /><br />Note: It is usually a mistake to discuss both defamation and false light concerning the same statement because if it is a statement that would damage one\'s reputation the issue is clearly defamation, not false light. If the statement does not damage the plaintiff\'s reputation but only causes embarrassment otherwise, it is not defamation and can only be false light.<br /><br />But many false statements are <b>PRIVILEGED</b> where the defendant speaks to defend a private interest, group interest or the public interest and does so without malice and in a reasonable manner calculated to defend that interest without unnecessarily harming the plaintiff.<br /><br />Injury to reputation will be presumed where there is LIBEL or <b>SLANDER PER SE</b>. <b>SLANDER PER SE</b> is found where the false statement alleges <b>CRIMINAL</b> behavior, <b>LOATHSOME</b> disease, <b>UNCHASTE</b> behavior or improper BUSINESS practices.<br /><br />Under <b>NEW YORK TIMES</b> and its progeny, a <b>PUBLIC FIGURE PLAINTIFF</b> must prove <b>ACTUAL MALICE</b>, that the false statement was made with knowledge or reckless disregard of its falseness, in order to recover in a defamation action. A <b>PUBLIC FIGURE</b> is a person who has acted to put themselves in the public spotlight. Further, where a matter of <b>PUBLIC CONCERN</b> is at issue, or where the plaintiff seeks punitive damages, the plaintiff must at least prove <b>NEGLIGENCE</b>.<br /><br /><b>More Explanation about per se and per quod:</b><br /><br />Certain types of defamatory statements were damaging to reputation. Those are called defamation per se. If a statement is defamation per se, the Court may award a money judgment to plaintiffs without requiring any further evidence they suffered injury.<br /><br />Other defamatory statements that were are not so clearly damaging to reputation were called defamation per quod. If a statement was defamation per quod, the Court could not award a money judgment to the plaintiffs unless they presented convincing evidence they suffered monetary losses as a result of the statements.<br /><br />Whether statements are defamation per se or defamation pre quod depends on three factors:<br />1. Whether statements are insinuations that have to be interpreted by the listener or clearly defamatory statements about the plaintiff;<br />2. Whether the statements are written or oral; and<br />3. The subject matter of the statements.<br /><b>Insinuations</b><br />Under the common law insinuations that might harm the reputation of the plaintiff were always defamation per quod whether they are oral or written, and no matter what the subject matter might be.<br /><br />Three types of "insinuations" were recognized by the common law: innuendo, colloquium, and inducement. <br /><br />The important point is that if defendants do not clearly identify the plaintiffs as the subject of their statements, or the statements do not clearly make factual assertions about the plaintiffs that would damage their reputations, they are "insinuations" and defamations per quod in all cases.<br /><br />If defendants make statements that clearly identify the plaintiff and allege facts that would injure the plaintiff\'s reputation, they are clearly defamatory. But whether they were defamation per se or defamation per quod depended on whether the statements are libel or slander.<br /><br /><b>A. Libel:</b><br />A defamatory statement is libel if it is written or recorded in a manner that gives its damaging effects longevity. Under the common law a written defamatory statement about the plaintiff was libel and libel was always defamation per se, regardless of the subject matter.<br /><br /><b>B. Slander</b><br />A defamatory statement is slander if it is oral or transitory in nature so that the damaging effect soon dissipates. Under common law an oral defamatory statement about the plaintiff was slander but it was only defamation per se if it accused the plaintiff of one of the following four things:<br /><br />- Having committed a serious crime; <br />- Having a loathsome disease; <br />- Engaging in sexual misconduct. (Unchaste Behavior) OR <br />- Engaging in business or professional misconduct; <br />Remember: <b>CLUB</b><br /><br />Any slander regarding any other subject matter was always defamation per quod.<br /><br />If plaintiffs prove the elements of defamation per se the Court can award money judgments without any proof the plaintiffs suffered monetary losses. These are general damages. If the plaintiff also proves the statements caused monetary losses those are special damages and they can be awarded in addition. This is often phrased, "The plaintiff can get generals without proving specials."<br /><br />If plaintiffs only prove the elements of defamation per quod the Court cannot award any damages at all until unless the plaintiffs prove the defamations caused monetary losses. Those are special damages. If plaintiffs do prove special damages, the Court can award general damages in addition to the special damages. But if plaintiffs fail to prove defamations per quod caused monetary losses the plaintiffs get nothing. This is often phrased, "The plaintiff must prove specials to get generals".',
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
							title: 'Invasion to Privacy',
							children: [
								{
									title: 'False Light?',
									subtitle: 'Publishing false portrayal of a person causing him embarrassment.',
									description: 'Under tort law <b>FALSE LIGHT</b> is the tort of publishing a <b>false portrayal of a person</b> in a manner that would <b>cause them embarrassment</b> or inconvenience.<br /><br /><b>Example 1:</b> <br /><br />Here Inkwire published a portrayal about Ellen because it "reported she was a secret philanthropist." This was a false portrayal because she was a "tightwad." And this caused her embarrassment because she was "besieged with requests" that were "professionally impossible" to reject. Ellen\'s damages would generally be measured by the amount of embarrassment she was caused.<br /><br />Therefore, Inkwire may be liable for invasion of privacy under a false light theory.'
								},
								{
									title: 'Appropriation of likeness?',
									subtitle: 'Unauthorized use of likeness of another person for personal gain in a manner that implies endorsement of a product.',
									description: 'Under tort law <b>APPROPRIATION</b> is the tort of <b>unauthorized use</b> of the <b>likeness</b> of another person <b>for personal gain</b> in a manner that <b>implies endorsement of a product</b> or cause.Damages are generally measured by the profit to the defendant.<br /><br /><b>Example 1:</b> <br /><br />Here there was a use of Ellen\'s photo and name because billboards with her "picture" said "Ellen D. Generate" buys their paper. And the use was not authorized because she did not give permission. The purpose of the billboards was to profit by implying she endorsed their paper.<br /><br />Ellen\'s damages would generally be measured by the profits Inkwire made from using her likeness.'
								},
								{
									title: 'Intrusion into the plaintiff\'s solitude?',
									subtitle: 'Unreasonable intrusion into peace of another person',
									description: 'Under tort law <b>INTRUSION</b> is the tort of <b>unreasonable intrusion</b> into the peace and <b>solitude of another person</b>. Damages are measured by the value of lost solitude to the plaintiff.<br /><br /><b>Example 1:</b> <br /><br />Here there was an unreasonable intrusion because Dick sent a "submarine" to photograph Ellen through a "telephoto lens". It disturbed her peace and solitude because she had attempted to be alone in a secluded place "miles" from shore with a "posted lookout." Ellen suffered damages because it "embarrassed her" into "seclusion" in her home for "six weeks."<br /><br />Dick would argue that Ellen had no reasonable expectation of privacy because she was "in international waters." Ellen would counter that she had a reasonable expectation of privacy because of the location and precautions she had taken.<br /><br />Therefore, Inkwire may be liable for intrusion.'
								},
								{
									title: 'Public Disclosure of Private Facts?',
									subtitle: 'Disclosing private facts that would find embarrasing in a reasonable person.',
									description: 'Under tort law <b>PUBLIC DISCLOSURE </b>is the tort of <b>unreasonably disclosing private facts</b> that a reasonable person would find <b>embarrassing</b>. <br /><br /><b>Example 1: </b><br /><br />Here there was a public disclosure because Inkwire "ran the interview" in its publication. And the facts were private facts because they were told to the ex-boyfriend in "strictest confidence." These were embarrassing facts because they concerned an "abortion", a matter of personal intimacy, and of a nature likely to cause public disdain and ridicule. Ellen would argue Inkwire acted in an unreasonable manner.<br /><br />Inkwire would argue that it acted reasonably because these facts were a matter of legitimate public concern since Ellen had injected herself into the public arena as a "strong and vocal anti- abortion advocate." Inkwire would argue the public had a right to know Ellen\'s true background since she sought to influence public opinion on this controversial topic.<br /><br />Therefore, Ellen might fail to show Inkwire acted unreasonably.'
								}
							]
						},
						{
							title: 'Nuisance',
							children: [
								{
									title: 'Private Nuisance',
									subtitle: 'Unreasonable interference with person\'s use of their own land.',
									description: 'Under tort law <b>PRIVATE NUISANCE</b> is an <b>unreasonable interference</b> with a person\'s use and <b>enjoyment of their own land</b>.<br /><br /><b>Example 1:</b> <br /><br />Here there was some interference because the County airport caused "noise" that prevented Ken from "enjoying his yard" and "hearing the birds." And this involved the use of Ken\'s land because it was his "house" and "yard."<br /><br />The two elements that would be most difficult to prove are whether Ken suffered significant damages, and whether the County action was unreasonable. The County would argue that the noise was insufficient interference to prevent Ken from enjoying his land because Ken "didn\'t think the noise was so bad" when he bought the house. He in effect CAME TO THE NUISANCE, and that fact suggests the situation was not as bad as Ken claims.<br /><br />But Ken would try to prove that the interference was unreasonable because the County let flights increase "ten percent" in only "four years."<br /><br />The County would also argue it did not cause the nuisance, and had not acted irresponsibly. The County might argue it was not responsible because the increase in noise was caused by "military use" beyond their control. Alternatively, the County would argue that it acted reasonably because the flights were in response to the "Romaria crisis."<br /><br />Ken would argue he suffered damages because the value of his home was less that it otherwise would be. But the County would argue there was no proof of financial loss because the home had gone up in value and the claim of loss was speculative. Further, the County would argue there was no proof the birds did not sing as much as before.<br /><br />Therefore, the County might be liable for private nuisance depending on whether Ken could prove these legal elements.'
								},
								{
									title: 'Public Nuisance',
									subtitle: 'Unreasonable interference with person\'s use of public resources.',
									description: 'Under tort law <b>PUBLIC NUISANCE</b> is an <b>unreasonable interference</b> with a person\'s use and <b>enjoyment of public resources</b>. To have standing the plaintiff must show particular <b>injury</b>, <b>greater than</b> that suffered <b>by the general public</b>.<br /><br /><b>Example 1:</b> <br /><br />Here the noise interferes with the enjoyment of public land because it prevents Ken from "hearing the birds sing" on the "public river parkway."<br /><br />The County may argue that Ken lacks standing because he does not suffer any injury that is different from any other member of the public. But Ken suffers particular injury because his home is "on the river" and he could hear the birds sing "from his backyard."<br /><br />Ken would have to prove the other elements of nuisance which are discussed above under private nuisance.<br /><br />Therefore, the County may be liable for public nuisance, depending on whether Ken can prove the County\'s action is unreasonable and produces significant damages.'
								}, 
								{
									title: 'Coming to the Nuisance',
									subtitle: 'Plaintiff moved to location where condition already existed is a defense.',
									description: 'Under tort law <b>COMING TO THE NUISANCE</b> is the defense that the <b>plaintiff moved</b> to the location where the <b>condition complained of already existed</b>. It is a <b>complete bar</b> in a MINORITY view, but in the MAJORITY view it is only a <b>factor</b> to be considered in <b>determining damages</b>.<br /><br /><b>Example 1:</b> <br /><br /> Here Ken moved to the location because he "purchased the home." And the condition already existed because he "realized his home was in the flight path" and the "realtor disclosed the fact."<br /><br />Ken would argue that even though problems existed when he bought the home, they worsened after that. Further, he would argue that in any event the County action is unreasonable per se.<br /><br />Therefore, the court would consider Ken\'s coming to the nuisances only as a factor in determining damages in most States.'
								}, 
								{
									title: 'Nuisance Remedies',
									subtitle: 'Remedies are money damages and injunctive relief.',
									description: 'The <b>REMEDIES</b> for a nuisance action include both <b>money damages</b> and <b>injunctive relief</b>.<br /><br />If the nuisance is a temporary situation money damages measured by the loss of use for the period of the nuisance will be an adequate remedy. If the nuisance would continue but for injunctive relief, the Court would consider granting an injunction. Injunctive relief is an equitable remedy, and the court has discretion to deny it. The Court will balance the interests of the parties, the interests of third parties and the feasibility of judicial enforcement. If the Court denies injunctive relief, the appropriate remedy is an award of money damages measured by the loss of property value caused by the nuisance.<br /><br /><b>Example 1:</b> <br /><br /> Here the nuisance is a permanent condition, so the Court would consider injunctive relief. But the interest of third parties, people who use the airport, the military, and the County residents would be so significant the Court is unlikely to issue an injunction stopping the airport from continuing operations.<br /><br />Therefore the Court would most likely award Ken money damages to reflect the loss of market value of his property caused by the increase in airport traffic.'
								}		   
							]
						},
						{
							title: 'Miscellaneous',
							children: [
								{
									title: 'Malicious Prosecution?',
									subtitle: '',
									description: 'Under tort law a person is liable for MALICIOUS PROSECUTION if they have instituted or continued a criminal prosecution of another person out of malice and the action was terminated based on its merits because there was no probable cause.'
								},
								{
									title: 'Abuse of Process?',
									subtitle: '',
									description: 'Under tort law a person is liable for ABUSE OF PROCESS if they have brought a civil or criminal action against another person without a legitimate basis out of malice or for an improper purpose.'
								},
								{
									title: 'Illegal Interference?',
									subtitle: '',
									description: 'Under tort law a person is liable for unreasonably and illegally interfering with another person\'s known or apparent business relationships.'
								},
								{
									title: 'Deceit or Fraud or Misrepresentation?',
									subtitle: '',
									description: 'Under tort law a person is liable for 1) making a FALSE STATEMENT OF MATERIAL FACT 2) KNOWING it was false 3) with INTENT TO DECEIVE, 4) that was REASONABLY RELIED upon by the plaintiff, and thereby 5) CAUSING the plaintiff INJURY.'
								},
								{
									title: 'NONDISCLOSURE (CONCEALMENT)?',
									subtitle: '',
									description: 'Under tort law a prima facie case of NONDISCLOSURE (or CONCEALMENT) requires showing 1) a DUTY to disclose material facts, 2) BREACH of that duty, 3) REASONABLE RELIANCE by the plaintiff on facts as they appeared to be, and 4) INJURY CAUSED by the nondisclosure.'
								},
								{
									title: 'TORT RESTITUTION ?',
									subtitle: '',
									description: 'Under tort law plaintiffs have a legal right to "waive the tort" and instead of seeking an award of damages based on the injury they have actually suffered they may demand LEGAL RESTITUTION, an award of a money judgment measured by the amount the defendants have wrongfully benefited as a result of their tortious acts. The purpose of this is to PREVENT UNJUST ENRICHMENT by tortfeasors.'
								}		 		   
							]
						}
					],
					essays: [
						{
							title: 'Sample Essay 1 - Intentional Torts',
							details: 'Clark Kent, star reporter for the Daily Planet was approached by panhandler Bill Gates and asked for a quarter. As a prank, Kent (who was secretly Superman) lifted and very gently flew Gates hundreds of feet up to the top of the World Tribune building and left Gates there on a ledge.<br /><br />Kent hovered over the World Tribune building and never touched the surface of the building. During the flight Gates was apprehensive he might fall, but Kent had a strong grip.<br /><br />Gates was embarrassed and the crowd below taunted him for hours as the fire department tried to devise a means of rescue. Gates was humiliated.<br /><br />As he stood on the ledge Gates accidentally knocked a decorative panel loose. It fell to the ground and injured fireman Frank.<br /><br />Suddenly Gates discovered that there was an unlocked window next to him all the time. He opened the window and escaped immediately.<br /><br />Discuss Kent\'s liability to Gates, the World Tribune and fireman Frank.',
							solutions: [
								data.convertBr(data.Essays.Torts.Sample1)
							]
						},
						{
							title: 'Sample Essay 2 - Negligence',
							details: 'Tom bought some firecrackers in Rural County, where they were legal. He took them into the National Forest where federal law prohibited the possession and use of fireworks. The federal law was enacted to reduce the threat of forest fires and injury on national lands.<br /><br />In the National Forest Tom waded to a gravel bar in the middle of Big River, and there he carefully lit and threw the firecrackers into the air above the river. Occasionally one would fail to explode and it would fall harmlessly into the water. There was no one else around, and there was nothing on the gravel bar that could burn.<br /><br />Little Dick was playing a half-mile upstream from Tom, throwing sticks into Big River. He was three years old. His mother warned him to stay back from the edge of the river because it was dangerous. Dick disobeyed his mother and recklessly pushed a rotted tree into the river and it swirled away in the water. No one was hurt.<br /><br />Half a mile downstream from Tom, Paula was one of five people on the bridge above Big River fishing for trout. Paula was outside the National Forest boundaries. She had ignored a sign that said "No Fishing From Bridge." Fishing from the bridge was prohibited for traffic safety, but she was well off the roadway and there were very few cars this time of year. Paula was sitting carelessly on the edge of the bridge, but it was a nice day, the water was only six feet below her, and she knew how to swim.<br /><br />Tom threw another firecracker into the air and it did not explode. Instead it fell onto the log that Dick had pushed into the river upstream.<br /><br />The log swept down the river for half a mile before the firecracker exploded just as the log swept under the bridge.<br /><br />Paula was startled and fell into the river.<br /><br />Other people that had been fishing rushed off the bridge and down the river bank to rescue Paula as she laughingly climbed up the bank.<br /><br />Harry had been fishing too, but instead of going to help Paula, he stayed on the bridge and took two dollars out of Paula\'s purse. No one saw Harry take the money and the crime was never solved. Paula was hurt and upset.<br /><br />Under what theories can Paula seek to recover from Tom and Dick and what defenses would they raise?',
							solutions: [
								data.convertBr(data.Essays.Torts.Sample2)
							]
						},
						{
							title: "Sample Essay 3 - Products Liability",
							details: 'The Macho-X99 chainsaw is a light-duty chainsaw designed for trees no bigger than 18". In the owner\'s manual said in big red letters, "WARNING -- NEVER TRY TO CUT DOWN A TREE BIGGER THAN 18" OR THIS SAW MIGHT CATCH FIRE." There were no warnings on the saw itself.<br /><br />Tom went into Sam\'s Bargain Center. Sam told him, "This is the best chainsaw on the market. The Macho-X99 will cut trees up to 36" in diameter." Tom bought the Macho-X99 chainsaw.<br /><br />Dick went into Sam\'s Bargain Center and said he didn\'t know much about chainsaws but needed one that could cut a tree about 24" in diameter. Sam told him, "I am an expert when it comes to chainsaws. I recommend this Macho-X99." Dick bought the Macho-X99 chainsaw.<br /><br />Moe went into Sam\'s Bargain Center and bought the Macho-X99 chainsaw without any discussion.<br /><br />Sam, Tom and Dick never read the owner\'s manual and were unaware of the potential fire danger. When Tom and Dick tried to cut down trees bigger than 18" the saws burst into flames and burned them.<br /><br />Moe saw the warning in the owner\'s manual and tried to return the saw. Sam refused to give Moe his money back. Moe was disgusted and threw the saw in the garbage "Dumpster".<br /><br />Harry saw Moe\'s old saw in the garbage and took it. There was no owner\'s manual, but the saw was just like brand new. When he first used the saw it burst into flames and burned him.<br /><br />Discuss all the theories under which Tom, Dick and Harry would seek to recover from Sam. Under which theories can they NOT recover?',
							solutions: [
								data.convertBr(data.Essays.Torts.Sample3)
							]
						},
						{
							title: "Sample Essay 4 - Defamation",
							details: "Barbara, the famous TV news lady, was assigned to do a story on former governor, Pat Wilson, to find out why Wilson had become almost a recluse in the years since he left office.<br /><br /> Barbara interviewed Wilson at his home. Wilson's speech was slurred, his eyes were bloodshot and he was unsteady. Barbara asked him about his health, and he declined to comment. Barbara knew Wilson had once been an alcoholic, and she suspected he had begun drinking heavily again. But she did not ask him about this because she knew he would deny it. <br /><br />On TV Barbara accurately described Wilson's slurred speech, bloodshot eyes and unsteady gait. Then she stated, \"It appears that someone we once knew and respected has gone back to his old ways.\" She did not state who the \"someone\" was, and she did not explain what she meant by \"his old ways.\" <br /><br />Because of the news broadcast, rumors rapidly spread that Wilson had again developed a drinking habit. Wilson's approval in polls fell dramatically, and he was passed over for the post of State Republican Chair, but he had little chance of being selected for that post. <br /><br />Wilson demanded a retraction and apology, but Barbara refuses. Discuss potential action by Wilson.",
							solutions: [
								data.convertBr(data.Essays.Torts.Sample4)
							]
						},
						{
							title: 'Sample Essay 5 - Invasion of Privacy',
							details: 'The National Inkwire focused on sensational articles about celebrities, complete with candid pictures taken during private moments. Actress Ellen D. Generate was pursued relentlessly.<br /><br />One time The National Inkwire reported that Ellen was secretly a generous philanthropist. In fact, Ellen was a tightwad. As a result of the Inkwire article, Ellen was besieged by requests for donations, and it was professionally impossible for her to turn them all down.<br /><br />Then the Inkwire photographer, Dick took pictures of Ellen sunbathing topless on her sailboat. At the time the photo was taken Ellen was anchored four miles from land in international waters, and she had her friend Anne posted as a lookout to warn of any approaching boats or airplanes. The way Dick got the photo was by using a remote controlled, miniature submarine with a powerful telephoto lens.<br /><br />Ellen was so embarrassed by the nude photo that she remained secluded in her home for weeks.<br /><br />Ellen decided to sue the Inkwire, so she went to the grocery store and bought a copy of the issue with her photo to show her lawyer. Unfortunately Dick was following her and he took a picture of Ellen buying the Inkwire. Then Inkwire put the picture of Ellen on billboards nationwide with a caption that said "Ellen D. Generate buys Inkwire!"<br /><br />Before Ellen could file suit the Inkwire ran an interview with Ellen\'s old boyfriend from college. He said that even though Ellen was now a strong and vocal anti-abortion advocate, she had an abortion herself in college. This was a true fact that Ellen had told her ex-boyfriend in strictest confidence. This disclosure embarrassed Ellen and made her look like a hypocrite.<br /><br />Discuss the possible actions Ellen might bring against the Inkwire and their defenses.',
							solutions: [
								data.convertBr(data.Essays.Torts.Sample5)
							]
						},
						{
							title: 'Sample Essay 6 - Nuisance',
							details: 'Ken was a politician from Los Angeles. He moved to Sacramento and purchased a spacious home on the Sacramento River. He felt he got a great deal because he only paid $400,000 and a similar home in Los Angeles would have cost him three times that amount.<br /><br />Ken realized his home was directly in the flight path of the airplanes taking off and landing from the County airport, and the realtor had prominently disclosed this fact on the sales documents. But Ken didn\'t think the noise was so bad because from his backyard he just loved to hear little birds singing along the public river parkway.<br /><br />Four years later Ken lost the election and he wanted to move back to Los Angeles. When he had the house appraised, it was worth $500,000. Ken was furious because his home value had only increased 25 percent in value while most real estate had gone up 50 percent.<br /><br />Ken blamed the County. In the four years he owned the home the number of flights at the airport increased ten percent. This increased traffic was from increased military use in response to the crisis in Romaria. Ken could not enjoy his yard as much as before, and the little birds on the public river parkway didn\'t seem to sing as much as they used to.<br /><br />What actions might Ken bring against the County, what defenses might be raised, and what remedies are appropriate?',
							solutions: [
								data.convertBr(data.Essays.Torts.Sample6)
							]
						},
						{
							title: 'Sample Essay 7 - Miscellaneous',
							details: 'Star approached Buck, the owner of JavaManiac, with a business proposal. Star knew where there was a retail space for lease that would be a great place for a JavaManiac franchise. Buck told Star that she would be granted a JavaManiac license if the location was acceptable. Based on this Star described the location in detail and gave Buck its address. Buck said he would have someone "check it out."<br /><br />Buck had no intention of giving Star a franchise. He just wanted her to reveal the location. Based on Star\'s description it sounded perfect for a JavaManiac outlet, and Buck wanted to take the space himself.<br /><br />Buck went to the location suggested by Star and saw that it was perfect for JavaManiac. He then contacted the owner, Jack. Jack said he already had tentatively promised the lease to someone named Star. Buck said, "I know Star," and held his hand in the air with his thumb out to indicate that Star had a drinking problem. Then Buck looked at Jack very sincerely and said, "I probably shouldn\'t say this, but I feel I have a duty to tell you that you don\'t want to lease to someone like Star."<br /><br />Buck reported to Star that the location was unacceptable because it was too small to meet the secret JavaManiac minimum guidelines.<br /><br />Star was very dejected and withdrew her offer to lease the space. Jack was relieved.<br /><br />Three months later Star happened upon the grand opening of the next new JavaManiac franchise at the very location he had suggested. Standing in front were Buck and Jack shaking hands. Star was furious and accused Buck of cheating her. Buck rolled his eyes at Jack and said, "See what I mean?"<br /><br />Then Buck sued Star for slander per se for accusing him of questionable business practices. Star won the suit when the jury found her statements had been true.<br /><br />What are Star\'s possible actions against Buck? (Do not discuss intentional infliction, defamation or false light.)',
							solutions: [
								data.convertBr(data.Essays.Torts.Sample7)
							]
						}
					]
				}
			},
			subject: '',
			essay : '',
			essayTitle: '',
			essayNum: '',
			essaySoln: [],
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
			description: 'Under tort law DEFAMATION is a FALSE statement of material fact PUBLISHED to others about the plaintiff CAUSING DAMAGE to REPUTATION. Defamation may be SLANDER, an oral statement, or LIBEL, a written statement. <br /><br />Note: It is usually a mistake to discuss both defamation and false light concerning the same statement because if it is a statement that would damage one\'s reputation the issue is clearly defamation, not false light. If the statement does not damage the plaintiff\'s reputation but only causes embarrassment otherwise, it is not defamation and can only be false light.<br /><br />But many false statements are PRIVILEGED where the defendant speaks to defend a private interest, group interest or the public interest and does so without malice and in a reasonable manner calculated to defend that interest without unnecessarily harming the plaintiff.<br /><br />Injury to reputation will be presumed where there is LIBEL or SLANDER PER SE. SLANDER PER SE is found where the false statement alleges CRIMINAL behavior, LOATHSOME disease, UNCHASTE behavior or improper BUSINESS practices.<br /><br />Under NEW YORK TIMES and its progeny, a PUBLIC FIGURE PLAINTIFF must prove ACTUAL MALICE, that the false statement was made with knowledge or reckless disregard of its falseness, in order to recover in a defamation action. A PUBLIC FIGURE is a person who has acted to put themselves in the public spotlight. Further, where a matter of PUBLIC CONCERN is at issue, or where the plaintiff seeks punitive damages, the plaintiff must at least prove NEGLIGENCE.',
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

	importScript(val, e) {
		e.preventDefault();
		console.log(val);
	}
	deleteScript(val, key, e) {
		e.preventDefault();
		console.log(key);
		console.log(val);
	}

	render() {
		console.log('state is ', this.state);
		const externalNodeType = 'yourNodeType';
    	const { shouldCopyOnOutsideDrop } = this.state;
		
		let myLocalStoreVal = localStorage.getItem('localStoreVal');
		if (myLocalStoreVal) myLocalStoreVal = JSON.parse(myLocalStoreVal);
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
				<h1 className="my-text">Essay, Issues, Fact Matching
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
								let solutions = this.state.subjects[this.state.subject].essays[e.target.value].solutions ? this.state.subjects[this.state.subject].essays[e.target.value].solutions : [];
								this.setState({essaySoln: solutions, essay: data, essayNum: e.target.value, essayTitle: this.state.subjects[this.state.subject].essays[e.target.value].title})
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
							<div>
								<div className="row">
									<div>
										<h3>{this.state.essayTitle}</h3>
										{renderHTML(this.state.essay)}
										<br /><br />
									</div>
									<div
										className="col-md-6"
									>
										<div
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
										<div>
									  		<br />
									  		<br />
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
										
										<br />
									  	<br />
										<div>
											<textarea rows="10" cols="55" value={JSON.stringify(this.state.treeData1)} onChange={(e) => {console.log(e.target.value);}}></textarea>
										</div>
									  	<br />
									  	<br />
										
									</div>
							
									<div
										className="col-md-6"
									>
										<div
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
									  	<br />
									  	<br />
									  	<br />
									  	<br />
									  	<br />
									  	<br />
										<div>
											<textarea rows="10" cols="55" value={JSON.stringify(this.state.treeData2)} onChange={(e) => {console.log(e.target.value);}}></textarea>
										</div>
									  	<br />
										<Button className="" bsStyle="primary" onClick={() => {let obj = {}; obj.data1 = this.state.treeData1; obj.data2 = this.state.treeData2; obj.essaySoln = this.state.essaySoln; obj.subject = this.state.subject; obj.essay = this.state.essay; obj.essayTitle = this.state.essayTitle; obj.essayNum = this.state.essayNum; let localStoreVal = localStorage.getItem('localStoreVal'); if (localStoreVal) localStoreVal = JSON.parse(localStoreVal); else localStoreVal = []; localStoreVal.push(obj); localStorage.setItem('localStoreVal', JSON.stringify(localStoreVal)); alert('content exported'); }}>Export</Button>
									  	<br />
										
										<div className="row">
											<div className="col-md-12">
											{
												this.state.essaySoln.length > 0 && 
												<div>
													{
														this.state.essaySoln.map((value, key) => {
															return <div key={key}>
																<h3>Solution {key + 1}</h3>
																{renderHTML(value)}
																<hr />
															</div>			  
														})
													}
												</div>
											}
											</div>
										</div>
									</div>
								
								</div>
							</div>
						}
						
					</div>
				}
				
				{
					myLocalStoreVal && 
						<div>
							<h3>Saved Essays</h3>
							{
								myLocalStoreVal.map((value, key) => {
									return <div key={key}>{value.essayTitle} <a href="" onClick={this.importScript.bind(this, value)}>Import</a> - <a href="" onClick={this.deleteScript.bind(this, value, key)}>Delete</a></div>					 
								})	
							}
						</div>
				}
			</div>
		);
	}
}

export default CompleteProcess;