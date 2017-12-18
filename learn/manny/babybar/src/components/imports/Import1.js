import React, {Component} from 'react';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';

class Import1 extends Component {
	
	importTortsAssault(e) {
		e.preventDefault();
		var issue = {
			assault: {
				key: 'assault',
				name: 'Assault',
				rule: 'Under tort law, An ASSAULT is an <b>intentional overt act</b> which causes an <b>immediate apprehension</b> of a harmful or offensive contact.',
				elements: [
					'Intent',
					'Overt Act',
					'Reasonable Apprehension',
					'Immediate Battery'
				],
				elementsQuestions: [
					'Here defendant acted <b>intentionally</b> because ...',
					'Here defendant did / did not <b>Overt Act</b> because ...',
					'Here there is <b>Reasonable Apprehension</b> because ...',
					'Here there is Apprehension of <b>Immediate Battery</b> because ...'
				],
				videos: [
					{
						key: '1gJSD71WZeE',
						title: 'Torts lecture: Assault | quimbee.coms'
					},
					{
						key: 'A1c2GFFm8Ic',
						title: 'Episode 2.1: An Overview of Intentional Torts'
					},
					{
						key: 'N8nRnralqiI',
						title: 'The Law of Torts (in Hindi)'
					},
					{
						key: 'RXq_rDr4zeQ',
						title: 'Torts Assault'
					},
					{
						key: 'jQ6smN3lcnY',
						title: 'Episode 1.1: What is Torts? And what Torts is not.'
					},
					{
						key: 'f6TUiejBILE',
						title: 'Episode 1.2: An Overview of Tort Law - Intentional Torts, Negligence, and Strict Liability'
					}
				],
				urls: [
					{
						title: 'Torts Playlist',
						link: 'https://www.youtube.com/watch?v=jQ6smN3lcnY&list=PLpbtRdN7xWUd2Mjw1haKHAu_g81xK0v72',
					}	   
				],
				conclusion: 'Therefore, the defendant may be liable for tortious assault.',
				mbe: [
					{
						key: 'idea1',
						name: 'Idea 1: Imminent Bodily Contact',
						description: `The tort of assault requires that the plaintiff have an apprehension of an imminent bodily contact. If the plaintiff is not in apprehension then there is no assault.`,
						examples: [
							{
								question: `Amit pointed an unloaded revolver at her guest Vineeta, threatening to shoot him. The Vineeta knew that the revolver was not loaded, and that the ammunition for the revolver was stored in a locked basement closet, two stories below where the two were then standing. <br /><br />In an action brought by the guest Vineeta against the Amit for assault, will the Vineeta prevail?`,
								ansOptions: [
									`No, because the Amit did not intend to shoot her guest Vineeta.`,
									`No, because the Amit did not put her guest Vineeta in apprehension of an imminent contact.`,
									`Yes, because the ammunition was accessible to the Amit.`,
									`Yes, because the host threatened her guest with a revolver.`
								],
								correct: 1
							}
						]
					},
					{
						key: 'idea2',
						name: 'Idea 2: Reasonable Apprehension',
						description: `To establish a claim for assault, a plaintiff must demonstrate that he reasonably apprehended that a harmful or offensive touch was imminent. If the plaintiff is in sleep, he may not have enough apprehension necessary for an assault claim.`,
						examples: [
							{
								question: `A student Amit was sleeping when his roommate Vijay entered into the room intending to attack the student with knife. A phone rang and awakened the student Amit. Vijay retreated and threw the knife out of window. Will student Amit prevail against roommate Vijay for assault?`,
								ansOptions: [
									`No, because the roommate Vijay did not touch the student Amit.`,
									`No, because the student Amit was not awake when the roommate Vijay entered the room and was unaware until later that the roommate Vijay was intending to attack him.`,
									`Yes, because it was reasonable for the student Amit to feel afraid of sleeping in his room afterward.`,
									`Yes, because the roommate Vijay intended to inflict serious harm.`
								],
								correct: 1
							}		   
						]
					}
				
				],
				essays: [
					{
						year: 'june 2002',
						hypo: `Craft Village is a small town that is popular with tourists because of its fine arts and crafts stores. Craft Village has no public transportation. All of the stores are located on Main Street. There is one large gallery, Northwoods Gallery, at the north end of Main Street. At the south end of Main Street is the Snooze Inn, a large motel. Tourists often stay at the Snooze Inn when they want to spend more than a day in Craft Village. Craft Village shops, by town ordinance, must remain open from at least 10:00 a.m. to 8:00 p.m. every day, including Sundays. All of the shops close at 8:00 p.m. except Northwoods Gallery, which is open until 11:00 p.m. every night. Craft Village provides street lighting along Main Street, which is turned on each night at dusk.<br /><br />
Jean arrived in Craft Village on Sunday night for her annual shopping expedition. As on all of her previous trips to Craft Village, she stayed at the Snooze Inn for two nights. She does not own a car, and one of the reasons she likes Craft Village is that she can walk to all the shops.<br /><br />
Jean got up on Monday morning to go shopping. She shopped all day, and walked back to the Snooze Inn at 7:00 p.m. for dinner. After dinner, at around 8:30 p.m., she began walking to Northwoods Gallery. Half way there, she was accosted by a mugger. The mugger stood in front of her and shouted, "Hand over your purse, or I'll beat you up!" The mugger roughly snatched Jeans purse as she held it out to him. The mugger fled, and Jean turned around and ran back to the Snooze Inn. The mugger was later captured by the police.<br /><br />
On what theory or theories, if any, might Jean recover damages from, and what defenses might she anticipate, in an action against:<br /><br />
1. The mugger? Discuss.<br />
2. Craft Village? Discuss.<br />
3. Northwoods Gallery? Discuss. <br />
4. Snooze Inn? Discuss.`,
						solution: []
					},
					{
						year: 'june 2008',
						hypo: `Dede attends college with Alex, Betty, and Carl. One day, an argument that she was having with Alex, her ex-boyfriend, became heated. The argument occurred in a very crowded college lecture hall between classes. During the argument, Dede picked up a heavy textbook and threw it at Alex. Alex shielded his head with his hands and ducked. The textbook missed Alex, but it hit Betty, who was standing behind Alex. The impact fractured Bettys nose.<br /><br />
Enraged at missing Alex, Dede then picked up another textbook and threw it as hard as she could into a crowd of students gathered nearby. This second textbook struck Carl, who was standing in the crowd. As a result, Carl suffered a bruised rib.
What intentional tort claims, if any, do Alex, Betty, and Carl have against Dede? Discuss.`
					}	 
				]
			}
		}
		console.log('issues is ', issue);
		var url = FirebaseConstant.basePath + '/quiz/issues/torts';
		firebaseDatabase.ref(url).update(issue);
	}
	importSubjects(e) {
		e.preventDefault();
		var subjects = {
			contracts: {
				key: 'contracts',
				name: 'Contracts'
			},
			criminal: {
				key: 'criminal',
				name: 'Criminal'
			},
			torts: {
				key: 'torts',
				name: 'Torts'
			}
		}
		var url = FirebaseConstant.basePath + '/quiz/subjects';
		firebaseDatabase.ref(url).update(subjects);
	}
	import1(e) {
		e.preventDefault();
		let url = 'http://localhost/project2017/qz/api/quiz_display.php?category_id=47&limit=1000&order=+id+ASC&allFields=1';	
		fetch(url, {
			method: 'GET'	  
		}).then((response) => {
			return response.json();
		}).then((j) => {
			console.log('j is ', j);
			var url = '';
			var countCategories = {};
			
			var myObject = {};
			j.data.map((value, key) => {
				let id = 'category_' + value.category_id;
				if (!myObject[id]) {
					myObject[id] = [];	
				}
				myObject[id].push(value);
				return true;
			});
			console.log(myObject);
			
			for (let i in myObject) {
				countCategories[i] = myObject[i].length;
				var url2 = FirebaseConstant.basePath + '/quiz/questions/' + i;
				firebaseDatabase.ref(url2).set(myObject[i]);	
			}
			
			var categories = {};
			j.categories.map((value, key) => {
				let id = 'category_' + value.cat_id;
				categories[id] = {
					key: id,
					name: value.category,
					cnt: countCategories[id]
				};  
				return true;
			});
			
			url = FirebaseConstant.basePath + '/quiz/categories';
			firebaseDatabase.ref(url).update(categories);
		}).catch((err) => {
			console.log('error is ', err);	
		});
	}
	render() {
		return (
			<div className="container">
			<h1>Imports</h1>
				<div><a href="" onClick={this.import1.bind(this)}>Import 1980 FYLSE</a></div>	
				<div><a href="" onClick={this.importSubjects.bind(this)}>Import Subjects</a></div>		
				<div><a href="" onClick={this.importTortsAssault.bind(this)}>Import Torts Assault</a></div>			
			</div>
		);
	}
}

