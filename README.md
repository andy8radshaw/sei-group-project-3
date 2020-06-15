# Project 3 - Hikr

Table of Contents:

- Project Overview
- The Brief
- Technologies USed
- Approach Taken
- Featured Code
- Screenshots
- Bugs
- Wins and Blockers
- Future Content and Improvements


## Overview

Project 3 was my first experience of building a full stack application as part of a group. After a short amount of discussion we came up with the idea of building HIKR, a social app for users to add, share and review their favourite hikes, as well as organise groups with associated activities. 

You will find the completed project here: https://hikrrr.herokuapp.com/

![](frontend/src/styles/assets/readme-images/hikr-home-cropped.png)

## The Brief

* **Build a full-stack application** by making your own backend and your own front-end
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Be deployed online** so it's publicly accessible.

## Technologies Used

### Backend:
- Node.js
- Mongodb
- Express
- Bcrypt
- Body-parser
- Mongoose
- jsonwebtoken

### Frontend:
- React
- Axios
- Bulma
- SCSS
- Http-proxy-middleware
- React Router Dom
- React Mapbox GL
- React Responsive Carousel
- React Calendar
- React Moment
- React rating stars component
- React select

### Development tools:
- VS code
- NPM 
- Nodemon
- Insomnia
- Git
- Github
- Google Chrome dev tools
- Eslint linter
- Heroku
- Trello Board
- Miro Board
- Google Drive


## Approach taken

### Day 1
The first step after deciding the nature of the app and getting our initial ideas down on paper, was to work on the routes, models and controllers we would need to make sure the app functions how we planned. We had settled on three models in total - The User, The Hike, and the Group. After this we created a basic wireframe for the look of each page and also how users may flow through the app. 

![](frontend/src/styles/assets/readme-images/hikr-wireframe.png)


After this we put together a plan as to how we would divide the work between the three of us, using Trello to keep on top of things throughout the project. Beacuse we all wanted to have a hand in creating both backend and frontend, we decided that it was logical and a good idea to take on building the model schema's, routes, and controllers split with one each. This would then lead us onto building the frontend in the same way. Purvi took on the User's, Kuriko took on the Groups, and I was challenged with building the Hikes.  


### Backend - Day 2 & 3

The Hike model was created using Mongoose and ended up being less complicated than originally planned. Initally I had planned on having the main hike schema along with 3 embedded schemas (image upload, review, and rating) and two virtual schemas linked with the User Schema (user favourites, and user completed). Eventually the embedded schema's were whittled down to just the one that would take care of the reviews and ratings together and the images updloaded into the main schema's array. 

![](frontend/src/styles/assets/readme-images/hikr-hike-schema.png)

For the Hike model we wanted all of the CRUD features and these were all added into the controllers and tested with Insomnia to make sure the backend was sending the correct responses with exactly the right amount of info to build the front end. 

As a team, we were able to build our backends at a similar pace helping each other as we went, which meant we could all then spend a good amount of time on day 3 testing and making sure the embedded and virtual schema's were populated with the correct information. 



### Frontend - Day 4, 5 (target to hit MVP by end of day 5)



# sei-group-project-3
Main repo for SEI Group Project 3
Andy Bradshaw
Purvi Trivedi
Kuriko IWAI


### Hikr

## Backend 

### Database

- Users
- Groups
- Hikes

## Pages
<!-- Home - has button in the middle 
Hike Index - list of filtered 
Show Hike
User Profile
Login/Register
Group index
Group Profile -->

### Third party Info
- Fake users ?
- Hikes ?

### Models
User
- username
- email
- password
- profile image
- biography
- completed hikes - embedded
- favourited hikes - embedded
(group members, user added images, user created hike)

Group
- group name
- group members - referenced (to user)
- events/meetups - form (add new event - date, time, selection of hikes) - referenced
- imageHeader - 
- user added images - embedded
- group messages - embedded

Hike
- name
- location (lat/long)
- country
- description
- distance
- difficulty rating - 
- time to complete
- images 
- user added images - referenced (to user)
- comments - embedded
- stars out of 5 - embedded
- approprite seasons
- user created hike - referenced (to user)


### Controllers

User 
- Create user
- Read SingleUser
- Update
- Delete

Groups
- Create Group
- Read
- Update
- Delete
- comment/messages
- add new event

Hikes
- Create 
- Find by Id
- Update
- Delete
- Comment
- Add Favourite
- Add image


### Routes

/hikes - index page GET/POST
/hikes/:id - hike show page GET/PUT/DELETE
/hikes/:id/comments - hike comments page POST
/hikes/:id/comments/:id - delete comment DELETE/PUT

/register - POST
/login - POST

/groups groups index page GET/POST
/groups/:id group profile page GET/PUT/DELETE
/groups/:id/messages - groups messages page POST
/groups/:id/messages/:id - delete/edit messages DELETE/PUT
/groups/:id/events index and create events GET/POST    
/groups/:id/events/:id GET/PUT/DELETE

/profiles  idex of users GET
/profiles/:username users profile pages GET/POST/PUT/DELETE
