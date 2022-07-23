/*
    This class handles all the modifications of the users in the database, including adding, updating and deleting a
    user; adding to a user's listings, liked items and purchased items.
 */
import { getDatabase, ref, set, update, remove } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import {ref as sRef, getStorage, uploadBytesResumable, listAll, getDownloadURL, deleteObject} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js";
const database = getDatabase();

/*
    This method gets the inputs from the test html file, verifies the inputs and uses them to call
    a method that adds a user to the database.
 */
var validateForm = () => {
    const id = document.querySelector("#form-id").value;
    const username = document.querySelector("#form-username").value;
    const name = document.querySelector("#form-name").value;
    const email = document.querySelector("#form-email").value;
    const profilePic = document.querySelector("#form-profilePic").value;
    const classYear = document.querySelector("#form-classYear").value;

    if (id.trim() == "" || username.trim() == "" || name == "" || email.trim() == "" || profilePic == ""
    || classYear == "") {
        alert("form not completely filled");
    } else {
        addUser(id, username, name, email, profilePic, classYear);
    }
};

/*
    This method adds a new user to the database with the basic fields. It replaces any existing data at that path.
 */
var addUser = (id, username, name, email, profilePic, classYear) => {
    console.log("here")
    set(ref(database, 'users/' + id), {
        id: id,
        username: username,
        name: name,
        email: email,
        profilePic: profilePic,
        classYear: classYear
    });
    console.log("here")
}

/*
    This method adds a new product to a user's list of listings.
 */
var addNewListing = (userID, productID) => {
    console.log("Added new listing")
    const listingRef = ref(database, 'users/' + userID + '/listings/' + productID);
    set(listingRef, "true")
}

/*
    This method adds a new product to a user's liked list.
 */
var addToLikedList = (userID, productID) => {
    console.log("Added to liked list")
    const likedListRef = ref(database, 'users/' + userID + '/liked-items/' + productID);
    set(likedListRef, "true")
}

/*
    This method adds a new product to a user's purchased list.
 */
var addToPurchasedList = (userID, productID) => {
    console.log("Added new purchased item")
    const purchasedListRef = ref(database, 'users/' + userID + "/purchased-items/" + productID);
    set(purchasedListRef, "true")
}

/*
    This method updates specific fields of user data in the database.
 */
var updateData = (id, username) => {
    update(ref(database, 'users/' + id), {
        username: username
    })
    console.log("here")
}

/*
    This method deletes user data from the database.
 */
var deleteData = (id) => {
    remove(ref(database, 'users/' + id))
}

/*
    This method uploads an image for a product to Firebase storage.
 */
var uploadImageToStorage = (productID, path) => {
    // get the storage reference for the image to upload
    const storage = getStorage();
    const storageRef = sRef(storage, 'product-images/' + productID + '/' + path);

    // upload the file and metadata
    uploadBytesResumable(storageRef).then((snapshot) => {
        console.log("Uploaded a blob or file!");
    })
    // const uploadTask = uploadBytesResumable(storageRef, file);
    // use uploadTask to pause, resume or cancel the upload
}

/*
    This method deletes an image for a product.
 */
var deleteImage = (productID, path) => {
    const storage = getStorage();
    const storageRef = sRef(storage, 'product-images/' + productID + '/' + path);
    deleteObject(storageRef).then(() => {
        console.log("image deleted successfully for product!");
    });
}

/*
    This method returns the download urls for all the images of a given product.
 */
var getSingleProductImages = (productID) => {
    const storage = getStorage()
    const storageRef = sRef(storage, 'product-images/' + productID);

    listAll(storageRef).then((result) => {
        const promises = [];
        result.items.forEach((imageRef) => {
            promises.push(getDownloadURL(imageRef));
        });
        return Promise.all(promises)
    }).then(urls => {
        console.log(urls)
    })
}

document.querySelector('#register').addEventListener("click", () => {
    validateForm();
})
document.querySelector('#update').addEventListener("click", () => {
    updateData(1, "Ostrich");
})
document.querySelector('#delete').addEventListener("click", () => {
    deleteData(4);
})
document.querySelector('#listing').addEventListener("click", () => {
    addNewListing("u111151172419494544994", "p16");
})
document.querySelector('#likedList').addEventListener("click", () => {
    addToLikedList("u115151849263296139973", "p9");
})
document.querySelector('#purchased').addEventListener("click", () => {
    addToPurchasedList("u115151849263296139973", "p9");
})
document.querySelector('#upload').addEventListener("click", () => {
    uploadImageToStorage("p2","logo.png");
})
document.querySelector('#getSingleProductImages').addEventListener("click", () => {
    getSingleProductImages("p1");
})
document.querySelector('#deleteImage').addEventListener("click", () => {
    deleteImage("p2", "logo.png");
})