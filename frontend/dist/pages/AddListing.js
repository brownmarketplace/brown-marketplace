var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from 'react';
import BoilerplateHeader from '../components/BoilerplateHeader';
import AddPhotos from '../components/add-listing-components/AddPhotos';
import AddName from '../components/add-listing-components/AddName';
import AddDetails from '../components/add-listing-components/AddDetails';
import AddPrice from '../components/add-listing-components/AddPrice';
import ChooseCategory from '../components/add-listing-components/ChooseCategory';
import ChooseTags from '../components/add-listing-components/ChooseTags';
import PublishListing from '../components/add-listing-components/PublishListing';
import ClearButton from '../components/add-listing-components/ClearButton';
import defaultProfilePicture from '../images/pfp.png';
import database from "../backend/Database/DBInstance";
import { ref, set } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import './boilerplate-page.css';
import { v4 as uuid } from 'uuid';
function AddListing(props) {
    var addListingStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "30px",
        marginBottom: "30px"
    };
    var newUserId = props.userID;
    var newProductId = 'p' + uuid();
    var _a = useState({
        productName: '',
        productDesc: '',
        productPrice: 0,
        productSubcategory: '',
        productTags: [],
        productImgUrls: ''
    }), formInputData = _a[0], setFormInputData = _a[1];
    var handleInputChange = function (event) {
        var _a;
        var inputFieldValue = event.target.value;
        var inputFieldName = event.target.name;
        var NewInputValue = __assign(__assign({}, formInputData), (_a = {}, _a[inputFieldName] = inputFieldValue, _a));
        setFormInputData(NewInputValue);
    };
    var handleTagChange = function (event) {
        var _a;
        var inputFieldName = event.target.name;
        var inputFieldValue = event.target.value;
        if (typeof inputFieldValue === 'string') {
            inputFieldValue = inputFieldValue.split(',');
        }
        var NewInputValue = __assign(__assign({}, formInputData), (_a = {}, _a[inputFieldName] = inputFieldValue, _a));
        setFormInputData(NewInputValue);
    };
    var handleImgUrlChange = function (event) {
        var _a;
        var inputFieldName = event.target.name;
        var inputFieldValue = event.target.value;
        if (typeof inputFieldValue === 'string') {
            inputFieldValue = inputFieldValue.split(',');
        }
        var NewInputValue = __assign(__assign({}, formInputData), (_a = {}, _a[inputFieldName] = inputFieldValue, _a));
        setFormInputData(NewInputValue);
    };
    var clearForm = function (e) {
        var NewInputValue = {
            productName: '',
            productDesc: '',
            productPrice: 0,
            productSubcategory: '',
            productTags: [],
            productImgUrls: ''
        };
        setFormInputData(NewInputValue);
    };
    var handleFormSubmit = function (event) {
        var checkEmptyInput = !Object.values(formInputData).every(function (res) { return res === ""; });
        if (checkEmptyInput) {
            console.log("empty input field");
            console.log(formInputData);
        }
        var ret = validateForm();
        if (!ret) {
            return;
        }
        var productCategory = getCategoryFromSubcategory(formInputData.productSubcategory);
        addCategoryAndSubCategoryToProduct(newProductId, productCategory, formInputData.productSubcategory);
        for (var i = 0; i < formInputData.productTags.length; i++) {
            var tag = formInputData.productTags[i];
            addTagToProduct(newProductId, tag);
        }
        addNewListing(newUserId, newProductId);
        alert("Published listing!");
    };
    var getCategoryFromSubcategory = function (sub) {
        var roomDecor = ["Plushies", "Plants", "Lights", "Posters", "Tapestries", "Other room decor"];
        var furniture = ["Chairs", "Couches", "Mattresses", "Pillows", "Other furniture"];
        var clothing = ["Tops", "Pants", "Dresses", "Shoes", "Coats and Jackets", "Other Clothing"];
        var accessories = ["Necklace", "Bracelet", "Earrings", "Hair clips", "Other accessories"];
        var books = ["Textbooks", "Fiction", "Nonfiction", "Poetry", "Other books"];
        var electronics = ["Speakers", "Phones", "Devices", "Other electronics and related"];
        var other = ['Miscellaneous'];
        if (roomDecor.includes(sub)) {
            return "Room Decor";
        }
        else if (furniture.includes(sub)) {
            return "Furniture";
        }
        else if (clothing.includes(sub)) {
            return "Clothing";
        }
        else if (accessories.includes(sub)) {
            return "Accessories";
        }
        else if (books.includes(sub)) {
            return "Books";
        }
        else if (electronics.includes(sub)) {
            return "Electronics";
        }
        else if (other.includes(sub)) {
            return "Other";
        }
        else {
            console.log("error: none of the subcategories, was this instead:");
            console.log(sub);
        }
    };
    var validateForm = function () {
        var id = newProductId;
        var name = formInputData.productName;
        var description = formInputData.productDesc;
        var price = formInputData.productPrice;
        var tag = formInputData.productTags;
        var subcategory = formInputData.productSubcategory;
        var seller = newUserId;
        var pictures = formInputData.productImgUrls;
        var date = new Date().toLocaleString() + "";
        var sold = false;
        var numLiked = 0;
        if (id.trim() == "" || name.trim() == "" || description == "" || tag == ""
            || subcategory == "" || seller.trim() == "" || pictures == "") {
            alert("form not completely filled");
            return false;
        }
        else {
            pictures = pictures.map(function (e) { return e.trim(); });
            writeBasicInfoToDatabase(id, name, description, price, seller, pictures, date, sold, numLiked);
            return true;
        }
    };
    // This method adds a new product to the database. It replaces any existing data at that path.
    var writeBasicInfoToDatabase = function (id, name, description, price, seller, pictures, date, sold, numLiked) {
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
    };
    // This method adds a new listing to the user's list of listings.
    var addNewListing = function (userID, productID) {
        var listingRef = ref(database, 'users/' + userID + '/listings/' + productID);
        set(listingRef, "true");
    };
    var addCategoryAndSubCategoryToProduct = function (productID, categoryName, subCategoryName) {
        // Add the category to the product
        var categoryRef = ref(database, 'products/' + productID + '/category');
        set(categoryRef, categoryName);
        // Add the sub-category to the product
        var subCategoryRef = ref(database, 'products/' + productID + '/sub-category');
        set(subCategoryRef, subCategoryName);
        // Add the product id to the list of product ids of the sub-category in the category
        var categoryRef2 = ref(database, 'categories/' + categoryName + '/' + subCategoryName + '/' + productID);
        set(categoryRef2, "true");
    };
    var addTagToProduct = function (productID, tagName) {
        // Add the tag to the list of tags of the product
        var tagRef = ref(database, 'products/' + productID + '/tags/' + tagName);
        set(tagRef, "true");
        // Add the product id to the list of product ids of the tag
        var tagRef2 = ref(database, 'tags/' + tagName + '/' + productID);
        set(tagRef2, "true");
    };
    return (React.createElement("div", { className: "boilerplate" },
        React.createElement(BoilerplateHeader, { title: "Brown Marketplace", userPicture: defaultProfilePicture, showProfile: false }),
        React.createElement("div", { style: addListingStyle },
            React.createElement(AddName, { productName: formInputData.productName, handleInputChange: handleInputChange }),
            React.createElement(AddDetails, { productDesc: formInputData.productDesc, handleInputChange: handleInputChange }),
            React.createElement(AddPrice, { productPrice: formInputData.productPrice, handleInputChange: handleInputChange }),
            React.createElement(ChooseCategory, { productSubcategory: formInputData.productSubcategory, handleInputChange: handleInputChange }),
            React.createElement(ChooseTags, { productTags: formInputData.productTags, handleInputChange: handleTagChange }),
            React.createElement(AddPhotos, { productImgUrls: formInputData.productImgUrls, handleInputChange: handleImgUrlChange }),
            React.createElement("div", { style: { display: 'flex', justifyContent: "center" } },
                React.createElement(PublishListing
                // userId={props.userId} // should be this
                , { 
                    // userId={props.userId} // should be this
                    userId: newUserId, productId: newProductId, handleFormSubmit: handleFormSubmit }),
                React.createElement("div", { style: { width: "20px" } }),
                React.createElement(ClearButton, { handleSubmit: clearForm })))));
}
export default AddListing;
//# sourceMappingURL=AddListing.js.map