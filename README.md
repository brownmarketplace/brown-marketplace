# Brown Marketplace

### Steps to Run
Clone the repo. Then, cd in the `backend` folder. In the `backend` folder, run the command: `mvn package` and then `./run --gui`. Next, in the `frontend` folder, run `npm start`. Go to `localhost:3000/explore` to get started!

### General Design
The `/explore` route displays the recommended items, which users can swipe through (swipe left, swipe right, view, undo). The menu icon opens the menu drawer, and the profile button leads to the user's profile. A user can log in with their Brown google account if they want to view their Brown Marketplace profile page or add a listing. Once signed in, a user can view their name, gmail-affiliated profile picture, and email address (the route to the profile page is `/profile/<google-userId>`). A user can also view the products they are selling or have sold, as well as their liked item. 

A user can add a listing by clicking the `+` button on the `/explore` page or the `Add a listing` button on the profile page at the bottom of their listings. The page where users can add listings is `/sell`. On this page, the user needs to enter the new product's name, description, price, category, tags, and image urls. They can then press `Publish` to publish the listing or `Clear` to clear the form.

A user can also view products by category, subcategory, or all the products at once. Users can get to a category page from the menu on the `/explore` page or from the search bar.

Specifications: https://sophiazyliu.notion.site/Specifications-513e4b155a994b5ebcc4e322bffa0db3

# **Section 1:  Introduction**

## **1.1 Project Specific Details**

- Project Name:
    - Brown Marketplace
- Division of Labor
    - Frontend
        - Tiger Tanadol (tlamlert): Single product page, categories page
        - Sophia Liu (sliu176): Profile page, add new listing page
        - Michael Donoso (mdonoso): Explore page, router
    - Backend
        - Tianran Zhang (tzhang96): APIs (post and get, google API)
        - Sarah Liu (yliu401): Firebase Database
        - Carmen Yu (cyu63): Recommender
- Total estimated time it took to complete project:
    - 40 hrs per group member

## **1.2 Purpose**

Brown Marketplace is a Brown student’s first stop when selling or buying new or used products in Providence, Rhode Island. Like eBay, Etsy, and other online marketplaces, Brown Marketplace allows Brown community members to search for, bookmark, sell, and purchase products from fellow community members, get recommendations for similar products, and chat with community sellers. Brown Marketplace facilitates transactions only for Brown community members (users authorized through Brown emails), providing students with a secure place to sell and buy goods within the community. 

## **1.3 Intended Audience and Intended Use**

- Intended end-users (primary users): Brown students and faculty members who are looking to sell or buy second-hand belongings.
- This app is intended for personal use for Brown community exclusively to buy and sell products within the Providence area. The app not only provides a convenient, secure transaction way to trusted buyers and sellers, but also seeks to eliminate environment impacts by promoting second-hand goods reuse.

## **1.4 External Stakeholders**

- Local shops in Providence area whose primary consumers are Brown students.
- Convenience stores such as CVS.
- Members of the Providence population who regularly do business with Brown students.
- Moving companies such as Brown Movers since we expect our users to seek services from them once their transaction is completed.

## **1.5 Scope and User Stories**

- What our app is NOT doing:
    - Brown Marketplace does not provide access to non-Brown students to buy or sell goods. The general public can view category pages and the home/explore page only.
    - Brown Marketplace does not support transactions outside of the Providence area.
    - Brown Marketplace does not support returns or refunds in any cases. The users are responsible for the potential conflicts once the transaction is completed on our platform.
    - Brown Marketplace does not provide any kind of delivery services. Users must rely on other moving services or set up their own meeting.
    - Brown Marketplace does not provide direct message or group chat features within the application.
- User stories
    - A user can create and log into their account and act both as a buyer and as a seller through their account.
    - As a buyer, a user can search for objects and save their objects in liked items. These items can be viewed in a separate profile page.
    - As a seller, a user can upload information of a new good they want to sell and display the good in their list of items being sold.
    - A user can get recommendations for products that may interest them based on their liked items.

## **1.6 Definitions and Acronyms**

**Primary user**: Brown University students and faculty who are looking to sell or buy things from other Brown community members.

**Active** **Listing:** An item that a seller is currently attempting to sell.

**Inactive Listing**: An item that a seller has already sold.

**Liked Item**: An item that a buyer is interested in and wants to revisit.

