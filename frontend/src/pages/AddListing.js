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

    const newUserId = "u505"
    const newProductId = "p505"

    const [formInputData, setFormInputData] = useState({
        productName:'',
        productDesc: '',
        productPrice: 0,
        productCategory: '',
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
            productCategory: '',
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

        const productCategory = getCategoryFromSubcategory(formInputData.productCategory);
        addSubCategoryToProduct(newProductId, productCategory, formInputData.productCategory);
        addCategoryToProduct(newProductId, productCategory);

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
        const category = formInputData.productCategory;
        const seller = newUserId;
        const pictures = formInputData.productImgUrls;
        const date = new Date().toLocaleString() + "";
    
        const sold = false;
        const numLiked = 0;
    
        if (id.trim() == "" || name.trim() == "" || description == "" || tag == ""
            || category == "" || seller.trim() == "" || pictures == "") {
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

    // This method adds a category to the product.
    var addCategoryToProduct = (productID, categoryName) => {
        // Add the category to the list of categories of the product
        const categoryRef = ref(database, 'products/' + productID + '/category');
        set(categoryRef, categoryName)

        // Add the product id to the list of product ids of the category
        var category_to_ids = getCategoryIDs()
        var categoryID = category_to_ids.get(categoryName)

        const categoryRef2 = ref(database, 'categories/' + categoryID + '/productIDs/' + productID);
        // const newCategoryRef2 = push(categoryRef2)
        set(categoryRef2, productID)
    }

    // This method adds a subcategory to the product.
    var addSubCategoryToProduct = (productID, categoryName, subCategoryName) => {
        // Add the sub-category to the list of subcategories under the category of the product
        let subCategoryID = getSubCategoryIDs().get(subCategoryName)

        const subCategoryRef = ref(database, 'products/' + productID + '/sub-category')
        // const newSubCategoryRef = push(subCategoryRef)
        set(subCategoryRef, subCategoryName)

        // Add the product id to the list of product ids of the sub-category
        const subCategoryRef2 = ref(database, 'sub-categories/' + subCategoryID + '/productIDs/' + productID);
        // const newSubCategoryRef2 = push(subCategoryRef2)
        set(subCategoryRef2, productID)
    }

    // This method adds a tag to the product.
    var addTagToProduct = (productID, tagName) => {
        // Add the tag to the list of tags of the product
        var tagID = getTagIDS().get(tagName)
        const tagRef = ref(database, 'products/' + productID + '/tags/' + tagID)
        // const newTagRef = push(tagRef)
        set(tagRef, tagName)

        // Add the product id to the list of product ids of the tag
        const tagRef2 = ref(database, 'tags/' + tagID + '/productIDs/' + productID);
        // const newTagRef2 = push(tagRef2)
        set(tagRef2, productID)
    }

    var getCategoryIDs = () => {
        // map to keep track of the category ids
        const category_to_ids = new Map();
        category_to_ids.set("Room Decor", "-N1Ux1ljSfURmvq-bEMe")
        category_to_ids.set("Clothing", "-N1UxEWmJFRaXRB9Y_8O")
        category_to_ids.set("Furniture", "-N1UxP23b9LJiNw9FSxC")
        category_to_ids.set("Accessories", "-N1UxXbrrqelBYY1JsLK")
        category_to_ids.set("Books", "-N1UxdxXJVmBlkKkhs5r")
        category_to_ids.set("Electronics & related", "-N1Uxqqb2-9GAEinq7Od")
        category_to_ids.set("Other", "-N1UxwBSZrXXyiOb2KCK")
        return category_to_ids
    }

    var getSubCategoryIDs = () => {
        // map to keep track of the category ids
        const subCategory_to_ids = new Map();
        subCategory_to_ids.set("Plushies", "-N1UykiIKXwQFZ3jYjGZ")
        subCategory_to_ids.set("Plants", "-N1UytvFDjfZF1ndI3f2")
        subCategory_to_ids.set("Lights", "-N1Uyvr4_P1TDydamPwC")
        subCategory_to_ids.set("Posters", "-N1Uyxk4RO-2FrlUOFbA")
        subCategory_to_ids.set("Tapestries", "-N1Uz-nLjWEurGxIY-WY")
        subCategory_to_ids.set("Other room decor", "-N1Uz1wWd1RJ1v3mBNf3")
        subCategory_to_ids.set("Tops", "-N1Uz79kf02luhcrKlLg")
        subCategory_to_ids.set("Pants", "-N1UzAbzeYI93hyv5-xo")
        subCategory_to_ids.set("Dresses", "-N1UzCNYMC65SOhsDBB8")
        subCategory_to_ids.set("Shoes", "-N1UzE7OfFpItuifBW_j")
        subCategory_to_ids.set("Coats and Jackets", "-N1UzFrZABvjJT6gRjNL")
        subCategory_to_ids.set("Other Clothing", "-N1UzHyoPzEQx5KtqBns")
        subCategory_to_ids.set("Chairs", "-N1Uz_M1anVNuKUqndqJ")
        subCategory_to_ids.set("Couches", "-N1Uzbx_8582s6F13nFh")
        subCategory_to_ids.set("Mattresses", "-N1UzdngQ4Oc0BPuI2au")
        subCategory_to_ids.set("Pillows", "-N1Uzfp3SS-t6Dfhfkxy")
        subCategory_to_ids.set("Other furniture", "-N1UziLMqvF-LKPlr-U5")
        subCategory_to_ids.set("Necklace", "-N1UznGsU8Q9VYyPhVcM")
        subCategory_to_ids.set("Bracelet", "-N1UzpjwO0Y0z-sErYlf")
        subCategory_to_ids.set("Earrings", "-N1UzrnSCn00KTtU5xYN")
        subCategory_to_ids.set("Hair clips", "-N1UzthX-LeU2XUKtaxK")
        subCategory_to_ids.set("Other accessories", "-N1Uzvj-lq8bGdZBFYfd")
        subCategory_to_ids.set("Textbooks", "-N1UzzP4ejJ5hZKlIQ8C")
        subCategory_to_ids.set("Fiction", "-N1V-12XWHylud1WpjQg")
        subCategory_to_ids.set("Nonfiction", "-N1V-3LqbyhrjEvjV8ln")
        subCategory_to_ids.set("Poetry", "-N1V-52Fi_fnowUBmXoF")
        subCategory_to_ids.set("Other books", "-N1V-6tqOLYaUGwMi3Lr")
        subCategory_to_ids.set("Speakers", "-N1V-CCcaSY8PZEbV04J")
        subCategory_to_ids.set("Phones", "-N1V-Dzqzxh26ij5fGY0")
        subCategory_to_ids.set("Devices", "-N1V-FlzKDrZnHtqzKwl")
        subCategory_to_ids.set("Other electronics and related", "-N1V-IKVJx59x6T1n_H1")
        subCategory_to_ids.set("Miscellaneous", "-N1V-L5w8gne7RxkzWAF")
        return subCategory_to_ids
    }

    var getTagIDS = () => {
        const tag_to_ids = new Map()
        tag_to_ids.set("New", "-N1V00Ra6AVVNwfQog8Q")
        tag_to_ids.set("Lightly Used", "-N1V0DxoUNKHV6VVdC_p")
        tag_to_ids.set("Used", "-N1V0Gnl_Nf0OZ4Qna5N")
        tag_to_ids.set("Handmade", "-N1V0JD7DGWGqB6jQM7X")
        tag_to_ids.set("Gift", "-N1V0LTkL2cG4j2OsYuV")
        tag_to_ids.set("Spring", "-N1VtItKV8ErLPBNg1Bv")
        tag_to_ids.set("Summer", "-N1VtMWyD9G1bIaGpfuR")
        tag_to_ids.set("Fall", "-N1WJAi0bNjKeo6wF7xT")
        tag_to_ids.set("Winter", "-N1WJDjEVHwXWVbZ3HMU")
        tag_to_ids.set("Mens", "-N1WJhvwoG-h0A5SbHCQ")
        tag_to_ids.set("Womens", "-N1WJkFAkj43U-1JWz6P")
        tag_to_ids.set("Unisex", "-N1WJmQNrDJl63m2b55Q")
        tag_to_ids.set("Casual Wear", "-N1WJpRzpxLlNMUM_a1g")
        tag_to_ids.set("Formal Wear", "-N1WJsvGZkn_ErXBMWXr")
        tag_to_ids.set("Vintage", "-N1WJvG8thC42Jctum1j")
        tag_to_ids.set("Fitness and Sports Equipment", "-N1WJy_SfFCFvMYVaj9e")
        tag_to_ids.set("Plus Size", "-N1WK09G9IYuzpKE2HD5")
        tag_to_ids.set("Brown Merchandise", "-N1WK2WQkmQHaHpB-NDG")
        tag_to_ids.set("Holiday", "-N1WK4ZG7-L6r_sECJ70")
        tag_to_ids.set("Cute", "-N1WK6owfxIp742zSUXu")
        tag_to_ids.set("Eco-friendly", "-N1WK97u-A2cEnFY6BnG")
        tag_to_ids.set("Cruelty-free", "-N1WKBQaKj4rS29lOSxt")
        tag_to_ids.set("Vegan", "-N1WKFG0GxU7RRWSTne2")
        tag_to_ids.set("BIPOC-made", "-N1WKHVPgOvfXN2CPpH6")
        tag_to_ids.set("Daily Essentials", "-N1WKJYmfh4OviQp3OlE")
        tag_to_ids.set("School Essentials", "-N1WKLnx6dUm_Yoqq_UM")
        tag_to_ids.set("Cultural", "-N1WKPXuiLYa5t3J0loq")
        tag_to_ids.set("Beauty products", "-N1WK_j7sFTEcJ_icdZX")
        tag_to_ids.set("Artsy", "-N1WKcWda70pbOYdlKOQ")
        tag_to_ids.set("Custom", "-N1WKemwu5ZPbCuiXgu8")
        tag_to_ids.set("Sports Wear", "-N1WKh9V6xuySa3qhkLN")
        tag_to_ids.set("Street Wear", "-N1WKjQdV4IadNOxk8Gj")
        return tag_to_ids
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
                        productCategory={formInputData.productCategory}
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