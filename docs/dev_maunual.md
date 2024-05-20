# Installation
### Dependencies
* "@supabase/supabase-js": "^2.43.2",
* "axios": "^1.6.8",
* "dotenv": "^16.4.5",
* "ejs": "^3.1.10",
* "express": "^4.19.2"
# How to install
* Clone Repository by using: **git clone (newest link)**
# Running server
* Get to the folder with the terminal
* Then in the terminal type **node index.js**
# API
* To pull from the API use this format
* link : https://bfsqoukxpynbbcxuozyr.supabase.co/rest/v1/
* tables: top_5, score, anime
* table colums: 
* top_5 and anime: id, title, image_url, anime_rank
* score: id, score
* top_5 has 5 results
* anime has less then 400 results and more then 300 results
* score has less then 30000 results and more then 29000 results
### GET
* anime_viewing_response: This gets the data from the first Supabase API for anime viewing
* scoring_response: This gets data from the second Supabase API for scoring
* top_5: This gets data from the second Supabase API to get the top 5 animes based on scores
# Known Bugs
* Some anime titles with special characters may not be properly read.
* API rate limiting from the Jikan API may cause temporary data fetching issues.
# Future Road Map
* Fix encoding issues with special characters in anime titles.
* Add user authentication and profiles to save favorite anime lists.
* Enhance the search functionality with more filters.
* Add additional anime-related data sources.
* Add in features that are missing from redeveloping the app to Node
# Link to old repository (Django)
* [Django Repository](https://github.com/Slydawgz/INST377-Group-Project_Final)
# Link to website
* [Vercel Website](https://inst-377-final.vercel.app/)