**Category:** The category of the item, such as clothing, room decor, and furniture.

**Subcategory**: The more specific category of the item, such as tops, plushies, and chairs. 

**Tag:** The type of item: whether new or used, and/or for men or for women or unisex, etc.

# **Section 2: Overall Description**

## **2.1 User Needs**

- The logged in user should be able to instantly **explore** items, **find** a category of item they had in mind, and **publish** a new listing as soon as they reach the home page with **ease**. This requires few clicks to get to any portion of the site, and seamless navigation across the site.
- The users have to search for listings based on the categories they’re interested in. They also have to create a profile if they want to make transactions or post listings they want to sell.
- The current tools used by our users, such as Amazon, eBay, and Facebook Marketplace, are not specific to the Brown community. Shopping on these platforms would require the users to either have the items shipped to them or go to somewhere rather far away, such as Boston, to make the transaction in person. Our app would allow the users to make transactions with other Brown community members without having to travel, since the transactions could just take place on campus.
- General user feelings
    - For more general-purpose platforms like GroupMe, messages regarding products to be sold or traded (or given away, especially at the end of a semester) can easily get lost in large group chats.
    - For wider-scope platforms like eBay and Facebook Marketplace, users have very limited information on sellers and their intentions, especially since transactions take place outside of a common community.
    - Many students do not have a readily accessible mode of transportation to locations far from campus; meeting in-person for these types of transactions is often impractical.
- We imagine that the users would use our project pretty frequently, especially after they become more familiar with it. When the users are not actively making transactions, they would browse the new listings on our website once in a while to see if they’re interested in any of them; when they are actively making transactions, they would likely use our project more frequently to communicate with the buyers/sellers.
- The users would interact with our product on campus. While the website should be accessible from anywhere with Internet, we expect the transaction to happen in person, so the buyer and seller should be able to meet up in the Providence area.
- User needs that didn’t exist before:
    - Protection from scammers: we should prevent the users from receiving scams and unnecessary advertisements.
    - Making profit: some users may hope to make money by buying objects and selling at higher prices, which is not an intended use of our website.
- **Summary of user research** (student interviews)
    
    Interview questions and brief summary of responses:
    
    - **Buyer**
        - **Do you participate in online shopping? Are there any apps or websites you use to buy products online?**
            
            Summary: Most users don’t regularly go to downtown Providence to shop; in general, it is much quicker and more convenient to access online shopping sites like Amazon and clothing companies (e.g. Adidas, Nike, Lacoste, etc).
            
        - **What Brown-related apps or websites to you use?**
            
            Summary: Most users use academic apps such as EdStem, Gradescope, Canvas, C@B, Banner, Google Suite, and ASK, and more general social apps like GroupMe, DearBlueno, and Sidechat. 
            
        - **Could you describe your online shopping experience in terms of how safe you feel purchasing those items, how satisfied you are with the variety of products, and how satisfied you are with the quality of the products?**
            
            A: I feel comfortable using Amazon and Adidas to buy items, and somewhat comfortable but a bit more wary when using YesStyle. For the quality of products, I’m almost always satisfied with using Amazon and Adidas, and sometimes satisfied with products I get from YesStyle. For variety of products, I’m satisfied with Amazon, somewhat satisfied with Adidas, and somewhat satisfied with YesStyle.
            
            B: I feel a lot safer purchasing from big companies and known brands, and less comfortable purchasing from ...
            
            C: I feel pretty comfortable shopping online since I’d not have to encounter people especially during the time of pandemic. I’m quite satisfied with the variety and quality of most products I bought from online shopping sites I usually visit. However, I’d prefer to shop in-person to actually see and test the products by myself.
            
            Summary: Most users felt more comfortable with established companies and brands (both online and in-person), and less comfortable with third-party sellers and multi-vendor websites. This applies to the quality/variety of products and the general satisfaction with transactions.
            
    - **Seller**
        - **Are you a graduating student? If yes, how are you planning on getting rid of furniture, clothing, dorm supplies, etc that you don’t need after graduation?**
            
            Summary: Graduating students often have dorm supplies and books that they have to get rid of before moving out by the end of the semester. They usually use more decentralized apps like GroupMe to find random students to give away their items. Many undergraduate students also express general appreciation from being on the receiving end.
            
        - **If not, do you have clothing or dorm supplies that you currently own but don’t need? If so, would you rather keep them or get rid of them? How do you plan to store or get rid of them?**
            
            Summary: Many users have clothing items, accessories, shoes, etc. that they don’t use often. Most would prefer an option to get rid of them somehow.
            
        - **Imagine that it is the beginning of a semester and you are planning to take a course that requires a physical textbook. How do you plan to get this textbook?**
            
            Summary: People have multiple different methods. The most common ones are Brown bookstore, Amazon, and buying second hands from other students.
            
        - **Do you have any electronic devices you don’t need anymore?**
            
            Summary: A great amount of people have electronic devices that they don’t use anymore especially headphones, phones, speakers, and chargers. They also plan to sell these devices some time in the future or give them out to friends. 
            
    - How often do users perform tasks in the context of your project (i.e., how often will they use the product)?
    - In what context will users interact with your product? At work? At home? In school? Some combination?
    - Are there secondary users? Do they have different needs? (E.g., makers of medical devices need to know the needs of doctors as well as the needs of their patients)

