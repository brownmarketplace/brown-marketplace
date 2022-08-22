import React, { useState, useEffect } from 'react'
import BoilerplateHeader from '../components/BoilerplateHeader'
import Grid from '@mui/material/Grid';
import AddPhotos from '../components/add-listing-components/AddPhotos'
import AddName from '../components/add-listing-components/AddName'
import AddDetails from '../components/add-listing-components/AddDetails'
import AddPrice from '../components/add-listing-components/AddPrice'
import ChooseCategory from '../components/add-listing-components/ChooseCategory'
import ChooseSub from '../components/add-listing-components/ChooseSub';
import ChooseTags from '../components/add-listing-components/ChooseTags'
import PublishListing from '../components/add-listing-components/PublishListing'
import defaultProfilePicture from '../images/pfp.png'
import tags from '../components/add-listing-components/tags'

import database from "../backend/Database/DBInstance"
import { ref, set, push } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import {ref as sRef, getStorage, uploadBytesResumable, listAll, getDownloadURL, deleteObject} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js";

import './boilerplate-page.css'
import { v4 as uuid } from 'uuid';

function AddListing(props) {

    const newUserId = props.userID
    const newProductId = 'p' + uuid();

    const [formInputData, setFormInputData] = useState({
        productName: '',
        productDesc: '',
        productPrice: 0,
        productCat: '',
        productSubcategory: '',
        productTags: new Set(),
        productImgUrls: new Set(),
    })

    const [ imageNames, setImageNames ] = useState([])
    const [ currentFileList, setCurrentFileList ] = useState([])

    const [rerender, setRerender] = useState(false);
    useEffect(()=>{
        setRerender(!rerender);
    }, []);

    const handleInputChange = (event) => {
        console.log(event.target.value);
        const inputFieldValue = event.target.value;
        const inputFieldName = event.target.name;
        const NewInputValue = {...formInputData, [inputFieldName]: inputFieldValue}
        setFormInputData(NewInputValue);
        
    }

    function handleSelectionChanged(id, selectedProdTags) {
        // treat state as immutable
        // React only does a shallow comparison so we need a new Set
        const inputFieldName = "productTags";
        const newSet = new Set(selectedProdTags);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);

        const NewInputValue = {...formInputData, [inputFieldName]: newSet}
        setFormInputData(NewInputValue);
        console.log(newSet)
    }

    function handleCategoryChange(categ) {
        const inputFieldName = "productCat";
        const NewInputValue = {...formInputData, [inputFieldName]: categ}
        setFormInputData(NewInputValue);
        console.log(categ)
    }

    function handleSubChange(subcateg) {
        const inputFieldName = "productSubcategory";
        const NewInputValue = {...formInputData, [inputFieldName]: subcateg}
        setFormInputData(NewInputValue);
        console.log(subcateg)
    }

    const handleImgUrlChange = (event) => {
        const inputFieldName = "productImgUrls";
        const newSet = new Set();
        [...event.target.files].forEach(f => newSet.add(f))

        console.log("event.target.files:")
        console.log(event.target.files);

        const NewInputValue = {...formInputData, [inputFieldName]: newSet}
        setFormInputData(NewInputValue);
        
        console.log("new images uploaded:")
        console.log(newSet);

        setCurrentFileList(event.target.files);


        const nameArr = [];
        [...event.target.files].forEach(f => nameArr.push(f.name));
        setImageNames(nameArr);
    }

    const clearForm = (e) => {
        const NewInputValue = {
            productName:'',
            productDesc: '',
            productPrice: 0,
            productCat: '',
            productSubcategory: '',
            productTags: [],
            productImgUrls: ''
        }
        setFormInputData(NewInputValue);
    }

    const handleFormSubmit = (event) => {
        console.log("handleFormSubmit");
        console.log(newProductId);
        const checkEmptyInput = !Object.values(formInputData).every(res => res === "")
        if (checkEmptyInput) {
            console.log("empty input field")
            console.log(formInputData);
        }

        const ret = validateForm();
        if (!ret) {
            return
        }

        const productCategory = getCategoryFromSubcategory(formInputData.productSubcategory);
        addCategoryAndSubCategoryToProduct(newProductId, productCategory, formInputData.productSubcategory);

        for (let i = 0; i < formInputData.productTags.length; i++) {
            let tagId = formInputData.productTags[i];
            Object.keys(tags).map((id, tagName) => {
                if (id === tagId) {
                    const tagName = tags[id].name;
                    console.log(tagName);
                    addTagToProduct(newProductId, tagName);
                }
            })
        }

        [...currentFileList].forEach(f => uploadImageToStorage(newProductId, f))
        
        addNewListing(newUserId, newProductId);

        alert("Published listing!");
    }

    /*
        This method uploads an image for a product to Firebase storage.
    */
    var uploadImageToStorage = (productID, file) => {
        console.log("productID: " + productID);
        // get the storage reference for the image to upload
        // sample path: product-images/p1/hamburger.png
        const storage = getStorage();
        const storageRef = sRef(storage, 'product-images/' + productID + '/' + file.name);

        // upload the file and metadata and monitor upload progress
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            console.log(error)
        },
        () => {
            // handle successful upload on complete; get download url
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("Uploaded a blob or file!");
                console.log('File available at', downloadURL);
                // add download url to corresponding product
                console.log("Adding download url to corresponding product");
                const productRef = ref(database, 'products/' + productID + '/pictures');
                var newProductRef = push(productRef)
                set(newProductRef, downloadURL);
            });
        }
    )
        // uploadBytesResumable(storageRef).then((snapshot) => {
        //     const percent = Math.round((snapshot.bytesTransferred/ snapshot.totalBytes) * 100);
        //     console.log(percent)
        //     console.log("Uploaded a blob or file!");
        // })
    }

    var getCategoryFromSubcategory = (sub) => {
        const roomDecor = ["Plushies", "Plants", "Lights", "Posters", "Tapestries", "Other room decor"];
        const furniture = ["Chairs", "Couches", "Mattresses", "Pillows", "Other furniture"];
        const clothing = ["Tops", "Pants", "Dresses", "Shoes", "Coats and jackets", "Other clothing"];
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
        let pictures = formInputData.productImgUrls;
        const date = new Date().toLocaleString() + "";
    
        const sold = false;
        const numLiked = 0;
    
        // if (id.trim() == "" || name.trim() == "" || description == "" || tag == ""
        //     || subcategory == "" || seller.trim() == "" || pictures == "") {
        if (id.trim() == "" || name.trim() == "" || description == "" || tag == ""
            || subcategory == "" || seller.trim() == "") {
            alert("form not completely filled");
            return false;
        } else {
            // pictures = pictures.map(e => e.trim());
            pictures = ""
            writeBasicInfoToDatabase(id, name, description, price, seller, pictures, date, sold,
                numLiked);
            return true;
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
        set(listingRef, "true")
    }

    var addCategoryAndSubCategoryToProduct = (productID, categoryName, subCategoryName) => {

        // Add the category to the product
        const categoryRef = ref(database, 'products/' + productID + '/category');
        set(categoryRef, categoryName)
    
        // Add the sub-category to the product
        const subCategoryRef = ref(database, 'products/' + productID + '/sub-category')
        set(subCategoryRef, subCategoryName)
    
        // Add the product id to the list of product ids of the sub-category in the category
        const categoryRef2 = ref(database, 'categories/' + categoryName + '/' + subCategoryName + '/' + productID)
        set(categoryRef2, "true")
    }

    var addTagToProduct = (productID, tagName) => {
        // Add the tag to the list of tags of the product
        const tagRef = ref(database, 'products/' + productID + '/tags/' + tagName)
        set(tagRef, "true")
    
        // Add the product id to the list of product ids of the tag
        const tagRef2 = ref(database, 'tags/' + tagName + '/' + productID);
        set(tagRef2, "true")
    }

    return (
        <div className="boilerplate">
            <BoilerplateHeader title="Brown Marketplace" userPicture={defaultProfilePicture} showProfile={false}/>
                <div className="addListingStyle">                    
                    <Grid container spacing={2}>
                        <Grid item container spacing={2} direction="row" alignItems="center">
                            <Grid item xs={9}>
                                <span className="poppinsBigFont">
                                    New Post
                                </span>                         
                            </Grid>
                            <Grid item xs={3}>
                                <PublishListing
                                    // userId={props.userId} // should be this
                                    userId={newUserId} // used to test
                                    productId={newProductId}
                                    handleFormSubmit={handleFormSubmit}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <div>
                        <AddName 
                            productName={formInputData.productName}
                            handleInputChange={handleInputChange}
                        />
                        <AddPrice 
                            productPrice={formInputData.productPrice}
                            handleInputChange={handleInputChange}
                        />
                        <AddDetails 
                            productDesc={formInputData.productDesc}
                            handleInputChange={handleInputChange}
                        />  
                        <ChooseTags
                            productTags={formInputData.productTags}
                            // handleInputChange={handleTagChange}
                            handleInputChange={handleSelectionChanged}
                        />                  
                        <ChooseCategory 
                            productCat={formInputData.productCat}
                            handleInputChange={handleCategoryChange}
                        />
                        <ChooseSub
                            productCat={formInputData.productCat}
                            productSubcategory={formInputData.productSubcategory}
                            handleInputChange={handleSubChange}
                        />
                        <AddPhotos 
                            productId={newProductId}
                            productImgUrls={formInputData.productImgUrls}
                            handleInputChange={handleImgUrlChange}
                            uploadImageToStorage={uploadImageToStorage}
                        />
                        <div style={{ marginTop: "10px" }}>
                            {imageNames.join(", ")}
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default AddListing