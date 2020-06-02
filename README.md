# Project 4 - Hikr

Table of Contents:

- Project Overview
- The Brief
- Technologies USed
- Approach Taken
- Featurec Code
- Screenshots
- Bugs
- Wins and Blockers
- Future Content and Improvements

## Project Overview


## Brief

* **Build a full-stack application** by making your own backend and your own front-end
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.

## Technologies Used



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
