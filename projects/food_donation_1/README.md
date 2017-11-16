
npm install redux redux-logger react-redux redux-thunk redux-promise-middleware react-google-autocomplete firebase react-router-dom --save

npm install react-google-autocomplete --save

Food Donation
	Extra food and you want to donate it


Components

	Login
		Facebook
		Google
		Twitter
		Github
		
		Optional
		Email/Password -> login
		
	Preference Page
		Location Favorite
		
	Create a post
		Food he wants
			Email
			Phone
		
	All his post
		Edit them
		Delete
		
	Search
		keyword
		Location
		
	Results
		Firebase
			City
			County based
			State based - 500 records
			country based

		(mysql api)
	
	24 hour
	Chinese Food
		Noodles
			1 - 1 chat message
			Email message
			Phone - 
			
	About page
	Contact page
	terms page
	privacy page
	team page
	
	How it works
	FAQ page



Url image

Upload - feature (backend api)







/data/posts
	1: details	santa clara, ca, us
	2: details	pleasanton, ca, us
	3: details san jose
	4: details	san francisco
	5: details
	
	
	
/data/county
	
	US
		/CA
			/Santa Clara Count
				1: timestamp
				3: timestamp
			
			/Alameda
				2: timestamp
				
				
			/San francisco
				4: timestamp
				

/data/state
	
	US
		/CA
			1: timestamp
			3: timestamp
			2: timestamp
			4: timestamp


/data/city
	
	US
		/CA
			/Santa Clara Count
				/Santa Clara
					1: timestamp
				/San Jose
					3: timestamp
			
			/Alameda
				2: timestamp
				
				
			/San francisco
				4: timestamp



Action
Reducer
	variables
	







Posts
	Rec1
	Rec2
	Rec3
	
	...
	
	
Keyword
	
	Tags: Food, Indian, Chinese
	
	
	
	data/	
	
		tags/
		
			keywords/
				food
					-Kz2eRN9F38pMS68ZPcl: true
				
				indian
					-Kz2eRN9F38pMS68ZPcl: true
				
				chinese
					-Kz2eRN9F38pMS68ZPc2: true
					
			location/
				food
					county
						US
							CA
								Santa Clara County
									-Kz2eRN9F38pMS68ZPcl: true
									-Kz2eRN9F38pMS68ZPcl: true
									-Kz2eRN9F38pMS68ZPcl: true
									-Kz2eRN9F38pMS68ZPcl: true
									-Kz2eRN9F38pMS68ZPcl: true
						Alameda County
							-Kz2eRN9F38pMS68ZPcl: true
							-Kz2eRN9F38pMS68ZPcl: true
							-Kz2eRN9F38pMS68ZPcl: true
							-Kz2eRN9F38pMS68ZPcl: true
							-Kz2eRN9F38pMS68ZPcl: true	
					WA
						King County
							
							-Kz2eRN9F38pMS68ZPcl: true
			
			
		
		state
			UC
				CA
					
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
				WA
						-Kz2eRN9F38pMS68ZPcl: true
		
		
		country
			US
				
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
		city
			US
				CA
					Santa Clara County
						San Jose
							-Kz2eRN9F38pMS68ZPcl: true
							-Kz2eRN9F38pMS68ZPcl: true
							-Kz2eRN9F38pMS68ZPcl: true
							-Kz2eRN9F38pMS68ZPcl: true
							-Kz2eRN9F38pMS68ZPcl: true
							
							
							
				indian
				
				
				chinese
				
			
		county
			US
				CA
					Santa Clara County
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
					Alameda County
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true	
				WA
					King County
						
						-Kz2eRN9F38pMS68ZPcl: true
			
			
		
		state
			UC
				CA
					
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
				WA
						-Kz2eRN9F38pMS68ZPcl: true
		
		
		country
			US
				
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
						-Kz2eRN9F38pMS68ZPcl: true
		city
			US
				CA
					Santa Clara County
						San Jose
							-Kz2eRN9F38pMS68ZPcl: true
							-Kz2eRN9F38pMS68ZPcl: true
							-Kz2eRN9F38pMS68ZPcl: true
							-Kz2eRN9F38pMS68ZPcl: true
							-Kz2eRN9F38pMS68ZPcl: true



Component
	Data loop
	
		Row 1
		Row 2
		Row 3
	
	
Redux
	Data
	
	
Json

	Static
		Redux
		
	Mysql
		Redux
		
	Firebase
		Redux







https://github.com/react-bootstrap/react-bootstrap/tree/master/docs/examples