## **2.2 Assumptions and dependencies**

- Technical dependencies
    - We will be requiring users to use Google accounts for authentication, particularly their Brown email accounts, to ensure that only members of the Brown community are allowed to use the application. Also our database system will be supported by Firebase Realtime Database, which is a cloud-hosted database management and storage system. This means the stability and security of our application depends on Google authentication API and Firebase. We do not expect that they will stop providing their services anytime soon (especially during our development).
- Non-technical dependencies
    - The recommendation feature implemented in our application will mimic a similar feature on Tinder. We hope that will help our users understand the basic functionality of our recommendation in a short time. Even though Tinder seems to be losing its popularity due to the emergence of other dating applications on the market, we believe that our primary users do understand this reference.
- Normative assumptions
    - We are choosing to center around Brown students and faculty as our user group, because we’d like to limit the scope of our project to make sure it’s manageable. In the future, we might expand the scope of our app to include other user groups.
    - We’re assuming that Brown students and faculty would be interested in buying and selling things to other community members, outside of using other shopping platforms with bigger scope, such as Amazon or Facebook marketplace.
- Financial dependencies
    - Potential domain Name Fees for brownmarketplace.net
    - Potential hosting cost from Amazon for backend server deploy
    - Access to IntelliJ, React, Firebase, and APIs

# **Section 3: System Features and Requirements**

## **3.1 Risks**

- Stakeholder risks
    - The website benefits Brown community more than people from other regions. In the future, we hope to expand the scope of our project to benefit more people.
    - The rules for our database currently allows everyone who has the address of our database to read from or write to it. These rules are insecure and and makes our user and product data vulnerable to attackers stealing, modifying or deleting data as well as creating costly operations.
    - The user profile is available to the public. We would enforce the real name authentication of the users for the secure transaction purpose, where some users may not be comfortable disclosing their personal information. However, the users can choose a nickname and hide their information from the public.
    - Our recommender system makes recommendations based on users’ search and browse history, which would be data used without stakeholders’ consent. A user cannot inspect how our app makes the recommendations for them. They simply get the recommended listings but no explanation on how the recommender algorithm works. Furthermore, the recommender system could result in unfair outcomes for stakeholders who have untraditional interests that may not be covered by our recommender system.
    - There are possible scenarios where our app could disrupt community wellbeing. For example, if a transaction has been made but the buyer is dissatisfied with the product after receiving it, this could lead to mistrust and hostility between the student body. The communication process between the buyer and seller prior to the transaction can also lead to conflicts, especially if there is bargaining involved.
- External risks
    - This app can lead to dangerous situations, especially giving users the ability to chat with each other and agree on a meeting place. Ensuring chatting does not become explicit, as well as having the meeting place be safe and secure (i.e. a highly trafficked area on campus at a reasonable time) are necessary considerations if Brown Marketplace provides the platform for communication.
    - Sellers scamming buyers is another consideration. Ensuring that payment is made only after the buyer has the product in hand may be impossible if users dictate when, where, and the cash amount for transactions.
    - The website is designed as a non-profit oriented marketplace. The users should only use the website to sell extra or unused objects. We discourage the users to purposely resell objects in order to earn money.
    - Purchasing unnecessary objects and overconsumption could also have a negative environmental impact. Such transactions would lead to a waste of resource and is against our intention of reusing used objects.