export default Import1;


					/*
					https://www.youtube.com/watch?v=prorUcdD98c&list=PLpbtRdN7xWUfKfRXfbgaPdQZBQSS1n2Vr
					
					criminal{
						year: 'june 2002',
						hypo: `Debbie and Jon met in college and dated each other for two years. Debbie loved Jon very much and wanted to marry him. Jon always told her that he loved only her, but he told her he thought they were too young and should not rush into marriage.<br /><br />
One day as Debbie was putting gasoline into her car at the gasoline station, she looked into the car parked next to hers. She was enraged to see her best friend Vickie passionately kissing Jon. Debbie walked over to the car, with the fuel dispenser in her hand, and started yelling at Vickie and Jon. Vickie said, "I'm sorry you had to find out this way. Jon and I love each other and are going to get married."<br /><br />
Debbie was enraged and shouted, "You're not going to marry anyone, you slime!" She then pointed the gasoline dispenser at Vickie and sprayed her with gasoline, soaking her hair and clothes. Jon reached over to try to help Vickie. Unfortunately, he was smoking a cigarette. The cigarette ignited the gasoline and Vickie burned to death.<br /><br />
What offense or offenses has Debbie committed and what defenses, if any, would she assert? Discuss.`,
						solution: [
							`In this case, the state may argue that when Debbie pointed the gasoline dispenser at Vickie, while shouting at her, Vickie could have reasonably apprehended an unlawful and offensive contact, i.e., being sprayed with gasoline.
Debbie has committed an assault.`		   
						]
					}*/	