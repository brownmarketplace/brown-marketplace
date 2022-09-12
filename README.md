# Brown Marketplace 🧸

## Steps to Run
Clone the repo. Then, cd in the `backend` folder. In the `backend` folder, run the command: `mvn package` and then `./run --gui`. Next, in the `frontend` folder, run `npm start`. Go to `localhost:3000/explore` to get started!

## Overview

## Problem & User

### Frontend 
- React: we use React as the framework for our frontend development. We also use Typescript and NPM.
- React-bootstrap: React component library for pre-styled components.
- Material-UI: React component library for pre-styled components.

- **System Features**:
- `Explore.js` (view)
    - `BoilerplateHeader.js` (component)
- `AddListing.js` (view)
- `ProfilePage.js` (view)
    - `UserListings.js` (component)
    - `UserListingItem.js` (component)
    - `WishList.js` (component)
    - `ProductPreviewWrapper.js` (component)
    - `SoldButton.js` (component)
- `CategoryPage.js` (view)
    - `StoreFronts.js` (component)
    - `ProductPreview.js` (component)
    - `Tag.js` (component)
- `ProductPage.js` (view)
    - `AddToLikedList.js` (component)
    - `CopyToClipboard.js` (component)
    - `PageBreadcrumbs.js` (component)
    - `SellerCard.js` (component)

- Potential NPM packages for trivial functionality
- Express Router for the Multi-Page Web App
- Frontend Directory Map
    - `src/`
        - `pages/`
        - `images/`
        - `components/`
        - `App.js`

### Backend
- Database: we use Firebase Realtime Database for storing product information, user profiles,
and buying and selling listings. We use Firebase Storage for uploading and storing images.
- Recommendation system: we use Java to create the recommender system. 
The data provided to the program would be in the form of JSON Objects, represented as maps with each of the product 
attributes as a key and the corresponding attribute as a value. The recommender program would parse the JSON Object 
to extract the relevant attributes, pass them into Bloom Filters for each product, generate recommendations based on 
the XNOR similarity scores, and then return a list of recommended items based on a given product.
- API: We use the Google User API for creating user accounts. We also set up API endpoints for the frontend to receive 
data from the backend, such as user data in the database.

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

## Use cases

