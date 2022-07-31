/*
    This class handles all the modifications of the users in the database, including adding, updating and deleting a
    user; adding to a user's listings, liked items and purchased items.
 */
import { getDatabase, ref, set, update, remove } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import { ref as sRef, getStorage, uploadBytesResumable, listAll, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js";
var database = getDatabase();
/*
    This method gets the inputs from the test html file, verifies the inputs and uses them to call
    a method that adds a user to the database.
 */
var validateForm = function () {
    var id = document.querySelector("#form-id").value;
    var username = document.querySelector("#form-username").value;
    var name = document.querySelector("#form-name").value;
    var email = document.querySelector("#form-email").value;
    var profilePic = document.querySelector("#form-profilePic").value;
    var classYear = document.querySelector("#form-classYear").value;
    if (id.trim() == "" || username.trim() == "" || name == "" || email.trim() == "" || profilePic == ""
        || classYear == "") {
        alert("form not completely filled");
    }
    else {
        addUser(id, username, name, email, profilePic, classYear);
    }
};
/*
    This method adds a new user to the database with the basic fields. It replaces any existing data at that path.
 */
var addUser = function (id, username, name, email, profilePic, classYear) {
    console.log("here");
    set(ref(database, 'users/' + id), {
        id: id,
        username: username,
        name: name,
        email: email,
        profilePic: profilePic,
        classYear: classYear
    });
    console.log("here");
};
/*
    This method adds a new product to a user's list of listings.
 */
var addNewListing = function (userID, productID) {
    console.log("Added new listing");
    var listingRef = ref(database, 'users/' + userID + '/listings/' + productID);
    set(listingRef, "true");
};
/*
    This method adds a new product to a user's liked list.
 */
var addToLikedList = function (userID, productID) {
    console.log("Added to liked list");
    var likedListRef = ref(database, 'users/' + userID + '/liked-items/' + productID);
    set(likedListRef, "true");
};
/*
    This method adds a new product to a user's purchased list.
 */
var addToPurchasedList = function (userID, productID) {
    console.log("Added new purchased item");
    var purchasedListRef = ref(database, 'users/' + userID + "/purchased-items/" + productID);
    set(purchasedListRef, "true");
};
/*
    This method updates specific fields of user data in the database.
 */
var updateData = function (id, username) {
    update(ref(database, 'users/' + id), {
        username: username
    });
    console.log("here");
};
/*
    This method deletes user data from the database.
 */
var deleteData = function (id) {
    remove(ref(database, 'users/' + id));
};
/*
    This method uploads an image for a product to Firebase storage.
 */
var uploadImageToStorage = function (productID, path) {
    // get the storage reference for the image to upload
    var storage = getStorage();
    var storageRef = sRef(storage, 'product-images/' + productID + '/' + path);
    // upload the file and metadata
    uploadBytesResumable(storageRef).then(function (snapshot) {
        console.log("Uploaded a blob or file!");
    });
    // const uploadTask = uploadBytesResumable(storageRef, file);
    // use uploadTask to pause, resume or cancel the upload
};
/*
    This method deletes an image for a product.
 */
var deleteImage = function (productID, path) {
    var storage = getStorage();
    var storageRef = sRef(storage, 'product-images/' + productID + '/' + path);
    deleteObject(storageRef).then(function () {
        console.log("image deleted successfully for product!");
    });
};
/*
    This method returns the download urls for all the images of a given product.
 */
var getSingleProductImages = function (productID) {
    var storage = getStorage();
    var storageRef = sRef(storage, 'product-images/' + productID);
    listAll(storageRef).then(function (result) {
        var promises = [];
        result.items.forEach(function (imageRef) {
            promises.push(getDownloadURL(imageRef));
        });
        return Promise.all(promises);
    }).then(function (urls) {
        console.log(urls);
    });
};
document.querySelector('#register').addEventListener("click", function () {
    validateForm();
});
document.querySelector('#update').addEventListener("click", function () {
    updateData(1, "Ostrich");
});
document.querySelector('#delete').addEventListener("click", function () {
    deleteData(4);
});
document.querySelector('#listing').addEventListener("click", function () {
    addNewListing("u111151172419494544994", "p16");
});
document.querySelector('#likedList').addEventListener("click", function () {
    addToLikedList("u115151849263296139973", "p9");
});
document.querySelector('#purchased').addEventListener("click", function () {
    addToPurchasedList("u115151849263296139973", "p9");
});
document.querySelector('#upload').addEventListener("click", function () {
    uploadImageToStorage("p2", "logo.png");
});
document.querySelector('#getSingleProductImages').addEventListener("click", function () {
    getSingleProductImages("p1");
});
document.querySelector('#deleteImage').addEventListener("click", function () {
    deleteImage("p2", "logo.png");
});
//# sourceMappingURL=ModifyDB.js.map