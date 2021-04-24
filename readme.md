# Anilog
Anilog is a full stack application built as the final project of Ironhack Web Development bootcamp. It is inspired by AniList, a social platform for anime fans, and uses their database to deliver an application where users can find anime and keep track register the shows they watch and are interested in.

## Technologies
This project was built upon:
 - [Node](https://nodejs.org/en/)
 - [Express](https://expressjs.com/)
 - [AniList API](https://github.com/AniList/ApiV2-GraphQL-Docs)
 - [Handlebars](https://handlebarsjs.com/)
 - [Fomantic-UI](https://fomantic-ui.com/) 

## Demo
You can check a live demo of this project on: https://anilog1.herokuapp.com/


## Prerequisites
The application depends on AniList API to provide it with data and will not fully function should it become unavailable. However, user data would still be kept and basic functionalities maintained.
It is not yet responsive on smaller screens.

## Getting started
Anyone can search for animes and navigate to their details page. Users profiles and catalogues are also public for those who have the link for them, but can only be edited by logged users.


## Additional implementations
Though the app delivers only basic search and cataloging functionalities, the foundations are laid for features that would allow it to grow into a more complete discovering platform, including:

 - Implementation of a review system
 - Implementation of a simple social system with friends, followers and feed
 - Selection of anime based on similarity with other shows
 - More search filters
 - Listing of related media on each anime
 - Random anime selection
 - Password recovery
 - A fully responsive design

## Contributions
If you wish to contribute or just take a deeper look into this project, download the repo and use git init to install it's dependencies.
You will need to create a .env file with the following variables:

 -  `PORT` with the port to be used on your localhost
 - `MONGODB_URI` with your database address
 - `SESS_SECRET` with any combination to secure your session
 - `CLOUDINARY_NAME`, `CLOUDINARY_KEY` and `CLOUDINARY_SECRE` with your Cloudinary data