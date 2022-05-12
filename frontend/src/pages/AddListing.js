import React, { useState, useEffect } from 'react'
import BoilerplateHeader from '../components/BoilerplateHeader'
import Footer from '../components/Footer'
import AddPhotos from '../components/add-listing-components/AddPhotos'
import AddName from '../components/add-listing-components/AddName'
import AddDetails from '../components/add-listing-components/AddDetails'
import AddPrice from '../components/add-listing-components/AddPrice'
import ChooseCategory from '../components/add-listing-components/ChooseCategory'
import ChooseTags from '../components/add-listing-components/ChooseTags'
import PublishListing from '../components/add-listing-components/PublishListing'
import ClearButton from '../components/add-listing-components/ClearButton'
import defaultProfilePicture from '../images/pfp.png'

import database from "../backend/Database/DBInstance"
import { ref, set } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

import './boilerplate-page.css'

function AddListing(props) {
    const addListingStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "30px",
        marginBottom: "30px"
    }

    const newUserId = "u100"
    const newProductId = "p100"

    const [formInputData, setFormInputData] = useState({
        productName:'',
        productDesc: '',
        productPrice: 0,
        productSubcategory: '',
        productTags: [],
        productImgUrls: ''
    })

    const handleInputChange = (event) => {
        const inputFieldValue = event.target.value;
        const inputFieldName = event.target.name;
        const NewInputValue = {...formInputData, [inputFieldName]: inputFieldValue}
        setFormInputData(NewInputValue);
    }

    const handleTagChange = (event) => {
        const inputFieldName = event.target.name;
        const inputFieldValue = event.target.value;
        if (typeof inputFieldValue === 'string') {
            inputFieldValue = inputFieldValue.split(',')
        }
        
        const NewInputValue = {...formInputData, [inputFieldName]: inputFieldValue}
        setFormInputData(NewInputValue);  
    }

    const clearForm = (e) => {
        console.log("inside clear form")
        const NewInputValue = {
            productName:'',
            productDesc: '',
            productPrice: 0,
            productSubcategory: '',
            productTags: [],
            productImgUrls: ''
        }
        setFormInputData(NewInputValue);
    }

    const handleFormSubmit = (event) => {
        const checkEmptyInput = !Object.values(formInputData).every(res => res === "")
        if (checkEmptyInput) {
            console.log(formInputData);
        }

        // parse comma-separated product image urls - deal with this later
        // const urls = formInputData.productImgUrls.split(",").map(item => item.trim());
        // for (const url in urls) {
        //     urlArr.push(url);
        // }
        // console.log("urlArr:")
        // console.log(urlArr);

        validateForm();

        const productCategory = getCategoryFromSubcategory(formInputData.productSubcategory);
        addCategoryAndSubCategoryToProduct(newProductId, productCategory, formInputData.productSubcategory);

        for (let i = 0; i < formInputData.productTags.length; i++) {
            let tag = formInputData.productTags[i];
            addTagToProduct(newProductId, tag);
        }

        addNewListing(newUserId, newProductId);

        console.log("Published listing!");
    }

    var getCategoryFromSubcategory = (sub) => {
        const roomDecor = ["Plushies", "Plants", "Lights", "Posters", "Tapestries", "Other room decor"];
        const furniture = ["Chairs", "Couches", "Mattresses", "Pillows", "Other furniture"];
        const clothing = ["Tops", "Pants", "Dresses", "Shoes", "Coats and Jackets", "Other Clothing"];
        const accessories = ["Necklace", "Bracelet", "Earrings", "Hair clips", "Other accessories"];
        const books = ["Textbooks", "Fiction", "Nonfiction", "Poetry", "Other books"];
        const electronics = ["Speakers", "Phones", "Devices", "Other electronics and related"];
        const other = ['Miscellaneous'];

        if (roomDecor.includes(sub)) {
            return "Room Decor";

        } else if (furniture.includes(sub)) {
            return "Furniture";

        } else if (clothing.includes(sub)) {
            return "Clothing";

        } else if (accessories.includes(sub)) {
            return "Accessories";

        } else if (books.includes(sub)) {
            return "Books";

        } else if (electronics.includes(sub)) {
            return "Electronics";

        } else if (other.includes(sub)) {
            return "Other";

        } else {
            console.log("error: none of the subcategories, was this instead:");
            console.log(sub);
        }
    }

    var validateForm = () => {
        const id = newProductId;
        const name = formInputData.productName;
        const description = formInputData.productDesc;
        const price = formInputData.productPrice;
        const tag = formInputData.productTags;
        const subcategory = formInputData.productSubcategory;
        const seller = newUserId;
        const pictures = formInputData.productImgUrls;
        const date = new Date().toLocaleString() + "";
    
        const sold = false;
        const numLiked = 0;
    
        if (id.trim() == "" || name.trim() == "" || description == "" || tag == ""
            || subcategory == "" || seller.trim() == "" || pictures == "") {
            alert("form not completely filled");
        } 
        else {
            writeBasicInfoToDatabase(id, name, description, price, seller, pictures, date, sold,
                numLiked);
        }
    };
    
    // This method adds a new product to the database. It replaces any existing data at that path.
    var writeBasicInfoToDatabase = (id, name, description, price, 
                                      seller, pictures, date, sold, numLiked) => {
        set(ref(database, 'products/' + id), {
            id: id,
            name: name,
            description: description,
            price: price,
            seller: seller,
            pictures: pictures,
            date: date,
            sold: sold,
            numLiked: numLiked
        });
    }

    // This method adds a new listing to the user's list of listings.
    var addNewListing = (userID, productID) => {
        const listingRef = ref(database, 'users/' + userID + '/listings/' + productID);
        set(listingRef, productID)
    }

    var addCategoryAndSubCategoryToProduct = (productID, categoryName, subCategoryName) => {
        console.log("inside addCategoryAndSubCategoryToProduct...")
        console.log(productID)
        console.log(categoryName)
        console.log(subCategoryName)

        // Add the category to the product
        const categoryRef = ref(database, 'products/' + productID + '/category');
        set(categoryRef, categoryName)
    
        // Add the sub-category to the product
        const subCategoryRef = ref(database, 'products/' + productID + '/sub-category')
        set(subCategoryRef, subCategoryName)
    
        // Add the product id to the list of product ids of the sub-category in the category
        const categoryRef2 = ref(database, 'categories/' + categoryName + '/' + subCategoryName + '/' + productID)
        set(categoryRef2, "true")
        console.log("Added category to product")
    }

    var addTagToProduct = (productID, tagName) => {
        // Add the tag to the list of tags of the product
        const tagRef = ref(database, 'products/' + productID + '/tags/' + tagName)
        set(tagRef, "true")
    
        // Add the product id to the list of product ids of the tag
        const tagRef2 = ref(database, 'tags/' + tagName + '/' + productID);
        set(tagRef2, "true")
        console.log("Added tag to product")
    }

    return (
        <div className="boilerplate">
            <BoilerplateHeader title="Make A Listing!" userPicture={defaultProfilePicture} showProfile={false}/>
            <div style={addListingStyle}>
                    <AddName 
                        productName={formInputData.productName}
                        handleInputChange={handleInputChange}
                    />
                    <AddDetails 
                        productDesc={formInputData.productDesc}
                        handleInputChange={handleInputChange}
                    />
                    <AddPrice 
                        productPrice={formInputData.productPrice}
                        handleInputChange={handleInputChange}
                    />
                    <ChooseCategory 
                        productSubcategory={formInputData.productSubcategory}
                        handleInputChange={handleInputChange}
                    />
                    <ChooseTags 
                        productTags={formInputData.productTags}
                        handleInputChange={handleTagChange}
                    />
                    <AddPhotos 
                        productImgUrls={formInputData.productImgUrls}
                        handleInputChange={handleInputChange}
                    />
                    <PublishListing
                        // userId={props.userId} // should be this
                        userId={newUserId} // used to test
                        productId={newProductId}
                        handleFormSubmit={handleFormSubmit}
                    />
                    <ClearButton handleSubmit={clearForm}/>
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default AddListing