## **3.2 Data Requirements**

To make sure that our website accurately reflects user needs, most of our data would be collected from the users. We would store the data in our database and display the selected information on our website. 

- Product information: we rely on the users to take pictures with their device camera and/or upload images, tags and descriptions, and we would store those information in our database.
- User information: we collect user data for identification through Google API. We would store the registered user information in our database. For the transaction and payment security, we expect the user to be Brown student or faculty, and they would provide their real name and email for authentication.

## **3.3 System Features**

- **Frontend**
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
- **Database Package (Javascript)**:
    - `ProductDB` sub-package
        - `ModifyDB.js` for modifying products data
        - `ReadDB.js` for reading products data
    - `UserDB` sub-package
        - `ModifyDB.js` for modifying users data
        - `ReadDB.js` for reading users data
    - `DBInstance.js` for instantiating a Firebase Realtime Database
    - `testDB.html` an html file for testing and visualizing the database methods
- Potential NPM packages for trivial functionality
- Express Router for the Multi-Page Web App
- Frontend Directory Map
    - `src/`
        - `pages/`
        - `images/`
        - `components/`
        - `App.js`
- **Backend**
    - Java Packages
        - `Recommender` package for bloom-filter based recommender system
        - `Proxy` package for Firebase connection
        - `Server` package for establishing Spark server and creating routes
        - `Structure` package for storing project information (implements BF insertable interface for generating recommendation)
    - Spark server routes
        - `/userReq` for receiving user id and querying user liked items
        - `/recommend` for generating recommendations and sending the product ids
- Are there any known bugs in your program?
    - The number of recommendation is not consistent across multiple logins.
    - Image urls that contain commas will be split into multiple invalid urls and will not show up as images on the product page.
    - The Brown Marketplace logo will scale up and down as the winder resizes.
    - Users cannot ‘unsell’ products they accidentally ‘sell’.
- **Build and run**
    - `npm start`
    - `mvn package (./run --gui)`

## **3.4 Functional Requirements**

**Frontend**

- React: we plan to use React as the framework for our frontend development. We will also use Typescript and NPM.
- React-bootstrap: React component library for pre-styled components.
- Material-UI: React component library for pre-styled components.

**Backend**

- Database: we plan to use Firebase Realtime Database for storing product information, user profiles, and buying and selling listings.
- Recommendation system: we plan to use Java to create the recommender program. The data provided to the program would be in the form of JSON Objects, represented as maps with each of the product attributes as a key and the corresponding attribute as a value. The recommender program would parse the JSON Object to extract the relevant attributes, pass them into Bloom Filters for each product, generate recommendations based on the XNOR similarity scores, and then return a list of recommended items based on a given product.
- API: We plan on using the Google User API for creating user accounts and the Stripe payment API for securely processing payments. We also plan on setting up API endpoints for the frontend to receive data from the backend, such as user data in the database.

## **3.5 Testing Plan**

**Frontend Tests**:

- We plan on testing the frontend UI with a large amount of manual testing. We will be testing the database methods (in Javascript) with a **test HTML file**, which allows visualizations of modifications to the database.
- List of important functionalities to test for:
    - Navigating the explore page
    - Searching
    - Creating a profile / logging in
    - Making a new listing
    - Buying a listing
    - Navigating the category bar

**Backend Tests**:

- We plan on testing the backend with **JUnit tests**. We will write unit tests in Java that test the different expected functionalities on the backend.
- List of important functionalities to test for:
    - Recommender system
    - API endpoints
    - Accessing and modifying the database
    - User accounts

## **3.6 External Interface Requirements**

- The user should be able to access our website using the browsers. We rely on the browsers’ setup for accessibility to users with disability.
- We would be using Firebase and Google User API for the convenience and security of our development. In the future, we may deploy our website using Amazon Web Services services / Heroku.

## **3.7 Non-functional Requirements**

- We expect the website to load with a reasonable speed and and be accessible on multiple devices.
- We have to make sure that the user information are securely stored in the database and not accessible through code inspection. Important information like the passwords would be stored using SHA. We, as the developers of the website, would also not have direct access to the information.
- The website should be able to work on different browsers. The UI components should automatically adapt to different screen sizes / viewports.
- The UI components should have accessibility labels, such as “alt” for images.

