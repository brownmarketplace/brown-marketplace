# Brown Marketplace 🧸

Please visit the Brown Marketplace website [here](https://brown-marketplace.vercel.app)! 

## Steps to Run
Clone the repo. Then, cd in the `backend` folder. In the `backend` folder, run the command: `mvn package` and then `./run --gui`. Next, in the `frontend` folder, run `npm start`. Go to `localhost:3000/explore` to get started!

## Overview
Brown Marketplace is designed as a convenient local transaction platform for Brown community members (users authorized through Brown emails), helping the student buyers and sellers to establish connections. The users could search for, bookmark, sell, and purchase products from fellow community members, and receive personalized recommendations. 

## Problem & User
The website is intended for personal use for Brown students and faculty members, who are looking to sell or buy second-hand belongings within the Providence area. The app not only provides a convenient, secure transaction way to trusted buyers and sellers, but also seeks to eliminate environment impacts by promoting second-hand goods reuse.

## Functionality & Implementation
### Frontend
- React: we use React as the framework for our frontend development. We also use Typescript and NPM.
- Material-UI: React component library for pre-styled components.
- Express Router for the Multi-Page Web App
      
### Backend
- Database: we use Firebase Realtime Database for storing product information, user profiles, and buying and selling listings. We use Firebase Storage for uploading and storing images.
- Recommendation system: we use Java to create the recommender system based on bloom filter. 
- Server: the recommender program is connected to the front end through the Spark Server. The recommender extracts the relevant product attributes through database proxy, pass them into Bloom Filters for each product, and generate recommendations based on XNOR similarity scores compared with the user liked items. The resulting list of recommended items is then sent to the frontend as a Json object.
- API: We use the Google User API for creating user accounts. We also set up API endpoints for the frontend to receive data from the backend, such as user data in the database.

- **Database Package (Javascript)**:
    - `ProductDB` sub-package
        - `ModifyDB.js` for modifying products data
        - `ReadDB.js` for reading products data
    - `UserDB` sub-package
        - `ModifyDB.js` for modifying users data
        - `ReadDB.js` for reading users data
    - `DBInstance.js` for instantiating a Firebase Realtime Database
    - `testDB.html` an html file for testing and visualizing the database methods
- **Java Packages**
    - `Recommender` package for bloom-filter based recommender system
    - `Proxy` package for Firebase connection
    - `Server` package for establishing Spark server and creating routes
    - `Structure` package for storing project information (implements BF insertable interface for generating recommendation)
- **Spark server routes**
    - `/userReq` for receiving user id and querying user liked items
    - `/recommend` for generating recommendations and sending the product ids

## Reflection & Futuer Development
This is a valuable learning experience for us in terms of designing and developing user-oriented project. We also wish to implement the following features if time permits: 

1. Support direct chat between users. 
2. Upgrade the recommendation system using machine learning and natural language processing models. 
3. Incorporate payment APIs for completing transactions. 